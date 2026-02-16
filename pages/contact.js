
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Bookshelfie Free Tools</title>
        <meta name="description" content="Get in touch with the Bookshelfie team. Download Book Shelfie on the App Store." />
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600">Learn more about Bookshelfie or download the full app.</p>
          </div>

          {/* App Info Card */}
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 md:p-14 border border-white/50 mb-8">
            <div className="text-center mb-10">
              <p className="text-5xl mb-4">📚</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Shelfie</h2>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">iOS Reading &amp; Book Tracking App</p>
            </div>

            <div className="space-y-6 text-gray-700 max-w-lg mx-auto">
              <div className="flex items-start gap-4">
                <span className="text-xl mt-0.5">👤</span>
                <div>
                  <p className="font-semibold text-gray-800">Developer</p>
                  <p>Sam Bhattacharjee</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xl mt-0.5">📱</span>
                <div>
                  <p className="font-semibold text-gray-800">Platform</p>
                  <p>iOS (iPhone &amp; iPad)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xl mt-0.5">⭐</span>
                <div>
                  <p className="font-semibold text-gray-800">What You Get</p>
                  <p>Track your reading, scan books, set goals, get recommendations, and organize your entire library — all in one beautiful app.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Download on the App Store
            </a>
            <Link
              href="/"
              className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-center"
            >
              ← Back to Free Tools
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
