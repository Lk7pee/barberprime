"use client";

import { useEffect, useMemo, useState } from "react";
import {
  blockedTimes,
  defaultAppointments,
  services,
} from "@/config/barber-prime";
import type { Appointment, AppointmentStatus } from "@/types/barber";

const STORAGE_KEY = "barber-prime-appointments";

type NewAppointmentInput = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
};

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function makeProtocol() {
  return `BP-${Date.now().toString().slice(-6)}`;
}

export function useAppointments() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(defaultAppointments);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAppointments(JSON.parse(saved) as Appointment[]);
      } catch {
        setAppointments(defaultAppointments);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }
  }, [appointments, loaded]);

  const activeAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status !== "Cancelado"),
    [appointments],
  );

  function isBlocked(barberId: string, date: string, time: string) {
    const minutes = timeToMinutes(time);
    return blockedTimes.some((block) => {
      if (block.barberId !== barberId || block.date !== date) return false;
      return minutes >= timeToMinutes(block.start) && minutes < timeToMinutes(block.end);
    });
  }

  function isSlotTaken(barberId: string, date: string, time: string) {
    return activeAppointments.some(
      (appointment) =>
        appointment.barberId === barberId &&
        appointment.date === date &&
        appointment.time === time,
    );
  }

  function isSlotAvailable(barberId: string, date: string, time: string) {
    return !isBlocked(barberId, date, time) && !isSlotTaken(barberId, date, time);
  }

  function addAppointment(input: NewAppointmentInput) {
    if (!isSlotAvailable(input.barberId, input.date, input.time)) {
      return {
        ok: false as const,
        message: "Este horario acabou de ser ocupado. Escolha outro horario.",
      };
    }

    const selectedService = services.find((service) => service.id === input.serviceId);
    if (!selectedService) {
      return {
        ok: false as const,
        message: "Servico indisponivel. Escolha outro servico.",
      };
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      protocol: makeProtocol(),
      customerName: input.customerName.trim(),
      customerPhone: input.customerPhone.trim(),
      customerEmail: input.customerEmail?.trim(),
      serviceId: input.serviceId,
      barberId: input.barberId,
      date: input.date,
      time: input.time,
      value: selectedService.price,
      status: "Confirmado",
    };

    setAppointments((current) => [appointment, ...current]);
    return { ok: true as const, appointment };
  }

  function updateStatus(id: string, status: AppointmentStatus) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
  }

  function reschedule(id: string, time: string) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, time, status: "Confirmado" } : appointment,
      ),
    );
  }

  function resetDemoData() {
    setAppointments(defaultAppointments);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    appointments,
    activeAppointments,
    addAppointment,
    isBlocked,
    isSlotAvailable,
    isSlotTaken,
    reschedule,
    resetDemoData,
    updateStatus,
  };
}
