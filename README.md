<div align="center">

# TICKERGUARD AI

**Advanced Stock Market Identity Confusion & Brand Mismatch Detection Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16.2+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.x-black?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![Recharts](https://img.shields.io/badge/Recharts-3.8+-black?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-MIT-6f7890?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Identify brand name mismatches and ticker misidentification before trading.*

</div>

---

## Overview

TickerGuard AI is a full-stack, AI-powered financial intelligence platform designed to detect and investigate corporate identity confusion and ticker-symbol mismatches in real-time. In high-frequency, retail-driven stock markets, viral news about an unlisted private brand (e.g., Parle Products, Signal Messenger, or Zoom Video Communications) often triggers automated algorithms and confused retail traders to purchase shares of a similarly named, but completely unrelated, publicly traded company (e.g., Parle Industries, Signal Advance, or Zoom Technologies).

TickerGuard AI monitors social mentions, news volume, and stock price spikes to compute a composite Confusion Score. When high-risk confusion is detected, it runs automated forensic investigations powered by GPT-4o-mini, compiling detailed reports and research blog posts to advise and warn investors.

---

## Motivation

Identity mismatches on stock brokers can cause massive artificial market pumps, extreme price volatility, and heavy retail trading losses. Famous examples include:
- Elon Musk tweeting "Use Signal" leading to an 11,000% pump in Signal Advance Inc. (SIGL) stock instead of the private Signal Messenger app.
- Zoom Video Communications (ZM) viral remote work adoption causing massive buying in Zoom Technologies (ZOOM), an inactive OTC shell.
- Confectionery group Parle Products (Parle-G biscuits, Melody candies) viral social media trends triggering upper-circuit surges in Parle Industries (PARLEIND), a real estate and paper infrastructure company.

TickerGuard AI was built to close this gap by providing institutional-grade risk identification, automated investigations, and real-time alerts.

---

## Features

| Feature | Description |
| :--- | :--- |
| **Confusion Detector** | Compares brand names and ticker symbols using string similarity and market metrics. |
| **Forensic Investigations** | Generates detailed investigation reports including root causes, timelines, FAQ sections, and tables using OpenAI GPT-4o-mini. |
| **Dynamic Fallback Simulator** | Includes a local simulator that provides robust fallback mock-data reports if the OpenAI API is unavailable. |
| **AI Chat Assistant** | A multi-turn chat interface with memory for querying market anomalies and brand separations. |
| **Market Alerts Feed** | Real-time warnings categorized by severity (Critical, High, Medium, Low) for suspicious volume and price divergence. |
| **Research & Blog Platform** | Automatically converts forensic investigations into structured markdown articles with reading times and risk ratings. |
| **Companies Directory** | Searchable database of listed and unlisted entities with historical risk scores and description profiles. |
| **System Telemetry Dashboard** | Interactive dashboard presenting risk charts, active alerts, and database statistics. |
| **JSON Database Engine** | Self-contained file-based storage supporting CRUD actions, chat logs, and seed metrics. |
| **Dark & Light Mode** | Fully responsive dashboard layout with custom dark/light theme switching. |

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                          USER                           │
│       Brand Name A (Unlisted) vs. Listed Ticker B        │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               CONFUSION DETECTOR ENGINE                 │
│                 scoring.ts: scoring                     │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│   NAME SIMILARITY     │         │   MARKET METRICS      │
│  Levenshtein Distance │         │   Price Spike + News  │
│  & Token Matching     │         │   & Social Mentions   │
└───────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            └────────────────┬────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               SCORING REPORT COMPILER                   │
│     Computes Score (0-100) & Determines Severity Level │
│         (Safe / Monitor / High / Critical)              │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  OPENAI COGNITIVE LAYER                 │
│         GPT-4o-mini generates investigations            │
│         (Fallback to dynamic simulator if offline)      │
└────────────────────────────┬────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│     FORENSIC REPORT       │ │     AUTOMATED BLOGS       │
│ Root cause, timeline, FAQ │ │ Styled article generator  │
│ comparison table, warning │ │ with risk metrics         │
└─────────────┬─────────────┘ └─────────────┬─────────────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                LOCAL JSON DATABASE LAYER                │
│         db.json persistence via JSONDatabase           │
└─────────────────────────────────────────────────────────┘
```

---

## Confusion Severity System

The platform's scoring engine calculated in [src/lib/scoring.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/lib/scoring.ts) combines multiple inputs:
- **Name Similarity (30%)**: String overlap matching [calculateNameSimilarity](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/lib/scoring.ts#L79) and token-match ratio.
- **News Mention Frequency (20%)**: Keyword occurrence spikes in financial press.
- **Social Media Mentions (20%)**: Sentiment growth rates on Reddit and X.
- **Stock Price Spike (30%)**: Unexplained ticker deviation/volume surges.

The composite score is compiled using [calculateConfusionScore](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/lib/scoring.ts#L18):

| Score Range | Severity Level | Indicator | Actionable Verdict |
| :--- | :--- | :--- | :--- |
| 0 - 40 | `Safe` | Green | Normal trading activity matching core company developments. |
| 41 - 70 | `Monitor` | Yellow | Elevated keywords or similar brands are circulating on social feeds. |
| 71 - 85 | `High` | Orange | Active trading volumes are moving on unrelated tickers due to brand similarity. |
| 86 - 100 | `Critical` | Red | Unjustified market pump or identity collapse actively occurring. Avoid trading. |

---

## Project Metrics

| Metric | Details |
| :--- | :--- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| UI Components | Tailwind CSS v4, Framer Motion, Recharts, Lucide Icons |
| Caching & Storage | File-based local JSON Database |
| API Integrations | OpenAI API (GPT-4o-mini model), Alpha Vantage, News API |
| Active API Endpoints | 5 Routes |
| Server Actions | 11 Server-Side Actions |
| Seed Database Collections | 9 Tables (Users, Companies, Alerts, News, Cases, Mentions, Blogs, Investigations, Chat) |

---

## Project Structure

```
TickerGuard AI/
├── package.json              # Project dependencies and script runner
├── tsconfig.json             # TypeScript compiler configurations
├── next.config.ts            # Next.js bundler settings
├── db.json                   # File-based database storage
│
├── public/                   # Public assets and favicon
│
└── src/
    ├── app/
    │   ├── actions.ts        # Server actions for database and AI interactions
    │   ├── globals.css       # Core Tailwind CSS v4 and typography directives
    │   ├── layout.tsx        # HTML document layout and metadata headers
    │   ├── page.tsx          # Homepage redirector
    │   │
    │   ├── (dashboard)/      # Layout-governed admin and telemetry dashboard
    │   │   ├── admin/        # Admin utilities
    │   │   ├── alerts/       # Critical alert lists
    │   │   ├── assistant/    # AI chat interface
    │   │   ├── companies/    # Company directories
    │   │   ├── dashboard/    # Telemetry and stats graphs
    │   │   ├── detector/     # Identity mismatch input tool
    │   │   ├── investigations/# Forensic reports repository
    │   │   ├── settings/     # Preference controls
    │   │   └── layout.tsx    # Dashboard sidebar navigation
    │   │
    │   ├── (marketing)/      # Public information pages
    │   │   ├── about/        # Mission details
    │   │   ├── blog/         # Public research articles
    │   │   └── contact/      # Contact routes
    │   │
    │   └── api/              # Rest Endpoints
    │       ├── ai/
    │       │   ├── chat/     # Assistant communications handler
    │       │   └── investigate/# Trigger new analyses
    │       ├── blog/         # Blog retrieval route
    │       └── companies/    # Brand lookups
    │
    ├── components/           # Shared react components
    │   └── ui/               # Core button, input, and panel blocks
    │
    └── lib/                  # Shared business logic
        ├── ai.ts             # OpenAI connector + Dynamic forensic simulators
        ├── db.ts             # JSON Database reader, writer, and CRUD helper
        ├── scoring.ts        # Levenshtein distance and confusion score compiler
        └── utils.ts          # Tailwind class merging utility
```

---

## Tech Stack

**Frontend**
- **Next.js 16 (App Router)** - Server components, route handlers, and static layout optimization.
- **React 19** - Component architecture and server side actions.
- **Tailwind CSS v4** - CSS-first styling framework with custom token variables.
- **Framer Motion** - Fluid micro-animations and route transitions.
- **Recharts** - Dynamic financial analytics charts and risk histories.
- **Lucide React** - Clean outline style icons.

**Backend & AI Engine**
- **OpenAI API** - GPT-4o-mini (managed by [AIEngine](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/lib/ai.ts#L61)) powering the investigation generator and chat assistant.
- **Alpha Vantage** - Market price metrics.
- **News API** - Public sentiment tracking.
- **Levenshtein String Distance** - Offline fallback parsing for naming similarities.

**Data & Caching**
- **Local File System** - Local [db.json](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/db.json) file acting as the primary database storage layer.
- **JSONDatabase Class** - Thread-safe programmatic CRUD and seed initialization utility in [src/lib/db.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/lib/db.ts).

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/TickerGuard-AI.git
cd TickerGuard-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# API Keys (Loaded securely from Server Actions / API Routes)
NEWS_API_KEY=your_news_api_key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
OPENAI_API_KEY=your_openai_api_key

# Database Connection URI
DATABASE_URL=file:./db.json
```

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser to view the application.

---

## Security & Data Integrity

TickerGuard AI protects database integrity and prevents API credential leaks:
- **Server Actions**: All database reads, writes, and external AI evaluations are performed on the server-side via Server Actions in [src/app/actions.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts), eliminating client-side API exposure.
- **API Key Guarding**: The application checks for valid API tokens. If an `OPENAI_API_KEY` is missing or contains the default placeholder, the system falls back to offline, simulated local AI logic.
- **Path Isolation**: The [JSONDatabase](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/lib/db.ts#L485) class isolates operations to the [db.json](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/db.json) workspace path to prevent unauthorized file tree writes.

---

## Server Actions Directory

All server actions reside inside [src/app/actions.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts) and run strictly on the server:

| Action Name | Arguments | Output | Purpose |
| :--- | :--- | :--- | :--- |
| [getCompanies](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L6) | `searchQuery?: string` | `Company[]` | Retrieve and filter company list from the database. |
| [getCompanyBySymbol](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L18) | `symbol: string` | `Company` | Find a specific listed or unlisted company profile. |
| [getAlerts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L23) | None | `Alert[]` | Fetch active market confusion and social alerts. |
| [resolveAlert](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L27) | `id: string` | `Alert` | Mark a critical alert as resolved in the database ledger. |
| [getNews](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L36) | None | `NewsArticle[]` | Fetch latest financial news feed entries. |
| [getConfusionCases](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L40) | None | `ConfusionCase[]` | Retrieve similarity metrics and verdicts list. |
| [getInvestigations](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L44) | None | `Investigation[]` | Retrieve the completed forensic investigations reports. |
| [getSocialMentions](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L48) | None | `SocialMention[]` | Fetch volume and sentiment tracking metrics. |
| [getBlogPosts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L52) | `category?: string` | `BlogPost[]` | Retrieve blog articles sorted by publish date. |
| [runInvestigation](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L67) | `data: { companyAName, companyASymbol, companyBName, companyBSymbol, contextInfo }` | `{ result, blogPost }` | Generate investigation reports and related blog post via OpenAI. |
| [sendChatMessage](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L115) | `content: string` | `AIChatResponse` | Send message to AI chatbot and store logs in the history. |
| [getChatHistory](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/actions.ts#L126) | None | `ChatMessage[]` | Retrieve chat logs history. |

---

## API Endpoints

TickerGuard AI supports programmatic REST endpoints under the `/api` directory:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | [src/app/api/ai/chat/route.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/api/ai/chat/route.ts) | Send queries to the chatbot engine. |
| `POST` | [src/app/api/ai/investigate/route.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/api/ai/investigate/route.ts) | Initiate a new stock identity mismatch forensic analysis. |
| `GET` | [src/app/api/blog/route.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/api/blog/route.ts) | Fetch research articles database. |
| `GET` | [src/app/api/blog/[slug]/route.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/api/blog/%5Bslug%5D/route.ts) | Fetch details of a research article by slug. |
| `GET` | [src/app/api/companies/search/route.ts](file:///c:/Users/Vaibhav/OneDrive/Desktop/TickerGaurd%20AI/src/app/api/companies/search/route.ts) | Search companies list by symbol or name keywords. |

---

## Limitations

- **Diligence Tool Only**: TickerGuard AI is an analytical utility and does not constitute formal financial advice.
- **AI Hallucinations**: When using OpenAI GPT-4o-mini, information may sometimes need verification. The fallback simulator behaves consistently but relies on deterministic heuristics.
- **Ticker Availability**: Local string matches rely on the seed data database unless additional broker API integrations are linked.

---

## Roadmap

- Support for global ISIN/CUSIP code matching.
- Direct broker API integration for immediate check-outs.
- Expanded multi-language translations for global market coverage.
- Discord & Slack alert bots for investor communities.

---

## Contributing

Contributions are welcome. Please fork the repository and open a Pull Request with your suggested modifications.

---

## License

This project is licensed under the **[MIT License](LICENSE)**.
