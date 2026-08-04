export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <img
            src="./toketeo-logo.png"
            alt="Toketeo"
            className="h-7 w-7 rounded-md object-contain"
          />
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
