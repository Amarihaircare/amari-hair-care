"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function PurifiedHtml({ html }: { html: string }) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    if (html.length === 0) return;

    const domPurify = DOMPurify(window);
    const cleanHtml = domPurify.sanitize(html);
    setSanitizedHtml(cleanHtml);
  }, [html]);

  if (!sanitizedHtml) return <></>;

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
