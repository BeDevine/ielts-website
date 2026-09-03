"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/quiz", label: "Level check" },
  { href: "/blog", label: "Tips" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function SiteHeader({ showTagline = false }: { showTagline?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line relative">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <img src="/trielts-icon.png" alt="" className="h-8 w-auto" />
          <div>
            <span className="font-display text-lg tracking-tight">
              <span className="text-[#D4293C]">TR</span>
              <span className="text-ink">IELTS</span>
            </span>
            {showTagline && (
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                Try and you shall succeed
              </p>
            )}
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brass transition-colors">
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-4 py-1.5 text-xs uppercase tracking-wide text-paper hover:bg-brass transition-colors"
          >
            Request a consultation
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-ink/20 px-4 py-1.5 text-xs uppercase tracking-wide hover:border-brass hover:text-brass transition-colors"
          >
            Teacher login
          </Link>
        </nav>

        {/* Mobile: compact CTA + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-4 py-1.5 text-xs uppercase tracking-wide text-paper"
          >
            Contact
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-line"
          >
            <span className={`h-px w-4 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-line bg-paper px-6 py-4 flex flex-col gap-4 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-brass transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="hover:text-brass transition-colors">
            Teacher login
          </Link>
        </nav>
      )}
    </header>
  );
}
