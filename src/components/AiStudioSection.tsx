import { useState } from 'react'
import { Sparkles, Bot, Code, Check } from 'lucide-react'

interface PromptExample {
  title: string
  prompt: string
  generatedSql: string
  explanation: string
  engine: string
}

const PROMPTS: PromptExample[] = [
  {
    title: '📊 Customer LTV & Retention',
    prompt: 'Show me total lifetime value and purchase count per customer for those active in the last 6 months.',
    engine: 'PostgreSQL 16',
    generatedSql: `SELECT 
  c.id AS customer_id,
  c.email,
  COUNT(o.id) AS total_orders,
  SUM(o.amount_cents) / 100.0 AS ltv_usd
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= NOW() - INTERVAL '6 months'
GROUP BY c.id, c.email
HAVING SUM(o.amount_cents) > 50000
ORDER BY ltv_usd DESC;`,
    explanation: 'Uses aggregate grouping with HAVING filter to highlight high-value retained customers.',
  },
  {
    title: '⚡ Slow Query Index Advice',
    prompt: 'Find missing indexes on orders table causing high CPU during peak checkout hours.',
    engine: 'MySQL 8.3',
    generatedSql: `-- Recommended Composite Index Migration
ALTER TABLE orders 
  ADD INDEX idx_checkout_perf (created_at, status, customer_id),
  ALGORITHM=INPLACE, LOCK=NONE;`,
    explanation: 'Suggests non-blocking inplace composite index to eliminate filesort on order lookups.',
  },
  {
    title: '🔒 Security & Permission Audit',
    prompt: 'Check which database users have administrative GRANT ALL privileges across schemas.',
    engine: 'PostgreSQL 16',
    generatedSql: `SELECT 
  grantee, table_schema, privilege_type 
FROM information_schema.role_table_grants 
WHERE privilege_type = 'ALL' 
  AND grantee NOT IN ('postgres', 'system');`,
    explanation: 'Audits non-system roles with full schema control to enforce least privilege principles.',
  },
  {
    title: '🧹 Redis Memory Cleanup Pipeline',
    prompt: 'Identify expired key patterns consuming more than 50MB of RAM.',
    engine: 'Redis 7.2',
    generatedSql: `# Memory Diagnostic & Flush Commands
MEMORY USAGE session:tokens:*
MEMORY DOCTOR
OBJECT ENCODING cache:temp:results`,
    explanation: 'Scans Redis key encoding types and memory footprints to reclaim transient RAM.',
  },
]

export function AiStudioSection() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const activePrompt = PROMPTS[selectedIdx]

  const handleCopy = () => {
    navigator.clipboard.writeText(activePrompt.generatedSql)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="ai-assistant" className="relative py-24 bg-[#07080d] overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-purple-600/15 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            AI Query Copilot
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Query your database in <span className="text-gradient">plain language</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Toketeo's built-in AI assistant interprets your schema, translates natural language into optimized query statements, and audits your database security — with zero data retention.
          </p>
        </div>

        {/* Interactive Prompt Simulator */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr] items-center">
          {/* Left Prompt Selection */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
              Select AI Copilot Scenario:
            </span>
            {PROMPTS.map((p, idx) => {
              const isActive = selectedIdx === idx
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                    isActive
                      ? 'border-purple-500/60 bg-surface/90 shadow-xl shadow-purple-500/15 ring-1 ring-purple-500/30'
                      : 'border-white/10 bg-surface/40 hover:border-white/20 hover:bg-surface/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {p.title}
                    </h3>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                      {p.engine}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                    "{p.prompt}"
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Live Terminal Code Box */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0e17] p-5 shadow-2xl shadow-purple-950/40">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold text-white">
                  AI Generator Output ({activePrompt.engine})
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-white/20"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Code className="h-3.5 w-3.5 text-purple-300" />}
                {copied ? 'Copied' : 'Copy Query'}
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-black/80 p-4 font-mono text-xs text-emerald-300 border border-white/5 overflow-x-auto">
              <pre>{activePrompt.generatedSql}</pre>
            </div>

            <div className="mt-4 rounded-xl bg-purple-950/20 border border-purple-500/20 p-3.5 text-xs text-slate-300">
              <span className="font-bold text-purple-300 block mb-1">AI Reasoning & Optimization:</span>
              <p>{activePrompt.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
