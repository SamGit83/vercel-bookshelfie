import { useEffect } from 'react'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WMB7RFZM');`
          }}
        />
      </Head>
      <div className={`${inter.className} min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
      </div>
    </>
  )
}

export default MyApp
