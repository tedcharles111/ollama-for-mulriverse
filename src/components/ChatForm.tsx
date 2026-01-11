import { useState } from 'react'; import { Button } from './ui/button'; import { Input } from './ui/input'; import { Send, Paperclip } from 'lucide-react'; import { useOnlineModels } from '../contexts/OnlineModelsContext'; import { generateChatCompletion } from '../api'; import { useToast } from './ui/use-toast';

export default function ChatForm() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { localModels } = useOnlineModels();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const selectedModel = localModels.length > 0 ? localModels[0].name : 'llama2';
      const isLocal = localModels.some(model => model.name === selectedModel);

      await generateChatCompletion(
        selectedModel,
        [
          { role: 'user', content: message }
        ],
        isLocal,
        (chunk: string) => {
          console.log(chunk);
        }
      );

      setMessage('');
    } catch (error) {
      toast({
        title: "Error", description: "Failed to send message", variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2"> <Button type="button" variant="ghost" size="icon"> <Paperclip className="h-4 w-4" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..." className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !message.trim()}> <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}