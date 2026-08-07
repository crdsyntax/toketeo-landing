import { useState } from 'react'
import {
  Boxes,
  TerminalSquare,
  GitBranch,
  ArrowLeftRight,
  CalendarClock,
  DatabaseBackup,
  Bot,
  Sparkles,
  CheckCircle2,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  id: string
  icon: LucideIcon
  title: string
  category: 'Query & Schema' | 'AI & Automation' | 'Sync & Backups' | 'Core'
  description: string
  detailText: string
  tags?: string[]
  highlightBadge?: string
}

const FEATURES: Feature[] = [
  {
    id: 'multi-db',
    icon: Boxes,
    title: 'Multi-database support',
    category: 'Core',
    description:
      'Connect to MySQL, PostgreSQL, SQL Server, MongoDB, Redis and SQLite from a single, consistent interface.',
    detailText:
      'No need to open multiple tools for different engines. Toketeo standardizes connection parameters, SSH tunnel configurations, and table inspectors into one unified workspace.',
    tags: ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'SQLite'],
    highlightBadge: 'Unified Engine',
  },
  {
    id: 'query-editor',
    icon: TerminalSquare,
    title: 'Powerful query editor',
    category: 'Query & Schema',
    description:
      'Full-featured SQL & JSON editor with syntax highlighting, auto-completion, formatting and multiple result tabs.',
    detailText:
      'Includes query execution timeline metrics, parameter binding support, query history storage, export to CSV/JSON/Parquet, and transaction controls.',
    tags: ['Auto-complete', 'Multi-tab', 'Export CSV/JSON'],
    highlightBadge: 'Fast Execution',
  },
  {
    id: 'schema-erd',
    icon: GitBranch,
    title: 'Schema ERD visualization',
    category: 'Query & Schema',
    description:
      'Explore tables, views, procedures and relationships with interactive ERD diagrams generated in one click.',
    detailText:
      'Automatic relationship detection based on foreign key constraints and index fields. Export diagrams to SVG, PNG, or Mermaid.js format.',
    tags: ['Interactive ERD', 'Export SVG', 'FK Constraints'],
  },
  {
    id: 'diff-sync',
    icon: ArrowLeftRight,
    title: 'Compare schemas & data',
    category: 'Sync & Backups',
    description:
      'Diff two environments, review every change and generate a safe migration or sync script before applying it.',
    detailText:
      'Compare Staging vs. Production databases line by line. Generates idempotent DDL migration scripts with rollback capability.',
    tags: ['Schema Diff', 'Data Sync', 'Safe Rollback'],
    highlightBadge: 'Zero Risk',
  },
  {
    id: 'auto-backups',
    icon: DatabaseBackup,
    title: 'Automated backups',
    category: 'Sync & Backups',
    description:
      'Schedule dumps and restores with cron, retry with exponential backoff and get alerted if a connection drops.',
    detailText:
      'Encrypted backup archives sealed with AES-256. Automatically upload dumps to local vault, AWS S3, or CloudFlare R2 buckets.',
    tags: ['Cron Schedule', 'AES-256 Backup', 'S3 / R2 Sync'],
  },
  {
    id: 'cross-sync',
    icon: CalendarClock,
    title: 'Cross-database sync',
    category: 'Sync & Backups',
    description:
      'Build sync pipelines between different engines — from one table to a full catalog — with checkpoints and error handling.',
    detailText:
      'Stream data from MongoDB to PostgreSQL or MySQL to Redis cache pipelines seamlessly with automatic type casting.',
    tags: ['Mongo → Postgres', 'MySQL → Redis', 'Checkpoints'],
  },
  {
    id: 'ai-assistant',
    icon: Bot,
    title: 'AI Query Assistant',
    category: 'AI & Automation',
    description:
      'Describe what you need in plain language and get queries, models and recommendations grounded in your own schemas.',
    detailText:
      'Runs completely private local prompt context. AI understands your table schema without uploading sensitive row data.',
    tags: ['Natural Language', 'Schema Grounded', '100% Private'],
    highlightBadge: 'AI Studio',
  },
  {
    id: 'delightful-ui',
    icon: Sparkles,
    title: 'Gamified Productivity',
    category: 'Core',
    description:
      'Level up as you work: XP, quests and streaks that turn database chores into an enjoyable experience.',
    detailText:
      'Track your query execution streaks, query speed milestones, and schema organization achievements with dark retro-tech themes.',
    tags: ['XP & Streaks', 'Quests', 'Achievements'],
  },
]

export function Features() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalFeature, setActiveModalFeature] = useState<Feature | null>(null)

  const categories = ['All', 'Core', 'Query & Schema', 'AI & Automation', 'Sync & Backups']

  const filteredFeatures =
    selectedCategory === 'All'
      ? FEATURES
      : FEATURES.filter((f) => f.category === selectedCategory)

  return (
    <section id="features" className="relative py-24 bg-[#080a10]">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[500px] max-w-5xl rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-400 flex items-center justify-center gap-1.5">
            <Zap className="h-4 w-4 text-cyan-400" />
            Engineering Excellence
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Everything you need to <span className="text-gradient">manage your data</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Stop juggling half a dozen tools. Toketeo brings querying, admin and automation into one blazingly fast desktop app.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/25 scale-105'
                  : 'border border-white/10 bg-surface/60 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              onClick={() => setActiveModalFeature(feature)}
              className="group relative cursor-pointer rounded-2xl border border-white/10 bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-surface hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {feature.highlightBadge && (
                <span className="absolute top-4 right-4 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                  {feature.highlightBadge}
                </span>
              )}

              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-600/30">
                <feature.icon className="h-5.5 w-5.5" />
              </span>

              <h3 className="mt-5 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {feature.description}
              </p>

              {feature.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/5 bg-base/80 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-indigo-400 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View capability specs →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Specs Modal */}
      {activeModalFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-indigo-500/40 bg-[#0e111a] p-6 shadow-2xl shadow-indigo-950/80">
            <button
              onClick={() => setActiveModalFeature(null)}
              className="absolute top-4 right-4 rounded-lg bg-white/5 p-1.5 text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                <activeModalFeature.icon className="h-6 w-6" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  {activeModalFeature.category}
                </span>
                <h3 className="text-xl font-black text-white">{activeModalFeature.title}</h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 font-normal">
              {activeModalFeature.detailText}
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs text-cyan-300">
              <span className="text-[10px] uppercase text-slate-500 block mb-1">Key Advantages</span>
              <ul className="space-y-1 text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  High performance native desktop rendering
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Zero telemetry & offline-first design
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Integrates with Windows Hello & OS Keyring
                </li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalFeature(null)}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

