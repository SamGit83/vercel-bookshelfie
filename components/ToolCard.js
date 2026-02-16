
import Link from 'next/link'

export default function ToolCard({ title, desc, id }) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{desc}</p>
      <Link 
        href={`/tools/${id}`} 
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        Try Free Tool
      </Link>
    </div>
  )
}
