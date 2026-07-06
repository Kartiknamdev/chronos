'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, GitBranch, Terminal, Globe, HelpCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-zinc-800/60 h-16 flex items-center px-6 justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-cyan via-neon-indigo to-neon-purple flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.25)] group-hover:scale-105 transition-transform duration-300">
          <Compass className="w-5 h-5 text-zinc-950 font-bold" />
        </div>
        <div>
          <span className="font-bold text-sm tracking-tight text-white group-hover:text-neon-cyan transition-colors">
            Chronos <span className="text-neon-cyan/85">AI</span>
          </span>
        </div>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5" />
          Worlds
        </Link>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5" />
          Open Source
        </a>
      </nav>

      {/* Action / Badges */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
          <Terminal className="w-3 h-3 text-neon-cyan" />
          <span>v1.0.0</span>
        </div>
      </div>
    </header>
  );
}
