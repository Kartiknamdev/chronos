'use client';

import React, { useState, useEffect } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState, 
  ConnectionLineType,
  MarkerType,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import * as Icons from 'lucide-react';
import { SystemEntity, SystemRelationship, ArchitectureDetails } from '@/types';

// Resolve Lucide icons dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Server className={className} />;
  return <IconComponent className={className} />;
};

// Map entity types to icons
const getEntityIcon = (type: string): string => {
  switch (type) {
    case 'client': return 'Smartphone';
    case 'gateway': return 'Cpu';
    case 'auth': return 'ShieldCheck';
    case 'service': return 'Server';
    case 'database': return 'Database';
    case 'cache': return 'Zap';
    case 'queue': return 'MessageSquare';
    case 'storage': return 'HardDrive';
    case 'external': return 'Globe';
    default: return 'Server';
  }
};

// Map entity types to glowing colors
const getGlowClass = (type: string): string => {
  switch (type) {
    case 'client': return 'text-neon-cyan border-neon-cyan/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]';
    case 'gateway': return 'text-neon-purple border-neon-purple/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]';
    case 'auth': return 'text-neon-pink border-neon-pink/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]';
    case 'service': return 'text-neon-blue border-neon-blue/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]';
    case 'database': return 'text-amber-400 border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]';
    case 'cache': return 'text-orange-400 border-orange-400/20 shadow-[0_0_10px_rgba(251,146,60,0.1)]';
    case 'queue': return 'text-teal-400 border-teal-400/20 shadow-[0_0_10px_rgba(45,212,191,0.1)]';
    case 'storage': return 'text-emerald-400 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]';
    default: return 'text-zinc-400 border-zinc-800';
  }
};

// Custom Node Component
function CustomSystemNode({ data }: any) {
  const icon = getEntityIcon(data.type);
  const glowClass = getGlowClass(data.type);

  return (
    <div className={`glass-card p-3 rounded-xl border min-w-[170px] ${glowClass} relative group hover:border-current hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: 'currentColor', border: '2px solid #030303', width: '8px', height: '8px' }} 
      />
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-800/80 shrink-0">
          <DynamicIcon name={icon} className="w-5 h-5 text-current" />
        </div>
        <div className="overflow-hidden">
          <h4 className="text-xs font-semibold text-zinc-100 truncate">{data.name}</h4>
          {data.tech && (
            <span className="text-[9px] font-mono text-zinc-400 block truncate">{data.tech}</span>
          )}
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: 'currentColor', border: '2px solid #030303', width: '8px', height: '8px' }} 
      />
    </div>
  );
}

// Register custom node types
const nodeTypes = {
  systemNode: CustomSystemNode
};

interface SystemDesignerProps {
  entities: SystemEntity[];
  relationships: SystemRelationship[];
  architecture: ArchitectureDetails;
}

export default function SystemDesigner({ entities, relationships, architecture }: SystemDesignerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedEntity, setSelectedEntity] = useState<SystemEntity | null>(null);

  // Auto-layout entities and relationships into columns
  useEffect(() => {
    // 1. Group entities by their system layers
    const layer1: SystemEntity[] = []; // Clients & External
    const layer2: SystemEntity[] = []; // Gateway & Auth
    const layer3: SystemEntity[] = []; // Services & Queues
    const layer4: SystemEntity[] = []; // Databases, Caches & Storage

    entities.forEach(ent => {
      if (ent.type === 'client' || ent.type === 'external') {
        layer1.push(ent);
      } else if (ent.type === 'gateway' || ent.type === 'auth') {
        layer2.push(ent);
      } else if (ent.type === 'service' || ent.type === 'queue') {
        layer3.push(ent);
      } else {
        layer4.push(ent);
      }
    });

    const columns = [layer1, layer2, layer3, layer4];
    const columnWidth = 260;
    const startX = 40;
    const startY = 50;
    const verticalGap = 110;

    // Calculate maximum height to center smaller columns
    const maxNodesInCol = Math.max(...columns.map(c => c.length));
    const maxHeight = maxNodesInCol * verticalGap;

    const formattedNodes: any[] = [];

    columns.forEach((col, colIdx) => {
      const colHeight = col.length * verticalGap;
      // Center vertical alignment
      const colStartY = startY + (maxHeight - colHeight) / 2;

      col.forEach((ent, nodeIdx) => {
        formattedNodes.push({
          id: ent.id,
          type: 'systemNode',
          position: {
            x: startX + colIdx * columnWidth,
            y: colStartY + nodeIdx * verticalGap
          },
          data: {
            name: ent.name,
            type: ent.type,
            tech: ent.tech,
            description: ent.description
          }
        });
      });
    });

    // Format Edges
    const formattedEdges = relationships.map((rel, index) => {
      const isAnimated = rel.type === 'data' || rel.type === 'pubsub';
      
      // Assign connection edge colors based on relationship type
      let strokeColor = 'rgba(255, 255, 255, 0.15)';
      if (rel.type === 'auth') strokeColor = '#ec4899';
      else if (rel.type === 'rpc') strokeColor = '#a855f7';
      else if (rel.type === 'data') strokeColor = '#3b82f6';
      
      return {
        id: `edge-${index}`,
        source: rel.source,
        target: rel.target,
        label: rel.label,
        type: ConnectionLineType.SmoothStep,
        animated: isAnimated,
        style: { stroke: strokeColor, strokeWidth: 1.5 },
        labelStyle: { fill: '#888', fontSize: 9, fontWeight: 500 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 14,
          height: 14,
          color: strokeColor
        }
      };
    });

    setNodes(formattedNodes);
    setEdges(formattedEdges);

    // Default to select first entity
    if (entities.length > 0) {
      setSelectedEntity(entities[0]);
    }
  }, [entities, relationships]);

  const onNodeClick = (_event: any, node: any) => {
    const entity = entities.find(e => e.id === node.id);
    if (entity) {
      setSelectedEntity(entity);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row border border-zinc-800/60 rounded-2xl overflow-hidden bg-zinc-950/40 h-[650px] relative">
      {/* React Flow Board */}
      <div className="w-full lg:w-2/3 h-[420px] lg:h-full border-b lg:border-b-0 lg:border-r border-zinc-800/60 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
          fitViewOptions={{ padding: 0.1 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#555" gap={20} size={1} />
          <Controls className="bg-zinc-900 border border-zinc-800 text-zinc-300 [&>button]:border-zinc-800 [&>button]:bg-zinc-900 hover:[&>button]:bg-zinc-800" />
        </ReactFlow>

        {/* Tip overlay */}
        <div className="absolute bottom-4 left-4 bg-zinc-900/90 border border-zinc-800/60 px-3 py-1.5 rounded-lg text-[10px] text-zinc-400 pointer-events-none backdrop-blur-md">
          💡 Click components to view scaling data and technologies.
        </div>
      </div>

      {/* Side Details Panel */}
      <div className="w-full lg:w-1/3 p-6 flex flex-col justify-between overflow-y-auto bg-zinc-950/70 backdrop-blur-md">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
            System Designer Overview
          </h3>

          <div className="mb-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Architecture Core</h4>
            <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
              {architecture.overview}
            </p>
          </div>

          {selectedEntity ? (
            <div className="mb-6 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-zinc-800 font-mono ${getGlowClass(selectedEntity.type).split(' ')[0]}`}>
                  {selectedEntity.type}
                </span>
                {selectedEntity.tech && (
                  <span className="text-[10px] text-zinc-400 font-semibold font-mono">
                    ({selectedEntity.tech})
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-foreground mb-1">{selectedEntity.name}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedEntity.description}
              </p>
            </div>
          ) : (
            <div className="text-zinc-500 text-xs italic p-4 text-center border border-zinc-900 rounded-lg mb-6">
              Select a component in the diagram to view deep technical specs.
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-900 text-xs text-zinc-400 space-y-3">
          <div>
            <span className="font-bold text-zinc-300 block mb-1">Database Strategy</span>
            <span className="leading-relaxed block">{architecture.databaseChoices}</span>
          </div>
          <div>
            <span className="font-bold text-zinc-300 block mb-1">Scaling Strategy</span>
            <span className="leading-relaxed block">{architecture.scalingStrategy}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
