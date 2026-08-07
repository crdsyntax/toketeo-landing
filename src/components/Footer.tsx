import { ArrowUp, ShieldCheck } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-[#05060a] py-14 relative text-slate-400 text-xs">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 pb-10 border-b border-white/10">
          {/* Brand col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="./toketeo-logo.png"
                alt="Toketeo"
                className="h-8 w-8 rounded-lg object-contain bg-surface border border-white/10 p-1"
              />
              <span className="text-base font-black tracking-tight text-white">Toketeo</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The modern open-source database client & administration panel built for speed, security and multi-engine flexibility.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Update Servers Operational</span>
            </div>
          </div>

          {/* Engines col */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Supported Engines</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#engines" className="hover:text-white transition-colors">PostgreSQL Client</a></li>
              <li><a href="#engines" className="hover:text-white transition-colors">MySQL & MariaDB Admin</a></li>
              <li><a href="#engines" className="hover:text-white transition-colors">MongoDB Aggregator</a></li>
              <li><a href="#engines" className="hover:text-white transition-colors">Redis Cache Explorer</a></li>
              <li><a href="#engines" className="hover:text-white transition-colors">SQLite Local Inspector</a></li>
            </ul>
          </div>

          {/* Navigation col */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Feature Capabilities</a></li>
              <li><a href="#ai-assistant" className="hover:text-white transition-colors">AI Query Copilot</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security Architecture</a></li>
              <li><a href="#download" className="hover:text-white transition-colors">Download Windows & Linux</a></li>
              <li><a href="https://github.com/crdsyntax/toketeo" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          {/* Vault & Legal */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Security & Trust</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              100% Zero-Telemetry. Master keys sealed using AES-256-GCM.
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-mono text-indigo-300">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              Verified Ed25519 Signatures
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Toketeo. Open source database administration panel.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface/80 px-3 py-1.5 text-xs text-slate-300 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-indigo-400" />
          </button>
        </div>
      </div>
    </footer>
  )
}

