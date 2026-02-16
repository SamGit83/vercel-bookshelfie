
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToolGrid from '../components/ToolGrid'
import { tools } from '../lib/tools'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bookshelfie — Free Book Tools</title>
        <meta name="description" content="Discover free book tools from Bookshelfie. Get instant value now, upgrade to the full iOS app for premium features." />
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Free &amp; Open Tools for Book Lovers
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your Reading,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Supercharged
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Explore 9 free book tools — track your reading, discover new titles, and organize your library. Love them? Upgrade to the full{' '}
              <a
                href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                Bookshelfie app
              </a>{' '}
              for unlimited access.
            </p>
            <a
              href="#tools"
              className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-3.5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Browse Free Tools ↓
            </a>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="pb-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Free Tools
            </h2>
            <ToolGrid tools={tools} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
