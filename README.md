# Barber Prime

Site e sistema demonstrativo para uma barbearia premium ficticia. O projeto inclui apresentacao comercial, agendamento online, persistencia local dos horarios e painel administrativo de demonstracao.

## Como iniciar

```bash
npm install
npm run dev
```

Depois acesse:

- Site publico: `http://localhost:3000`
- Painel administrativo: `http://localhost:3000/admin`

## Publicacao no GitHub Pages

O projeto esta configurado para publicar automaticamente no GitHub Pages pelo
workflow `.github/workflows/pages.yml`.

Para publicar:

```bash
git add .
git commit -m "Configura deploy no GitHub Pages"
git push origin main
```

Depois, no GitHub, confirme em **Settings > Pages** que a origem esta como
**GitHub Actions**. Apos o workflow terminar, o site ficara disponivel em:

`https://lk7pee.github.io/barberprime/`

Para testar localmente a exportacao estatica usada no Pages:

```bash
npm run build:pages
```

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Componentes locais organizados
- `localStorage` para persistir agendamentos no navegador
- Dados simulados para apresentacao comercial

## Login administrativo

O login e apenas demonstrativo:

- E-mail: `admin@barberprime.com`
- Senha: `admin123`

Em producao, substitua por autenticacao real no backend, com sessoes seguras e permissoes por perfil.

## Onde alterar dados da barbearia

As informacoes principais ficam em:

```text
config/barber-prime.ts
```

Nesse arquivo e possivel alterar:

- nome da barbearia
- telefone, WhatsApp, e-mail, Instagram e endereco
- servicos, precos e duracoes
- profissionais
- galeria
- avaliacoes
- clientes ficticios
- agendamentos iniciais
- horarios de funcionamento
- bloqueios de horario

## Como funciona o agendamento

O cliente passa por seis etapas:

1. Escolhe o servico.
2. Escolhe o barbeiro.
3. Escolhe a data.
4. Escolhe um horario disponivel.
5. Informa nome, telefone e e-mail opcional.
6. Confere o resumo e confirma.

Ao confirmar, o sistema verifica se o mesmo barbeiro, data e horario continuam livres. Se o horario ja estiver ocupado ou bloqueado, o cliente recebe a mensagem para escolher outro horario.

Os agendamentos confirmados ficam salvos no `localStorage` do navegador.

## Painel administrativo

O painel em `/admin` possui:

- dashboard com indicadores
- tabela de agendamentos
- visao diaria por horario
- busca de clientes
- gestao demonstrativa de barbeiros
- gestao demonstrativa de servicos
- horarios de funcionamento
- bloqueios de agenda
- configuracoes da barbearia

As acoes alteram o estado da demonstracao no navegador. Para uma versao real, conecte essas telas a uma API protegida.

## Como conectar futuramente ao Supabase

Crie um projeto Supabase e substitua o `localStorage` por chamadas seguras a uma API server-side. Uma estrutura inicial sugerida:

```sql
create table profiles (
  id uuid primary key,
  name text not null,
  role text not null default 'customer'
);

create table barbers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  specialty text,
  description text,
  active boolean not null default true
);

create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  duration_minutes integer not null,
  active boolean not null default true
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  barber_id uuid references barbers(id),
  service_id uuid references services(id),
  appointment_date date not null,
  appointment_time time not null,
  status text not null default 'Confirmado',
  protocol text not null unique,
  unique (barber_id, appointment_date, appointment_time)
);

create table blocked_times (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid references barbers(id),
  block_date date not null,
  start_time time not null,
  end_time time not null,
  reason text
);

create table business_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null,
  open_time time,
  close_time time,
  closed boolean not null default false
);
```

Nunca exponha `service_role_key` no front-end. Use variaveis de ambiente privadas e rotas server-side para operacoes administrativas.

## Estrutura principal

```text
app/
  page.tsx
  admin/page.tsx
  globals.css
components/
  site/
  admin/
config/
  barber-prime.ts
hooks/
  use-appointments.ts
types/
  barber.ts
```

## Revisao antes de apresentar

Verifique o site publico, o fluxo completo de agendamento, a rota `/admin`, os botoes de acao, a responsividade em celular e desktop e o comportamento de conflito quando um horario ja esta ocupado.
# barberprime
