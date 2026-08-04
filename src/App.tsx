import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Security } from './components/Security'
import { Download } from './components/Download'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Security />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
