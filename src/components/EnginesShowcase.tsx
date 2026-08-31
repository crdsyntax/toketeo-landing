import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface EngineInfo {
  id: string
  name: string
  category: 'Relational' | 'Document' | 'In-Memory' | 'Embedded'
  description: string
  features: string[]
  sampleUri: string
}

const ENGINES: EngineInfo[] = [
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Relational',
    description:
      'JSONB, PostGIS, pgvector, partition tables, triggers, and asynchronous replication.',
    features: ['pgvector & AI search', 'ERD schema generator', 'JSONB auto-formatting', 'SSL & client cert auth'],
    sampleUri: 'postgresql://admin:••••••••@prod-pg.example.internal:5432/main_db?sslmode=require',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Relational',
    description:
      'InnoDB index analysis, slow-query profiling, straight-join optimization, replication status.',
    features: ['EXPLAIN ANALYZE tree', 'Replication lag monitor', 'Procedure debugger', 'Safe DDL migration generator'],
    sampleUri: 'mysql://user:••••••••@mysql-cluster.internal:3306/store_prod',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Document',
    description:
      'Interactive aggregation builder, BSON document viewer, index memory footprint, Atlas support.',
    features: ['Visual aggregation builder', 'BSON / JSON grid & tree', 'Index usage metrics', 'Sharded cluster support'],
    sampleUri: 'mongodb+srv://admin:••••••••@cluster0.example.mongodb.net/app_logs',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'In-Memory',
    description:
      'Key hierarchy tree, TTL timers, Pub/Sub listener, memory analysis, Sentinel failover.',
    features: ['Live Pub/Sub event log', 'Key TTL monitor', 'Memory inspector', 'Sentinel & cluster support'],
    sampleUri: 'redis://:••••••••@redis-cache.internal:6379/0',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'Embedded',
    description:
      'Zero-latency local management, WAL mode, table attach, vacuum, profile tuning.',
    features: ['No network overhead', 'WAL mode inspector', 'PRAGMA tuning', 'Local file backup & export'],
    sampleUri: 'file:///home/user/.config/toketeo/vault_storage.db?mode=rwc',
  },
  {
    id: 'mssql',
    name: 'SQL Server',
    category: 'Relational',
    description:
      'T-SQL execution plans, temporal tables, Windows NTLM auth, Azure SQL support.',
    features: ['T-SQL execution plans', 'Azure AD / Windows auth', 'Procedure profiler', 'Schema compare'],
    sampleUri: 'mssql://sa:••••••••@mssql-server.internal:1433/EnterpriseDB',
  },
]

export function EnginesShowcase() {
  const [selectedId, setSelectedId] = useState<string>('postgres')
  const [copied, setCopied] = useState(false)

  const active = ENGINES.find((e) => e.id === selectedId) || ENGINES[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(active.sampleUri)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="engines" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-mute">
            <span className="font-mono text-xs font-bold text-accent">$ 02</span>
            <span className="h-px flex-1 bg-line" />
            Engines
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Six engines. One interface.
          </h2>
          <p className="mt-4 text-soft">
            Relational, document, embedded and in-memory stores under the same
            connection model. No context switching.
          </p>
        </div>

        <div className="border border-line">
          <div className="hidden grid-cols-[1fr_1fr_1.2fr] bg-surface px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-accent md:grid">
            <span>Engine</span>
            <span>Type</span>
            <span>What you can do</span>
          </div>

          {ENGINES.map((eng) => {
            const selected = selectedId === eng.id
            return (
              <button
                key={eng.id}
                onClick={() => {
                  setSelectedId(eng.id)
                  setCopied(false)
                }}
                className={`grid w-full grid-cols-1 border-t border-line text-left md:grid-cols-[1fr_1fr_1.2fr] ${
                  selected ? 'bg-accent text-page' : 'text-ink hover:bg-hover'
                }`}
              >
                <span className="flex items-center gap-2 px-4 py-3 font-bold">
                  {selected && <span className="inline-block h-2 w-2 bg-page" />}
                  {eng.name}
                </span>
                <span
                  className={`px-4 py-3 font-mono text-xs uppercase tracking-wider ${
                    selected ? 'text-page' : 'text-mute'
                  }`}
                >
                  {eng.category}
                </span>
                <span
                  className={`px-4 py-3 text-sm ${
                    selected ? 'text-page' : 'text-soft'
                  }`}
                >
                  {eng.description}
                </span>
              </button>
            )
          })}

          {/* Selected engine detail */}
          <div className={`border-t border-line ${selectedId ? '' : ''}`}>
            <div className="bg-surface px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              {active.name} — connection template
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              <div className="border-b border-line md:border-b-0 md:border-r">
                <div className="flex items-center justify-between gap-2 gap-x-3 px-4 py-3">
                  <code className="min-w-0 break-all font-mono text-xs leading-relaxed text-soft">
                    {active.sampleUri}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider no-underline text-mute hover:bg-accent hover:text-page"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div>
                <ul className="divide-y divide-line">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 px-4 py-2.5 text-sm text-soft">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}