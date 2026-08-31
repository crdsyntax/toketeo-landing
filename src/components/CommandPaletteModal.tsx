import { useState, useEffect } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  category: string
  href: string
}

const COMMANDS: CommandItem[] = [
  { id: 'c1', title: 'Connect to PostgreSQL', category: 'Engines', href: '#engines' },
  { id: 'c2', title: 'Open the MySQL query editor', category: 'Engines', href: '#engines' },
  { id: 'c3', title: 'Inspect MongoDB aggregation pipeline', category: 'Engines', href: '#engines' },
  { id: 'c4', title: 'Scan Redis keys & monitor TTL', category: 'Engines', href: '#engines' },
  { id: 'c5', title: 'Generate a query with AI', category: 'AI', href: '#ai' },
  { id: 'c6', title: 'Security & vault overview', category: 'Security', href: '#security' },
  { id: 'c7', title: 'Download Windows MSI', category: 'Action', href: '#download' },
]

export function CommandPaletteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) setQuery('')
  }, [isOpen])

  if (!isOpen) return null

  const filtered = COMMANDS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-page/70 p-4 pt-24">
      <div className="w-full max-w-xl border border-line bg-panel shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search className="h-4 w-4 text-accent" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search engines, features, actions…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-mute"
            autoFocus
          />
          <button
            onClick={onClose}
            className="border border-line p-1 text-mute hover:bg-accent hover:text-page"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-line">
          {filtered.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-mute">
              No matches.
            </div>
          ) : (
            filtered.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-accent hover:text-page"
              >
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
                    {item.category} ·{' '}
                  </span>
                  {item.title}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-mute">
          <span>Esc to close</span>
          <span>⌘K toggles</span>
        </div>
      </div>
    </div>
  )
}