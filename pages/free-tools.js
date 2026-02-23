import Head from 'next/head'
import ToolGrid from '../components/ToolGrid'
import { tools } from '../lib/tools'

export default function FreeTools() {
  return (
    <>
      <Head>
        <title>Free Tools — Book Shelfie</title>
        <meta name="description" content="Free tools to enhance your reading experience" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Free Tools</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Everything you need to level up your reading game. All tools are completely free to use.
          </p>
        </div>
        
        <ToolGrid tools={tools} />
      </div>
    </>
  )
}
