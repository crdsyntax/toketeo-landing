import { ArrowRight, CheckCircle2, Download } from 'lucide-react'

const ROWS = [
  { id: 1, name: 'Northwind', status: 'connected', rows: 2487, latency: '4ms' },
  { id: 2, name: 'Analytics Prod', status: 'connected', rows: 12, latency: '11ms' },
  { id: 3, name: 'Backup Lab', status: 'idle', rows: 0, latency: '—' },
]

const SQL_LINES = [
  { text: 'SELECT', token: 'keyword' },
  { text: '  o.id, o.total, c.name,', token: 'plain' },
  { text: '  p.status AS payment', token: 'plain' },
  { text: 'FROM', token: 'keyword' },
  { text: '  orders o', token: 'table' },
  { text: 'JOIN', token: 'keyword' },
  { text: '  customers c ON c.id = o.customer_id', token: 'table' },
  { text: 'WHERE', token: 'keyword' },
  { text: '  o.created_at > NOW() - INTERVAL 7 DAY', token: 'plain' },
  { text: 'ORDER BY', token: 'keyword' },
  { text: '  o.total DESC', token: 'plain' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src="./toketeo-logo.png"
            alt="Toketeo"
            className="mx-auto h-20 w-20 rounded-2xl object-contain sm:h-24 sm:w-24"
          />

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-3.5 py-1 text-xs font-bold uppercase tracking-[0.22em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            v0.3.8 · Desktop app
          </span>

          <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Every database.
            <br />
            <span className="text-gradient">One panel.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Toketeo is the all-in-one database client and administration panel. Query, visualize,
            sync and secure MySQL, PostgreSQL, SQL Server, MongoDB and Redis — without leaving your
            desktop.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#download"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover active:scale-[0.98] sm:w-auto"
            >
              <Download className="h-5 w-5" />
              Download free
            </a>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-accent sm:w-auto"
            >
              Explore features
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
            {['Free & open', 'No telemetry', 'End-to-end encrypted'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* App mockup */}
        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-medium text-muted">Toketeo — Query Editor</span>
          </div>

          <div className="grid grid-cols-[190px_1fr]">
            <aside className="hidden border-r border-border p-3 sm:block">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Connections
              </p>
              {ROWS.map((conn) => (
                <div
                  key={conn.id}
                  className="mb-1 flex items-center justify-between rounded-lg px-2 py-2 text-xs hover:bg-surface-hover"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        conn.status === 'connected' ? 'bg-emerald-400' : 'bg-muted/40'
                      }`}
                    />
                    {conn.name}
                  </span>
                  <span className="text-muted">{conn.latency}</span>
                </div>
              ))}
              <div className="mt-4 rounded-lg border border-accent/30 bg-accent-muted p-3">
                <p className="text-xs font-bold text-accent">AI Assistant</p>
                <p className="mt-1 text-[11px] leading-snug text-muted">
                  Ask “show me orders by region” and get the query instantly.
                </p>
              </div>
            </aside>

            <div>
              <div className="space-y-0.5 p-4 font-mono text-[13px] leading-relaxed">
                {SQL_LINES.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-5 select-none text-right text-muted/40">{i + 1}</span>
                    <span
                      className={
                        line.token === 'keyword'
                          ? 'text-accent'
                          : line.token === 'table'
                            ? 'text-neon'
                            : 'text-foreground/80'
                      }
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border">
                <div className="grid grid-cols-4 gap-3 p-4 text-xs">
                  {[
                    ['ID', 'e9f2…', 'ORDER 2041'],
                    ['Total', '$12,480', 'customer C. L.'],
                    ['Payment', 'paid', 'status ✓'],
                    ['Created', '2d ago', 'Jul 29, 2026'],
                  ].map(([label, value, hint]) => (
                    <div key={label} className="rounded-lg border border-border bg-base/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-1 font-semibold text-foreground">{value}</p>
                      <p className="text-[11px] text-muted">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
