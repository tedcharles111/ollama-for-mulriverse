import { useState } from 'react'; import { useOnlineModels } from '../contexts/OnlineModelsContext'; import { Button } from './ui/button'; import { Input } from './ui/input'; import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Ensure this path is correct import { Download, Globe, HardDrive } from 'lucide-react'; import { useToast } from './ui/use-toast';

export default function ModelPicker() {
  const { onlineModels, localModels, isLoading, error, refreshModels } = useOnlineModels();
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedModel, setSelectedModel] = useState<string | null>(null); // This was declared but not used for actual selection, commenting out for now.
  const { toast } = useToast();

  const filteredOnlineModels = onlineModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLocalModels = localModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (modelName: string) => {
    try {
      toast({
        title: "Downloading model",
        description: `Starting download of ${modelName}`,
      });

      // In a real app, you would call the download API here
      // await downloadModel(modelName); // Uncomment if you have a backend endpoint for this
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate download

      toast({
        title: "Download complete",
        description: `${modelName} is now available locally`,
      });

      refreshModels();
    } catch (error) {
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
          className="flex-1"
        />
      </div>

      <Tabs defaultValue="online" className="space-y-4"> <TabsList className="grid w-full grid-cols-2"> <TabsTrigger value="online"> <Globe className="mr-2 h-4 w-4" />
            Online Models
          </TabsTrigger>
          <TabsTrigger value="local"> <HardDrive className="mr-2 h-4 w-4" />
            Local Models
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="space-y-2">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading online models...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Failed to load models: {error.message}</div>
          ) : filteredOnlineModels.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No models found</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-auto">
              {filteredOnlineModels.map(model => (
                <div
                  key={model.name}
                  className={`p-3 rounded-lg border flex justify-between items-center`}
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
            <div className="p-4 text-center text-gray-500">Loading local models...</div>
          ) : filteredLocalModels.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No local models found</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-auto">
              {filteredLocalModels.map(model => (
                <div
                  key={model.name}
                  className={`p-3 rounded-lg border flex justify-between items-center`}
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