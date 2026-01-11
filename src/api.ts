import { Ollama } from 'ollama'; const ollama = new Ollama({ host: 'https://api.ollama.com' });

export interface Model {
  name: string;
  size: number;
  modified_at: string;
  digest: string;
  details: {
    parameter_size: string;
    quantization_level: string;
    family: string;
  };
  isLocal?: boolean;
}

export async function fetchOnlineModels(): Promise<Model[]> {
  try {
    const response = await fetch('https://api.ollama.com/api/tags'); if (!response.ok) throw new Error('Failed to fetch online models');
    const data = await response.json();
    return data.models.map((model: any) => ({
      ...model,
      modified_at: model.modified_at.toString(),
      isLocal: false
    }));
  } catch (error) {
    console.error('Error fetching online models:', error);
    return [];
  }
}

export async function fetchLocalModels(): Promise<Model[]> {
  try {
    const response = await ollama.list();
    return response.models.map(model => ({
      ...model,
      modified_at: model.modified_at.toString(),
      isLocal: true
    }));
  } catch (error) {
    console.error('Error fetching local models:', error);
    return [];
  }
}

// ... rest of the api.ts file remains the same ...