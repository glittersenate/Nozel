
# NozelPay HR Management System

A modern, comprehensive HR management platform built with React, TypeScript, and Tailwind CSS. This system provides role-based access control and streamlined HR operations for organizations of all sizes.

## 🌟 Overview

NozelPay is a full-featured HR management system that enables organizations to manage employees, payroll, leave requests, performance reviews, and more through an intuitive, responsive interface. The system supports multiple user roles with different permission levels to ensure secure and appropriate access to HR data.

## 🚀 Features

### 🔐 Authentication & Authorization
- **Role-Based Access Control (RBAC)** with 4 distinct roles:
  - **Admin**: Full system access and user management
  - **HR Manager**: Employee management, payroll, and leave approval
  - **Manager**: View-only access to team data and analytics
  - **Employee**: Personal profile and leave request access

### 👥 Employee Management
- Complete employee directory with search and filtering
- Employee profiles with detailed information
- Bulk operations (delete, status updates, export)
- Employee avatar system with fallback initials
- Advanced filtering by department, status, and salary range
- Sortable employee tables with multi-column sorting

### 💰 Payroll Management
- Payroll processing and scheduling
- Summary cards showing gross pay, deductions, and net payroll
- Interactive payroll charts and visualizations
- Employee count tracking and period management

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Leave balance tracking (vacation, sick, personal)
- Multiple leave types (vacation, sick, personal, bereavement, maternity/paternity)
- Bulk approval capabilities
- Leave calendar integration

### 📊 Performance Management
- Performance review creation and management
- Goal tracking and progress monitoring
- Competency ratings and feedback system
- Performance metrics and analytics

### 📈 Dashboard & Analytics
- Real-time metrics and KPIs
- Enhanced statistics cards with animations
- Interactive charts and data visualizations
- Employee statistics and trends

### 🔧 System Features
- Responsive design optimized for all devices
- Dark theme with blue accent colors
- Advanced search capabilities
- Bulk actions and operations
- Data export functionality
- Toast notifications for user feedback

## 🏗️ Architecture

### Frontend Architecture
- **React 18** with functional components and hooks
- **TypeScript** for type safety and better development experience
- **Component-based architecture** with reusable UI components
- **State management** using Zustand for global state
- **Custom hooks** for business logic separation

### State Management
The application uses **Zustand** for state management with dedicated stores:

- **Employee Store** (`useEmployeeStore`): Manages employee data, CRUD operations, and sorting
- **HR Store** (`useHRStore`): Handles performance reviews, goals, and payroll data
- **Leave Store** (`useLeaveStore`): Manages leave requests, balances, and approvals
- **Time Tracking Store** (`useTimeTrackingStore`): Time entries and tracking functionality

### Custom Hooks
- `useEmployees`: Employee management operations
- `useEmployeeFilters`: Advanced filtering logic
- `usePayroll`: Payroll data and operations
- `useLeave`: Leave management functionality
- `usePerformance`: Performance review operations
- `useEmployeePortal`: Portal-specific logic

## 🛠️ Technology Stack

- **React 18.3.1** - Modern React with concurrent features
- **TypeScript** - Type safety and enhanced development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **React Router DOM** - Client-side routing
- **Lucide React** - Modern icon library
- **Recharts** - Chart and data visualization library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── employees/       # Employee-specific components
│   ├── payroll/         # Payroll management components
│   ├── leave/           # Leave management components
│   ├── performance/     # Performance review components
│   ├── dashboard/       # Dashboard components
│   └── ...
├── contexts/            # React contexts for global state
├── hooks/               # Custom React hooks
├── pages/               # Page components for routing
├── store/               # Zustand store configurations
├── types/               # TypeScript type definitions
├── data/                # Mock data and constants
└── lib/                 # Utility functions
```

### Key Components

#### Layout Components
- **`Layout.tsx`**: Main application layout with sidebar and navigation
- **`AppSidebar.tsx`**: Collapsible sidebar navigation
- **`Navigation.tsx`**: Main navigation menu items
- **`RoleSelector.tsx`**: Role switching interface

#### Employee Components
- **`EmployeeTable.tsx`**: Main employee data table with sorting and actions
- **`EmployeeCard.tsx`**: Card view for individual employees
- **`EmployeeDetailDialog.tsx`**: Detailed employee information modal
- **`EmployeeFilterDrawer.tsx`**: Advanced filtering interface
- **`BulkActions.tsx`**: Bulk operation controls
- **`AddEmployeeDialog.tsx`**: New employee creation form
- **`EditEmployeeDialog.tsx`**: Employee information editing form

#### Dashboard Components
- **`EnhancedStatsCards.tsx`**: Animated statistics cards
- **`RealTimeMetrics.tsx`**: Live updating metrics display
- **`InteractivePayrollChart.tsx`**: Payroll data visualization

#### Payroll Components
- **`PayrollDashboard.tsx`**: Main payroll management interface
- **`PayrollSummaryCards.tsx`**: Payroll summary statistics
- **`PayrollScheduler.tsx`**: Payroll scheduling interface

#### Leave Components
- **`LeaveDashboard.tsx`**: Leave management overview
- **`LeaveRequestsTable.tsx`**: Leave requests data table
- **`LeaveActionsToolbar.tsx`**: Leave management actions

## 🔑 Authentication System

The authentication system uses React Context to manage user sessions and permissions:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

type UserRole = 'admin' | 'hr' | 'manager' | 'employee';
```

### Permission Matrix

| Feature | Admin | HR | Manager | Employee |
|---------|-------|----|---------|---------| 
| View All Employees | ✅ | ✅ | ✅ | ❌ |
| Edit Employees | ✅ | ✅ | ❌ | ❌ |
| Delete Employees | ✅ | ❌ | ❌ | ❌ |
| View Salaries | ✅ | ✅ | ❌ | ❌ |
| Run Payroll | ✅ | ✅ | ❌ | ❌ |
| View Analytics | ✅ | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Export Data | ✅ | ✅ | ❌ | ❌ |

## 📊 Data Models

### Employee Model
```typescript
interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  phone?: string;
  address?: string;
}
```

### Leave Request Model
```typescript
interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal' | 'bereavement' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
}
```

### Payroll Entry Model
```typescript
interface PayrollEntry {
  id: string;
  employeeId: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  overtimeRate: number;
  grossPay: number;
  deductions: PayrollDeduction[];
  netPay: number;
  status: 'draft' | 'pending' | 'approved' | 'paid';
}
```

## 🎨 Design System

The application uses a consistent design system built on Tailwind CSS:

- **Color Palette**: Dark theme with blue accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Standardized component patterns using shadcn/ui

### Theme Colors
- Primary: Blue shades (blue-400, blue-500, blue-600)
- Background: Dark grays and blues
- Text: White and blue-tinted grays
- Accents: Status-specific colors (green for success, red for errors)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd hr-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
The application is configured to work out of the box with mock data. No additional environment variables are required for development.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure Guidelines
- Use TypeScript for all new components
- Follow the existing component patterns
- Use custom hooks for business logic
- Maintain consistent naming conventions
- Keep components focused and reusable

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adapted layouts with responsive grids
- **Mobile**: Touch-optimized interface with collapsible navigation

## 🔒 Security Features

- Role-based access control (RBAC)
- Route protection based on user permissions
- Secure form handling with validation
- XSS protection through React's built-in safeguards

## 📈 Performance Optimizations

- React Query for efficient data fetching and caching
- Lazy loading of components where appropriate
- Optimized bundle size with Vite
- Responsive images and assets

## 🧪 Testing

The application includes:
- TypeScript for compile-time error checking
- ESLint for code quality enforcement
- Component-based architecture for easier testing

## 🔄 State Management Flow

1. **User Actions**: UI interactions trigger actions
2. **Store Updates**: Zustand stores handle state changes
3. **Component Re-renders**: React components update automatically
4. **Persistence**: State changes are reflected in the UI immediately

## 📋 Future Enhancements

The codebase is structured to easily accommodate:
- Backend API integration
- Real-time notifications
- Advanced reporting features
- Mobile application development
- Third-party integrations

## 🏷️ Version Information

Current version focuses on:
- Core HR functionality
- Employee management
- Leave management
- Payroll processing
- Performance tracking
- Role-based permissions

---

Built with ❤️ using modern web technologies for efficient HR management.
