'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Flame, TrendingUp, AlertTriangle, HelpCircle } from 'lucide-react';
import { FuturePrediction } from '@/types';

interface PredictorCardProps {
  predictions: FuturePrediction[];
}

export default function PredictorCard({ predictions }: PredictorCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  if (!predictions || predictions.length === 0) {
    return (
      <div className="text-center py-12 border border-zinc-900 rounded-2xl bg-zinc-950/40 text-zinc-500">
        No predictions generated for this world.
      </div>
    );
  }

  const activePrediction = predictions[selectedIdx];

  // Dynamic values for mock stats to enhance layout visuals
  const impactScore = selectedIdx === 0 ? 84 : 95;
  const complexityScore = selectedIdx === 0 ? 70 : 88;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Selector Timeframes */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center">
        {predictions.map((pred, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${selectedIdx === idx
              ? 'bg-neon-cyan text-zinc-950 border-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
          >
            <Compass className="w-4 h-4" />
            Time Horizon: {pred.timeframe}
          </button>
        ))}
      </div>

      {/* Prediction Details Board */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIdx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Trend Card */}
          <div className="lg:col-span-2 glass-card p-8 rounded-2xl border border-neon-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.03)] flex flex-col justify-between min-h-[320px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-neon-cyan/5">
              <TrendingUp className="w-36 h-36" />
            </div>

            <div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25 inline-flex items-center gap-1 mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                Active Industry Shift
              </span>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                {activePrediction.trend}
              </h3>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {activePrediction.prediction}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-900/60 flex items-center gap-2 text-zinc-500 text-xs">
              <Compass className="w-4 h-4 text-neon-cyan" />
              <span>Forecast modeled by Chronos AI for the {activePrediction.timeframe} horizon.</span>
            </div>
          </div>

          {/* Stats & Obstacles Card */}
          <div className="space-y-6">
            {/* Impact Gauges */}
            <div className="glass-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                Disruption Metrics
              </h4>

              <div className="space-y-4">
                {/* Impact Gauge */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Industry Impact</span>
                    <span className="font-semibold text-neon-cyan">{impactScore}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden">
                    <div
                      className="h-full bg-neon-cyan transition-all duration-500"
                      style={{ width: `${impactScore}%` }}
                    />
                  </div>
                </div>

                {/* Complexity Gauge */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Implementation Difficulty</span>
                    <span className="font-semibold text-orange-400">{complexityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden">
                    <div
                      className="h-full bg-orange-400 transition-all duration-500"
                      style={{ width: `${complexityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Challenges */}
            <div className="glass-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Technical Hurdles
              </h4>

              <div className="flex flex-col gap-2">
                {activePrediction.challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-900 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
