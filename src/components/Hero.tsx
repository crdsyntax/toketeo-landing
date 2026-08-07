import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Play,
  Sparkles,
  Terminal,
  Table as TableIcon,
  Zap,
  Bot,
  Copy,
  Check,
} from 'lucide-react'
import { useUpdateWorker } from '../hooks/useUpdateWorker'

type Engine = 'postgres' | 'mysql' | 'mongodb' | 'redis' | 'sqlite'

interface MockDataset {
  engineName: string
  version: string
  connections: { name: string; status: 'connected' | 'idle' | 'syncing'; latency: string }[]
  code: { text: string; token: 'keyword' | 'table' | 'function' | 'plain' | 'comment' }[]
  columns: string[]
  rows: Record<string, string>[]
  executionTime: string
  aiPromptSuggestion: string
  aiResponseCode: string
}

const DATASETS: Record<Engine, MockDataset> = {
  postgres: {
    engineName: 'PostgreSQL 16.2',
    version: 'pg_catalog',
    connections: [
      { name: 'prod-cluster-us-east', status: 'connected', latency: '4ms' },
      { name: 'analytics-replica-01', status: 'connected', latency: '12ms' },
      { name: 'staging-vault-db', status: 'idle', latency: '—' },
    ],
    code: [
      { text: '-- PostgreSQL JSONB & Window Query', token: 'comment' },
      { text: 'SELECT', token: 'keyword' },
      { text: '  u.id, u.email, u.metadata->>\'plan\' AS tier,', token: 'plain' },
      { text: '  COUNT(o.id) OVER (PARTITION BY u.id) AS total_orders,', token: 'function' },
      { text: '  SUM(o.amount_cents) / 100.0 AS revenue_usd', token: 'function' },
      { text: 'FROM', token: 'keyword' },
      { text: '  users u', token: 'table' },
      { text: 'LEFT JOIN', token: 'keyword' },
      { text: '  orders o ON o.user_id = u.id AND o.status = \'completed\'', token: 'table' },
      { text: 'WHERE', token: 'keyword' },
      { text: '  u.created_at >= NOW() - INTERVAL \'30 days\'', token: 'plain' },
      { text: 'ORDER BY', token: 'keyword' },
      { text: '  revenue_usd DESC LIMIT 5;', token: 'plain' },
    ],
    columns: ['ID', 'Email', 'Tier', 'Orders', 'Revenue (USD)'],
    rows: [
      { ID: 'usr_9821a', Email: 'alex.v@acme.io', Tier: 'Enterprise', Orders: '42', 'Revenue (USD)': '$14,290.00' },
      { ID: 'usr_8710b', Email: 'sarah.m@tech.co', Tier: 'Pro', Orders: '19', 'Revenue (USD)': '$3,480.50' },
      { ID: 'usr_5512c', Email: 'devs@startup.dev', Tier: 'Pro', Orders: '12', 'Revenue (USD)': '$2,100.00' },
      { ID: 'usr_1092d', Email: 'ceo@scale.app', Tier: 'Enterprise', Orders: '87', 'Revenue (USD)': '$28,900.00' },
    ],
    executionTime: '3.8ms',
    aiPromptSuggestion: 'Show user cohort retention breakdown for enterprise accounts',
    aiResponseCode: 'WITH cohorts AS (\n  SELECT date_trunc(\'month\', created_at) AS month, COUNT(*) AS count\n  FROM users WHERE metadata->>\'plan\' = \'Enterprise\'\n  GROUP BY 1\n) SELECT * FROM cohorts ORDER BY month DESC;',
  },
  mysql: {
    engineName: 'MySQL 8.3',
    version: 'InnoDB',
    connections: [
      { name: 'main-ecommerce-db', status: 'connected', latency: '6ms' },
      { name: 'inventory-store-02', status: 'connected', latency: '9ms' },
    ],
    code: [
      { text: '-- MySQL High Performance Index Check', token: 'comment' },
      { text: 'SELECT', token: 'keyword' },
      { text: '  p.sku, p.title, p.stock_qty, c.category_name', token: 'plain' },
      { text: 'FROM', token: 'keyword' },
      { text: '  products p', token: 'table' },
      { text: 'STRAIGHT_JOIN', token: 'keyword' },
      { text: '  categories c ON c.id = p.category_id', token: 'table' },
      { text: 'WHERE', token: 'keyword' },
      { text: '  p.stock_qty < 15 AND p.is_active = 1', token: 'plain' },
      { text: 'ORDER BY', token: 'keyword' },
      { text: '  p.stock_qty ASC;', token: 'plain' },
    ],
    columns: ['SKU', 'Title', 'Stock Qty', 'Category'],
    rows: [
      { SKU: 'SKU-NV-901', Title: 'Ultra-Fast NVMe Module 2TB', 'Stock Qty': '2', Category: 'Storage' },
      { SKU: 'SKU-GPU-409', Title: 'RTX Workstation Adapter', 'Stock Qty': '4', Category: 'Hardware' },
      { SKU: 'SKU-RAM-64G', Title: 'ECC Server Memory 64GB', 'Stock Qty': '7', Category: 'Memory' },
    ],
    executionTime: '2.1ms',
    aiPromptSuggestion: 'Generate safe index migration script for low stock queries',
    aiResponseCode: 'ALTER TABLE products ADD INDEX idx_active_stock (is_active, stock_qty, category_id);',
  },
  mongodb: {
    engineName: 'MongoDB 7.0',
    version: 'Sharded Cluster',
    connections: [
      { name: 'cluster0-primary', status: 'connected', latency: '15ms' },
      { name: 'logs-archive-atlas', status: 'connected', latency: '22ms' },
    ],
    code: [
      { text: '// MongoDB Aggregation Pipeline', token: 'comment' },
      { text: 'db.events.aggregate([', token: 'keyword' },
      { text: '  { $match: { type: "login_attempt", success: false } },', token: 'plain' },
      { text: '  { $group: { _id: "$ip_address", attempts: { $sum: 1 } } },', token: 'function' },
      { text: '  { $match: { attempts: { $gt: 5 } } },', token: 'plain' },
      { text: '  { $sort: { attempts: -1 } }', token: 'plain' },
      { text: ']);', token: 'keyword' },
    ],
    columns: ['IP Address', 'Failed Attempts', 'Threat Level', 'Action'],
    rows: [
      { 'IP Address': '192.168.104.12', 'Failed Attempts': '142', 'Threat Level': 'High', Action: 'Auto-Blocked' },
      { 'IP Address': '10.0.42.18', 'Failed Attempts': '28', 'Threat Level': 'Medium', Action: 'Rate-Limited' },
      { 'IP Address': '172.16.8.99', 'Failed Attempts': '12', 'Threat Level': 'Low', Action: 'Captcha' },
    ],
    executionTime: '5.4ms',
    aiPromptSuggestion: 'Build index to speed up failed login aggregation',
    aiResponseCode: 'db.events.createIndex({ type: 1, success: 1, ip_address: 1 }, { background: true });',
  },
  redis: {
    engineName: 'Redis 7.2',
    version: 'Standalone / Sentinel',
    connections: [
      { name: 'cache-redis-01', status: 'connected', latency: '0.8ms' },
      { name: 'pubsub-broker-02', status: 'connected', latency: '1.1ms' },
    ],
    code: [
      { text: '# Redis Cache Keys Inspector & TTL', token: 'comment' },
      { text: 'SCAN', token: 'keyword' },
      { text: '  0 MATCH "session:user:*" COUNT 100', token: 'plain' },
      { text: 'TTL', token: 'keyword' },
      { text: '  session:user:usr_9821a', token: 'plain' },
      { text: 'HGETALL', token: 'keyword' },
      { text: '  session:user:usr_9821a', token: 'plain' },
    ],
    columns: ['Key', 'Type', 'TTL (s)', 'Memory Used'],
    rows: [
      { Key: 'session:user:usr_9821a', Type: 'hash', 'TTL (s)': '3592s', 'Memory Used': '1.2 KB' },
      { Key: 'session:user:usr_8710b', Type: 'hash', 'TTL (s)': '1820s', 'Memory Used': '0.9 KB' },
      { Key: 'rate_limit:ip_192.168.1', Type: 'string', 'TTL (s)': '45s', 'Memory Used': '128 B' },
    ],
    executionTime: '0.4ms',
    aiPromptSuggestion: 'Convert session memory check into a pipeline command',
    aiResponseCode: 'PIPELINE\n  TTL session:user:usr_9821a\n  MEMORY USAGE session:user:usr_9821a\nEXEC',
  },
  sqlite: {
    engineName: 'SQLite 3.45',
    version: 'WAL Mode',
    connections: [{ name: 'local-desktop-vault.db', status: 'connected', latency: '0.1ms' }],
    code: [
      { text: '-- SQLite Local Embedded Database', token: 'comment' },
      { text: 'SELECT', token: 'keyword' },
      { text: '  name, type, sql', token: 'plain' },
      { text: 'FROM', token: 'keyword' },
      { text: '  sqlite_master', token: 'table' },
      { text: 'WHERE', token: 'keyword' },
      { text: '  type IN (\'table\', \'index\')', token: 'plain' },
      { text: 'ORDER BY', token: 'keyword' },
      { text: '  name ASC;', token: 'plain' },
    ],
    columns: ['Name', 'Type', 'WAL Mode', 'Size'],
    rows: [
      { Name: 'vault_credentials', Type: 'table', 'WAL Mode': 'Active ✓', Size: '48 KB' },
      { Name: 'saved_queries', Type: 'table', 'WAL Mode': 'Active ✓', Size: '16 KB' },
      { Name: 'idx_vault_service', Type: 'index', 'WAL Mode': 'Active ✓', Size: '8 KB' },
    ],
    executionTime: '0.1ms',
    aiPromptSuggestion: 'Optimize SQLite PRAGMA configuration for ultra-fast local queries',
    aiResponseCode: 'PRAGMA journal_mode = WAL;\nPRAGMA synchronous = NORMAL;\nPRAGMA cache_size = -64000;',
  },
}

export function Hero() {
  const [activeEngine, setActiveEngine] = useState<Engine>('postgres')
  const [isRunning, setIsRunning] = useState(false)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const { version } = useUpdateWorker()

  const currentDataset = DATASETS[activeEngine]

  const handleRunQuery = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 350)
  }

  const handleCopyCode = () => {
    const fullCode = currentDataset.code.map((c) => c.text).join('\n')
    navigator.clipboard.writeText(fullCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      {/* Background radial spotlights & grids */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/15 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          {/* Integrated Logo & Automatic Version Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-surface/90 px-4 py-2 text-xs font-semibold text-slate-200 shadow-xl shadow-indigo-950/40 backdrop-blur-xl">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-md">
              <img
                src="./toketeo-logo.png"
                alt="Toketeo"
                className="h-full w-full rounded-full object-contain bg-[#080a10]"
              />
            </span>
            <span className="font-bold text-white">Toketeo</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-mono text-indigo-300 font-bold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              v{version}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] text-slate-400 font-medium">All-In-One Database Client</span>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl">
            Every database.
            <br />
            <span className="text-gradient">One modern panel.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 font-normal">
            Query, visualize, sync and secure <strong className="text-white font-semibold">MySQL, PostgreSQL, SQL Server, MongoDB, Redis and SQLite</strong> from a single, blazingly fast desktop app with built-in AI intelligence and end-to-end encryption.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#download"
              className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              <span>Download Toketeo Free</span>
            </a>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface/80 px-7 py-4 text-base font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-indigo-500/50 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Explore Features
              <ArrowRight className="h-4 w-4 text-indigo-400" />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
            {['100% Zero Telemetry', 'End-to-End Encrypted Vault', 'Biometric & Windows Hello', 'Built with Rust & React'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Desktop App Shell */}
        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-white/10 bg-[#0c0f18] shadow-2xl shadow-black/80 backdrop-blur-2xl overflow-hidden glow-box">
          {/* Top window titlebar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#080a10] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" />
              <span className="ml-3 text-xs font-semibold text-slate-300 flex items-center gap-2">
                <img src="./toketeo-logo.png" alt="Toketeo" className="h-4 w-4 rounded object-contain" />
                <span>Toketeo Database Admin Panel</span>
                <span className="rounded bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 text-[10px] text-indigo-300 font-mono">
                  v{version} • {currentDataset.engineName}
                </span>
              </span>
            </div>

            {/* Engine switcher tabs */}
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-surface/90 p-1">
              {(['postgres', 'mysql', 'mongodb', 'redis', 'sqlite'] as Engine[]).map((engine) => (
                <button
                  key={engine}
                  onClick={() => {
                    setActiveEngine(engine)
                    setAiPanelOpen(false)
                  }}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeEngine === engine
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {engine}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[380px]">
            {/* Sidebar tree view */}
            <aside className="border-r border-white/10 bg-[#080a10]/70 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Active Connections
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-1">
                  {currentDataset.connections.map((conn, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 font-medium text-slate-200 truncate">
                        <span
                          className={`h-2 w-2 rounded-full shrink-0 ${
                            conn.status === 'connected'
                              ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                              : 'bg-slate-600'
                          }`}
                        />
                        <span className="truncate">{conn.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-400">
                        {conn.latency}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Schema tree list */}
                <div className="mt-5 border-t border-white/10 pt-3">
                  <span className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Schema Objects
                  </span>
                  <div className="mt-2 space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-2 px-2 py-1 hover:text-white cursor-pointer rounded hover:bg-white/5">
                      <TableIcon className="h-3.5 w-3.5 text-indigo-400" />
                      <span>tables (14)</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 hover:text-white cursor-pointer rounded hover:bg-white/5">
                      <Zap className="h-3.5 w-3.5 text-cyan-400" />
                      <span>indexes (28)</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 hover:text-white cursor-pointer rounded hover:bg-white/5">
                      <Terminal className="h-3.5 w-3.5 text-purple-400" />
                      <span>procedures (6)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Trigger in sidebar */}
              <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5 text-cyan-400" />
                    AI Copilot
                  </span>
                  <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] text-indigo-300 font-mono">Ready</span>
                </div>
                <p className="mt-1 text.11px leading-snug text-slate-300">
                  Generate queries & optimize schemas with built-in AI.
                </p>
                <button
                  onClick={() => setAiPanelOpen((v) => !v)}
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600/80 px-2.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  {aiPanelOpen ? 'Close AI Prompt' : 'Ask AI Assistant'}
                </button>
              </div>
            </aside>

            {/* Query editor & output display */}
            <div className="flex flex-col justify-between bg-[#0b0e17]">
              {/* Query action bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#080a10] px-4 py-2 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunQuery}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-95 disabled:opacity-50"
                  >
                    <Play className={`h-3.5 w-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                    {isRunning ? 'Executing...' : 'Run Query'}
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Time: <span className="text-emerald-400 font-bold">{currentDataset.executionTime}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/5"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* AI Copilot Drawer if opened */}
              {aiPanelOpen && (
                <div className="border-b border-indigo-500/30 bg-indigo-950/40 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      Suggested AI Prompt:
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Grounded on schema</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-200 font-medium">
                    "{currentDataset.aiPromptSuggestion}"
                  </p>
                  <pre className="mt-2 rounded-lg bg-black/60 p-2.5 text-[11px] font-mono text-cyan-300 border border-indigo-500/20 overflow-x-auto">
                    {currentDataset.aiResponseCode}
                  </pre>
                </div>
              )}

              {/* Code lines */}
              <div className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto min-h-[160px] bg-[#0c0f1a]">
                {currentDataset.code.map((line, i) => (
                  <div key={i} className="flex gap-4 hover:bg-white/[0.02] rounded px-1">
                    <span className="w-5 select-none text-right text-slate-600 font-mono">{i + 1}</span>
                    <span
                      className={
                        line.token === 'keyword'
                          ? 'text-indigo-400 font-bold'
                          : line.token === 'table'
                            ? 'text-cyan-300 font-semibold'
                            : line.token === 'function'
                              ? 'text-purple-300'
                              : line.token === 'comment'
                                ? 'text-slate-500 italic'
                                : 'text-slate-200'
                      }
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Results table grid */}
              <div className="border-t border-white/10 bg-[#090b12]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <TableIcon className="h-3.5 w-3.5 text-indigo-400" />
                    Query Result Grid ({currentDataset.rows.length} rows returned)
                  </span>
                  <span className="text-emerald-400 font-mono">STATUS 200 OK</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 text-[11px]">
                        {currentDataset.columns.map((col) => (
                          <th key={col} className="px-4 py-2 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentDataset.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors">
                          {currentDataset.columns.map((col) => (
                            <td key={col} className="px-4 py-2 text-slate-200 whitespace-nowrap">
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
        </div>
      </div>
    </section>
  )
}

