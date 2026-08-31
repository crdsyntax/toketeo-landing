import { ArrowUp } from 'lucide-react'

const ENGINE_LINKS = [
  { href: '#engines', label: 'PostgreSQL' },
  { href: '#engines', label: 'MySQL & MariaDB' },
  { href: '#engines', label: 'MongoDB' },
  { href: '#engines', label: 'Redis' },
  { href: '#engines', label: 'SQLite' },
  { href: '#engines', label: 'SQL Server' },
]

const PRODUCT_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#ai', label: 'AI assistance' },
  { href: '#security', label: 'Security' },
  { href: '#download', label: 'Downloads' },
  { href: 'https://github.com/crdsyntax/toketeo', label: 'GitHub', external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel text-mute">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-ink">
              <img
                src="./logotipo.png"
                alt="Toketeo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-base font-black tracking-tight">Toketeo</span>
            </div>
            <p className="text-xs leading-relaxed">
              Open-source desktop client and administration panel for relational,
              document, embedded and in-memory databases.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              Engines
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {ENGINE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-mute no-underline hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              Product
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-mute no-underline hover:text-accent"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <a href={link.href} className="text-mute no-underline hover:text-accent">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              Security
            </h4>
            <p className="mt-3 text-xs leading-relaxed">
              Zero telemetry. Credentials sealed with AES-256-GCM. Releases signed
              with Ed25519 and verified on install.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-mute">
              Windows x64
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} Toketeo — open source
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-mute no-underline hover:border-accent hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}