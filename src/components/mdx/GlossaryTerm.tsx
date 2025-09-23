'use client'

import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Info } from 'lucide-react'

interface GlossaryTermProps {
  term: string
  definition: string
  children: React.ReactNode
}

export function GlossaryTerm({ term, definition, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <span
          className="inline-flex items-baseline gap-0.5 cursor-help border-b-2 border-dotted border-primary/50 hover:border-primary transition-colors"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {children || term}
          <Info className="inline h-3 w-3 text-primary opacity-50" />
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 w-80 rounded-lg border bg-background p-4 shadow-lg animate-in fade-in-0 zoom-in-95"
          sideOffset={5}
        >
          <div className="space-y-2">
            <h4 className="font-semibold">{term}</h4>
            <p className="text-sm text-muted-foreground">{definition}</p>
          </div>
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

// Pre-defined glossary terms for common AI/tech terms
export const glossaryTerms = {
  'LLM': 'Large Language Model - AI systems trained on vast amounts of text data to understand and generate human-like text',
  'API': 'Application Programming Interface - A way for different software applications to communicate with each other',
  'RAG': 'Retrieval-Augmented Generation - Combining information retrieval with text generation for more accurate AI responses',
  'Fine-tuning': 'The process of further training a pre-trained AI model on specific data for specialized tasks',
  'Prompt': 'The input text or instructions given to an AI model to generate a response',
  'Token': 'The basic unit of text that AI models process, roughly equivalent to a word or part of a word',
  'Embeddings': 'Numerical representations of text that capture semantic meaning for AI processing',
  'Context Window': 'The maximum amount of text an AI model can process at once',
  'Hallucination': 'When an AI model generates information that sounds plausible but is actually incorrect or fabricated',
  'Zero-shot': 'AI performing a task without any task-specific training examples',
  'Few-shot': 'AI learning from just a few examples of a task',
  'Transformer': 'The neural network architecture underlying most modern language models',
  'Inference': 'The process of using a trained AI model to make predictions or generate outputs',
  'Latency': 'The delay between sending a request to an AI system and receiving a response',
  'Throughput': 'The number of requests an AI system can handle per unit of time',
}