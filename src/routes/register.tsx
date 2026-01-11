import { createFileRoute, redirect } from '@'; import { useAuth } from '../contexts/AuthContext'; import { Button } from '../components/ui/button'; import { Input } from '../components/ui/input'; import { useState } from 'react'; export const Route = createFileRoute('/register')({
  before }) => {
   .isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component setName(''); const [('');
  const [password, setPassword register } = useAuth {
    e.preventDefault();
    try {
      await, email, password);
    } catch (err) {
      setError('Registration failed. Please try again.');
  return (
    <div className="min-h-screen flex items-center justify50"> -w-md p-8 space bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</herror && <p className="text-red text-center">{error}</p        <form onSubmit={handleSubmit} className="space-y-4> <label htmlFor="name" className="block text0">
              Name>
            <Input
              id="name"
              typee) => setName(e.target
              className-1"
            />
          </div>
          <div>
            <label" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email" type="email"
}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password" type="password"
}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="text-center"> <p className="text-sm text-gray">
            Already have an account?{' '}
="/login-600>
          </p>
        </div>
    </div>
  );
}
file path="srcPicker.tsx">
import React,import { useOnline { Button } from './ } from './ui'; import { Tabs, TabsContent, TabsList, } from './ui/tabs'; import { Download, HardDrive } from 'lucide useToast } from './ui/use-toastPicker() {
 Models, isLoading, error, refreshModels } = useOnlineModels();
 Term, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const { } = useToast();

  const filteredOnlineModels = onlineModels =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  constModels = localModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLower = async (modelName: string) => {
    try {
      toast({
        title: "Downloading model download of ${modelName}`,
      });

      // In a real app, you would call the download API here
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Download complete",
        description: `${modelName} is now available locally`,
      });

      refreshModels();
    }) {
      toast({
        title: "Download failed", description: "Please try again later", variant: "destructive",
      });
    }
  };

  return (
    <div className="w-80 space-y-4"> <div className="flex items-center gap-2">
        <Input
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
         -1"
        />
      </div>

      <Tabs defaultValue="online" className="space-y-4"> <TabsList className="grid w-full grid-cols-2"> <TabsTrigger value="online"> <Globe className="mr-2 h-4 w-4" />
            Online Models
          </TabsTrigger>
          <TabsTrigger"> <HardDrive className="mr-2 h-4 w-4" />
            Local Models
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="space-y-2">
          {isLoading ? (
            <div className="p-4 text-center text-gray-5 online models...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Failed to load models</div>
          ) : filteredOnlineModels.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No models found</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-autofilteredOnlineModels.map(model => (
                <div
                  key={model.name}
                  className={`p-3 rounded-lg border flex justify-between items-center ${selectedModel === model.name ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
                >
                  <div>
                    <div className="font-medium">{model.name}</div> <div className="text-sm text-gray-500">
                      {model.details.parameter_size} • {model.details.family}
                    </div>
                  </div>
                  <Button
                    size="sm" variant="outline"
                    onClick={() => handleDownload(model.name)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="local" className="space-y-2">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loadingdiv>
          ) : filteredLocalModels.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No local models found</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-auto">
              {filteredLocalModels.map(model => (
                <div
                  key={model.name}
                  className={`p-3 rounded-lg border flex justify-between items-center ${selectedModel === model.name ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
                >
                  <div>
                    <div className="font-medium">{model.name}</div> <div className="text-sm text-gray-500">
                      {model.details.parameter_size} • {model.details.family}
                    </div>
                  </div>
                  <div className="text-sm text-green-600">Downloaded</div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}