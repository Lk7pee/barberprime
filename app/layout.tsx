import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barber Prime | Sistema completo para barbearia",
  description:
    "Site premium com agendamento online e painel administrativo demonstrativo para barbearias.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
