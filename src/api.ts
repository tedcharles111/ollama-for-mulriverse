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
      isLocal: true
    }));
  } catch (error) {
    console.error('Error fetching local models:', error);
    return [];
  }
}

export async function downloadModel(modelName: string): Promise<void> {
  await ollama.pull({ model: modelName });
}

export async function checkAuthStatus() {
  const response = await fetch('/api/auth/status');
  if (!response.ok) return { isAuthenticated: false };
  return response.json();
}

export async function generateChatCompletion(
  model: string,
  messages: Array<{ role: string; content: string }>,
  isLocal: boolean,
  onStream?: (chunk: string) => void
) {
  const host = isLocal ? 'http://localhost:11434' : 'https://api.ollama.com';
  const ollamaInstance = new Ollama({ host });

  const response = await ollamaInstance.chat({
    model,
    messages,
    stream: true
  });

  for await (const chunk of response) {
    onStream?.(chunk.message.content);
  }
}