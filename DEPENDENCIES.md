
# NozelPay HR System - Dependencies & Compatibility Guide

## Key Package Versions & Compatibility

### Core Framework
- **React**: ^18.3.1 - Latest stable version with concurrent features
- **TypeScript**: Latest (via Vite) - Full type safety
- **Vite**: Latest - Modern build tool with HMR

### UI & Styling
- **Tailwind CSS**: ^3.x - Utility-first CSS framework
- **shadcn/ui**: Latest components built on Radix UI
- **Radix UI**: ^1.x - Accessible component primitives
- **Lucide React**: ^0.462.0 - Icon library (replaces React Icons)

### State Management & Data
- **Zustand**: ^5.0.5 - Lightweight state management
- **React Query**: ^5.56.2 - Server state management
- **React Hook Form**: ^7.53.0 - Form handling
- **Zod**: ^3.25.64 - Schema validation

### Routing & Navigation
- **React Router DOM**: ^6.26.2 - Client-side routing

### Charts & Visualization
- **Recharts**: ^2.12.7 - React charting library

### Utilities
- **date-fns**: ^3.6.0 - Date manipulation
- **class-variance-authority**: ^0.7.1 - CSS class utilities
- **clsx**: ^2.1.1 - Conditional className utility
- **uuid**: ^9.0.1 - UUID generation

## Known Compatibility Issues & Fixes

### Lucide React Icons
- ❌ **Hamburger** - Doesn't exist in current version
- ✅ **Menu** - Use this instead for hamburger menus
- ❌ **HamburgerMenu** - Also doesn't exist
- ✅ **AlignJustify** - Alternative hamburger-style icon

### Common Icon Replacements
```typescript
// OLD (doesn't work)
import { Hamburger } from 'lucide-react';

// NEW (correct)
import { Menu } from 'lucide-react';
// or
import { AlignJustify } from 'lucide-react';
```

### React 18 Compatibility
- All components use React 18 concurrent features
- Proper error boundaries implemented
- Suspense-ready for future lazy loading

### TypeScript Strict Mode
- Full strict mode enabled
- All components properly typed
- No `any` types in production code

## Development Setup

### Fresh Install Instructions
```bash
# 1. Clone the repository
git clone <repo-url>
cd nozel-pay-hr

# 2. Install dependencies (will use latest compatible versions)
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

### Recommended Node Version
- **Node.js**: 18.x or 20.x LTS
- **npm**: 9.x or higher

## Maintenance Guidelines

### Icon Updates
- Always verify icon names exist in current lucide-react version
- Check the [Lucide icon library](https://lucide.dev/) for available icons
- Use consistent naming: prefer descriptive names over generic ones

### Dependency Updates
- Test thoroughly after major version updates
- Check for breaking changes in:
  - Radix UI components
  - Lucide React icons
  - React Router API changes

### Code Quality
- Components are kept small and focused (< 50 lines when possible)
- Business logic separated into stores and hooks
- UI components are reusable and well-typed

## Troubleshooting

### Build Errors
1. Clear node_modules and package-lock.json
2. Run `npm install` fresh
3. Check for TypeScript errors in components
4. Verify all imports resolve correctly

### Icon Errors
1. Check icon exists in lucide-react documentation
2. Use proper import syntax: `import { IconName } from 'lucide-react'`
3. Ensure icon name is PascalCase

### State Management Issues
1. Verify Zustand store structure matches hooks
2. Check for proper TypeScript typing
3. Ensure store actions are properly bound

---

**Last Updated**: 2024-06-17
**Compatible with**: Node 18+, React 18+, TypeScript 5+
