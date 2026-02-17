import Head from 'next/head'
import ToolGrid from '../components/ToolGrid'
import { tools } from '../lib/tools'
import UserJourney from '../components/UserJourney'
import Benefits from '../components/Benefits'
import HowItWorks from '../components/HowItWorks'

export default function Home() {
  return (
    <>
      <Head>
        <title>Book Shelfie — Your Reading, Supercharged</title>
        <meta name="description" content="Free tools to enhance your reading experience" />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Free reading tools
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Your Reading,{' '}
            <span className="text-brand-600">Supercharged</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover free tools designed to enhance every aspect of your reading experience — from scanning books to tracking your progress.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Download on App Store
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
            <a href="#tools" className="btn-secondary">
              Explore Tools
            </a>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <UserJourney />
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Benefits />
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HowItWorks />
      </section>

      {/* Tools */}
      <section id="tools" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Free Tools</h2>
          <p className="text-gray-500">Everything you need to level up your reading game.</p>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </>
  )
}
