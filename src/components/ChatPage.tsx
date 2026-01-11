import { useAuth } from '../contexts/AuthContext'; import ChatSidebar from './ChatSidebar'; import ModelPicker from './ModelPicker'; import MessageList from './MessageList'; import ChatForm from './ChatForm';

export default function ChatPage() {
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
    </div>
  );
}