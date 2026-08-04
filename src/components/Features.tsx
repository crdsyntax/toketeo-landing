import {
  Boxes,
  TerminalSquare,
  GitBranch,
  ArrowLeftRight,
  CalendarClock,
  DatabaseBackup,
  Bot,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  tags?: string[]
}

const FEATURES: Feature[] = [
  {
    icon: Boxes,
    title: 'Multi-database support',
    description:
      'Connect to MySQL, PostgreSQL, SQL Server, MongoDB, Redis and SQLite from a single, consistent interface.',
    tags: ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'SQLite'],
  },
  {
    icon: TerminalSquare,
    title: 'Powerful query editor',
    description:
      'A full-featured SQL editor with syntax highlighting, auto-completion, formatting and multiple result tabs.',
  },
  {
    icon: GitBranch,
    title: 'Schema visualization',
    description:
      'Explore tables, views, procedures and relationships with interactive ERD diagrams generated in one click.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Compare schemas & data',
    description:
      'Diff two environments, review every change and generate a safe migration or sync script before applying it.',
  },
  {
    icon: DatabaseBackup,
    title: 'Automated backups',
    description:
      'Schedule dumps and restores with cron, retry with exponential backoff and get alerted if a connection drops.',
  },
  {
    icon: CalendarClock,
    title: 'Cross-database sync',
    description:
      'Build sync pipelines between different engines — from one table to a full catalog — with checkpoints and error handling.',
  },
  {
    icon: Bot,
    title: 'AI assistant',
    description:
      'Describe what you need in plain language and get queries, models and recommendations grounded in your own schemas.',
  },
  {
    icon: Sparkles,
    title: 'Built to be delightful',
    description:
      'Level up as you work: XP, quests and streaks that turn database chores into a game.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Features</span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Everything you need to{' '}
            <span className="text-gradient">manage your data</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Stop juggling half a dozen tools. Toketeo brings querying, admin and automation into one
            fast desktop app.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-muted text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <feature.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              {feature.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-base px-2.5 py-0.5 text-[11px] font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
