import { useState, useEffect } from 'react'
import { Search, X, Database, Terminal, Shield, Download, Sparkles, ArrowRight } from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  category: 'Engines' | 'Features' | 'Action' | 'AI'
  href: string
  icon: any
}

const COMMANDS: CommandItem[] = [
  { id: 'c1', title: 'Connect to PostgreSQL 16 Cluster', category: 'Engines', href: '#engines', icon: Database },
  { id: 'c2', title: 'Open MySQL Query Editor', category: 'Engines', href: '#engines', icon: Terminal },
  { id: 'c3', title: 'Inspect MongoDB Aggregation Pipeline', category: 'Engines', href: '#engines', icon: Database },
  { id: 'c4', title: 'Scan Redis Keys & Monitor TTL', category: 'Engines', href: '#engines', icon: Database },
  { id: 'c5', title: 'Generate Query with AI Copilot', category: 'AI', href: '#ai-assistant', icon: Sparkles },
  { id: 'c6', title: 'Audit Database Roles & Security Vault', category: 'Features', href: '#security', icon: Shield },
  { id: 'c7', title: 'Download Windows MSI Package', category: 'Action', href: '#download', icon: Download },
  { id: 'c8', title: 'Download Linux DEB / AppImage', category: 'Action', href: '#download', icon: Download },
]

export function CommandPaletteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open handled by parent or state trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = COMMANDS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl border border-indigo-500/30 bg-[#0d101a] shadow-2xl shadow-indigo-950/80 overflow-hidden animate-fadeIn">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 bg-[#080a12]">
          <Search className="h-4 w-4 text-indigo-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or database engine (e.g. Postgres, AI, Vault)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No matching commands or query templates found.
            </div>
          ) : (
            filtered.map((item) => {
              const IconComp = item.icon
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl p-3 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <IconComp className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              )
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-[#080a12] px-4 py-2 text-[10px] font-mono text-slate-500">
          <span>Navigate with search</span>
          <span>Press <kbd className="rounded border border-white/10 px-1 bg-white/5">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  )
}
