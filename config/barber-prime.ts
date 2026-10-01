import type {
  Appointment,
  Barber,
  BlockedTime,
  BusinessHour,
  Customer,
  GalleryImage,
  Review,
  Service,
} from "@/types/barber";

export const businessConfig = {
  name: "BARBER PRIME",
  shortName: "Barber Prime",
  tagline: "Seu estilo começa aqui.",
  description:
    "Cortes precisos, barba alinhada e uma experiência premium para homens que valorizam pontualidade, conforto e acabamento impecável.",
  whatsapp: "5581999999999",
  whatsappDisplay: "(81) 99999-9999",
  phone: "(81) 3333-2026",
  instagram: "@barberprime",
  email: "contato@barberprime.com",
  address: "Rua Exemplo, 123 - Centro, Recife - PE",
  adminEmail: "admin@barberprime.com",
  adminPassword: "admin123",
};

export const stats = [
  { value: "+5", label: "anos de experiencia" },
  { value: "+2.000", label: "clientes atendidos" },
  { value: "3", label: "profissionais especializados" },
  { value: "100%", label: "atendimento com hora marcada" },
];

export const services: Service[] = [
  {
    id: "corte-tradicional",
    name: "Corte Tradicional",
    description: "Acabamento alinhado, lavagem rapida e finalizacao com produto.",
    price: 35,
    duration: "30 minutos",
    active: true,
  },
  {
    id: "corte-degrade",
    name: "Corte Degrade",
    description: "Degrade limpo com transicao suave e acabamento na navalha.",
    price: 40,
    duration: "40 minutos",
    active: true,
  },
  {
    id: "barba",
    name: "Barba",
    description: "Toalha quente, desenho com navalha e hidratacao da pele.",
    price: 25,
    duration: "25 minutos",
    active: true,
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description: "Pacote completo para sair pronto para qualquer compromisso.",
    price: 55,
    duration: "1 hora",
    active: true,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    description: "Limpeza discreta e natural para valorizar a expressao.",
    price: 15,
    duration: "15 minutos",
    active: true,
  },
  {
    id: "premium",
    name: "Pacote Premium",
    description: "Corte, barba, sobrancelha, tratamento e finalizacao especial.",
    price: 80,
    duration: "1h30",
    active: true,
  },
];

export const barbers: Barber[] = [
  {
    id: "carlos",
    name: "Carlos Mendes",
    specialty: "Especialista em degrade e cortes modernos",
    description:
      "Atento a detalhes, trabalha com linhas limpas e acabamento fotografavel.",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
    active: true,
    workHours: "Segunda a sabado, 09:00 as 18:00",
  },
  {
    id: "rafael",
    name: "Rafael Santos",
    specialty: "Especialista em cortes classicos e barba",
    description:
      "Une tecnicas tradicionais com atendimento calmo, pontual e preciso.",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80",
    active: true,
    workHours: "Terca a sabado, 09:00 as 18:00",
  },
  {
    id: "lucas",
    name: "Lucas Oliveira",
    specialty: "Especialista em visagismo masculino",
    description:
      "Indica formato, volume e estilo de acordo com rosto, rotina e perfil.",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80",
    active: true,
    workHours: "Segunda a sexta, 10:00 as 19:00",
  },
];

export const gallery: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Degrade alinhado",
    category: "Cortes",
    url: "https://images.unsplash.com/photo-1599351431404-4331fcb8ed15?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "gal-2",
    title: "Barba com toalha quente",
    category: "Barba",
    url: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "gal-3",
    title: "Ambiente premium",
    category: "Ambiente",
    url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "gal-4",
    title: "Finalizacao profissional",
    category: "Atendimento",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "gal-5",
    title: "Corte classico",
    category: "Cortes",
    url: "https://images.unsplash.com/photo-1622286346003-c4a41e164b48?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "gal-6",
    title: "Bancada organizada",
    category: "Ambiente",
    url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=80",
  },
];

export const reviews: Review[] = [
  {
    name: "Joao Silva",
    rating: 5,
    comment: "Atendimento excelente e ambiente muito organizado.",
  },
  {
    name: "Pedro Alves",
    rating: 5,
    comment: "Melhor corte que ja fiz. Pontuais e muito profissionais.",
  },
  {
    name: "Marcos Lima",
    rating: 5,
    comment: "Profissionais atenciosos, barbeiro no horario e acabamento perfeito.",
  },
  {
    name: "Felipe Rocha",
    rating: 4,
    comment: "Gostei do agendamento pelo site e da qualidade dos produtos.",
  },
  {
    name: "Andre Nascimento",
    rating: 5,
    comment: "A barbearia tem cara premium e o pacote completo vale muito.",
  },
];

export const customers: Customer[] = [
  { id: "cl-1", name: "Joao Silva", phone: "(81) 98811-1001", email: "joao@email.com", lastVisit: "15/10/2026", visits: 14 },
  { id: "cl-2", name: "Pedro Alves", phone: "(81) 98811-1002", email: "pedro@email.com", lastVisit: "15/10/2026", visits: 9 },
  { id: "cl-3", name: "Lucas Melo", phone: "(81) 98811-1003", lastVisit: "14/10/2026", visits: 6 },
  { id: "cl-4", name: "Ruan Costa", phone: "(81) 98811-1004", email: "ruan@email.com", lastVisit: "14/10/2026", visits: 11 },
  { id: "cl-5", name: "Bruno Dias", phone: "(81) 98811-1005", lastVisit: "13/10/2026", visits: 5 },
  { id: "cl-6", name: "Gustavo Lima", phone: "(81) 98811-1006", email: "gustavo@email.com", lastVisit: "13/10/2026", visits: 19 },
  { id: "cl-7", name: "Diego Ramos", phone: "(81) 98811-1007", lastVisit: "12/10/2026", visits: 4 },
  { id: "cl-8", name: "Caio Ferraz", phone: "(81) 98811-1008", email: "caio@email.com", lastVisit: "12/10/2026", visits: 8 },
  { id: "cl-9", name: "Henrique Moura", phone: "(81) 98811-1009", lastVisit: "11/10/2026", visits: 7 },
  { id: "cl-10", name: "Matheus Barros", phone: "(81) 98811-1010", email: "matheus@email.com", lastVisit: "10/10/2026", visits: 13 },
  { id: "cl-11", name: "Vitor Araujo", phone: "(81) 98811-1011", lastVisit: "10/10/2026", visits: 3 },
  { id: "cl-12", name: "Samuel Tavares", phone: "(81) 98811-1012", email: "samuel@email.com", lastVisit: "09/10/2026", visits: 10 },
  { id: "cl-13", name: "Leandro Paiva", phone: "(81) 98811-1013", lastVisit: "09/10/2026", visits: 2 },
  { id: "cl-14", name: "Otavio Nunes", phone: "(81) 98811-1014", email: "otavio@email.com", lastVisit: "08/10/2026", visits: 12 },
  { id: "cl-15", name: "Thiago Freire", phone: "(81) 98811-1015", lastVisit: "08/10/2026", visits: 6 },
];

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export const businessHours: BusinessHour[] = [
  { day: "Segunda", open: "09:00", close: "18:00" },
  { day: "Terca", open: "09:00", close: "18:00" },
  { day: "Quarta", open: "09:00", close: "18:00" },
  { day: "Quinta", open: "09:00", close: "18:00" },
  { day: "Sexta", open: "09:00", close: "18:00" },
  { day: "Sabado", open: "09:00", close: "16:00" },
  { day: "Domingo", open: "", close: "", closed: true },
];

export const blockedTimes: BlockedTime[] = [
  {
    id: "bt-1",
    barberId: "carlos",
    date: "2026-10-15",
    start: "13:00",
    end: "15:00",
    reason: "Compromisso pessoal",
  },
  {
    id: "bt-2",
    barberId: "rafael",
    date: "2026-10-16",
    start: "10:00",
    end: "11:30",
    reason: "Treinamento interno",
  },
];

export const defaultAppointments: Appointment[] = [
  { id: "ag-1", protocol: "BP-26001", customerName: "Joao Silva", customerPhone: "(81) 98811-1001", serviceId: "corte-barba", barberId: "carlos", date: "2026-10-15", time: "09:00", value: 55, status: "Confirmado" },
  { id: "ag-2", protocol: "BP-26002", customerName: "Pedro Alves", customerPhone: "(81) 98811-1002", serviceId: "corte-degrade", barberId: "rafael", date: "2026-10-15", time: "10:00", value: 40, status: "Confirmado" },
  { id: "ag-3", protocol: "BP-26003", customerName: "Lucas Melo", customerPhone: "(81) 98811-1003", serviceId: "barba", barberId: "carlos", date: "2026-10-15", time: "11:30", value: 25, status: "Confirmado" },
  { id: "ag-4", protocol: "BP-26004", customerName: "Ruan Costa", customerPhone: "(81) 98811-1004", serviceId: "premium", barberId: "lucas", date: "2026-10-15", time: "14:00", value: 80, status: "Confirmado" },
  { id: "ag-5", protocol: "BP-26005", customerName: "Bruno Dias", customerPhone: "(81) 98811-1005", serviceId: "corte-tradicional", barberId: "rafael", date: "2026-10-15", time: "15:30", value: 35, status: "Concluido" },
  { id: "ag-6", protocol: "BP-26006", customerName: "Gustavo Lima", customerPhone: "(81) 98811-1006", serviceId: "corte-barba", barberId: "carlos", date: "2026-10-16", time: "09:30", value: 55, status: "Confirmado" },
  { id: "ag-7", protocol: "BP-26007", customerName: "Diego Ramos", customerPhone: "(81) 98811-1007", serviceId: "sobrancelha", barberId: "lucas", date: "2026-10-16", time: "10:30", value: 15, status: "Confirmado" },
  { id: "ag-8", protocol: "BP-26008", customerName: "Caio Ferraz", customerPhone: "(81) 98811-1008", serviceId: "barba", barberId: "rafael", date: "2026-10-16", time: "13:30", value: 25, status: "Confirmado" },
  { id: "ag-9", protocol: "BP-26009", customerName: "Henrique Moura", customerPhone: "(81) 98811-1009", serviceId: "corte-degrade", barberId: "carlos", date: "2026-10-16", time: "14:30", value: 40, status: "Cancelado" },
  { id: "ag-10", protocol: "BP-26010", customerName: "Matheus Barros", customerPhone: "(81) 98811-1010", serviceId: "premium", barberId: "lucas", date: "2026-10-17", time: "09:00", value: 80, status: "Confirmado" },
  { id: "ag-11", protocol: "BP-26011", customerName: "Vitor Araujo", customerPhone: "(81) 98811-1011", serviceId: "corte-tradicional", barberId: "rafael", date: "2026-10-17", time: "10:00", value: 35, status: "Confirmado" },
  { id: "ag-12", protocol: "BP-26012", customerName: "Samuel Tavares", customerPhone: "(81) 98811-1012", serviceId: "corte-barba", barberId: "carlos", date: "2026-10-17", time: "11:00", value: 55, status: "Concluido" },
  { id: "ag-13", protocol: "BP-26013", customerName: "Leandro Paiva", customerPhone: "(81) 98811-1013", serviceId: "barba", barberId: "rafael", date: "2026-10-17", time: "13:00", value: 25, status: "Confirmado" },
  { id: "ag-14", protocol: "BP-26014", customerName: "Otavio Nunes", customerPhone: "(81) 98811-1014", serviceId: "corte-degrade", barberId: "lucas", date: "2026-10-17", time: "14:00", value: 40, status: "Confirmado" },
  { id: "ag-15", protocol: "BP-26015", customerName: "Thiago Freire", customerPhone: "(81) 98811-1015", serviceId: "premium", barberId: "carlos", date: "2026-10-18", time: "09:30", value: 80, status: "Confirmado" },
  { id: "ag-16", protocol: "BP-26016", customerName: "Joao Silva", customerPhone: "(81) 98811-1001", serviceId: "barba", barberId: "rafael", date: "2026-10-18", time: "10:30", value: 25, status: "Confirmado" },
  { id: "ag-17", protocol: "BP-26017", customerName: "Pedro Alves", customerPhone: "(81) 98811-1002", serviceId: "corte-tradicional", barberId: "lucas", date: "2026-10-18", time: "11:30", value: 35, status: "Confirmado" },
  { id: "ag-18", protocol: "BP-26018", customerName: "Lucas Melo", customerPhone: "(81) 98811-1003", serviceId: "corte-barba", barberId: "carlos", date: "2026-10-18", time: "15:00", value: 55, status: "Confirmado" },
  { id: "ag-19", protocol: "BP-26019", customerName: "Ruan Costa", customerPhone: "(81) 98811-1004", serviceId: "sobrancelha", barberId: "rafael", date: "2026-10-19", time: "16:00", value: 15, status: "Confirmado" },
  { id: "ag-20", protocol: "BP-26020", customerName: "Bruno Dias", customerPhone: "(81) 98811-1005", serviceId: "corte-degrade", barberId: "lucas", date: "2026-10-19", time: "17:00", value: 40, status: "Confirmado" },
];
