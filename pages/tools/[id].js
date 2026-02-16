
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { tools } from '../../lib/tools'

export default function ToolPage() {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return <div>Loading...</div>
  }

  const toolIndex = parseInt(id) - 1
  const tool = tools[toolIndex]

  if (!tool) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tool Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">Go Home</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{tool.title} - Bookshelfie Free Tools</title>
      </Head>
      <Header />
      <main className="py-20 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/" className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-800 font-semibold transition">
            \u2190 Back to Tools
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg">
            {tool.title}
          </h1>
          <p className="text-3xl md:text-4xl text-center font-light text-blue-600 mb-12">Coming Soon!</p>
          <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-12 md:p-20 text-center">
            <p className="text-2xl md:text-3xl font-light text-gray-700 mb-8 leading-relaxed">
              The free <span className="font-semibold text-blue-600">{tool.title.toLowerCase()}</span> tool is coming soon!
            </p>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              In the meantime, upgrade to the full Bookshelfie app to unlock all tools and premium features.
            </p>
            <a 
              href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              Get Full App on App Store
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
