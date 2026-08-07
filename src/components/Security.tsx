import { useState } from 'react'
import {
  Fingerprint,
  KeyRound,
  Lock,
  ShieldCheck,
  Wifi,
  KeySquare,
  EyeOff,
} from 'lucide-react'

const ITEMS = [
  {
    icon: Lock,
    title: 'Master password vault',
    description: 'Credentials are sealed with a master password and AES-256-GCM before ever touching disk.',
    tag: 'AES-256-GCM',
  },
  {
    icon: Fingerprint,
    title: 'Biometric Unlock',
    description: 'Unlock your vault instantly using Windows Hello, Touch ID, or Linux secret service.',
    tag: 'Windows Hello / TouchID',
  },
  {
    icon: KeySquare,
    title: 'Two-factor authentication',
    description: 'Enforce a TOTP authenticator code as a second factor before unlocking sensitive connections.',
    tag: 'TOTP 2FA',
  },
  {
    icon: ShieldCheck,
    title: 'Recovery code sealed',
    description: 'A one-time emergency recovery seed lets you regain connection parameters if lost.',
    tag: 'Zero-Knowledge',
  },
  {
    icon: KeyRound,
    title: 'Native OS Keyring',
    description: 'Master keys reside in your system credential store (Windows Credential Manager / Keychain).',
    tag: 'OS Keyring',
  },
  {
    icon: Wifi,
    title: 'Encrypted SSH Tunnels',
    description: 'Reach isolated VPC databases behind firewalls through automated SSH tunneling.',
    tag: 'SSH v2 Tunnel',
  },
]

export function Security() {
  const [vaultLocked, setVaultLocked] = useState(false)

  return (
    <section id="security" className="relative py-24 bg-[#07080d]">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-4xl rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Security Architecture
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Your credentials stay <span className="text-gradient">100% private</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Toketeo treats every database connection string as a secret. Military-grade encryption, biometric unlock and zero remote telemetry mean your connection keys never leave your machine.
            </p>

            {/* Interactive Vault Status Card */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-3 w-3 rounded-full ${vaultLocked ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'}`} />
                  <span className="text-xs font-mono font-bold text-white">
                    VAULT STATE: {vaultLocked ? 'LOCKED (AES-256 SEALED)' : 'UNLOCKED (BIOMETRIC VERIFIED)'}
                  </span>
                </div>
                <button
                  onClick={() => setVaultLocked((v) => !v)}
                  className="rounded bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 hover:bg-white/20 transition-all"
                >
                  {vaultLocked ? 'Unlock Vault' : 'Test Lock Vault'}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs font-mono text-slate-300">
                <EyeOff className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>
                  Zero Telemetry guarantee: No connection metrics or database hostnames are ever transmitted to third-party servers.
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Security Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-surface/60 p-5 transition-all duration-300 hover:border-indigo-500/50 hover:bg-surface hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

