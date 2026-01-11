import { createFileRoute } from '@tanstack/react-router'; import ChatPage from '../components/ChatPage'; // Ensure ChatPage is imported export const Route = createFileRoute('/c/$chatId')({
  component: ChatPage
});