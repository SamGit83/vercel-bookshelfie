
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToolGrid from '../components/ToolGrid'
import { tools } from '../lib/tools'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bookshelfie Free Tools</title>
        <meta name="description" content="Discover free book tools. Get value now, upgrade to pro for full app!" />
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
              Bookshelfie
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Free Tools
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover powerful free book tools. Get instant value now, and upgrade to the full pro app for unlimited access!
            </p>
          </div>
          <ToolGrid tools={tools} />
        </div>
      </main>
      <Footer />
    </>
  )
}
