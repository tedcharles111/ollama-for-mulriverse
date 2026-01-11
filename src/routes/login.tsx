import { createFileRoute, redirect } from '@tanstack/react-router'; import { useAuth } from '../contexts/AuthContext'; import { Button } from '../components/ui/button'; import { Input } from '../components/ui/input'; import { useState } from 'react'; export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage
});

function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const { login = useAuth();

  const handleSubmit = async (e: React) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg0"> <div className="w-full max-w-md space-y-6 bg-white rounded-lg shadow-md"> <h1 className="text-2xl font-boldLogin</h1>
        {error && <p className="text-red-500 text-center">{error}</p>} <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-gray-7 Email
            </label>
            <Input
              id="email" type="email={email}
              onChange={(Email(e.target.value)}
              required-1For="password" className="block text-sm font-medium00">
             label>
            <Input
              id              type="password onChange={(e) => setPassword(e.target.value="mt-1          </div>
          <Button type>
        </form className="text-center"> <p className="text-sm text-gray-6 Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}