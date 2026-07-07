"use client";

import { useEffect, useState } from "react";

/**
 * Renders an email address as a mailto: link without ever exposing the full
 * address in the server-rendered HTML. The address is passed in obfuscated
 * parts (the local part reversed) and only reassembled client-side inside
 * useEffect, so page source / scrapers only see the fallback placeholder.
 */
export default function ObfuscatedEmail({
  reversedLocal,
  domain,
  tld,
  className = "underline underline-offset-2 transition-opacity hover:opacity-70",
}: {
  reversedLocal: string;
  domain: string;
  tld: string;
  className?: string;
}) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const local = reversedLocal.split("").reverse().join("");
    setEmail(`${local}@${domain}.${tld}`);
  }, [reversedLocal, domain, tld]);

  // Pre-hydration fallback — this is all that appears in the SSR output.
  if (!email) {
    return <span>[email protected]</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
