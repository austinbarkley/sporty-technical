# Sporty Group Technical Take Home

A modern React application for browsing and exploring sports leagues and their seasons. Built with TypeScript, Mantine UI, and Zustand for state management.

## Tech Stack

- [React](https://react.dev/)
- [Mantine Component Library](https://mantine.dev/) - UI component library
- [@tabler/icons-react](https://docs.tabler.io/icons/libraries/react) - UI icon component library
- [Mantine Hooks](https://mantine.dev/hooks/package/) - Common useful React hooks
- [Zustand](https://github.com/pmndrs/zustand) - State management library
- [React Router](https://reactrouter.com/) - SPA React Router
- [Fuse.js](https://www.fusejs.io/) - Light weight fuzzy search library

### State Management

- **Zustand Stores**: Separate stores for leagues and league seasons data
- **Session Persistence**: Data cached in sessionStorage for performance
- **API Integration**: Custom hooks for data fetching with loading states

### Data Flow

1. **Initial Load**: Fetch all leagues from TheSportsDB API
2. **Search & Filter**: Client-side filtering with Fuse.js fuzzy search
3. **Navigation**: Click league row -> navigate to league detail page
4. **League Details**: Fetch specific league seasons data
5. **Caching**: Store data in Zustand with session persistence

## Setup & Installation

### Prerequisites

- **Node.js**: `^v24.6.0` or higher
- **npm**: `^11.5.1` or higher
- **Package Manager**: npm

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sporty-technical
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Available Scripts

| Command                  | Description                           |
| ------------------------ | ------------------------------------- |
| `npm run dev`            | Start development server on port 3000 |
| `npm run build`          | Build for production                  |
| `npm run preview`        | Preview production build              |
| `npm run typecheck`      | Run TypeScript type checking          |
| `npm run lint`           | Run ESLint and Stylelint              |
| `npm run prettier`       | Check code formatting                 |
| `npm run prettier:write` | Fix code formatting                   |

## AI Tools used

- Cursor tab completion
- Cursor Agent used to teach zustand
  - Previous experience in React always used Redux, decided to utilize Cursor to assist in learning new zustand tooling
