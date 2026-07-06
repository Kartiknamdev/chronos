'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, AlertCircle, ArrowRight, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';
import { WhatIfData, TimelineEvent } from '@/types';

interface WhatIfBranchingProps {
  whatIfData: WhatIfData;
}

export default function WhatIfBranching({ whatIfData }: WhatIfBranchingProps) {
  const [activeBranch, setActiveBranch] = useState<'alternate' | 'original'>('alternate');

  const { metadata, originalTimeline, branchPoint, alternativeTimeline, consequences } = whatIfData;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Simulation Header */}
      <div className="glass-card p-6 rounded-2xl border border-neon-purple/20 shadow-[0_0_20px_rgba(168,85,247,0.05)] mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 text-neon-purple/20">
          <GitBranch className="w-16 h-16" />
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/25 inline-flex items-center gap-1.5 mb-3 font-semibold">
          <GitBranch className="w-3.5 h-3.5" />
          Alternate Reality Simulation
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
          {metadata.name}
        </h2>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          {metadata.description}
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex justify-center mb-8">
        <div className="p-1 rounded-xl bg-zinc-950 border border-zinc-900 flex gap-2">
          <button
            onClick={() => setActiveBranch('alternate')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeBranch === 'alternate'
                ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Explore Alternate Timeline
          </button>
          <button
            onClick={() => setActiveBranch('original')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeBranch === 'original'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Review Original History
          </button>
        </div>
      </div>

      {/* Timeline Layout */}
      {activeBranch === 'alternate' ? (
        <div className="space-y-8 relative">
          {/* Divergence Point Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-xl mx-auto p-6 rounded-2xl border-2 border-dashed border-neon-purple/40 shadow-[0_0_25px_rgba(168,85,247,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-neon-purple text-white text-[9px] px-3 py-1 rounded-bl-xl font-bold uppercase tracking-wider">
              Branch Point
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/20 text-neon-purple shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-neon-purple font-bold block mb-1 font-mono uppercase">
                  Divergence Year: {branchPoint.year}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {branchPoint.divergencePrompt}
                </h3>
                <p className="text-zinc-300 text-xs leading-relaxed border-t border-zinc-900 pt-2 mt-2">
                  <span className="font-bold text-red-400">Change Event:</span> {branchPoint.alternativeEvent}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Alternate Timeline milestones */}
          <div className="relative max-w-3xl mx-auto pl-6 md:pl-0 pt-4">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-purple via-neon-pink to-zinc-900 transform -translate-x-1/2" />

            <div className="space-y-10 relative">
              {alternativeTimeline.map((event, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex flex-col md:flex-row items-start md:items-center relative ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle Dot */}
                    <div className="absolute left-6 md:left-1/2 top-5 md:top-1/2 w-3.5 h-3.5 rounded-full bg-background border-2 border-neon-purple transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />

                    {/* Spacer / Content holder */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-6">
                      <div className="glass-card p-5 rounded-xl border border-neon-purple/10 hover:border-neon-purple/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-neon-purple font-mono bg-neon-purple/5 px-2 py-0.5 rounded border border-neon-purple/10">
                            {event.year}
                          </span>
                          {event.isMilestone && (
                            <span className="text-[9px] font-bold bg-neon-pink/10 text-neon-pink border border-neon-pink/20 px-2 py-0.5 rounded-full uppercase">
                              Alternate Shift
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-foreground mb-1.5">{event.title}</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                          {event.description}
                        </p>

                        {/* Tech & decisions chips */}
                        <div className="space-y-2 border-t border-zinc-900/60 pt-2 text-[10px]">
                          {event.technologies.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-zinc-500 font-medium">New Tech:</span>
                              {event.technologies.map((t, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                          {event.decisions.length > 0 && (
                            <div className="flex flex-col gap-1">
                              <span className="text-zinc-500 font-medium">Decisions:</span>
                              {event.decisions.map((d, i) => (
                                <span key={i} className="text-zinc-400 flex items-start gap-1">
                                  <span className="w-1 h-1 rounded-full bg-neon-purple mt-1.5 shrink-0" />
                                  <span>{d}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Long Term Consequences panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card max-w-2xl mx-auto p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 mt-12"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-neon-pink" />
              Long-Term Consequences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consequences.map((cons, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-900 flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-pink mt-2 shrink-0 animate-pulse" />
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {cons}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        /* Real History View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto relative pl-6 border-l border-zinc-800 space-y-6"
        >
          {originalTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-zinc-400 group-hover:bg-zinc-400 transition-colors" />
              <span className="text-xs font-mono text-zinc-500 font-bold block mb-0.5">
                {item.year}
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {item.event}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
