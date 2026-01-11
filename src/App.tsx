import { RouterProvider, createRouter } from '@tanstack/react-router'; import { routeTree } from './routeTree.gen'; import { AuthProvider, useAuth } from './contexts/AuthContext'; import { OnlineModelsProvider } from './contexts/OnlineModelsContext';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    onlineModels: undefined!
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth();
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