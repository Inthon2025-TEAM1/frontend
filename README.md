# InThon Frontend

A frontend application for an educational platform built with React + TypeScript + Vite.

## 📋 Project Overview

This project is an educational platform that supports student, parent, and administrator roles. Key features include a quiz system, rewards/store system, gacha system, learning reports, and mentoring applications.

## 🚀 Tech Stack

### Core Technologies
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.2** - Build tool and development server
- **React Router DOM 7.9.5** - Client-side routing

### Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **PostCSS** - CSS post-processing

### Authentication & Backend
- **Firebase 12.5.0** - Authentication service (Google OAuth, Email/Password)
- **Axios 1.13.2** - HTTP client
- **react-firebase-hooks 5.1.1** - Firebase React hooks

### Other Libraries
- **KaTeX 0.16.25** / **react-katex 3.1.0** - Mathematical formula rendering
- **react-confetti 6.4.0** - Celebration effects
- **@rive-app/react-canvas 4.24.0** - Rive animations
- **react-use 17.6.0** - Useful React hooks collection

## 📁 Project Structure

```
frontend/
├── public/
│   └── images/          # Image resources
├── src/
│   ├── api/             # API communication modules
│   │   ├── auth.ts      # Authentication API
│   │   └── quiz.ts      # Quiz API
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── AdminRoute.tsx
│   │   ├── ChildRoute.tsx
│   │   ├── ParentRoute.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── PublicOnlyRoute.tsx
│   ├── contexts/        # React Context
│   │   └── AuthContext.tsx
│   ├── firebase/        # Firebase configuration
│   │   └── firebase.ts
│   ├── hooks/           # Custom hooks
│   │   └── useAuth.ts
│   ├── mocks/           # Mock data
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin pages
│   │   ├── parent/      # Parent pages
│   │   ├── AboutPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── GamePage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ...
│   ├── services/        # Service layer
│   │   └── authService.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── AUTH_ARCHITECTURE.md # Authentication architecture documentation
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Key Features

### User Roles
- **Student (Child)**: Take quizzes, earn rewards, use store
- **Parent**: View learning reports, apply for mentoring, manage payments
- **Administrator**: System management

### Core Features
1. **Authentication System**
   - Google OAuth login
   - Email/password login and registration
   - Role-based access control

2. **Quiz System**
   - Subject and difficulty-based quiz selection
   - Real-time quiz solving
   - Mathematical formula rendering (KaTeX)

3. **Reward System**
   - Earn rewards upon quiz completion
   - Gacha system (LootBox)
   - Exchange rewards at the store

4. **Parent Dashboard**
   - Learning report viewing
   - Learning status checking
   - Mentoring application and management
   - Payment management

5. **Gaming Elements**
   - Gacha opening animations
   - Reward celebration effects

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Firebase project setup

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and set the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Development Server

```bash
# Start development server (port: 5173)
npm run dev
```

The development server will run at `http://localhost:5173`.

### Build

```bash
# Production build
npm run build
```

Built files will be generated in the `dist/` directory.

### Preview

```bash
# Preview built app
npm run preview
```

### Lint

```bash
# Run code linting
npm run lint
```

## 🔧 Development Configuration

### Vite Configuration

The development server is configured to proxy to the backend API (`http://localhost:3000`):

```typescript
// vite.config.ts
server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
}
```

### Routing Structure

- **Public Routes**: `/`, `/login`, `/register`, `/about`, `/terms`, `/privacy`, `/OpenBox`, `/initUser`
- **Student Routes**: `/dashboard`, `/profile`, `/quiz-selection`, `/quiz`, `/rewards`, `/store`
- **Parent Routes**: `/parent/dashboard`, `/parent/learning-report`, `/parent/payment`, `/parent/mentoring/*`
- **Admin Routes**: `/admin`

### Authentication Architecture

For detailed authentication architecture, refer to [AUTH_ARCHITECTURE.md](./AUTH_ARCHITECTURE.md).

Key components:
- `AuthContext`: Global authentication state management
- `authService`: Firebase authentication service
- `useAuth`: Authentication hook
- `ProtectedRoute`, `PublicOnlyRoute`: Route guards

## 📚 Key Pages

### Public Pages
- **Homepage** (`/`): Service introduction and login/register links
- **Login** (`/login`): Google OAuth and email login
- **Register** (`/register`): New user registration
- **Game/Gacha** (`/OpenBox`): Gacha box opening page
- **Initial Profile** (`/initUser`): Initial user profile setup
- **Terms/Privacy Policy**: Service terms pages (`/terms`, `/privacy`, `/about`)

### Student Pages
- **Dashboard** (`/dashboard`): Quiz category selection
- **Quiz Selection** (`/quiz-selection`): Subject and difficulty selection
- **Quiz** (`/quiz`): Actual quiz solving page
- **Rewards** (`/rewards`): View earned rewards
- **Store** (`/store`): Exchange rewards
- **Profile** (`/profile`): User profile management

### Parent Pages
- **Dashboard** (`/parent/dashboard`): Child learning status summary
- **Learning Report** (`/parent/learning-report`): Detailed learning reports
- **Learning Status** (`/parent/learning-status`): Learning progress
- **Mentoring Application** (`/parent/mentoring/apply`): Apply for mentoring
- **Mentoring List** (`/parent/mentoring/list`): List of applied mentoring sessions
- **Payment** (`/parent/payment`): Payment management

### Admin Pages
- **Admin Dashboard** (`/admin`): System management

## 🎨 Styling

This project uses Tailwind CSS. Custom configuration can be found in `tailwind.config.js`.

## 📝 Code Style

- TypeScript strict mode enabled
- Code quality management through ESLint
- Functional components and React Hooks

## 🔐 Security

- Secure authentication through Firebase Authentication
- Role-based access control (RBAC)
- Automatic token attachment for API requests

## 🤝 Contributing

If you'd like to contribute to the project, please consider:

1. Follow code style guidelines
2. Write clear TypeScript type definitions
3. Consider component reusability
4. Implement proper error handling

## 📄 License

This project is a private project.

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
