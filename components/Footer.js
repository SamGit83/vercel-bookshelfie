
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p>\u00A9 2024 Bookshelfie. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB" className="hover:text-blue-300 transition">App Store</Link>
          <Link href="/contact" className="hover:text-blue-300 transition">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
