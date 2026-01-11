import React from 'react'; import { Button } from './ui/button'; import { Input } from './ui/input'; import { Label } from './ui/label'; import { Switch } from './ui/switch'; import { useAuth } from '../contexts/AuthContext'; import { Link } from '@tanstack/react-router';

export default function Settings() {
  const { user } = useAuth();
  const [apiEndpoint, setApiEndpoint] = React.useState('https://api.ollama.com');
  const [useLocalModels, setUseLocalModels] = React.useState(false);

  const handleSave = () => {
    localStorage.setItem('ollamaApiEndpoint', apiEndpoint); localStorage.setItem('useLocalModels', useLocalModels.toString()); alert('Settings saved!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> <div className="bg-white rounded-lg p-6 w-full max-w-md"> <h2 className="text-xl font-bold mb-4">Settings</h2> <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label> <Input id="name" value={user?.name || ''} readOnly className="mt-1" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label> <Input id="email" value={user?.id || ''} readOnly className="mt-1" />
          </div>

          <div>
            <Label htmlFor="apiEndpoint">Ollama API Endpoint</Label>
            <Input
              id="apiEndpoint" type="url"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between"> <Label htmlFor="useLocalModels">Prefer Local Models</Label>
            <Switch
              id="useLocalModels"
              checked={useLocalModels}
              onCheckedChange={setUseLocalModels}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4"> <Link to="/"> <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}