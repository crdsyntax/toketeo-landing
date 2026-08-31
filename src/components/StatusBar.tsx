import { useUpdateWorker } from '../hooks/useUpdateWorker'

export function StatusBar() {
  const { version } = useUpdateWorker()

  return (
    <footer className="sticky bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-surface px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mute">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          toketeo
        </span>
        <span className="hidden sm:inline">main</span>
        <span className="hidden sm:inline">utf-8</span>
        <span className="hidden sm:inline">crlf</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline">windows x64</span>
        <span>v{version}</span>
      </div>
    </footer>
  )
}