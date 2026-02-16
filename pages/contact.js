
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Bookshelfie Free Tools</title>
      </Head>
      <Header />
      <main className="py-20 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">Get in touch or subscribe to the full app!</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Developer</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">Sam Bhattacharjee</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center flex-1"
              >
                Subscribe via App Store
              </a>
              <Link 
                href="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 text-center flex-1"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
