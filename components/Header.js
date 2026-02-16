
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">Bookshelfie Free Tools</Link>
        <ul className="flex space-x-6">
          <li><Link href="/" className="text-white hover:text-blue-100 transition">Home</Link></li>
          <li><Link href="/contact" className="text-white hover:text-blue-100 transition">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}
