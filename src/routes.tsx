import { createFileRoute, redirect } from '@tanstack/react-router'; import ChatPage from './components/ChatPage'; import { useAuth } from './contexts/AuthContext'; import { useOnlineModels } from './contexts/OnlineModelsContext'; import ChatSidebar from './components/ChatSidebar'; import ModelPicker from './components/ModelPicker'; import MessageList from './components/MessageList'; import ChatForm from './components/ChatForm'; import Settings from './components/Settings'; export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: ChatPage
});

function ChatPage() {
  const { onlineModels } = useOnlineModels();
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar />
      <div className="flex-1 flex flex-col"> <header className="border-b border-gray-200 p-4 flex justify-between items-center"> <h1 className="text-xl font-bold">Ollama Chat</h1> <div className="flex items-center gap-4"> <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <ModelPicker />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <MessageList />
        </main>
        <footer className="border-t border-gray-200 p-4">
          <ChatForm />
        </footer>
      </div>
      <Settings />
    </div>
  );
}