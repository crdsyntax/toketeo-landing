import { useState } from 'react'
import { Download as DownloadIcon, Copy, Check } from 'lucide-react'
import { useUpdateWorker } from '../hooks/useUpdateWorker'

interface Platform {
  id: string
  name: string
  arch: string
  format: string
  size: string
  sha256: string
  url: string
}

export function Download() {
  const { version, notes, windowsUrl } = useUpdateWorker()
  const [copiedSha, setCopiedSha] = useState<string | null>(null)

  const platforms: Platform[] = [
    {
      id: 'windows',
      name: 'Windows',
      arch: 'x64',
      format: 'MSI',
      size: '27 MB',
      sha256: 'a75f6cc65c160deb2612af0b9de811765c0a3e5fcfb684573901c4256494ad5f',
      url: windowsUrl,
    },
  ]

  const handleCopySha = (sha: string, id: string) => {
    if (sha === '—') return
    navigator.clipboard.writeText(sha)
    setCopiedSha(id)
    setTimeout(() => setCopiedSha(null), 1500)
  }

  return (
    <section id="download" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-mute">
            <span className="font-mono text-xs font-bold text-accent">$ 06</span>
            <span className="h-px w-12 bg-line" />
            Download
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Windows x64.
          </h2>
          <p className="mt-4 font-mono text-sm text-soft">
            Latest release: <span className="font-bold text-accent">v{version}</span>
            <span className="text-mute"> — {notes}</span>
          </p>
          <p className="mt-2 text-soft">
            Desktop app with automatic in-app updates. The installer is signed;
            verify the SHA-256 against the release before trusting a copy.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-px border border-line bg-line">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex flex-col bg-panel p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-2xl font-black tracking-tight text-ink">{platform.name}</h3>
                <span className="font-mono text-xs text-mute">
                  v{version}
                </span>
              </div>

              <dl className="mt-5 space-y-1 font-mono text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="uppercase tracking-widest text-mute">Arch</dt>
                  <dd className="text-right text-soft">{platform.arch}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="uppercase tracking-widest text-mute">Format</dt>
                  <dd className="text-right text-soft">{platform.format}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="uppercase tracking-widest text-mute">Size</dt>
                  <dd className="text-right text-soft">{platform.size}</dd>
                </div>
              </dl>

              <a
                href={platform.url}
                className="mt-6 flex items-center justify-center gap-2 border border-accent bg-accent px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest text-page no-underline hover:bg-accent-2"
              >
                <DownloadIcon className="h-4 w-4" />
                Download {platform.name}
              </a>

              <button
                onClick={() => handleCopySha(platform.sha256, platform.id)}
                className="mt-2 flex w-full items-center justify-between gap-2 border border-line px-3 py-2 font-mono text-[10px] text-mute hover:bg-accent hover:text-page"
                title={platform.sha256 === '—' ? 'Not published yet' : 'Copy SHA-256'}
              >
                <span className="truncate">SHA-256: {platform.sha256}</span>
                {copiedSha === platform.id ? (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}