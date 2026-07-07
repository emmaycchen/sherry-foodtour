"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Footer mail social link that never exposes the full address in the
 * server-rendered HTML. Mirrors ObfuscatedEmail: the local part is passed in
 * reversed and only reassembled client-side inside useEffect. Renders the same
 * <a> + <Image> markup as the other Footer socials so it stays pixel-identical;
 * pre-hydration it falls back to href="#".
 */
export default function ObfuscatedMailLink({
  reversedLocal,
  domain,
  tld,
  icon,
  w,
  h,
}: {
  reversedLocal: string;
  domain: string;
  tld: string;
  icon: string;
  w: number;
  h: number;
}) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const local = reversedLocal.split("").reverse().join("");
    setEmail(`${local}@${domain}.${tld}`);
  }, [reversedLocal, domain, tld]);

  return (
    <a
      href={email ? `mailto:${email}` : "#"}
      aria-label="Email"
      className="flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-70"
    >
      <Image src={icon} alt="" width={w} height={h} className="object-contain" />
    </a>
  );
}
