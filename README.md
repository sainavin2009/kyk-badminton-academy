# KYK Badminton Academy

A modern, production-quality web application for KYK Badminton Academy built with React 19, TypeScript, and Supabase.

## Features

- 🏸 Modern, responsive design
- 🎨 Premium sports academy theme
- 🔐 User authentication & authorization
- 📱 Mobile-first approach
- 🎯 Professional coaching programs
- 🖼️ Gallery showcase
- 📞 Contact system
- 🎪 Admin dashboard

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase
- **Routing**: React Router
- **State Management**: React Query
- **Icons**: Lucide React
- **UI Components**: Custom shadcn/ui components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Add your Supabase credentials to `.env`
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (Button, Card, Input, etc.)
│   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   └── sections/       # Page sections (Hero, Features, etc.)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── lib/                # Utilities and configurations
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is proprietary and belongs to KYK Badminton Academy.