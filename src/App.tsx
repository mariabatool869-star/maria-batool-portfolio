import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useDeferredStage } from './lib/deferred'
import AwardsStrip from './components/AwardsStrip'
import ResearchSpotlight from './components/ResearchSpotlight'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Enhancements from './components/Enhancements'

// Below-the-fold sections load as separate chunks straight after the hero
// paints, so the hero isn't waiting on their code (faster LCP on phones).
const Projects = lazy(() => import('./components/Projects'))
const Capabilities = lazy(() => import('./components/Capabilities'))
const Business = lazy(() => import('./components/Business'))
const TechStack = lazy(() => import('./components/TechStack'))
const Experience = lazy(() => import('./components/Experience'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
// Ask widget: its own chunk, mounted after page load (see DeferredAsk).
const AskWidget = lazy(() => import('./components/AskWidget'))

function DeferredAsk() {
  const ready = useDeferredStage(1)
  return ready ? <Suspense fallback={null}><AskWidget /></Suspense> : null
}

export default function App() {
  return (
    // reducedMotion="user" turns off transform animations for users who ask for it.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <Enhancements />
      <Navbar />
      <Hero />
      <main id="main">
        <AwardsStrip />
        <ResearchSpotlight />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Projects />
          <Capabilities />
          <Business />
          <TechStack />
          <Experience />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <DeferredAsk />
    </MotionConfig>
  )
}
