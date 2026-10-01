export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  active: boolean;
};

export type Barber = {
  id: string;
  name: string;
  specialty: string;
  description: string;
  image: string;
  active: boolean;
  workHours: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  lastVisit: string;
  visits: number;
};

export type AppointmentStatus = "Confirmado" | "Concluido" | "Cancelado";

export type Appointment = {
  id: string;
  protocol: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  value: number;
  status: AppointmentStatus;
};

export type Review = {
  name: string;
  rating: number;
  comment: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  category: string;
  url: string;
};

export type BlockedTime = {
  id: string;
  barberId: string;
  date: string;
  start: string;
  end: string;
  reason: string;
};

export type BusinessHour = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};
