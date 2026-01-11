import { createFileRoute, redirect } from '@tanstack/react-router'; import ChatPage from './components/ChatPage'; import { useAuth } from './contexts/AuthContext'; export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: ChatPage
});