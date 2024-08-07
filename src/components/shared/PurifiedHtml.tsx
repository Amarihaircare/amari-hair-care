"use client";
import DOMPurify from "dompurify";

export default function PurifiedHtml({ html }: { html: string }) {
  const sanitizedDescription = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />;
}
