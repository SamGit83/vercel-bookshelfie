
import Link from 'next/link'

export default function ToolCard({ title, desc, id, icon }) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-white/50">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed text-sm">{desc}</p>
      <Link
        href={`/tools/${id}`}
        className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
      >
        Try Free Tool →
      </Link>
    </div>
  )
}
