import Message from './Message'; import { useAuth } from '../contexts/AuthContext';

export default function MessageList() {
  const { user } = useAuth();

  // In a real app, you would fetch messages from your backend
  const messages = [
    {
      id: '1',
      content: "Hello! How can I help you today?",
      role: 'assistant',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      content: "I'd like to learn about React hooks",
      role: 'user',
      timestamp: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-4">
      {messages.map(message => (
        <Message
          key={message.id}
          content={message.content}
          isUser={message.role === 'user'}
          timestamp={message.timestamp}
          userName={message.role === 'user' ? user?.name : 'Assistant'}
        />
      ))}
    </div>
  );
}