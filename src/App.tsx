import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { EnginesShowcase } from './components/EnginesShowcase'
import { Features } from './components/Features'
import { AiStudioSection } from './components/AiStudioSection'
import { Security } from './components/Security'
import { Download } from './components/Download'
import { Footer } from './components/Footer'
import { CommandPaletteModal } from './components/CommandPaletteModal'
import { StatusBar } from './components/StatusBar'

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [])

  return (
    <div className="min-h-screen bg-page text-ink font-mono selection:bg-accent selection:text-page">
      <Navbar onOpenCommandPalette={() => setCmdOpen(true)} />
      <main>
        <Hero />
        <EnginesShowcase />
        <Features />
        <AiStudioSection />
        <Security />
        <Download />
      </main>
      <Footer />
      <CommandPaletteModal isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <StatusBar />
    </div>
  )
}

