import { Avatar, AvatarFallback } from './ui/avatar'; // Ensure this path is correct import { format } from 'date-fns'; import StreamingMarkdownContent from './StreamingMarkdownContent';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: string;
  userName?: string;
}

export default function Message({ content, isUser, timestamp, userName }: MessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}
      <div className="max-w-[80%]"> <div className="flex items-baseline gap-2"> <span className="font-medium text-sm">{isUser ? userName : 'Assistant'}</span>
          <span className="text-xs text-gray-500">
            {format(new Date(timestamp), 'HH:mm')}
          </span>
        </div>
        <div className={`mt-1 p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
          <StreamingMarkdownContent content={content} />
        </div>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}