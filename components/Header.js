import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  
  const isActive = (path) => router.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="Bookshelfie" className="w-9 h-9 rounded-xl" />
            <span className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              Bookshelfie
            </span>
          </Link>
          
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-brand-50 text-brand-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'bg-brand-50 text-brand-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
