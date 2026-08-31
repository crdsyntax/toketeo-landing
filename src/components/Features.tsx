import { useState } from 'react'
import { X } from 'lucide-react'

interface Feature {
  id: string
  title: string
  category: string
  description: string
  detailText: string
  tags: string[]
}

const FEATURES: Feature[] = [
  {
    id: 'multi-db',
    title: 'Multi-database support',
    category: 'Core',
    description:
      'Connect to MySQL, PostgreSQL, SQL Server, MongoDB, Redis and SQLite from one consistent interface.',
    detailText:
      'One model for connections, SSH tunnels and table inspectors across every engine. Configure once, reuse everywhere.',
    tags: ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'SQLite'],
  },
  {
    id: 'query-editor',
    title: 'Query editor',
    category: 'Query & Schema',
    description:
      'SQL & JSON editor with syntax highlighting, auto-complete, formatting and multiple result tabs.',
    detailText:
      'Execution timing, parameter binding, query history, export to CSV/JSON/Parquet, and transaction controls.',
    tags: ['Auto-complete', 'Multi-tab', 'Export CSV/JSON'],
  },
  {
    id: 'schema-erd',
    title: 'Schema ERD',
    category: 'Query & Schema',
    description:
      'Explore tables, views, procedures and relationships with interactive ER diagrams.',
    detailText:
      'Relationship detection from foreign keys and indexes. Export to SVG, PNG or Mermaid.js.',
    tags: ['Interactive ERD', 'Export SVG', 'FK constraints'],
  },
  {
    id: 'diff-sync',
    title: 'Compare & diff',
    category: 'Sync & Backups',
    description:
      'Diff two environments, review every change, then generate a safe migration or sync script.',
    detailText:
      'Stage-versus-production diff with idempotent DDL output and rollback capability.',
    tags: ['Schema diff', 'Data sync', 'Rollback'],
  },
  {
    id: 'auto-backups',
    title: 'Scheduled backups',
    category: 'Sync & Backups',
    description:
      'Schedule dumps and restores with cron, exponential backoff, and drop alerts.',
    detailText:
      'Encrypted archives sealed with AES-256. Push to local vault, AWS S3 or Cloudflare R2.',
    tags: ['Cron', 'AES-256 backup', 'S3 / R2'],
  },
  {
    id: 'cross-sync',
    title: 'Cross-database sync',
    category: 'Sync & Backups',
    description:
      'Sync pipelines between engines — a table or a full catalog — with checkpoints.',
    detailText:
      'Stream MongoDB to PostgreSQL, or MySQL to Redis cache pipelines, with automatic type casting.',
    tags: ['Mongo → Postgres', 'MySQL → Redis', 'Checkpoints'],
  },
  {
    id: 'ai-assistant',
    title: 'AI assistance',
    category: 'AI & Automation',
    description:
      'Describe the query in plain language; get SQL grounded in your own schema. Runs locally.',
    detailText:
      'Prompt context stays on your machine. The assistant reads your schema, never your row data.',
    tags: ['Natural language', 'Schema-grounded', 'Local'],
  },
  {
    id: 'gamified-ui',
    title: 'Optional game layer',
    category: 'Core',
    description:
      'XP, quests and streaks if you want them. Off by default, no couch potatoes forced to grind.',
    detailText:
      'A source of progress feedback for people who like it. Does not affect editor behavior.',
    tags: ['XP', 'Streaks', 'Optional'],
  },
]

const CATEGORIES = ['All', 'Core', 'Query & Schema', 'Sync & Backups', 'AI & Automation'] as const

export function Features() {
  const [category, setCategory] = useState<string>('All')
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null)

  const filtered =
    category === 'All' ? FEATURES : FEATURES.filter((f) => f.category === category)

  return (
    <section id="features" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-mute">
              <span className="font-mono text-xs font-bold text-accent">$ 03</span>
              <span className="h-px flex-1 bg-line" />
              Features
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              A tool that stays out of the way.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest ${
                  category === cat
                    ? 'border-accent bg-accent text-page'
                    : 'border-line text-mute hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-line">
          {filtered.map((feature, i) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature)}
              className={`group grid w-full grid-cols-1 items-baseline gap-x-6 gap-y-1 border-t border-line p-4 text-left transition-colors first:border-t-0 md:grid-cols-[3rem_1fr_2fr_auto] ${
                i % 2 === 0 ? 'bg-surface hover:bg-hover' : 'bg-panel hover:bg-hover'
              }`}
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-lg font-bold text-ink">
                {feature.title}
                <span className="ml-2 hidden font-mono text-[10px] font-semibold uppercase tracking-widest text-mute group-hover:underline md:inline">
                  {feature.category}
                </span>
              </span>
              <span className="text-sm text-soft">{feature.description}</span>
              <span className="hidden font-mono text-xs text-mute md:block">
                {feature.tags.join(' / ')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-page/70 p-4">
          <div className="relative w-full max-w-lg border border-line bg-panel p-6 shadow-2xl shadow-black/60">
            <button
              onClick={() => setActiveFeature(null)}
              className="absolute right-4 top-4 border border-line p-1.5 text-mute hover:bg-accent hover:text-page"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              {activeFeature.category}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{activeFeature.title}</h3>
            <p className="mt-4 text-soft">{activeFeature.detailText}</p>

            <div className="mt-6 border border-line">
              <div className="border-b border-line bg-surface px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                Notes
              </div>
              <ul className="divide-y divide-line font-mono text-xs text-soft">
                {activeFeature.tags.map((tag) => (
                  <li key={tag} className="px-3 py-2">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}