import React from 'react'; import { Button } from './ui/button'; import { Plus, MessageSquare, Settings } from 'lucide-react'; import { useAuth } from '../contexts/AuthContext';

export default function ChatSidebar() {
  const { logout } = useAuth();

  // In a real app, you would fetch chats from your backend
  const chats = [
    { id: '1', title: 'Getting started with React', updatedAt: new Date() }, { id: '2', title: 'Ollama models comparison', updatedAt: new Date() }
  ];

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col bg-white"> <div className="p-4 border-b border-gray-200"> <Button className="w-full" variant="outline"> <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            <div className="font-medium truncate">{chat.title}</div> <div className="text-xs text-gray-500">
              {chat.updatedAt.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 space-y-2"> <Button variant="ghost" className="w-full justify-start"> <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}