import Head from 'next/head';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <Head>
        <title>Bookshelfie - Your Personal Book Tracker</title>
        <meta name="description" content="Discover Bookshelfie, the iOS app for tracking your reading journey." />
      </Head>
      <header>
        <h1>Bookshelfie</h1>
      </header>
      <main>
        <p>Welcome to Bookshelfie, the ultimate iOS app for tracking your reading journey. Organize your books, track your progress, and discover new reads.</p>
        <a href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB" target="_blank" rel="noopener noreferrer">
          Download on the App Store
        </a>
      </main>
      <footer>
        <p>&copy; 2023 Bookshelfie. All rights reserved.</p>
      </footer>
    </div>
  );
}