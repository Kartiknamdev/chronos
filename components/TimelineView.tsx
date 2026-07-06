'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Cpu, ShieldAlert, ArrowRight, X, Sparkles } from 'lucide-react';
import { TimelineEvent } from '@/types';

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export default function TimelineView({ timeline }: TimelineViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-zinc-800 transform -translate-x-1/2" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-12 relative"
      >
        {timeline.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          
          return (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-start md:items-center relative ${
                isLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot on central line */}
              <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-background border-2 border-neon-cyan transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

              {/* Spacer / Content holder for positioning */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <div 
                  onClick={() => setSelectedEvent(event)}
                  className="glass-card p-6 rounded-xl cursor-pointer hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden group"
                >
                  {/* Glowing background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Year Tag */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.year}
                    </span>
                    {event.isMilestone && (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Major Milestone
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-neon-cyan transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center text-xs text-neon-cyan font-medium group-hover:gap-2 transition-all">
                    <span>Explore details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Empty spacer for desktop layout symmetry */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail Slide Panel (Modal overlay) */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              className="relative w-full max-w-lg h-full glass-panel border-l border-zinc-800 p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedEvent.year}
                  </span>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {selectedEvent.title}
                </h2>
                
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 bg-zinc-950/40 p-4 rounded-xl border border-zinc-900">
                  {selectedEvent.description}
                </p>

                {/* Technologies Introduced */}
                {selectedEvent.technologies && selectedEvent.technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-neon-cyan" />
                      Technologies Introduced
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Decisions */}
                {selectedEvent.decisions && selectedEvent.decisions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-neon-purple" />
                      Key Decisions Made
                    </h4>
                    <ul className="space-y-2">
                      {selectedEvent.decisions.map((decision, i) => (
                        <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-1.5 shrink-0" />
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Industry Impact */}
                {selectedEvent.impact && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Industry Impact
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed italic">
                      "{selectedEvent.impact}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-900">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-sm font-semibold border border-zinc-800 text-zinc-200 transition-colors"
                >
                  Close Exploration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
