'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Compass, Search, Sparkles, Tv, Camera, HelpCircle, ArrowRight, Smartphone, Cpu, Database } from 'lucide-react';

const PRESETS = [
  {
    title: 'How Netflix Evolved',
    prompt: 'netflix',
    category: 'Evolution Explorer',
    icon: Tv,
    glow: 'hover:border-neon-cyan/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    textGlow: 'group-hover:text-neon-cyan'
  },
  {
    title: 'Design Instagram',
    prompt: 'instagram',
    category: 'System Designer',
    icon: Camera,
    glow: 'hover:border-neon-blue/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    textGlow: 'group-hover:text-neon-blue'
  },
  {
    title: 'What if Linux never existed?',
    prompt: 'what if linux never existed',
    category: 'What If Simulator',
    icon: HelpCircle,
    glow: 'hover:border-neon-purple/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]',
    textGlow: 'group-hover:text-neon-purple'
  },
  {
    title: 'What if HTTP never existed?',
    prompt: 'what if http never existed',
    category: 'What If Simulator',
    icon: HelpCircle,
    glow: 'hover:border-neon-pink/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]',
    textGlow: 'group-hover:text-neon-pink'
  }
];

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // URL-encode prompt to route to the dynamic page
    const encoded = encodeURIComponent(query.trim().toLowerCase());
    router.push(`/world/${encoded}`);
  };

  const handlePresetClick = (prompt: string) => {
    const encoded = encodeURIComponent(prompt);
    router.push(`/world/${encoded}`);
  };

  return (
    <div className="min-h-screen bg-grid-pattern bg-radial-gradient flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Absolute Decorative Glow Spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-indigo/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl text-center space-y-8 z-10">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
          <span>Next-Generation Knowledge Simulator</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500 pb-1 leading-tight">
            Explore the Past.<br />
            Understand the Present.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple">
              Imagine the Future.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Chronos AI compiles complex technological topics, software architectures, and alternative histories into beautiful, interactive dashboards.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearchSubmit} className="relative group">
            {/* Background Glow Ring */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple rounded-2xl opacity-15 group-hover:opacity-40 blur-md transition duration-500" />

            <div className="relative flex items-center h-14 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-hidden px-4 gap-3">
              <Search className="w-5 h-5 text-zinc-500 shrink-0" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What would you like to explore? (e.g. React Evolution, Design Spotify...)"
                className="w-full h-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
              />

              <button
                type="submit"
                disabled={!query.trim()}
                className="px-4 h-9 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold font-sans transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Simulate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Preset Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="text-left max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Popular Preset Worlds
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {PRESETS.map((preset, idx) => {
              const Icon = preset.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handlePresetClick(preset.prompt)}
                  className={`glass-card p-4 rounded-xl cursor-pointer flex items-center justify-between group ${preset.glow}`}
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 font-semibold block uppercase tracking-wider font-mono">
                        {preset.category}
                      </span>
                      <h3 className={`text-sm font-bold text-zinc-200 ${preset.textGlow} transition-colors`}>
                        {preset.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* Left side decoration: Floating Timeline */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ 
          opacity: 0.55, 
          x: 0,
          y: ['-50%', '-52%', '-50%'] 
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }}
        className="absolute left-6 2xl:left-16 top-1/2 w-64 hidden xl:flex flex-col items-start select-none pointer-events-none"
      >
        {/* Dotted Vertical Track */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-neon-purple/50 via-neon-cyan/50 to-transparent" />
        
        {/* Milestone Node 1 */}
        <div className="flex items-center gap-4 relative pl-10 mb-10">
          <div className="absolute left-2.5 w-3 h-3 rounded-full bg-neon-purple border border-black shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          <div className="glass-card p-3 rounded-xl border border-neon-purple/10 max-w-[180px]">
            <span className="text-[10px] font-mono text-neon-purple font-semibold block">1991</span>
            <span className="text-[11px] text-zinc-300 font-bold block">Linux Kernel v0.01</span>
          </div>
        </div>

        {/* Milestone Node 2 */}
        <div className="flex items-center gap-4 relative pl-10 mb-10">
          <div className="absolute left-2.5 w-3 h-3 rounded-full bg-neon-cyan border border-black shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <div className="glass-card p-3 rounded-xl border border-neon-cyan/10 max-w-[180px]">
            <span className="text-[10px] font-mono text-neon-cyan font-semibold block">2010</span>
            <span className="text-[11px] text-zinc-300 font-bold block">AWS Cloud Shift</span>
          </div>
        </div>

        {/* Milestone Node 3 */}
        <div className="flex items-center gap-4 relative pl-10">
          <div className="absolute left-2.5 w-3 h-3 rounded-full bg-neon-pink border border-black shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          <div className="glass-card p-3 rounded-xl border border-neon-pink/10 max-w-[180px]">
            <span className="text-[10px] font-mono text-neon-pink font-semibold block">2015</span>
            <span className="text-[11px] text-zinc-300 font-bold block">HTTP/2 Release</span>
          </div>
        </div>
      </motion.div>

      {/* Right side decoration: System Architecture Flow */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ 
          opacity: 0.55, 
          x: 0,
          y: ['-50%', '-48%', '-50%'] 
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          y: { repeat: Infinity, duration: 7, ease: "easeInOut" }
        }}
        className="absolute right-6 2xl:right-16 top-1/2 w-64 hidden xl:flex flex-col items-end select-none pointer-events-none h-[320px]"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <path 
            d="M 172 40 L 128 140 L 168 260" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.05)" 
            strokeWidth="2" 
          />
          <motion.path 
            d="M 172 40 L 128 140 L 168 260" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeDasharray="20 120"
            animate={{ strokeDashoffset: [0, -140] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </svg>

        {/* Node 1 */}
        <div className="absolute top-0 right-4 glass-card p-3 rounded-xl border border-neon-cyan/10 min-w-[160px] flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-neon-cyan shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono text-neon-cyan block">CLIENT</span>
            <span className="text-[11px] text-zinc-300 font-bold block">Mobile Device</span>
          </div>
        </div>

        {/* Node 2 */}
        <div className="absolute top-[120px] right-12 glass-card p-3 rounded-xl border border-neon-blue/10 min-w-[160px] flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-neon-blue shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono text-neon-blue block">GATEWAY</span>
            <span className="text-[11px] text-zinc-300 font-bold block">API Router</span>
          </div>
        </div>

        {/* Node 3 */}
        <div className="absolute top-[240px] right-2 glass-card p-3 rounded-xl border border-neon-indigo/10 min-w-[160px] flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-neon-indigo shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono text-neon-indigo block">DATASTORE</span>
            <span className="text-[11px] text-zinc-300 font-bold block">Cassandra DB</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
