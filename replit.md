# Body Measurements Tracker

## Overview

A web application for tracking and visualizing body measurements over time. Users can record multiple body metrics (weight, height, chest, waist, hips, arm, thigh), view historical data, and analyze trends through timeline charts and radar visualizations. The application uses Firebase/Firestore for cloud-based data persistence with anonymous authentication, supporting multiple users with secure data isolation.

## Current Status

✅ **Firebase Integration Complete** (November 25, 2024)
- Complete frontend with all features implemented
- Firebase/Firestore for cloud-based data persistence
- Anonymous authentication for secure multi-user support
- Automatic migration from localStorage to Firestore
- Ready for GitHub Pages deployment (requires Firebase configuration)

## User Preferences

Preferred communication style: Simple, everyday language (Portuguese).

## Deployment Configuration

**Target Platform**: GitHub Pages with Firebase Backend
- **Setup**: Automatic GitHub Actions workflow configured
- **Location**: `https://seu-usuario.github.io/medidas-corporais/`
- **Type**: Static SPA (Single Page Application) with Firebase/Firestore

### Deployment Instructions
1. **Firebase Setup** (required): See `FIREBASE_SETUP.md` for complete Firebase configuration
2. **GitHub Pages**: See `DEPLOY.md` for deployment instructions

⚠️ **Important**: Firebase must be configured before deployment!

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, bundled using Vite

**Routing**: Wouter for lightweight client-side routing

**UI Component Library**: Shadcn/ui (Radix UI primitives)
- Comprehensive set of accessible components
- Customized with Tailwind CSS using HSL color variables for theming
- Material Design principles adapted for health/fitness

**State Management**: 
- React hooks (useState, useEffect) for local component state
- TanStack Query (React Query) for server state management
- LocalStorage API for client-side data persistence

**Styling**: 
- Tailwind CSS with custom configuration
- CSS variables for theming with light/dark mode support
- Custom fonts: Inter (UI/data), JetBrains Mono (numeric values)
- Mobile-first responsive design

**Data Visualization**:
- Recharts library for timeline charts and radar charts
- Custom chart components wrapping Recharts primitives
- 7 different measurements tracked with individual timeline views

**Implemented Features**:
- ✅ Measurement form with 7 body metrics
- ✅ Timeline charts for all measurements
- ✅ Radar chart with latest measurements overview
- ✅ Complete history table with delete functionality
- ✅ Confirmation dialog for destructive actions
- ✅ Data export in JSON format
- ✅ Light/Dark mode toggle with localStorage persistence
- ✅ Fully responsive design (mobile-first)
- ✅ Portuguese language interface
- ✅ Firebase/Firestore cloud data persistence
- ✅ Anonymous authentication for multi-user support
- ✅ Automatic localStorage migration to Firestore
- ✅ Real-time data synchronization
- ✅ Loading states and error handling

### Data Storage

**Current Implementation**: 
- **Firebase/Firestore** for cloud-based persistence
- **Anonymous Authentication** for user identification
- Data synchronized across devices
- Automatic backup in the cloud
- Secure data isolation per user
- Users can export data as JSON for backup

**Data Model**:
- Measurements: id, date, weight, height, chest, waist, hips, arm, thigh, userId, createdAt
- All measurement fields optional to accommodate partial entries
- Firestore collection structure: `users/{userId}/measurements/{measurementId}`

**Security**:
- Firestore security rules ensure users can only access their own data
- Anonymous authentication provides unique user IDs without login forms
- Environment variables protect Firebase configuration

### External Dependencies

**Firebase/Backend**:
- firebase (v12.x) - Firebase SDK for web
  - firebase/app - Core Firebase functionality
  - firebase/auth - Anonymous authentication
  - firebase/firestore - Cloud Firestore database

**UI Component Libraries**:
- @radix-ui/* (v1.x) - Unstyled, accessible component primitives
- Shadcn/ui components - Form, Input, Button, Card, Table, Tabs, AlertDialog, etc.
- lucide-react - Icon library

**Data & Forms**:
- react-hook-form with @hookform/resolvers - Form state management
- zod - Schema validation

**Visualization**:
- recharts (v2.x) - Charting library (line charts and radar charts)

**Date Handling**:
- date-fns (v3.x) with pt-BR locale for Brazilian Portuguese date formatting

**Routing & State**:
- wouter - Lightweight routing
- @tanstack/react-query - Server state management and Firebase integration

### Design System

**Color System**: HSL-based with CSS variables for light/dark themes
- Primary: Blue (217° 91% 35%)
- Chart colors: 5-color palette for data visualization
- Semantic colors: destructive, muted, accent, secondary

**Typography Scale**:
- H1: 2.5rem/3rem (mobile/desktop)
- H2: 1.75rem/2rem
- H3: 1.25rem/1.5rem
- Body: 1rem
- Small: 0.875rem
- Numbers: 1.5-2rem (monospace)

**Spacing System**: Tailwind units (2, 4, 6, 8, 12, 16, 20)

**Layout Strategy**:
- Container: max-width 6xl with auto margins
- Grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Card padding: 1.5rem (24px)

## File Structure

```
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MeasurementForm.tsx
│   │   │   ├── TimelineChart.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   ├── HistoryTable.tsx
│   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   ├── AuthButton.tsx (login/logout)
│   │   │   ├── MigrationPrompt.tsx (localStorage migration)
│   │   │   └── ui/ (shadcn components)
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx (Firebase auth provider)
│   │   ├── hooks/
│   │   │   ├── useMeasurements.ts (React Query hooks for Firestore)
│   │   │   └── use-toast.ts
│   │   ├── lib/
│   │   │   ├── firebase.ts (Firebase configuration)
│   │   │   ├── measurementService.ts (Firestore CRUD operations)
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   └── home.tsx (main application page)
│   │   ├── App.tsx (router setup with AuthProvider)
│   │   └── index.css (styling)
│   └── index.html
├── .github/workflows/
│   └── deploy.yml (GitHub Actions workflow with Firebase env vars)
├── .env.example (Firebase environment variables template)
├── FIREBASE_SETUP.md (complete Firebase setup guide)
├── DEPLOY.md (deployment guide)
└── replit.md (this file)
```

## Development Guidelines

### Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase** (required):
   - Follow `FIREBASE_SETUP.md` to create a Firebase project
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase credentials in `.env.local`

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`

### Adding Features
1. Create components in `client/src/components/`
2. Use React Query hooks from `useMeasurements.ts` for data operations
3. Use `useAuth` hook to access authentication state
4. Update the home page to integrate new features
5. Test with `npm run dev`

### Building for Production
```bash
npm run build
# Output: dist/public/ (ready for GitHub Pages)
```

⚠️ **Important**: Set Firebase environment variables before building

### Styling
- Use Tailwind classes wherever possible
- Follow Material Design principles
- Maintain responsive mobile-first approach
- Use theme variables for consistency

### Icons
- Use lucide-react for UI icons
- Use react-icons/si for company logos

## Recent Changes

### November 25, 2024 - Firebase Integration
- ✅ Migrated from localStorage to Firebase/Firestore
- ✅ Implemented anonymous authentication
- ✅ Created custom React Query hooks for Firestore operations
- ✅ Added AuthProvider context for authentication state
- ✅ Created migration prompt for existing localStorage data
- ✅ Added loading states and error handling throughout
- ✅ Updated GitHub Actions workflow with Firebase env vars
- ✅ Created comprehensive Firebase setup documentation

## Next Steps

1. **Configure Firebase**:
   - Follow `FIREBASE_SETUP.md` to set up Firebase project
   - Configure environment variables locally and on GitHub

2. **Create GitHub repository**:
   - Push code to main branch
   - Add Firebase secrets to GitHub (see `DEPLOY.md`)
   - Configure GitHub Pages to use gh-pages branch

3. **Deploy**:
   - GitHub Actions will automatically deploy on push
   - Test login and data persistence

See `FIREBASE_SETUP.md` and `DEPLOY.md` for detailed instructions.
