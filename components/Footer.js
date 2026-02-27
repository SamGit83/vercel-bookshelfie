import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Book Shelfie" className="w-9 h-9 rounded-xl" />
              <span className="text-lg font-bold text-gray-900">Book Shelfie</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Your reading companion. Track, discover, and share your reading journey.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">Tools</Link></li>
                <li><a href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">App Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://x.com/bookshelfieapp" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-600 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </li>
                <li><a href="https://linkedin.com/company/bookshelfie" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Book Shelfie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
