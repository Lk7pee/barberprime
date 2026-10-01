"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  Check,
  Clock,
  DollarSign,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  barbers as initialBarbers,
  blockedTimes as initialBlockedTimes,
  businessConfig,
  businessHours as initialBusinessHours,
  customers,
  services as initialServices,
  timeSlots,
} from "@/config/barber-prime";
import { useAppointments } from "@/hooks/use-appointments";
import type {
  Appointment,
  AppointmentStatus,
  Barber,
  BlockedTime,
  BusinessHour,
  Service,
} from "@/types/barber";

const tabItems = [
  ["dashboard", "Dashboard"],
  ["appointments", "Agendamentos"],
  ["daily", "Visao diaria"],
  ["customers", "Clientes"],
  ["barbers", "Barbeiros"],
  ["services", "Servicos"],
  ["hours", "Horarios"],
  ["settings", "Configuracoes"],
] as const;

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function findService(services: Service[], id: string) {
  return services.find((service) => service.id === id) ?? services[0];
}

function findBarber(barbers: Barber[], id: string) {
  return barbers.find((barber) => barber.id === id) ?? barbers[0];
}

function statusClass(status: AppointmentStatus) {
  if (status === "Confirmado") return "status confirmed";
  if (status === "Concluido") return "status done";
  return "status canceled";
}

export function AdminDashboard() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState(businessConfig.adminEmail);
  const [password, setPassword] = useState(businessConfig.adminPassword);
  const [loginError, setLoginError] = useState("");
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>(initialServices);
  const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [businessHours, setBusinessHours] =
    useState<BusinessHour[]>(initialBusinessHours);
  const [blockedTimes, setBlockedTimes] =
    useState<BlockedTime[]>(initialBlockedTimes);
  const { appointments, resetDemoData, reschedule, updateStatus } =
    useAppointments();

  const filteredCustomers = useMemo(() => {
    const term = query.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.phone.toLowerCase().includes(term),
    );
  }, [query]);

  const dashboard = useMemo(() => {
    const active = appointments.filter((item) => item.status !== "Cancelado");
    const today = active.filter((item) => item.date === "2026-10-15");
    const revenue = active.reduce((sum, item) => sum + item.value, 0);
    return {
      today: today.length,
      week: active.length,
      customers: customers.length + active.length,
      revenue,
      next: today[0],
    };
  }, [appointments]);

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === businessConfig.adminEmail && password === businessConfig.adminPassword) {
      setLogged(true);
      setLoginError("");
      return;
    }
    setLoginError("E-mail ou senha invalidos para a demonstracao.");
  }

  function addBarber() {
    setBarbers((current) => [
      ...current,
      {
        id: `barber-${current.length + 1}`,
        name: `Novo barbeiro ${current.length + 1}`,
        specialty: "Especialista em atendimento premium",
        description: "Perfil demonstrativo criado pelo painel administrativo.",
        image:
          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80",
        active: true,
        workHours: "Segunda a sabado, 09:00 as 18:00",
      },
    ]);
  }

  function editBarber(id: string) {
    const nextName = window.prompt("Nome do barbeiro");
    if (!nextName) return;
    setBarbers((current) =>
      current.map((barber) =>
        barber.id === id ? { ...barber, name: nextName } : barber,
      ),
    );
  }

  function addService() {
    setServices((current) => [
      ...current,
      {
        id: `service-${current.length + 1}`,
        name: "Novo servico",
        description: "Servico demonstrativo criado pelo painel.",
        price: 50,
        duration: "45 minutos",
        active: true,
      },
    ]);
  }

  function editService(id: string) {
    const nextPrice = window.prompt("Novo preco do servico");
    const parsed = Number(nextPrice);
    if (!nextPrice || Number.isNaN(parsed)) return;
    setServices((current) =>
      current.map((service) =>
        service.id === id ? { ...service, price: parsed } : service,
      ),
    );
  }

  function addBlock() {
    const barber = barbers[0];
    setBlockedTimes((current) => [
      ...current,
      {
        id: `block-${Date.now()}`,
        barberId: barber.id,
        date: "2026-10-20",
        start: "13:00",
        end: "15:00",
        reason: "Bloqueio criado no painel",
      },
    ]);
  }

  if (!logged) {
    return (
      <main className="admin-login-screen">
        <form className="login-card" onSubmit={login}>
          <div className="brand-mark admin-brand">
            <span>BP</span>
            <strong>{businessConfig.name}</strong>
          </div>
          <h1>Painel administrativo</h1>
          <p>
            Login demonstrativo para apresentacao. Em producao, use autenticacao
            real e permissoes por perfil.
          </p>
          <label>
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {loginError && <span className="form-error">{loginError}</span>}
          <button className="primary-button" type="submit">
            Entrar no painel
          </button>
          <small>
            Acesso demo: {businessConfig.adminEmail} / {businessConfig.adminPassword}
          </small>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <Tabs defaultValue="dashboard" orientation="vertical" className="admin-tabs">
        <aside className="admin-sidebar">
          <div className="brand-mark admin-brand">
            <span>BP</span>
            <strong>{businessConfig.name}</strong>
          </div>
          <TabsList variant="line" className="admin-menu">
            {tabItems.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <button className="logout-button" type="button" onClick={() => setLogged(false)}>
            <LogOut aria-hidden="true" />
            Sair
          </button>
        </aside>

        <section className="admin-content">
          <TabsContent value="dashboard">
            <AdminHeader title="Dashboard" text="Resumo comercial da operacao." />
            <div className="metric-grid">
              <Metric icon={<CalendarClock />} label="Agendamentos de hoje" value={dashboard.today.toString()} />
              <Metric icon={<Clock />} label="Agendamentos da semana" value={dashboard.week.toString()} />
              <Metric icon={<UsersRound />} label="Clientes cadastrados" value={dashboard.customers.toString()} />
              <Metric icon={<DollarSign />} label="Faturamento estimado" value={money(dashboard.revenue)} />
            </div>
            <div className="admin-grid two">
              <div className="admin-panel">
                <h3>Proximo atendimento</h3>
                {dashboard.next ? (
                  <AppointmentLine
                    appointment={dashboard.next}
                    barbers={barbers}
                    services={services}
                  />
                ) : (
                  <p>Nenhum atendimento para o dia demonstrativo.</p>
                )}
              </div>
              <div className="admin-panel chart-panel">
                <h3>Agenda por periodo</h3>
                <div style={{ "--bar": "72%" } as React.CSSProperties}>Hoje<span /></div>
                <div style={{ "--bar": "88%" } as React.CSSProperties}>Semana<span /></div>
                <div style={{ "--bar": "64%" } as React.CSSProperties}>Retorno<span /></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <AdminHeader title="Agendamentos" text="Tabela de horarios, clientes, valores e status." />
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Horario</th>
                    <th>Cliente</th>
                    <th>Telefone</th>
                    <th>Servico</th>
                    <th>Profissional</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 20).map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.date} {appointment.time}</td>
                      <td>{appointment.customerName}</td>
                      <td>{appointment.customerPhone}</td>
                      <td>{findService(services, appointment.serviceId).name}</td>
                      <td>{findBarber(barbers, appointment.barberId).name}</td>
                      <td>{money(appointment.value)}</td>
                      <td><span className={statusClass(appointment.status)}>{appointment.status}</span></td>
                      <td className="action-cell">
                        <button title="Visualizar" type="button" onClick={() => window.alert(appointment.protocol)}><Search /></button>
                        <button title="Editar" type="button" onClick={() => window.alert("Edicao demonstrativa aberta.")}><Pencil /></button>
                        <button title="Reagendar" type="button" onClick={() => reschedule(appointment.id, "17:30")}><RotateCcw /></button>
                        <button title="Cancelar" type="button" onClick={() => updateStatus(appointment.id, "Cancelado")}><X /></button>
                        <button title="Concluir" type="button" onClick={() => updateStatus(appointment.id, "Concluido")}><Check /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="daily">
            <AdminHeader title="Visao diaria" text="Linha do tempo do dia 15/10/2026." />
            <div className="timeline">
              {timeSlots.map((slot) => {
                const appointment = appointments.find(
                  (item) => item.date === "2026-10-15" && item.time === slot && item.status !== "Cancelado",
                );
                return (
                  <div className={appointment ? "timeline-row busy" : "timeline-row"} key={slot}>
                    <strong>{slot}</strong>
                    {appointment ? (
                      <span>
                        {appointment.customerName} · {findService(services, appointment.serviceId).name} · {findBarber(barbers, appointment.barberId).name}
                      </span>
                    ) : (
                      <span>Horario disponivel</span>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <AdminHeader title="Clientes" text="Historico, contatos e frequencia." />
            <label className="search-field">
              <Search aria-hidden="true" />
              <input
                placeholder="Pesquisar cliente..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="customer-grid">
              {filteredCustomers.map((customer) => (
                <article className="customer-card" key={customer.id}>
                  <UserRound aria-hidden="true" />
                  <h3>{customer.name}</h3>
                  <p>{customer.phone}</p>
                  <span>Ultimo atendimento: {customer.lastVisit}</span>
                  <strong>{customer.visits} atendimentos</strong>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="barbers">
            <AdminHeader title="Barbeiros" text="Gerencie profissionais, status e horarios." action={<button className="primary-button compact" type="button" onClick={addBarber}><Plus />Adicionar</button>} />
            <div className="admin-list">
              {barbers.map((barber) => (
                <article key={barber.id}>
                  <img alt={barber.name} src={barber.image} />
                  <div>
                    <h3>{barber.name}</h3>
                    <p>{barber.specialty}</p>
                    <span>{barber.workHours}</span>
                  </div>
                  <button type="button" onClick={() => editBarber(barber.id)}><Pencil />Editar</button>
                  <button type="button" onClick={() => setBarbers((current) => current.map((item) => item.id === barber.id ? { ...item, active: !item.active } : item))}>{barber.active ? "Desativar" : "Ativar"}</button>
                  <button type="button" onClick={() => setBarbers((current) => current.filter((item) => item.id !== barber.id))}><Trash2 />Excluir</button>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <AdminHeader title="Servicos" text="Cadastre precos, duracao e disponibilidade." action={<button className="primary-button compact" type="button" onClick={addService}><Plus />Adicionar</button>} />
            <div className="admin-list service-admin-list">
              {services.map((service) => (
                <article key={service.id}>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <span>{service.duration} · {money(service.price)}</span>
                  </div>
                  <button type="button" onClick={() => editService(service.id)}><Pencil />Editar</button>
                  <button type="button" onClick={() => setServices((current) => current.map((item) => item.id === service.id ? { ...item, active: !item.active } : item))}>{service.active ? "Desativar" : "Ativar"}</button>
                  <button type="button" onClick={() => setServices((current) => current.filter((item) => item.id !== service.id))}><Trash2 />Excluir</button>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hours">
            <AdminHeader title="Horarios" text="Funcionamento e bloqueios de agenda." action={<button className="primary-button compact" type="button" onClick={addBlock}><Plus />Bloquear horario</button>} />
            <div className="admin-grid two">
              <div className="admin-panel">
                <h3>Funcionamento</h3>
                {businessHours.map((hour) => (
                  <div className="hours-row" key={hour.day}>
                    <strong>{hour.day}</strong>
                    {hour.closed ? (
                      <span>Fechado</span>
                    ) : (
                      <>
                        <input
                          value={hour.open}
                          onChange={(event) => setBusinessHours((current) => current.map((item) => item.day === hour.day ? { ...item, open: event.target.value } : item))}
                        />
                        <input
                          value={hour.close}
                          onChange={(event) => setBusinessHours((current) => current.map((item) => item.day === hour.day ? { ...item, close: event.target.value } : item))}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="admin-panel">
                <h3>Bloqueios</h3>
                {blockedTimes.map((block) => (
                  <div className="block-row" key={block.id}>
                    <strong>{findBarber(barbers, block.barberId).name}</strong>
                    <span>{block.date} · {block.start} ate {block.end}</span>
                    <small>{block.reason}</small>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <AdminHeader title="Configuracoes" text="Dados centrais da demonstracao." />
            <div className="admin-panel settings-panel">
              <Settings aria-hidden="true" />
              <h3>{businessConfig.name}</h3>
              <p>{businessConfig.address}</p>
              <p>{businessConfig.whatsappDisplay} · {businessConfig.email}</p>
              <button className="secondary-button" type="button" onClick={resetDemoData}>
                Restaurar agendamentos demo
              </button>
              <a className="primary-button compact" href="/">
                Ver site publico
              </a>
            </div>
          </TabsContent>
        </section>
      </Tabs>
    </main>
  );
}

function AdminHeader({
  action,
  text,
  title,
}: {
  action?: React.ReactNode;
  text: string;
  title: string;
}) {
  return (
    <header className="admin-header">
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </header>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="metric-card">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function AppointmentLine({
  appointment,
  barbers,
  services,
}: {
  appointment: Appointment;
  barbers: Barber[];
  services: Service[];
}) {
  return (
    <div className="appointment-line">
      <strong>{appointment.time}</strong>
      <span>{appointment.customerName}</span>
      <p>
        {findService(services, appointment.serviceId).name} com{" "}
        {findBarber(barbers, appointment.barberId).name}
      </p>
      <small>{money(appointment.value)} · {appointment.protocol}</small>
    </div>
  );
}
