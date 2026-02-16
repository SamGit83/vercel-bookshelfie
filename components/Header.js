
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition">
          📚 Bookshelfie
        </Link>
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="text-white/90 hover:text-white font-medium transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white/90 hover:text-white font-medium transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
