import React from 'react'; import { RouterProvider, createRouter } from '@tanstack/react-router'; import { routeTree } from './routeTree.gen'; import { AuthProvider, useAuth } from './contexts/AuthContext'; import { OnlineModelsProvider } from './contexts/OnlineModelsContext';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    onlineModels: undefined!
  }
});

function InnerApp() {
  const auth = useAuth();
  const onlineModels = useOnlineModels();

  return <RouterProvider router={router} context={{ auth, onlineModels }} />;
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