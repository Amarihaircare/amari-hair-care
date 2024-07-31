import DOMPurify from "dompurify";

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  const sanitizedDescription = DOMPurify.sanitize(description);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />;
}
