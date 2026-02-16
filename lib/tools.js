export const tools = [
  {
    id: 1,
    title: 'Book Scanner',
    desc: 'Scan book covers and instantly identify titles, authors, and editions using AI-powered image recognition.',
    iconName: 'camera',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Reading Stats',
    desc: 'Track your reading habits with beautiful charts and insights about your reading speed and preferences.',
    iconName: 'chart',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Book Lists',
    desc: 'Create and share curated book lists with friends, family, or your book club community.',
    iconName: 'list',
    color: 'green',
  },
  {
    id: 4,
    title: 'Reading Timer',
    desc: 'Set reading goals and track your daily reading time with a beautiful, distraction-free timer.',
    iconName: 'clock',
    color: 'orange',
  },
  {
    id: 5,
    title: 'Book Reviews',
    desc: 'Write and share thoughtful book reviews with a community of passionate readers.',
    iconName: 'star',
    color: 'yellow',
  },
  {
    id: 6,
    title: 'Reading Challenges',
    desc: 'Join reading challenges, set yearly goals, and compete with friends to read more.',
    iconName: 'trophy',
    color: 'red',
  },
  {
    id: 7,
    title: 'Book Recommendations',
    desc: 'Get personalized book recommendations based on your reading history and preferences.',
    iconName: 'sparkles',
    color: 'indigo',
  },
  {
    id: 8,
    title: 'Library Manager',
    desc: 'Organize your personal library with shelves, tags, and smart collections.',
    iconName: 'bookOpen',
    color: 'teal',
  },
  {
    id: 9,
    title: 'Social Reading',
    desc: 'Connect with fellow readers, join discussions, and share your reading journey.',
    iconName: 'users',
    color: 'pink',
  },
]

export function getToolById(id) {
  return tools.find((tool) => tool.id === parseInt(id))
}
