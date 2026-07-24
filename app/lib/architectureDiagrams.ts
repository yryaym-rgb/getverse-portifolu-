export const architectureDiagrams: Record<string, string> = {
  maoni: `graph TD
    A[Citizen Web App] --> B[API Gateway / Nginx]
    B --> C[Auth Service]
    B --> D[Consultation Service]
    B --> E[Analytics Service]
    C --> F[(PostgreSQL)]
    D --> F
    D --> G[Claude API]
    E --> H[(Redis Cache)]
    F --> I[Backup Storage]
    E --> J[Presidential Reports]`,

  arptc: `graph TD
    A[Admin Dashboard] --> B[React Frontend]
    B --> C[Leaflet Map Engine]
    B --> D[REST API]
    D --> E[(PostgreSQL)]
    D --> F[XLSX Import/Export]
    C --> G[3,500+ Tower Markers]
    E --> H[Soft-Delete Archive]
    D --> I[Netlify CDN]`,

  selzara: `graph TD
    A[Amazon Seller Dashboard] --> B[FastAPI Backend]
    B --> C[PPC Optimizer]
    B --> D[Profit Analytics]
    B --> E[AI Listing Generator]
    C --> F[(Supabase / PostgreSQL)]
    D --> F
    E --> G[Claude API]
    B --> H[Gumroad Billing]`,
}
