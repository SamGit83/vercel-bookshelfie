import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Bookshelfie" className="w-9 h-9 rounded-xl" />
              <span className="text-lg font-bold text-gray-900">Bookshelfie</span>
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
                <li><a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">App Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bookshelfie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
