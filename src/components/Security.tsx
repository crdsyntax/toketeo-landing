const ITEMS = [
  {
    title: 'Master password vault',
    fact: 'AES-256-GCM',
    description:
      'Credentials are sealed with a master password before ever touching disk.',
  },
  {
    title: 'Biometric unlock',
    fact: 'Windows Hello',
    description:
      'Unlock the vault with biometrics or the OS keyring instead of retyping secrets.',
  },
  {
    title: 'Two-factor authentication',
    fact: 'TOTP',
    description:
      'A TOTP code can be required before any connection unlocks.',
  },
  {
    title: 'Recovery code',
    fact: 'Zero-knowledge',
    description:
      'A one-time emergency seed lets you recover connection parameters if the password is lost.',
  },
  {
    title: 'Native OS keyring',
    fact: 'Credential Manager / Keychain',
    description:
      'Master keys live in the OS credential store, not in the app directory.',
  },
  {
    title: 'Encrypted SSH tunnels',
    fact: 'SSH v2',
    description:
      'Reach databases inside private networks through automated SSH tunneling.',
  },
]

const GUARANTEES = [
  'Zero telemetry — connection metadata never leaves the machine.',
  'Release binaries are signed with Ed25519 and verified on install.',
  'No accounts, no cloud sync of your credentials, no tracking.',
]

export function Security() {
  return (
    <section id="security" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-mute">
              <span className="font-mono text-xs font-bold text-accent">$ 05</span>
              <span className="h-px flex-1 bg-line" />
              Security
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Your credentials never leave the machine.
            </h2>
          </div>
          <ul className="space-y-2 font-mono text-xs text-soft">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between gap-4 bg-surface p-5"
            >
              <div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">
                  {item.description}
                </p>
              </div>
              <span className="self-start border border-line bg-panel px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                {item.fact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}