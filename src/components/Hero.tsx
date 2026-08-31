import { useState } from 'react'
import { Download, ArrowRight } from 'lucide-react'
import { useUpdateWorker } from '../hooks/useUpdateWorker'

type Engine = 'postgres' | 'mysql' | 'mongodb' | 'redis' | 'sqlite'

interface EngineDataset {
  name: string
  connections: string[]
  code: string[]
  columns: string[]
  rows: Record<string, string>[]
}

const DATASETS: Record<Engine, EngineDataset> = {
  postgres: {
    name: 'PostgreSQL 16',
    connections: ['prod-cluster-us-east', 'analytics-replica-01', 'staging-vault'],
    code: [
      '-- JSONB & window query',
      'SELECT',
      '  u.id, u.email, u.metadata->>\'plan\' AS tier,',
      '  COUNT(o.id) OVER (PARTITION BY u.id) AS orders,',
      '  SUM(o.amount_cents) / 100.0 AS revenue_usd',
      'FROM users u',
      'LEFT JOIN orders o ON o.user_id = u.id AND o.status = \'completed\'',
      'WHERE u.created_at >= NOW() - INTERVAL \'30 days\'',
      'ORDER BY revenue_usd DESC LIMIT 5;',
    ],
    columns: ['ID', 'Email', 'Tier', 'Orders', 'Revenue'],
    rows: [
      { ID: 'usr_9821a', Email: 'alex.v@acme.io', Tier: 'Enterprise', Orders: '42', Revenue: '$14,290' },
      { ID: 'usr_8710b', Email: 'sarah.m@tech.co', Tier: 'Pro', Orders: '19', Revenue: '$3,480' },
      { ID: 'usr_1092d', Email: 'ceo@scale.app', Tier: 'Enterprise', Orders: '87', Revenue: '$28,900' },
    ],
  },
  mysql: {
    name: 'MySQL 8',
    connections: ['main-ecommerce-db', 'inventory-store-02'],
    code: [
      '-- low-stock inventory check',
      'SELECT p.sku, p.title, p.stock_qty, c.category_name',
      'FROM products p',
      'STRAIGHT_JOIN categories c ON c.id = p.category_id',
      'WHERE p.stock_qty < 15 AND p.is_active = 1',
      'ORDER BY p.stock_qty ASC;',
    ],
    columns: ['SKU', 'Title', 'Stock Qty', 'Category'],
    rows: [
      { SKU: 'SKU-NV-901', Title: 'NVMe Module 2TB', 'Stock Qty': '2', Category: 'Storage' },
      { SKU: 'SKU-GPU-409', Title: 'Workstation Adapter', 'Stock Qty': '4', Category: 'Hardware' },
      { SKU: 'SKU-RAM-64G', Title: 'ECC Server Memory', 'Stock Qty': '7', Category: 'Memory' },
    ],
  },
  mongodb: {
    name: 'MongoDB 7',
    connections: ['cluster0-primary', 'logs-archive'],
    code: [
      '// failed-login aggregation',
      'db.events.aggregate([',
      '  { $match: { type: "login_attempt", success: false } },',
      '  { $group: { _id: "$ip_address", attempts: { $sum: 1 } } },',
      '  { $sort: { attempts: -1 } }',
      ']);',
    ],
    columns: ['IP Address', 'Attempts', 'Threat'],
    rows: [
      { 'IP Address': '192.168.104.12', Attempts: '142', Threat: 'High' },
      { 'IP Address': '10.0.42.18', Attempts: '28', Threat: 'Medium' },
      { 'IP Address': '172.16.8.99', Attempts: '12', Threat: 'Low' },
    ],
  },
  redis: {
    name: 'Redis 7',
    connections: ['cache-redis-01', 'pubsub-broker-02'],
    code: [
      '# session keys & TTL',
      'SCAN 0 MATCH "session:user:*" COUNT 100',
      'TTL session:user:usr_9821a',
      'HGETALL session:user:usr_9821a',
    ],
    columns: ['Key', 'Type', 'TTL (s)'],
    rows: [
      { Key: 'session:user:usr_9821a', Type: 'hash', 'TTL (s)': '3592' },
      { Key: 'session:user:usr_8710b', Type: 'hash', 'TTL (s)': '1820' },
      { Key: 'rate_limit:ip_192.168.1', Type: 'string', 'TTL (s)': '45' },
    ],
  },
  sqlite: {
    name: 'SQLite 3.45',
    connections: ['local-desktop-vault.db'],
    code: [
      '-- local schema inventory',
      'SELECT name, type, sql',
      'FROM sqlite_master',
      'WHERE type IN (\'table\', \'index\')',
      'ORDER BY name ASC;',
    ],
    columns: ['Name', 'Type', 'Size'],
    rows: [
      { Name: 'vault_credentials', Type: 'table', Size: '48 KB' },
      { Name: 'saved_queries', Type: 'table', Size: '16 KB' },
      { Name: 'idx_vault_service', Type: 'index', Size: '8 KB' },
    ],
  },
}

const ENGINES: Engine[] = ['postgres', 'mysql', 'mongodb', 'redis', 'sqlite']

export function Hero() {
  const [activeEngine, setActiveEngine] = useState<Engine>('postgres')
  const { version } = useUpdateWorker()
  const current = DATASETS[activeEngine]

  return (
    <section className="relative pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-line bg-panel px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              <span className="text-accent">$</span> toketeo
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-mute">
              Desktop DB client · v{version}
            </span>
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Every engine.
            <br />
            <span className="text-accent">One client.</span>
            <span className="tm-cursor" />
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-soft md:text-lg">
            Toketeo is a desktop client for PostgreSQL, MySQL, SQL Server, MongoDB,
            Redis and SQLite. Your credentials stay on your machine. No accounts, no
            telemetry, no browser tab you will lose.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#download"
              className="flex items-center gap-2 bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-page no-underline hover:bg-accent-2"
            >
              <Download className="h-4 w-4" />
              Download v{version}
            </a>
            <a
              href="#engines"
              className="flex items-center gap-2 border border-line px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest no-underline hover:border-accent hover:text-accent"
            >
              Supported engines
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-mute">
            <span className="text-accent">AES-256 vault</span>
            <span>·</span>
            <span>Offline-first</span>
            <span>·</span>
            <span>Ed25519-signed releases</span>
            <span>·</span>
            <span>Windows x64</span>
          </div>
        </div>

        {/* Editor visual, as a terminal window */}
        <div className="mt-14 border border-line bg-panel">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
              <span className="ml-2 font-mono text-[11px] font-semibold uppercase tracking-widest">
                toketeo — {current.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {ENGINES.map((engine) => (
                <button
                  key={engine}
                  onClick={() => setActiveEngine(engine)}
                  className={`px-2 py-1 font-mono text-[11px] uppercase tracking-wider ${
                    activeEngine === engine
                      ? 'bg-accent text-page'
                      : 'text-mute hover:text-ink'
                  }`}
                >
                  {engine}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-[200px_1fr]">
            <aside className="border-b border-line md:border-b-0 md:border-r">
              <div className="px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                Connections
              </div>
              {current.connections.map((conn) => (
                <div
                  key={conn}
                  className="flex items-center justify-between border-t border-line px-3 py-1.5 font-mono text-xs text-soft"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {conn}
                  </span>
                </div>
              ))}
              <div className="border-t border-line px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                Schema
              </div>
              {['tables (14)', 'indexes (28)', 'procedures (6)'].map((item) => (
                <div
                  key={item}
                  className="border-t border-line px-3 py-1.5 font-mono text-xs text-soft"
                >
                  {item}
                </div>
              ))}
            </aside>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                <span className="text-ink">{current.name}</span>
                <span className="text-mute">{current.rows.length} rows returned</span>
              </div>

              <div className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-soft">
                {current.code.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto border-t border-line">
                <table className="w-full border-collapse font-mono text-xs text-soft">
                  <thead>
                    <tr className="border-b border-line">
                      {current.columns.map((col) => (
                        <th
                          key={col}
                          className="border-r border-line bg-surface px-3 py-1.5 text-left font-bold uppercase tracking-wider text-accent last:border-r-0"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {current.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-panel' : ''}>
                        {current.columns.map((col) => (
                          <td
                            key={col}
                            className="border-r border-line px-3 py-1.5 whitespace-nowrap last:border-r-0"
                          >
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 font-mono text-[11px] text-mute">
          Fig. 01 — Query editor, {current.name}. Live preview; actual screenshot shipped inside the release.
        </p>
      </div>
    </section>
  )
}