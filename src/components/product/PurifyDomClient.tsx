"use client";

import DOMPurify from "dompurify";

interface PurifyDomClientProps {
  text: string;
}

export default function PurifyDomClient({ text }: PurifyDomClientProps) {
  return (
    <p
      className="text-sm"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(text),
      }}
    />
  );
}
