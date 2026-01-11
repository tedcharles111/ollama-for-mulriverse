import { createFileRoute, redirect } from '@tanstack/react-router'; export const Route = createFileRoute('/  before: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to' });
    }
  },
  component: ChatPage
});

function ChatPage() {
  const { onlineModels, localModels } = Route.useRouteContextonlineModels;
  const { user } = Route.useRouteContext().auth;

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar />
      <div className="flex-1 flex flex-col"> <header className="border-b border-gray-200 p-4 flex justify-between items-center"> <h1 className="text-xl font-bold">Ollama Chat</h1> <div items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <ModelPicker />
          </div>
        </header className="flex-1 overflow-auto p-4">
          <MessageList />
        </main>
        <footer className="border-t border-gray-200 p-4">
          <ChatForm />
        </footer>
      <Settings />
    </div>
  );
}