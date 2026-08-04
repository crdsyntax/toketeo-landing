import { Fingerprint, KeyRound, Lock, ShieldCheck, Wifi, KeySquare } from 'lucide-react'

const ITEMS = [
  {
    icon: Lock,
    title: 'Master password',
    description: 'Credentials are sealed with a master password and AES-256-GCM before touching disk.',
  },
  {
    icon: Fingerprint,
    title: 'Windows Hello',
    description: 'Unlock the vault with your face or fingerprint — no need to type the master password.',
  },
  {
    icon: KeySquare,
    title: 'Two-factor unlock',
    description: 'Add a TOTP authenticator as a second factor and enforce it at every unlock.',
  },
  {
    icon: ShieldCheck,
    title: 'Recovery code',
    description: 'A one-time recovery code lets you regain access if you ever lose your secrets.',
  },
  {
    icon: KeyRound,
    title: 'OS keyring',
    description: 'Key material is stored in the operating system credential manager, not in plain files.',
  },
  {
    icon: Wifi,
    title: 'SSH tunneling',
    description: 'Reach databases behind firewalls through encrypted SSH tunnels, built right in.',
  },
]

export function Security() {
  return (
    <section id="security" className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-4xl rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Security</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Your data stays{' '}
              <span className="text-gradient">yours</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Toketeo treats every connection as a secret. Encryption, biometrics and zero telemetry
              mean nothing about your databases ever leaves your machine.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm leading-relaxed text-muted">
                “An end-to-end encrypted vault, biometric unlock and scheduled backups with
                connection recovery — this is what every database admin should have.”
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-accent">
                Toketeo — security manifesto
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-bold">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
