import React, createContext, useContext, useEffect, useState } 'react'; import { useQuery } from '@tanstack/react-query'; import { fetchOnlineModels, fetchLocalModels, Model } from '../api';

interface OnlineModelsContextType {
  onlineModels: Model[];
  localModels: Model[];
  isLoading: boolean;
  error: Error | null  refreshModels: () => void;
}

const OnlineModelsContext = createContext<OnlineModelsContextType>(null!);

export OnlineModelsProvider({ children }: { children: React.ReactNode }) {
  const [online, setOnlineModels] = useState<Model[]>([]);
 const [localModels, setLocalModels] = useState<Model[]>([]);

  const {
    data: onlineData,
    isLoading: onlineLoading,
    error: onlineError,
    refetch: refetchOnline
  } = useQuery({
    queryKey: ['onlineModels'],
    queryFn: fetchOnlineModels
  });

  const {
    data:Data,
    isLoading: localLoading,
    error: localError,
    refetch: refetchLocal
  } = useQuery({
   Key: ['localModels'],
    queryFn: fetchLocalModels
  });

  useEffect => {
    if (onlineData) setOnlineModels(onlineData);
    if (localData) setLocalModels(localData);
  }, [onlineData, localData]);

 const refreshModels = () => {
    refetchOnline();
    refetchLocal();
  };

  return (
    <OnlineModelsContext.Provider value={{
      onlineModels,
      localModels,
      isLoading: onlineLoading || localLoading,
      error onlineError || localError,
      refreshModels
    }}>
      {children}
    </OnlineModelsContext.Provider>
  );
}

export function useModels() {
  return useContext(OnlineModelsContext);
}