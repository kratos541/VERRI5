# ✓ Verifill — Pakistan Compliance AI 🇵🇰

> Every law that applies to your business. Step-by-step guidance. Pre-filled government letters. In Urdu and English.

**Live app:** [verri-5.vercel.app](https://verri-5.vercel.app)

---

## What is Verifill?

Pakistani businesses get sealed every day for missing deadlines they did not know existed. FBR sealed 3,000+ businesses in Q1 2025 alone. PFA sealed 400 restaurants in Lahore in one week.

Verifill tells business owners exactly which government laws apply to their specific business — based on their type, province, revenue, and number of employees. Then it shows them what to do, step by step, with pre-filled government letters ready to copy.

---

## Features

- 🔍 **Smart law matching** — 12 Pakistan laws filtered by business type, province, revenue, and employees
- 📰 **Real-time compliance news** — FBR raids, PFA sealing, minimum wage updates with AI impact predictions
- 📅 **Compliance calendar** — all deadlines in one place with Google Calendar export
- 🧮 **Fine calculator** — see exactly how much you owe if overdue
- 📸 **Document scanner** — upload licence photo, Claude AI extracts expiry date
- 🤝 **Find CA / Lawyer** — verified professionals near you
- 📦 **Compliance kit** — all pre-filled letters in one download
- 🌐 **Urdu + English** — full bilingual support with RTL layout
- 🔐 **Google login** — profile saved permanently, works across devices
- ⚡ **Real-time law updates** — laws managed from admin panel, no code changes needed

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Google OAuth |
| AI | Claude API (Anthropic) |
| Deployment | Vercel |
| Styling | Inline React styles (no CSS framework) |

---

## Pakistan Laws Covered

| Law | Category | Who It Applies To |
|-----|----------|-------------------|
| NTN Registration | Tax | Every business |
| Annual Income Tax Return | Tax | Every business |
| Sales Tax (STRN) | Tax | Turnover > PKR 10M |
| EOBI Registration | Labour | 5+ employees |
| Punjab Minimum Wage PKR 37,000 | Labour | Punjab employers |
| Punjab Shop Closing Times | Operations | Punjab shops |
| Sindh/Karachi Closing Times | Operations | Sindh shops |
| Trade Licence | Licensing | Every business |
| Punjab Food Authority (PFA) | Food Safety | Food businesses |
| SECP Annual Filing | Licensing | Pvt Ltd / SMC |
| PESSI Social Security | Labour | Punjab 5+ employees |
| Drug Sale Licence (DRAP) | Medical | Pharmacies |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (free)
- Vercel account (free)
- Anthropic API key (for document scanner)

### Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
ANTHROPIC_KEY=sk-ant-...
ADMIN_PASSWORD=your-admin-password
```

### Local Development

```bash
git clone https://github.com/kratos541/VERRI5
cd VERRI5
npm install
npm run dev
```

### Database Setup

Run the SQL in `verifill_laws_seed.sql` in your Supabase SQL Editor to create tables and seed all 12 laws.

---

## Admin Panel

Manage laws without touching code at `/admin.html`

- Update deadlines, penalties, summaries in 30 seconds
- Add new laws — they appear in the app instantly
- Toggle laws on/off without deleting them
- Full bilingual support (English + Urdu)

---

## Disclaimer

Verifill provides compliance information for educational purposes. Always verify with a qualified accountant or lawyer. Laws change — Verifill shows best available information but cannot guarantee accuracy for every situation.

---

## Built by

[@kratos541](https://github.com/kratos541) — Built in 5 days with Claude AI

---

*5.2 million registered businesses in Pakistan. No one was helping them stay compliant. Now someone is.*
