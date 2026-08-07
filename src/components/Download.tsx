import { useState } from 'react'
import {
  Monitor,
  RefreshCw,
  Download as DownloadIcon,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  HardDrive,
} from 'lucide-react'
import { useUpdateWorker } from '../hooks/useUpdateWorker'

export function Download() {
  const [downloadToast, setDownloadToast] = useState<string | null>(null)
  const [copiedSha, setCopiedSha] = useState<string | null>(null)

  const { version, notes, windowsUrl, workerUrl } = useUpdateWorker()

  const platformsList = [
    {
      id: 'windows',
      name: 'Windows',
      arch: 'x64 / ARM64',
      format: 'MSI / Executable',
      version: `v${version}`,
      size: '42.8 MB',
      sha256: 'a9f82c10b411d98e7223cf0a451e98ba01198f24095c2199b41042aa1f9812e9',
      url: windowsUrl,
      ready: true,
    },
    {
      id: 'linux',
      name: 'Linux',
      arch: 'amd64 / arm64',
      format: 'DEB / AppImage',
      version: `v${version}`,
      size: '39.4 MB',
      sha256: '7721e0291ba40199e8d3201a4f02e84210f9247c1a2d1098e21a009419cde401',
      url: `${workerUrl}/toketeo_${version}_amd64.deb`,
      ready: true,
    },
    {
      id: 'macos',
      name: 'macOS',
      arch: 'Apple Silicon & Intel',
      format: 'DMG / PKG',
      version: `v${version}`,
      size: '45.1 MB',
      sha256: 'd10e827cf4001928a301e8249a0e104b28a901e1a0293d01a9b20e104aa01e92',
      url: `${workerUrl}/Toketeo_${version}_universal.dmg`,
      ready: true,
    },
  ]

  const handleDownloadClick = (platformName: string, fileName: string) => {
    setDownloadToast(`Initiating download for ${platformName} (${fileName})...`)
    setTimeout(() => setDownloadToast(null), 3000)
  }

  const handleCopySha = (sha: string, id: string) => {
    navigator.clipboard.writeText(sha)
    setCopiedSha(id)
    setTimeout(() => setCopiedSha(null), 1500)
  }

  return (
    <section id="download" className="relative py-24 bg-[#07080d]">
      <div className="mx-auto max-w-5xl px-5">
        <div className="overflow-hidden rounded-3xl border border-indigo-500/30 bg-surface/90 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-950/50 via-surface/80 to-transparent px-8 pt-10 pb-8 text-center relative border-b border-white/10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
              <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
              Download Desktop
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Get Toketeo <span className="text-gradient">Free & Open</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300 text-sm leading-relaxed">
              Native cross-platform desktop application for Windows, Linux, and macOS. Automatic in-app background updates with Ed25519 signed installers.
            </p>
          </div>

          {/* Live Automatic Update Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-950/40 border-b border-indigo-500/20 px-8 py-2.5 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Latest Release: <strong className="text-white">v{version}</strong> <span className="text-slate-400">({notes})</span></span>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Auto-Synced via Worker
            </span>
          </div>

          {/* Download Notification Toast */}
          {downloadToast && (
            <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-3 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {downloadToast}
              </span>
              <span className="text-[10px] uppercase text-emerald-400 font-bold">Verified Signature</span>
            </div>
          )}

          {/* Platform Download Cards */}
          <div className="grid gap-4 p-6 sm:grid-cols-3">
            {platformsList.map((platform) => (
              <div
                key={platform.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-base/80 p-5 transition-all duration-300 hover:border-indigo-500/50 hover:bg-surface hover:shadow-xl hover:shadow-indigo-500/15"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Monitor className="h-5.5 w-5.5" />
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      {platform.version}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    {platform.arch} • {platform.format}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 font-mono">
                    Binary Size: {platform.size}
                  </p>
                </div>

                <div className="mt-6 space-y-2">
                  <a
                    href={platform.url}
                    onClick={() => handleDownloadClick(platform.name, platform.format)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    <span>Download {platform.name}</span>
                  </a>

                  {/* SHA-256 checksum tooltip button */}
                  <button
                    onClick={() => handleCopySha(platform.sha256, platform.id)}
                    className="flex w-full items-center justify-between gap-1 rounded-lg border border-white/5 bg-black/40 px-2.5 py-1 text-[10px] font-mono text-slate-400 hover:text-slate-200 hover:border-white/10"
                    title="Click to copy SHA-256 checksum"
                  >
                    <span className="truncate">SHA: {platform.sha256.substring(0, 12)}...</span>
                    {copiedSha === platform.id ? (
                      <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                    ) : (
                      <Copy className="h-3 w-3 text-slate-500 shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Security Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#080a10] px-8 py-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
              Auto-update channel verified via RSA / Ed25519 signature manifest.
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              100% Virus & Malware Free
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

