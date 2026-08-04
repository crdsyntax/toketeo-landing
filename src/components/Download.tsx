import { Monitor, RefreshCw, Download as DownloadIcon, Ban } from 'lucide-react'

const UPDATES_BASE = 'https://toketeo-updates.crdsyntax.workers.dev'

const PLATFORMS = [
  {
    name: 'Windows',
    arch: 'x64',
    format: 'MSI',
    url: `${UPDATES_BASE}/Toketeo_0.3.8_x64_en-US.msi`,
  },
  {
    name: 'Linux',
    arch: 'amd64',
    format: 'DEB',
    url: `${UPDATES_BASE}/toketeo_0.3.8_amd64.deb`,
    comingSoon: true,
  },
]

export function Download() {
  return (
    <section id="download" className="relative py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="overflow-hidden rounded-3xl border border-accent/30 bg-surface">
          <div className="bg-gradient-to-br from-accent/15 via-transparent to-transparent px-8 pt-10 pb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Download</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Get Toketeo <span className="text-gradient">free</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Desktop app for Windows and Linux. Updates are delivered in-app with signed artifacts
              — no store account needed.
            </p>
          </div>

          <div className="grid gap-4 px-8 pb-10 sm:grid-cols-2">
            {PLATFORMS.map((platform) =>
              platform.comingSoon ? (
                <div
                  key={platform.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-base/60 p-5 opacity-60"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted text-accent">
                      <Monitor className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-bold">{platform.name}</p>
                      <p className="text-xs text-muted">
                        {platform.arch} · {platform.format} · Coming soon
                      </p>
                    </div>
                  </div>
                  <Ban className="h-5 w-5 text-muted" />
                </div>
              ) : (
                <a
                  key={platform.name}
                  href={platform.url}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-base/60 p-5 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <Monitor className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-bold">{platform.name}</p>
                      <p className="text-xs text-muted">
                        {platform.arch} · {platform.format} · v0.3.8
                      </p>
                    </div>
                  </div>
                  <DownloadIcon className="h-5 w-5 text-muted transition-colors group-hover:text-accent" />
                </a>
              ),
            )}
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-border px-8 py-4 text-xs text-muted">
            <RefreshCw className="h-3.5 w-3.5" />
            Automatic in-app updates with signed installers, verified before installation.
          </div>
        </div>
      </div>
    </section>
  )
}
