import { useState, useEffect } from 'react'; import { useOnlineModels } from '../contexts/OnlineModelsContext';

export default function useSelectedModel() {
  const { localModels } = useOnlineModels();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  useEffect(() => {
    // Default to first local model if available, otherwise use first online model
    if (localModels.length > 0 && !selectedModel) {
      setSelectedModel(localModels[0].name);
    }
  }, [localModels, selectedModel]);

  const isLocal = localModels.some(model => model.name === selectedModel);

  return {
    selectedModel,
    setSelectedModel,
    isLocal
  };
}