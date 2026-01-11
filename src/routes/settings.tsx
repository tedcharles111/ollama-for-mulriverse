import { createFileRoute } from '@tanstack/react-router'; import Settings from '../components/Settings'; // Ensure Settings is imported export const Route = createFileRoute('/settings')({
  component: Settings
});