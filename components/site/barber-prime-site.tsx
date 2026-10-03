"use client";

import { useCallback, useState } from "react";
import {
  Camera,
  CalendarCheck,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  businessConfig,
  barbers,
  gallery,
  reviews,
  services,
  stats,
} from "@/config/barber-prime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AppointmentPreset,
  AppointmentWizard,
} from "@/components/site/appointment-wizard";
import { sitePath } from "@/lib/site-path";
import type { GalleryImage } from "@/types/barber";

const navItems = [
  ["Inicio", "#inicio"],
  ["Sobre", "#sobre"],
  ["Servicos", "#servicos"],
  ["Equipe", "#equipe"],
  ["Galeria", "#galeria"],
  ["Avaliacoes", "#avaliacoes"],
  ["Agendamento", "#agendamento"],
  ["Contato", "#contato"],
];

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function scrollToBooking() {
  document.querySelector("#agendamento")?.scrollIntoView({ behavior: "smooth" });
}

export function BarberPrimeSite() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [preset, setPreset] = useState<AppointmentPreset>({});

  const setServicePreset = useCallback((serviceId: string) => {
    setPreset({ serviceId });
    scrollToBooking();
  }, []);

  const setBarberPreset = useCallback((barberId: string) => {
    setPreset({ barberId });
    scrollToBooking();
  }, []);

  const clearPreset = useCallback(() => setPreset({}), []);

  const whatsappUrl = `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(
    "Ola! Vim pelo site da Barber Prime e gostaria de mais informacoes.",
  )}`;

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand-mark" href="#inicio" aria-label="Ir para o inicio">
          <span>BP</span>
          <strong>{businessConfig.name}</strong>
        </a>

        <nav className="desktop-nav" aria-label="Navegacao principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <a className="admin-link" href={sitePath("/admin")}>
            Painel admin
          </a>
          <a className="primary-button compact" href="#agendamento">
            <CalendarCheck aria-hidden="true" />
            Agendar
          </a>
          <Sheet>
            <SheetTrigger className="mobile-menu-button" aria-label="Abrir menu">
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="mobile-menu" side="right">
              <SheetHeader>
                <SheetTitle>{businessConfig.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Menu mobile">
                {navItems.map(([label, href]) => (
                  <SheetClose asChild key={href}>
                    <a href={href}>{label}</a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a href={sitePath("/admin")}>Painel admin</a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <div className="section-kicker">
            <Sparkles aria-hidden="true" />
            Barbearia premium contemporanea
          </div>
          <h1>{businessConfig.name}</h1>
          <p className="hero-tagline">{businessConfig.tagline}</p>
          <p>{businessConfig.description}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#agendamento">
              <CalendarCheck aria-hidden="true" />
              Agendar horario
            </a>
            <a className="secondary-button hero-secondary" href="#servicos">
              Conhecer servicos
            </a>
          </div>
        </div>
        <div className="hero-media" aria-label="Ambiente de barbearia premium">
          <img
            alt="Barbeiro finalizando um corte em ambiente premium"
            src="https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?auto=format&fit=crop&w=1300&q=80"
          />
          <div className="hero-badge">
            <ShieldCheck aria-hidden="true" />
            <span>Atendimento pontual com experiencia de alto padrao</span>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Indicadores da barbearia">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="split-section" id="sobre">
        <div>
          <div className="section-kicker">Sobre nos</div>
          <h2>Uma barbearia desenhada para quem leva imagem a serio.</h2>
          <p>
            A {businessConfig.shortName} combina atendimento personalizado,
            ambiente confortavel, produtos de qualidade e profissionais
            especializados para entregar uma experiencia diferenciada do check-in
            ao acabamento.
          </p>
          <p>
            Cada horario e reservado com antecedencia para evitar espera,
            manter o ritmo da equipe e garantir que cada cliente receba a
            atencao certa.
          </p>
        </div>
        <img
          alt="Cadeira e bancada organizadas em barbearia sofisticada"
          className="about-image"
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80"
        />
      </section>

      <section className="section-block" id="servicos">
        <div className="section-heading">
          <div>
            <div className="section-kicker">Servicos</div>
            <h2>Menu claro para vender mais horarios.</h2>
          </div>
          <p>
            Servicos com descricao, duracao e preco para reduzir duvidas antes
            do agendamento.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-meta">
                <span>{service.duration}</span>
                <strong>{money(service.price)}</strong>
              </div>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setServicePreset(service.id)}
              >
                Agendar
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="equipe">
        <div className="section-heading">
          <div>
            <div className="section-kicker">Equipe</div>
            <h2>Profissionais ficticios com agenda individual.</h2>
          </div>
          <p>
            Cada barbeiro pode ter especialidade, descricao, foto e horarios de
            trabalho alterados no painel.
          </p>
        </div>
        <div className="barber-grid">
          {barbers.map((barber) => (
            <article className="barber-card" key={barber.id}>
              <img alt={barber.name} src={barber.image} />
              <div>
                <h3>{barber.name}</h3>
                <span>{barber.specialty}</span>
                <p>{barber.description}</p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setBarberPreset(barber.id)}
                >
                  Agendar com este profissional
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="galeria">
        <div className="section-heading">
          <div>
            <div className="section-kicker">Galeria</div>
            <h2>Cortes, barba, ambiente e atendimento.</h2>
          </div>
          <p>Clique em uma imagem para visualizar em destaque.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image) => (
            <button
              className="gallery-card"
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image)}
            >
              <img alt={image.title} src={image.url} />
              <span>{image.category}</span>
              <strong>{image.title}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block reviews-section" id="avaliacoes">
        <div className="section-heading">
          <div>
            <div className="section-kicker">Avaliacoes</div>
            <h2>Prova social para uma apresentacao comercial forte.</h2>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars" aria-label={`${review.rating} estrelas`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} aria-hidden="true" />
                ))}
              </div>
              <p>&quot;{review.comment}&quot;</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-section" id="agendamento">
        <AppointmentWizard preset={preset} onPresetConsumed={clearPreset} />
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-card">
          <div className="section-kicker">Contato</div>
          <h2>Fale com a {businessConfig.shortName}</h2>
          <div className="contact-list">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              WhatsApp {businessConfig.whatsappDisplay}
            </a>
            <a href={`tel:${businessConfig.phone.replace(/\D/g, "")}`}>
              <Phone aria-hidden="true" />
              {businessConfig.phone}
            </a>
            <a href={`mailto:${businessConfig.email}`}>
              <Mail aria-hidden="true" />
              {businessConfig.email}
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Camera aria-hidden="true" />
              {businessConfig.instagram}
            </a>
          </div>
        </div>
        <div className="map-card" id="localizacao">
          <MapPin aria-hidden="true" />
          <strong>{businessConfig.shortName}</strong>
          <span>{businessConfig.address}</span>
          <small>Mapa demonstrativo para apresentacao do sistema</small>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>{businessConfig.name}</strong>
          <p>© 2026 Barber Prime. Todos os direitos reservados.</p>
          <span>Desenvolvido por Gualberto Technologies</span>
        </div>
        <nav aria-label="Links do rodape">
          <a href="#servicos">Servicos</a>
          <a href="#agendamento">Agendamento</a>
          <a href="#contato">Contato</a>
          <a href={sitePath("/admin")}>Painel administrativo</a>
        </nav>
      </footer>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer">
        <MessageCircle aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      <Dialog open={Boolean(selectedImage)} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="gallery-dialog">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>{selectedImage?.category}</DialogDescription>
          </DialogHeader>
          {selectedImage && <img alt={selectedImage.title} src={selectedImage.url} />}
        </DialogContent>
      </Dialog>
    </main>
  );
}
