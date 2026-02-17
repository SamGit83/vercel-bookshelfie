import { useEffect } from 'react'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Ahrefs Analytics for GTM Custom HTML
    var ahrefs_analytics_script = document.createElement('script');
    ahrefs_analytics_script.async = true;
    ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
    ahrefs_analytics_script.setAttribute('data-key', 'qOXq0oEREO/Mq0i5gpxH2g');
    document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
  }, [])

  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
