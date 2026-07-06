export interface WorldMetadata {
  name: string;
  tagline: string;
  description: string;
  category: string;
  icon: string; // Lucide icon name, e.g. "Cpu", "Server", "Network", "Database", "Globe"
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  isMilestone: boolean;
  technologies: string[];
  decisions: string[];
  impact: string;
}

export interface SystemEntity {
  id: string;
  name: string;
  type: 'client' | 'service' | 'database' | 'cache' | 'queue' | 'storage' | 'auth' | 'gateway' | 'external';
  description: string;
  tech?: string;
}

export interface SystemRelationship {
  source: string;
  target: string;
  label: string;
  type: 'data' | 'rpc' | 'pubsub' | 'auth';
}

export interface ArchitectureDetails {
  overview: string;
  scalingStrategy: string;
  databaseChoices: string;
}

export interface TechnologyItem {
  name: string;
  purpose: string;
  pros: string[];
}

export interface FuturePrediction {
  timeframe: string;
  trend: string;
  prediction: string;
  challenges: string[];
}

export interface FactItem {
  title: string;
  fact: string;
}

export interface ReferenceItem {
  title: string;
  url: string;
}

// Universal World object containing structured data
export interface WorldData {
  metadata: WorldMetadata;
  timeline: TimelineEvent[];
  entities: SystemEntity[];
  relationships: SystemRelationship[];
  architecture: ArchitectureDetails;
  technologies: TechnologyItem[];
  futurePredictions: FuturePrediction[];
  interestingFacts: FactItem[];
  references: ReferenceItem[];
}

// Alternative History Branching Scenario Data
export interface WhatIfData {
  metadata: WorldMetadata;
  originalTimeline: {
    year: string;
    event: string;
  }[];
  branchPoint: {
    year: string;
    divergencePrompt: string;
    alternativeEvent: string;
  };
  alternativeTimeline: TimelineEvent[];
  consequences: string[];
}

// API Response type
export interface GenerateAPIResponse {
  type: 'world' | 'what-if';
  worldData?: WorldData;
  whatIfData?: WhatIfData;
  error?: string;
}
