import React, { createContext, useContext, useEffect, useState } from 'react'; import { useQuery } from '@tanstack/react-query'; import { fetchOnlineModels, fetchLocalModels, Model } from '../api';

interface OnlineModelsContextType {
  onlineModels: Model[];
  localModels: Model[];
  isLoading: boolean;
  error: Error | null; // Added semicolon
  refreshModels: () => void;
}

const OnlineModelsContext = createContext<OnlineModelsContextType>(null!);

export function OnlineModelsProvider({ children }: { children: React.ReactNode }) { // Added 'function' keyword
  const [onlineModels, setOnlineModels] = useState<Model[]>([]); // Corrected variable name
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
    data: localData, // Corrected variable name
    isLoading: localLoading,
    error: localError,
    refetch: refetchLocal
  } = useQuery({
    queryKey: ['localModels'], // Corrected property name
    queryFn: fetchLocalModels
  });

  useEffect(() => { // Added parentheses for useEffect callback
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
      error: onlineError || localError, // Added colon
      refreshModels
    }}>
      {children}
    </OnlineModelsContext.Provider>
  );
}

export function useOnlineModels() { // Corrected function name for consistency
  return useContext(OnlineModelsContext);
}