'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Calendar,
  Cpu,
  Sparkles,
  HelpCircle,
  Tv,
  ListFilter,
  Layers,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Bookmark,
  FileText,
  AlertCircle
} from 'lucide-react';

import Header from '@/components/Header';
import TimelineView from '@/components/TimelineView';
import SystemDesigner from '@/components/SystemDesigner';
import WhatIfBranching from '@/components/WhatIfBranching';
import PredictorCard from '@/components/PredictorCard';
import { GenerateAPIResponse, WorldData, WhatIfData } from '@/types';

const LOADING_STEPS = [
  'Connecting to Chronos temporal database...',
  'Extracting historical technology milestones...',
  'Mapping structural nodes and microservices...',
  'Resolving system dependency relationships...',
  'Simulating potential alternative timelines...',
  'Rerendering interactive visualization engine...'
];

export default function WorldDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params.id as string;
  const decodedPrompt = decodeURIComponent(rawId);

  // States
  const [loading, setLoading] = useState(true);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<GenerateAPIResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'architecture' | 'tech' | 'future' | 'facts'>('timeline');

  // Loading steps animation loop
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  // Fetch data from API
  useEffect(() => {
    if (!decodedPrompt) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: decodedPrompt }),
        });

        if (!res.ok) {
          throw new Error('Failed to generate simulation. Server returned an error.');
        }

        const data: GenerateAPIResponse = await res.json();
        setResponse(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedPrompt]);

  // Loading View
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Glowing background shapes */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />

        <div className="text-center space-y-6 max-w-sm z-10">
          {/* Animated clock/compass icon */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-t-neon-cyan border-r-transparent border-b-zinc-800 border-l-transparent"
            />
            <div className="absolute inset-2 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Compass className="w-6 h-6 text-neon-cyan animate-pulse" />
            </div>
          </div>

          <h3 className="text-sm font-bold tracking-wider text-zinc-300 uppercase">
            Chronos AI Synthesizer
          </h3>

          <div className="h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingStepIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-zinc-400 font-mono"
              >
                {LOADING_STEPS[loadingStepIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon-cyan"
              animate={{
                width: ['10%', '40%', '70%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Error View
  if (error || !response) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4">
        <div className="glass-card max-w-md p-8 rounded-2xl border border-red-500/20 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Simulation Interrupted</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {error || 'The system was unable to construct this world template.'}
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-xs font-bold text-zinc-950 transition-colors"
            >
              Retry Simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine standard vs alternative branching structure
  const isWhatIf = response.type === 'what-if';
  const worldData = response.worldData as WorldData;
  const whatIfData = response.whatIfData as WhatIfData;
  const metadata = isWhatIf ? whatIfData.metadata : worldData.metadata;

  return (
    <div className="min-h-screen bg-zinc-950 pt-16 flex flex-col">
      <Header />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row relative">

        {/* Navigation Sidebar (Only for standard worlds) */}
        {!isWhatIf && (
          <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-zinc-800/60 p-6 space-y-6 shrink-0">
            {/* World Metadata Info */}
            <div className="space-y-2 pb-6 border-b border-zinc-800/60">
              <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-mono">
                {metadata.category}
              </span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {metadata.name}
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {metadata.tagline}
              </p>
            </div>

            {/* Sidebar Tabs */}
            <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0">
              {[
                { id: 'timeline', label: 'Evolution Explorer', icon: Calendar },
                { id: 'architecture', label: 'System Designer', icon: Layers },
                { id: 'tech', label: 'Technology Stack', icon: Cpu },
                { id: 'future', label: 'Future Simulator', icon: TrendingUp },
                { id: 'facts', label: 'Facts & Sources', icon: Bookmark },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all text-left w-full ${isActive
                      ? 'bg-zinc-900 border border-zinc-800/80 text-neon-cyan shadow-[0_0_10px_rgba(255,255,255,0.01)]'
                      : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-neon-cyan' : 'text-zinc-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Go back helper */}
            <div className="pt-6 hidden lg:block border-t border-zinc-900">
              <button
                onClick={() => router.push('/')}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Explore another topic
              </button>
            </div>
          </aside>
        )}

        {/* Content Viewer Panel */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {isWhatIf ? (
            /* Render Alternate History Simulation */
            <WhatIfBranching whatIfData={whatIfData} />
          ) : (
            /* Render Standard Exploration Panels */
            <div className="space-y-6">

              {/* Tab: Evolution Timeline */}
              {activeTab === 'timeline' && (
                <div>
                  <div className="mb-6 max-w-4xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">Milestone Journey</span>
                    <h2 className="text-2xl font-bold text-white mb-2">Evolution Explorer</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      Scroll and click on history blocks to dive into critical decisions, deployed stacks, and long-term impacts.
                    </p>
                  </div>
                  <TimelineView timeline={worldData.timeline} />
                </div>
              )}

              {/* Tab: System Architecture */}
              {activeTab === 'architecture' && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-blue">Scalability & Services</span>
                    <h2 className="text-2xl font-bold text-white mb-2">System Architecture Designer</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      An interactive service map displaying node routing, caching proxies, data clusters, and api connections.
                    </p>
                  </div>
                  <SystemDesigner
                    entities={worldData.entities}
                    relationships={worldData.relationships}
                    architecture={worldData.architecture}
                  />
                </div>
              )}

              {/* Tab: Technology Stack */}
              {activeTab === 'tech' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-indigo">Toolsets & Integrations</span>
                    <h2 className="text-2xl font-bold text-white mb-2">Core Technology Stack</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      Key developer libraries, engines, and protocols used to build and coordinate operations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {worldData.technologies.map((tech, i) => (
                      <div key={i} className="glass-card p-6 rounded-2xl border border-zinc-800/80">
                        <div className="flex items-center gap-2 mb-2">
                          <Cpu className="w-4 h-4 text-neon-indigo" />
                          <h3 className="text-base font-bold text-white">{tech.name}</h3>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                          {tech.purpose}
                        </p>
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Advantages</span>
                          <div className="flex flex-wrap gap-1.5">
                            {tech.pros.map((pro, j) => (
                              <span key={j} className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400">
                                {pro}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Future Simulation */}
              {activeTab === 'future' && (
                <div>
                  <div className="mb-6 max-w-4xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-pink">Forecast Index</span>
                    <h2 className="text-2xl font-bold text-white mb-2">Future Simulator</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      Timeline predictions outlining upcoming tech shifts, infrastructure complexities, and industry obstacles.
                    </p>
                  </div>
                  <PredictorCard predictions={worldData.futurePredictions} />
                </div>
              )}

              {/* Tab: Facts and Sources */}
              {activeTab === 'facts' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Historical Archives</span>
                    <h2 className="text-2xl font-bold text-white mb-2">Facts & Reference Materials</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      Fun technical facts and source citations compiled from case studies and developer resources.
                    </p>
                  </div>

                  {/* Facts list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {worldData.interestingFacts.map((fact, i) => (
                      <div key={i} className="glass-card p-6 rounded-2xl border border-zinc-850 flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-1.5">{fact.title}</h4>
                          <p className="text-xs text-zinc-450 leading-relaxed">{fact.fact}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* References list */}
                  {worldData.references && worldData.references.length > 0 && (
                    <div className="pt-6 border-t border-zinc-900">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neon-cyan" />
                        Document Citations
                      </h4>
                      <ul className="space-y-2">
                        {worldData.references.map((ref, i) => (
                          <li key={i}>
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-zinc-400 hover:text-neon-cyan underline transition-colors flex items-center gap-1 inline-flex"
                            >
                              {ref.title}
                              <ChevronRight className="w-3 h-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
