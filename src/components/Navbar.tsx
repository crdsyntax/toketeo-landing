import { useEffect, useState } from 'react'
import { ExternalLink, Menu, X, Download as DownloadIcon } from 'lucide-react'
import { useUpdateWorker } from '../hooks/useUpdateWorker'

const LINKS = [
  { href: '#engines', label: 'Engines' },
  { href: '#features', label: 'Features' },
  { href: '#ai', label: 'AI' },
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
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-page/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_2px_0_0_rgba(74,222,128,0.35)]' : ''
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#" className="flex items-center gap-2.5">
          <img
            src="./logotipo.png"
            alt="Toketeo"
            className="h-8 w-auto object-contain"
          />
          <span className="text-base font-black tracking-tight">Toketeo</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
            DB client · v{version}
          </span>
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-semibold uppercase tracking-widest no-underline"
            >
              {link.label}
            </a>
          ))}

          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="font-mono text-xs font-semibold uppercase tracking-widest text-mute hover:text-accent"
              title="Search (Ctrl+K)"
            >
              Search <kbd className="ml-1 border border-line bg-panel px-1 text-accent">⌘K</kbd>
            </button>
          )}

          <a
            href="https://github.com/crdsyntax/toketeo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-widest no-underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            GitHub
          </a>

          <a
            href="#download"
            className="flex items-center gap-1.5 bg-accent px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-page no-underline hover:bg-accent-2"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Download
          </a>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center border border-line md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-page px-5 pb-6 pt-3 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm font-semibold uppercase tracking-widest no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-accent px-3 py-2.5 text-center font-mono text-sm font-bold uppercase tracking-widest text-page no-underline hover:bg-accent-2"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Toketeo
            </a>
          </div>
        </div>
      )}
    </header>
  )
}