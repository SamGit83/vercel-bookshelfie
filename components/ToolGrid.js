
import ToolCard from './ToolCard'

export default function ToolGrid({ tools }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} title={tool.title} desc={tool.desc} id={tool.id} icon={tool.icon} />
      ))}
    </div>
  )
}
