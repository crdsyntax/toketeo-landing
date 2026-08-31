import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface PromptExample {
  title: string
  prompt: string
  generatedSql: string
  note: string
  engine: string
}

const PROMPTS: PromptExample[] = [
  {
    title: 'Customer lifetime value',
    prompt: 'Show me lifetime value and purchase count per customer, active in the last 6 months.',
    engine: 'PostgreSQL 16',
    generatedSql: `SELECT
  c.id AS customer_id,
  c.email,
  COUNT(o.id)              AS total_orders,
  SUM(o.amount_cents) / 100.0 AS ltv_usd
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= NOW() - INTERVAL '6 months'
GROUP BY c.id, c.email
HAVING SUM(o.amount_cents) > 50000
ORDER BY ltv_usd DESC;`,
    note: 'Aggregate with HAVING to surface high-value retained customers.',
  },
  {
    title: 'Missing index on checkout',
    prompt: 'Find a missing index for the orders table causing high CPU at peak hours.',
    engine: 'MySQL 8',
    generatedSql: `-- Recommended composite index
ALTER TABLE orders
  ADD INDEX idx_checkout_perf (created_at, status, customer_id),
  ALGORITHM=INPLACE, LOCK=NONE;`,
    note: 'Non-blocking inplace index to eliminate filesort on order lookups.',
  },
  {
    title: 'Permission audit',
    prompt: 'Which non-system users hold GRANT ALL privileges anywhere?',
    engine: 'PostgreSQL 16',
    generatedSql: `SELECT grantee, table_schema, privilege_type
FROM information_schema.role_table_grants
WHERE privilege_type = 'ALL'
  AND grantee NOT IN ('postgres', 'system');`,
    note: 'Lists roles with full schema control, excluding system roles.',
  },
  {
    title: 'Redis memory cleanup',
    prompt: 'Identify expired key patterns consuming more than 50 MB of RAM.',
    engine: 'Redis 7',
    generatedSql: `# Memory diagnostics
MEMORY USAGE session:tokens:*
MEMORY DOCTOR
OBJECT ENCODING cache:temp:results`,
    note: 'Scans encodings and memory footprints to reclaim transient RAM.',
  },
]

export function AiStudioSection() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const active = PROMPTS[selectedIdx]

  const handleCopy = () => {
    navigator.clipboard.writeText(active.generatedSql)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="ai" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-mute">
            <span className="font-mono text-xs font-bold text-accent">$ 04</span>
            <span className="h-px flex-1 bg-line" />
            AI assistance
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Describe it. Get SQL.
          </h2>
          <p className="mt-4 text-soft">
            Toketeo reads your schema and writes the query. The prompt context stays
            local — your data is never sent anywhere.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="border border-line bg-panel">
            <div className="border-b border-line bg-surface px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              Examples
            </div>
            {PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIdx(idx)
                  setCopied(false)
                }}
                className={`block w-full border-t border-line px-4 py-3 text-left first:border-t-0 ${
                  selectedIdx === idx ? 'bg-accent text-page' : 'hover:bg-hover'
                }`}
              >
                <span
                  className={`font-mono text-xs uppercase tracking-wider ${
                    selectedIdx === idx ? 'text-page/70' : 'text-accent'
                  }`}
                >
                  {p.engine}
                </span>
                <span className={`mt-0.5 block font-bold ${selectedIdx === idx ? '' : 'text-ink'}`}>{p.title}</span>
              </button>
            ))}
          </div>

          <div className="border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                {active.engine} — output
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 border border-line px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest no-underline text-mute hover:bg-accent hover:text-page"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p className="border-b border-line px-4 py-3 text-sm text-soft">
              {active.prompt}
            </p>

            <pre className="overflow-x-auto border-t border-line bg-[#0b0c11] px-4 py-4 font-mono text-xs leading-relaxed text-soft">
              {active.generatedSql}
            </pre>

            <div className="px-4 py-3 font-mono text-xs text-mute">
              <span className="font-bold uppercase tracking-widest text-accent">Note · </span>
              {active.note}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}