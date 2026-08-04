import { Database } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Database className="h-4 w-4" />
          </span>
          <span className="font-black tracking-tight">Toketeo</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#security" className="transition-colors hover:text-foreground">
            Security
          </a>
          <a href="#download" className="transition-colors hover:text-foreground">
            Download
          </a>
        </div>

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Toketeo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
