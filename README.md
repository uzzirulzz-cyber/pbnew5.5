# PlayBeat Digital — Enterprise Digital Marketplace

A production-ready, scalable full-stack digital marketplace built with **Next.js 15**, **Express**, **PostgreSQL (Neon)**, and **Prisma**.

## Features

- **Luxury Storefront** — Glassmorphism UI, particle animations, real-time search
- **Enterprise Admin** — Analytics dashboard, order management, customer insights
- **Multi-Payment** — Stripe, PayPal, Crypto (Coinbase, Binance Pay, USDT)
- **Digital Products** — Instant delivery, license keys, subscriptions, IPTV
- **Wallet System** — Deposits, withdrawals, transfers, cashback
- **AI Recommendations** — Smart product suggestions
- **Referral Program** — Multi-level commissions
- **24/7 Support** — Ticket system with live chat

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, TailwindCSS, Framer Motion |
| Backend | Express, TypeScript, Prisma, Socket.IO |
| Database | PostgreSQL (Neon) |
| Cache | Redis |
| Auth | JWT, OAuth (Google, GitHub, Facebook), 2FA |
| Payments | Stripe, PayPal, Coinbase Commerce, Binance Pay |

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL (or use Neon free tier)
- Redis (or use Upstash free tier)

### 1. Clone & Install
```bash
git clone https://github.com/uzzirulzz-cyber/new1111.git
cd new1111

# Install frontend
cd frontend && npm install

# Install backend
cd ../backend && npm install
```

### 2. Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your Neon connection string

# Frontend
cp frontend/.env.local.example frontend/.env.local
```

### 3. Database Setup
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Development
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### 5. Default Login
- **Email:** `superadmin@playbeat.digital`
- **Password:** `admin123`

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variables from `.env.local`

### Backend (Railway/Render)
1. Push to GitHub
2. Connect to [Railway](https://railway.app) or [Render](https://render.com)
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables from `.env`

### Database (Neon)
Already configured with your connection string. Prisma migrations will auto-deploy.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/auth/register` | User registration |
| `POST /api/v1/auth/login` | User login |
| `GET /api/v1/auth/me` | Current user |
| `GET /api/v1/products` | List products |
| `GET /api/v1/products/:slug` | Single product |
| `POST /api/v1/orders` | Create order |
| `GET /api/v1/orders/my-orders` | User orders |
| `GET /api/v1/cart` | View cart |
| `POST /api/v1/cart` | Add to cart |
| `GET /api/v1/categories` | List categories |
| `GET /api/v1/admin/dashboard` | Admin stats |

## Folder Structure

```
playbeat-digital/
├── frontend/          # Next.js 15 app
│   ├── app/           # Routes & layouts
│   ├── components/    # UI components
│   ├── lib/           # Utilities
│   └── types/         # TypeScript types
├── backend/           # Express API
│   ├── src/
│   │   ├── config/    # Database, Redis, Prisma
│   │   ├── middleware/# Auth, error handling
│   │   ├── routes/    # API routes
│   │   └── scripts/   # Seed data
│   └── prisma/        # Schema & migrations
└── docker-compose.yml # Local Docker setup
```

## License

MIT License — Built for enterprise digital commerce.
