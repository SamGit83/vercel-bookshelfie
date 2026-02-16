
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Bookshelfie. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              App Store
            </a>
            <Link href="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
