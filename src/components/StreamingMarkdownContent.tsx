import ReactMarkdown from 'react-markdown';

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