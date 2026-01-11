import { RouterProvider, createRouter } from '@tanstack/react-router'; import { routeTree } from './routeTree.gen'; import { AuthProvider, useAuth } from './contexts/AuthContext'; import { OnlineModelsProvider } from './contexts/OnlineModelsContext'; import React from 'react'; // Keep React import for createRoot in main.tsx

// Register your router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
  // Define context for routes. Only 'auth' is explicitly managed via router context. // 'onlineModels' is accessed via its own hook directly within components.
  context: {
    auth: undefined!, // Will be set by the AuthProvider
  }
});

function InnerApp() {
  const auth = useAuth(); // Get auth from AuthContext
  // Render the router with the actual auth context
  return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
  return (
    <AuthProvider>
      <OnlineModelsProvider>
        <InnerApp />
      </OnlineModelsProvider>
    </AuthProvider>
  );
}