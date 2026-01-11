import { Ollama } from 'ollama';

class OllamaClient {
  private static instance: Ollama;
  private static localInstance: Ollama;

  public static getOnlineClient(): Ollama {
    if (!OllamaClient.instance) {
      OllamaClient.instance = new Ollama({
        host: 'https://api.ollama.com'
      });
    }
    return OllamaClient.instance;
  }

  public static getLocalClient(): Ollama {
    if (!OllamaClient.localInstance) {
      OllamaClient.localInstance = new Ollama({
        host: 'http://localhost:11434'
      });
    }
    return OllamaClient.localInstance;
  }

  public static getClient(isLocal: boolean): Ollama {
    return isLocal ? OllamaClient.getLocalClient() : OllamaClient.getOnlineClient();
  }
}

export default OllamaClient;