"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Scissors, UserRound } from "lucide-react";
import { barbers, services, timeSlots } from "@/config/barber-prime";
import { useAppointments } from "@/hooks/use-appointments";

export type AppointmentPreset = {
  serviceId?: string;
  barberId?: string;
};

type AppointmentWizardProps = {
  preset: AppointmentPreset;
  onPresetConsumed: () => void;
};

const steps = ["Servico", "Barbeiro", "Data", "Horario", "Dados", "Resumo"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export function AppointmentWizard({ preset, onPresetConsumed }: AppointmentWizardProps) {
  const { addAppointment, isBlocked, isSlotAvailable } = useAppointments();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services[3].id);
  const [barberId, setBarberId] = useState(barbers[0].id);
  const [date, setDate] = useState("2026-10-15");
  const [time, setTime] = useState("14:30");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState("");
  const [successProtocol, setSuccessProtocol] = useState("");

  useEffect(() => {
    if (preset.serviceId) {
      setServiceId(preset.serviceId);
      setStep(1);
      onPresetConsumed();
    }
    if (preset.barberId) {
      setBarberId(preset.barberId);
      setStep(2);
      onPresetConsumed();
    }
  }, [preset, onPresetConsumed]);

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId) ?? services[0],
    [serviceId],
  );
  const selectedBarber = useMemo(
    () => barbers.find((barber) => barber.id === barberId) ?? barbers[0],
    [barberId],
  );

  function next() {
    setError("");
    if (step === 4 && (!customerName.trim() || !customerPhone.trim())) {
      setError("Informe nome e telefone para continuar.");
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function back() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  function confirm() {
    setError("");
    if (!customerName.trim() || !customerPhone.trim()) {
      setError("Informe nome e telefone para confirmar.");
      setStep(4);
      return;
    }

    const result = addAppointment({
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      barberId,
      date,
      time,
    });

    if (!result.ok) {
      setError(result.message);
      setStep(3);
      return;
    }

    setSuccessProtocol(result.appointment.protocol);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
  }

  if (successProtocol) {
    return (
      <div className="booking-card success-state">
        <CheckCircle2 aria-hidden="true" />
        <span>Agendamento realizado com sucesso!</span>
        <h3>Protocolo {successProtocol}</h3>
        <p>
          Seu horario foi reservado. Para alterar qualquer detalhe, fale com a equipe
          pelo WhatsApp.
        </p>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            setSuccessProtocol("");
            setStep(0);
          }}
        >
          Fazer novo agendamento
        </button>
      </div>
    );
  }

  return (
    <div className="booking-card">
      <div className="section-kicker">Agendamento online</div>
      <div className="booking-heading">
        <div>
          <h2>Reserve seu horario em poucos passos</h2>
          <p>
            Escolha servico, profissional e horario. A disponibilidade e validada no
            momento da confirmacao.
          </p>
        </div>
        <div className="booking-price">
          <span>{selectedService.duration}</span>
          <strong>{formatCurrency(selectedService.price)}</strong>
        </div>
      </div>

      <div className="stepper" aria-label="Etapas do agendamento">
        {steps.map((label, index) => (
          <button
            key={label}
            className={index === step ? "active" : index < step ? "done" : ""}
            type="button"
            onClick={() => setStep(index)}
          >
            <span>{index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="booking-panel">
        {step === 0 && (
          <div className="choice-grid">
            {services.map((service) => (
              <button
                key={service.id}
                className={serviceId === service.id ? "choice-card selected" : "choice-card"}
                type="button"
                onClick={() => {
                  setServiceId(service.id);
                  setStep(1);
                }}
              >
                <Scissors aria-hidden="true" />
                <span>{service.name}</span>
                <p>{service.description}</p>
                <strong>{formatCurrency(service.price)}</strong>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="choice-grid barber-choices">
            {barbers.map((barber) => (
              <button
                key={barber.id}
                className={barberId === barber.id ? "choice-card selected" : "choice-card"}
                type="button"
                onClick={() => {
                  setBarberId(barber.id);
                  setStep(2);
                }}
              >
                <img alt={barber.name} src={barber.image} />
                <span>{barber.name}</span>
                <p>{barber.specialty}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="date-step">
            <label htmlFor="booking-date">
              <CalendarDays aria-hidden="true" />
              Escolha a data
            </label>
            <input
              id="booking-date"
              min="2026-10-01"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setStep(3);
              }}
            />
            <p>
              Sugestao para demonstracao: 15/10/2026. Alguns horarios ja estao
              ocupados ou bloqueados para mostrar a regra de conflito.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="time-grid">
            {timeSlots.map((slot) => {
              const available = isSlotAvailable(barberId, date, slot);
              const blocked = isBlocked(barberId, date, slot);
              return (
                <button
                  key={slot}
                  className={time === slot ? "time-card selected" : "time-card"}
                  disabled={!available}
                  type="button"
                  onClick={() => {
                    setTime(slot);
                    setStep(4);
                  }}
                >
                  <Clock aria-hidden="true" />
                  <strong>{slot}</strong>
                  <span>{available ? "Disponivel" : blocked ? "Bloqueado" : "Indisponivel"}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 4 && (
          <div className="client-form">
            <label>
              <UserRound aria-hidden="true" />
              Nome
              <input
                placeholder="Seu nome completo"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </label>
            <label>
              Telefone
              <input
                placeholder="(81) 99999-9999"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
              />
            </label>
            <label>
              E-mail opcional
              <input
                placeholder="voce@email.com"
                type="email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
              />
            </label>
          </div>
        )}

        {step === 5 && (
          <div className="summary-box">
            <h3>Resumo do agendamento</h3>
            <dl>
              <div>
                <dt>Servico</dt>
                <dd>{selectedService.name}</dd>
              </div>
              <div>
                <dt>Profissional</dt>
                <dd>{selectedBarber.name}</dd>
              </div>
              <div>
                <dt>Data</dt>
                <dd>{formatDate(date)}</dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>{time}</dd>
              </div>
              <div>
                <dt>Valor</dt>
                <dd>{formatCurrency(selectedService.price)}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <div className="booking-actions">
        <button type="button" className="secondary-button" onClick={back} disabled={step === 0}>
          Voltar
        </button>
        {step < 5 ? (
          <button type="button" className="primary-button" onClick={next}>
            Continuar
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={confirm}>
            Confirmar agendamento
          </button>
        )}
      </div>
    </div>
  );
}
