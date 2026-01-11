import ReactMarkdown from 'react-markdown'; // Removed React as it's not strictly needed for JSX in modern React

interface StreamingMarkdownContentProps {
  content: string;
}

export default function StreamingMarkdownContent({ content }: StreamingMarkdownContentProps) {
  return (
    <ReactMarkdown>
      {content}
    </ReactMarkdown>
  );
}