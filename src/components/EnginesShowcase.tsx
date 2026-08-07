import { useState } from 'react'
import {
  Database,
  Activity,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react'

interface EngineInfo {
  id: string
  name: string
  category: 'Relational' | 'Document' | 'In-Memory' | 'Embedded'
  color: string
  borderColor: string
  badgeBg: string
  description: string
  features: string[]
  sampleUri: string
  benchmarkMs: string
  activeUsers: string
}

const ENGINES: EngineInfo[] = [
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Relational',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'hover:border-indigo-500/50',
    badgeBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    description: 'Full support for JSONB, PostGIS, pgvector embeddings, enum types, partition tables, and triggers.',
    features: ['pgvector & AI search', 'ERD Schema Generator', 'JSONB auto-formatting', 'SSL & Client Certificate Auth'],
    sampleUri: 'postgresql://admin:••••••••@prod-pg.toketeo.internal:5432/main_db?sslmode=require',
    benchmarkMs: '2.4ms avg',
    activeUsers: '120k+ queries/sec',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Relational',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'hover:border-cyan-500/50',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    description: 'InnoDB index analysis, slow query log profiling, straight-joins optimization and replication status tracking.',
    features: ['EXPLAIN ANALYZE tree', 'Replication lag monitor', 'Procedure debugger', 'Safe DDL migration generator'],
    sampleUri: 'mysql://toketeo_user:••••••••@mysql-cluster.internal:3306/store_prod',
    benchmarkMs: '1.9ms avg',
    activeUsers: '95k+ queries/sec',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Document',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'hover:border-emerald-500/50',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    description: 'Interactive aggregation builder, BSON document viewer, index memory footprint, and Atlas cluster sync.',
    features: ['Visual Aggregation Builder', 'BSON / JSON grid & tree editor', 'Index usage metrics', 'Atlas Sharded Cluster support'],
    sampleUri: 'mongodb+srv://admin:••••••••@cluster0.toketeo.mongodb.net/app_logs?retryWrites=true',
    benchmarkMs: '3.1ms avg',
    activeUsers: '80k+ ops/sec',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'In-Memory',
    color: 'from-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/50',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    description: 'Key hierarchy tree, TTL countdown timers, Pub/Sub channel listener, Memory analysis & Sentinel failover.',
    features: ['Live Pub/Sub event log', 'Key TTL expiration monitor', 'Memory fragmentation inspector', 'Redis Sentinel & Cluster support'],
    sampleUri: 'redis://:••••••••@redis-cache.internal:6379/0',
    benchmarkMs: '0.4ms avg',
    activeUsers: '350k+ ops/sec',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'Embedded',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'hover:border-amber-500/50',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    description: 'Direct zero-latency local database management, WAL mode toggling, table attach, and vacuum optimization.',
    features: ['Zero network overhead', 'WAL Mode Inspector', 'PRAGMA tuning wizard', 'Local file backup & export'],
    sampleUri: 'file:///home/user/.config/toketeo/vault_storage.db?mode=rwc',
    benchmarkMs: '0.1ms avg',
    activeUsers: 'Local Native',
  },
  {
    id: 'mssql',
    name: 'SQL Server',
    category: 'Relational',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'hover:border-purple-500/50',
    badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    description: 'T-SQL execution plan diagrams, temporal tables, Windows NTLM authentication and Azure SQL Database support.',
    features: ['T-SQL Graphical Execution Plan', 'Azure AD / Windows Auth', 'Stored Procedure Profiler', 'Schema compare diff'],
    sampleUri: 'mssql://sa:••••••••@mssql-server.internal:1433/EnterpriseDB',
    benchmarkMs: '3.2ms avg',
    activeUsers: '60k+ queries/sec',
  },
]

export function EnginesShowcase() {
  const [selectedEngine, setSelectedEngine] = useState<string>('postgres')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const activeData = ENGINES.find((e) => e.id === selectedEngine) || ENGINES[0]

  const handleCopyUri = (uri: string, id: string) => {
    navigator.clipboard.writeText(uri)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <section id="engines" className="relative py-24 bg-[#07080d] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-400 flex items-center justify-center gap-2">
            <Database className="h-4 w-4" />
            Universal Engine Engine Support
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            One client for <span className="text-gradient">all your data stores</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Stop switching context between 5 different tools. Toketeo connects to relational SQL, document collections, embedded stores and memory caches with native performance.
          </p>
        </div>

        {/* Engine Selection Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENGINES.map((eng) => {
            const isSelected = selectedEngine === eng.id
            return (
              <div
                key={eng.id}
                onClick={() => setSelectedEngine(eng.id)}
                className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                  isSelected
                    ? 'border-indigo-500/60 bg-surface/90 shadow-xl shadow-indigo-500/15 ring-1 ring-indigo-500/30'
                    : 'border-white/10 bg-surface/50 hover:border-white/20 hover:bg-surface/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${eng.badgeBg}`}>
                    {eng.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {eng.benchmarkMs}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  {eng.name}
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
                  {eng.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                  {eng.features.slice(0, 2).map((feat, i) => (
                    <span key={i} className="text-[10px] font-medium text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Engine Deep Dive Terminal Inspector */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0d16] p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${activeData.color}`} />
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                {activeData.name} Connection Blueprint
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({activeData.category} Engine)
                </span>
              </h4>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Throughput:</span>
              <span className="text-cyan-300 font-bold">{activeData.activeUsers}</span>
            </div>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Connection URI Inspector
              </span>
              <div className="mt-2 relative rounded-xl bg-black/70 p-3 font-mono text-xs text-emerald-300 border border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
                <span className="truncate">{activeData.sampleUri}</span>
                <button
                  onClick={() => handleCopyUri(activeData.sampleUri, activeData.id)}
                  className="shrink-0 rounded bg-white/10 p-1.5 hover:bg-white/20 text-slate-200"
                  title="Copy connection template"
                >
                  {copiedId === activeData.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                {activeData.description}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Included Engine Capabilities
              </span>
              <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                {activeData.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2 text-slate-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
