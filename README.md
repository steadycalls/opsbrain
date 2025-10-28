# OpsBrain App

**Your Centralized SEO Operations Control Center**

OpsBrain is a comprehensive platform designed to streamline and scale SEO, content operations, and client delivery. It consolidates planning, execution, QA, reporting, and billing into a single, powerful workflow.

![OpsBrain Dashboard](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Purpose

Create a single control center to run SEO, content, RankDRE operations, and client delivery with the goal of:

- **Increase output per operator by 5-10x**
- **Cut cycle time from idea to indexed page to under 72 hours**
- **Raise link velocity and technical health while reducing manual QA**
- **Generate client updates, proposals, and invoices without human drafting**

## ✨ Features

### 📊 Core Modules

#### Content Intelligence Hub
- Import keyword sheets and briefs from Airtable
- Auto-build calendars and assign owners
- Generate drafts in client voice using AI
- Push to WordPress, Duda, or GoHighLevel
- Apply schema, internal links, images, and URLs automatically
- Watch rankings and fix basic issues

#### 🔍 Technical SEO Monitor
- Crawl sites and compare against thresholds
- Flag indexation, canonical, SSR, and sitemap problems
- Suggest auto-fixes for simple errors
- Sync with Google Search Console for coverage and queries

#### 🔗 Authority Builder
- Pull prospects and metrics from Ahrefs and Majestic
- Generate outreach lists and email copy
- Track replies and verify live links
- Score velocity and topical relevance

#### 👥 Team Pulse
- Pull tasks from Nifty or ClickUp
- Measure load, idle time, and throughput
- Recommend delegation and batching
- Export weekly billing and utilization

#### 📈 Client Command Layer
- Compile updates, decks, and proposals
- Map offer templates to scope, price, and timeline
- Send for e-signature and trigger onboarding

#### 📍 RankDRE Support
- Asset registry for sites, GBPs, numbers, and inboxes
- State, city, niche matrix for targeting
- GMB creation and warmup tracking
- Phone routing and lead logging via GHL

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS 4, Wouter (routing)
- **Backend**: Express 4, tRPC 11, Drizzle ORM
- **Database**: MySQL/TiDB with comprehensive schema
- **Authentication**: Manus OAuth + Magic Link
- **Orchestration**: n8n workflows
- **AI**: OpenAI integration for content generation
- **Styling**: Custom design system with Inter & JetBrains Mono fonts

## 🎨 Design System

OpsBrain features a modern, stunning UI with:

- **Custom Color Palette**: Deep blue primary, vibrant purple secondary, electric cyan accents
- **Professional Typography**: Inter for UI, JetBrains Mono for code
- **Responsive Layout**: Mobile-first design with adaptive sidebar navigation
- **Smooth Interactions**: Micro-animations and transitions throughout

## 📊 Key Performance Indicators

Track these critical metrics:

- Content shipped per day
- Indexation rate within 7 days
- Technical errors per 1,000 pages
- Link velocity per domain
- VA utilization percent
- Gross margin per account

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- MySQL or TiDB database
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/steadycalls/opsbrain.git
cd opsbrain

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

Required environment variables:

- `DATABASE_URL`: MySQL/TiDB connection string
- `JWT_SECRET`: Session cookie signing secret
- `VITE_APP_ID`: OAuth application ID
- `OAUTH_SERVER_URL`: OAuth backend base URL
- `VITE_OAUTH_PORTAL_URL`: Login portal URL

## 📁 Project Structure

```
opsbrain-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and tRPC client
│   │   └── index.css      # Global styles and design tokens
│   └── public/            # Static assets
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # API endpoints
│   ├── db.ts              # Database queries
│   └── _core/             # Core framework files
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Complete data model
└── shared/                # Shared types and constants
```

## 🗄️ Database Schema

Comprehensive data model with 21 tables:

- **Core**: users, accounts, projects, roles, audit_logs
- **Content**: keywords, briefs, posts, pages, domains
- **Operations**: tasks, issues, prospects, links
- **RankDRE**: gbps, calls
- **Communication**: emails
- **Billing**: invoices
- **Webhooks**: webhook_events, webhook_subscriptions, webhook_delivery_logs

## 🔌 Integrations

- Google Search Console
- Google Analytics 4
- GoHighLevel
- Duda API
- WordPress REST API
- Ahrefs API
- DataForSEO APIs
- Airtable
- Slack
- SES/SMTP

## 🔐 Security

- OAuth 2.0 / OpenID Connect authentication
- JWT with short TTL for sessions
- Row Level Security in database
- HMAC signature verification for webhooks
- Audit logs for all critical actions

## 📝 User Roles

- **Owner**: Full system access
- **Manager**: Team and project management
- **Operator**: Day-to-day operations
- **VA**: Assigned task execution
- **Client Viewer**: Read-only access to reports

## 🛣️ Roadmap

- **v0**: Crawl, Content, Reports ✅
- **v1**: Link Builder, Team Pulse (In Progress)
- **v2**: RankDRE asset layer
- **v3**: Billing and quotes automation

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for SEO professionals who demand efficiency and scale**
