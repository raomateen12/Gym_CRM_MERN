# GYM Management System - Frontend

A modern React.js frontend for the GYM Management System built with Vite, Tailwind CSS, and React Router.

## Features

- 🔐 **Authentication System** - Login/Register with JWT tokens
- 👥 **Role-based Access Control** - Admin, Trainer, and Member roles
- 📊 **Interactive Dashboards** - Different views for each user role
- 🎨 **Modern UI** - Built with Tailwind CSS and React Icons
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 📈 **Charts & Analytics** - Data visualization with Recharts
- 🚀 **Fast Development** - Powered by Vite for instant hot reload

## Tech Stack

- **React 19.1.0** - UI library
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **Recharts** - Chart library
- **React Toastify** - Toast notifications

## Prerequisites

- Node.js 20.15.1 or higher
- npm 10.7.0 or higher
- Backend server running on http://localhost:5000

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   The `.env` file is already configured with:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=GymPro
   VITE_APP_VERSION=1.0.0
   VITE_NODE_ENV=development
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Server will start at http://localhost:3000

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── profile/         # Profile components
│   ├── Layout.jsx       # Main layout wrapper
│   ├── Loading.jsx      # Loading component
│   ├── ProtectedRoute.jsx # Route protection
│   └── Unauthorized.jsx # Access denied page
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication context
├── services/            # API services
│   └── api.js          # Axios configuration
├── utils/               # Utility functions
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles
```

## Available Routes

### Public Routes
- `/login` - User login
- `/register` - User registration
- `/unauthorized` - Access denied page

### Protected Routes
- `/dashboard` - Main dashboard (role-based content)
- `/profile` - User profile management

### Admin Routes (Admin only)
- `/users` - User management
- `/trainers` - Trainer management
- `/analytics` - System analytics
- `/settings` - System settings

### Trainer Routes (Trainer only)
- `/my-workouts` - Manage workout plans
- `/my-sessions` - Training sessions
- `/my-members` - Assigned members
- `/schedule` - Schedule management

### Member Routes (All authenticated users)
- `/workouts` - Browse workouts
- `/my-bookings` - Booking management
- `/progress` - Progress tracking
- `/sessions` - Training sessions

## User Roles & Permissions

### Admin
- Full system access
- User and trainer management
- System analytics and settings
- All CRUD operations

### Trainer
- Manage own workout plans
- View assigned members
- Schedule training sessions
- Track member progress

### Member
- Browse and book workouts
- Track personal progress
- Manage bookings
- View training sessions

## Key Features

### Authentication
- JWT-based authentication with HTTP-only cookies
- Automatic token refresh
- Role-based route protection
- Persistent login state

### Dashboard
- Role-specific dashboard content
- Real-time statistics
- Interactive charts
- Quick action buttons
- Recent activity feed

### Responsive Design
- Mobile-first approach
- Collapsible sidebar navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

### API Integration
- Centralized API configuration
- Automatic error handling
- Request/response interceptors
- Loading states management

## Custom Styling

The project uses Tailwind CSS with custom color palette:

- **Primary**: Blue shades (#3b82f6)
- **Secondary**: Sky blue shades (#0ea5e9)
- **Success**: Green shades (#22c55e)
- **Warning**: Amber shades (#f59e0b)
- **Danger**: Red shades (#ef4444)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimization

- Lazy loading for route components
- Code splitting with dynamic imports
- Optimized bundle size
- Tree shaking enabled
- CSS purging in production

## Future Enhancements

- [ ] Progressive Web App (PWA) support
- [ ] Dark mode theme
- [ ] Advanced filtering and search
- [ ] Real-time notifications
- [ ] Offline functionality
- [ ] Advanced charting and analytics
- [ ] Mobile app integration
- [ ] Multi-language support

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety (future enhancement)
3. Maintain consistent styling with Tailwind CSS
4. Add proper error handling
5. Include responsive design considerations
6. Write meaningful component names and comments

## Support

For issues and questions, please refer to the main project documentation or contact the development team.

---

Built with ❤️ using React, Vite, and Tailwind CSS+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
