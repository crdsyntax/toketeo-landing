import { useEffect, useState } from 'react'
import { ExternalLink, Menu, X, Command, Download as DownloadIcon } from 'lucide-react'
import { useUpdateWorker } from '../hooks/useUpdateWorker'

const LINKS = [
  { href: '#engines', label: 'Engines' },
  { href: '#features', label: 'Features' },
  { href: '#ai-assistant', label: 'AI Studio' },
  { href: '#security', label: 'Security' },
  { href: '#download', label: 'Download' },
]

export function Navbar({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { version } = useUpdateWorker()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#07080d]/80 backdrop-blur-xl shadow-xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      {/* Top micro-announcement bar */}
      <div className="border-b border-white/[0.06] bg-gradient-to-r from-indigo-950/40 via-surface/60 to-purple-950/40 py-1.5 text-center text-[11px] font-medium text-slate-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Supported Engines:</span>
            <span className="font-semibold text-slate-200">MySQL • PostgreSQL • SQL Server • MongoDB • Redis • SQLite</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-2">
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">LATEST v{version}</span>
            <span>Zero-Telemetry & Worker update channel active</span>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-30 blur group-hover:opacity-75 transition duration-300" />
            <img
              src="./toketeo-logo.png"
              alt="Toketeo"
              className="relative h-9 w-9 rounded-xl object-contain bg-surface border border-white/10 p-1"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              Toketeo
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Pro</span>
            </span>
          </div>
        </a>

        {/* Center navigation links */}
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-surface/70 px-4 py-1.5 backdrop-blur-md md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right action controls */}
        <div className="hidden items-center gap-3 md:flex">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-surface/80 px-3 py-1.5 text-xs text-slate-400 hover:border-indigo-500/50 hover:text-slate-200 transition-all"
              title="Search commands or queries"
            >
              <Command className="h-3.5 w-3.5 text-indigo-400" />
              <span>Search...</span>
              <kbd className="rounded border border-white/10 bg-base px-1.5 py-0.5 text-[10px] font-mono text-slate-400">⌘K</kbd>
            </button>
          )}

          <a
            href="https://github.com/crdsyntax/toketeo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:text-white hover:bg-white/5"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            <span>GitHub</span>
            <span className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-indigo-300">★ 1.4k</span>
          </a>

          <a
            href="#download"
            className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-1.5 relative z-10">
              <DownloadIcon className="h-3.5 w-3.5" />
              Download Free
            </span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-slate-300 hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile nav drawer */}
      {open && (
        <div className="border-b border-white/10 bg-[#07080d]/95 px-5 pt-3 pb-6 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-surface hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-md shadow-indigo-500/30"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Toketeo Desktop
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

