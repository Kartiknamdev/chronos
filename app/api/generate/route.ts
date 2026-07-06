import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMockWorld, getMockWhatIf } from '@/utils/mockData';

// System prompts for structured generation
const SYSTEM_PROMPT_WORLD = `You are Chronos AI, an expert system designer and technology historian. Your task is to generate a comprehensive, structured exploration of the technological evolution and system architecture for the requested topic.

Return ONLY a raw JSON object. Do NOT wrap it in markdown code blocks like \`\`\`json ... \`\`\` or include any introductory/concluding text.
You MUST ensure the timeline is fully comprehensive, starting from the topic's historical inception and tracing all major stages all the way to its most recent contributions, advancements, and status in 2025 and early 2026. Do not terminate the timeline early.
The JSON object MUST match this TypeScript schema structure:
{
  "metadata": {
    "name": "string (The name of the topic)",
    "tagline": "string (One-sentence summary of the topic's historical/technological impact)",
    "description": "string (A rich paragraph summarizing the evolution and core architecture)",
    "category": "string (e.g. Software Service, Architecture Pattern, Programming Language)",
    "icon": "string (A valid Lucide icon name: e.g. Tv, Camera, Cpu, Server, Network, Database, Globe, Layers, Workflow, HelpCircle)"
  },
  "timeline": [
    {
      "year": "string (e.g., 2010)",
      "title": "string (Milestone title)",
      "description": "string (Description of what happened)",
      "isMilestone": "boolean",
      "technologies": ["string (technologies introduced)"],
      "decisions": ["string (architectural or business choices)"],
      "impact": "string (long term impact on technology or industry)"
    }
  ],
  "entities": [
    {
      "id": "string (alphanumeric ID, e.g. 'client', 'db', 'auth')",
      "name": "string (Component name)",
      "type": "client | service | database | cache | queue | storage | auth | gateway | external",
      "description": "string (What this component does in the system)",
      "tech": "string (optional specific technology used)"
    }
  ],
  "relationships": [
    {
      "source": "string (ID of source entity)",
      "target": "string (ID of target entity)",
      "label": "string (Name of interactions, e.g., 'API calls', 'Pushes events')",
      "type": "data | rpc | pubsub | auth"
    }
  ],
  "architecture": {
    "overview": "string (Summary of the design philosophy)",
    "scalingStrategy": "string (How this system handles high throughput/traffic)",
    "databaseChoices": "string (Why specific database models were chosen)"
  },
  "technologies": [
    {
      "name": "string",
      "purpose": "string",
      "pros": ["string"]
    }
  ],
  "futurePredictions": [
    {
      "timeframe": "string (e.g. 1-3 Years, 3-5 Years)",
      "trend": "string (Trend name)",
      "prediction": "string (The actual forecast)",
      "challenges": ["string"]
    }
  ],
  "interestingFacts": [
    {
      "title": "string",
      "fact": "string"
    }
  ],
  "references": [
    {
      "title": "string",
      "url": "string"
    }
  ]
}`;

const SYSTEM_PROMPT_WHAT_IF = `You are Chronos AI, an expert system designer and technology historian. Your task is to generate an alternative technological timeline based on a "What if" query.

Return ONLY a raw JSON object. Do NOT wrap it in markdown code blocks like \`\`\`json ... \`\`\` or include any introductory/concluding text.

The JSON object MUST match this TypeScript schema structure:
{
  "metadata": {
    "name": "string (e.g. 'What if HTTP had never been invented?')",
    "tagline": "string (One-sentence summary of this alternate reality)",
    "description": "string (A paragraph summarizing how computing evolved in this parallel timeline)",
    "category": "Alternative History",
    "icon": "string (A valid Lucide icon name, e.g. HelpCircle, AlertTriangle, RefreshCw)"
  },
  "originalTimeline": [
    {
      "year": "string (e.g., 1989)",
      "event": "string (Real historical event that happened)"
    }
  ],
  "branchPoint": {
    "year": "string",
    "divergencePrompt": "string (The core branching prompt)",
    "alternativeEvent": "string (The immediate alternative event that occurred instead)"
  },
  "alternativeTimeline": [
    {
      "year": "string",
      "title": "string (Milestone title)",
      "description": "string (Detailed event explanation)",
      "isMilestone": "boolean",
      "technologies": ["string"],
      "decisions": ["string (choices made by alternate players)"],
      "impact": "string (impact of this alternate milestone)"
    }
  ],
  "consequences": [
    "string (long term consequence of this branching timeline)"
  ]
}`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, type: explicitType } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Auto-detect type if not provided explicitly
    let type = explicitType;
    if (!type) {
      const lowerPrompt = prompt.toLowerCase();
      if (
        lowerPrompt.includes('what if') ||
        lowerPrompt.includes('what-if') ||
        lowerPrompt.includes('alternative timeline') ||
        lowerPrompt.includes('never existed') ||
        lowerPrompt.includes('never been invented')
      ) {
        type = 'what-if';
      } else {
        type = 'world';
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock mode fallback
      console.log('No GEMINI_API_KEY found. Running in Mock Mode.');
      if (type === 'what-if') {
        const mockData = getMockWhatIf(prompt);
        return NextResponse.json({
          type: 'what-if',
          whatIfData: mockData,
          isMock: true
        });
      } else {
        const mockData = getMockWorld(prompt);
        return NextResponse.json({
          type: 'world',
          worldData: mockData,
          isMock: true
        });
      }
    }

    // Live AI Generation using Gemini 2.5 Flash
    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = type === 'what-if' ? SYSTEM_PROMPT_WHAT_IF : SYSTEM_PROMPT_WORLD;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction,
    });

    const promptText = `Generate structured output for the topic: "${prompt}"`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = result.response.text();
    const cleanJSON = responseText.replace(/^\s*```json\s*/, '').replace(/```\s*$/, '').trim();
    const parsedData = JSON.parse(cleanJSON);

    if (type === 'what-if') {
      return NextResponse.json({
        type: 'what-if',
        whatIfData: parsedData,
        isMock: false
      });
    } else {
      return NextResponse.json({
        type: 'world',
        worldData: parsedData,
        isMock: false
      });
    }
  } catch (error: any) {
    console.error('Error generating Chronos AI output:', error);
    return NextResponse.json({
      error: 'Failed to generate content. Please check logs.',
      details: error.message
    }, { status: 500 });
  }
}
