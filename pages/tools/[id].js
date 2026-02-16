
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
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading...</p>
        </main>
        <Footer />
      </>
    )
  }

  const toolIndex = parseInt(id) - 1
  const tool = tools[toolIndex]

  if (!tool) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Tool Not Found</h1>
            <Link href="/" className="text-blue-600 hover:underline font-medium">← Back to Home</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{tool.title} — Bookshelfie Free Tools</title>
        <meta name="description" content={tool.desc} />
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center mb-10 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            ← Back to Tools
          </Link>

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 md:p-16 text-center border border-white/50">
            <p className="text-6xl mb-6">{tool.icon}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {tool.title}
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
              {tool.desc}
            </p>

            <div className="inline-block bg-blue-50 text-blue-700 px-6 py-3 rounded-full font-semibold text-sm mb-10">
              🚀 Coming Soon
            </div>

            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              This free tool is under development. In the meantime, get the full experience with the Bookshelfie app — all tools and premium features included.
            </p>

            <a
              href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Get the Full App →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
