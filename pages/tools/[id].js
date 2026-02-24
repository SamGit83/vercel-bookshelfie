import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { getToolById, tools } from '../../lib/tools'

const iconColors = {
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-600',
  yellow: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  teal: 'bg-teal-50 text-teal-600',
  pink: 'bg-pink-50 text-pink-600',
}

const iconBadgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  yellow: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  teal: 'bg-teal-100 text-teal-700',
  pink: 'bg-pink-100 text-pink-700',
}

function ToolIcon({ name, className }) {
  const icons = {
    camera: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    list: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    trophy: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 12.75V14.25m0-3.75V2.25" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />,
    bookOpen: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
  }

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {icons[name] || icons.bookOpen}
    </svg>
  )
}

function AIPromptGenerator() {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    length: 'medium',
    style: 'creative',
    targetAudience: '',
    keyFocusAreas: ''
  })
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setGeneratedPrompt('')

    // Debug: Log what values are being submitted
    console.log('[DEBUG] Submitting form data:', formData)

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate prompt')
      }

      const data = await response.json()
      setGeneratedPrompt(data.prompt)
    } catch (err) {
      setError(err.message || 'An error occurred while generating the prompt')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this AI prompt I generated: ${generatedPrompt.substring(0, 200)}...`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <>
      <Head>
        <title>AI Prompt Generator — Book Shelfie</title>
        <meta name="description" content="Generate creative prompts for writing, brainstorming, or AI interactions." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/#tools" className="hover:text-brand-600 transition-colors">Tools</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">AI Prompt Generator</span>
        </nav>

        {/* Header */}
        <div className="card p-8 sm:p-12 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600">
              <ToolIcon name="sparkles" className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Prompt Generator</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  Active
                </span>
              </div>
              
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
                Generate creative prompts for writing, brainstorming, or AI interactions. Customize the topic, tone, length, and style to get the perfect prompt for your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customize Your Prompt</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g., Science fiction story, Marketing campaign, Recipe ideas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Tone */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="formal">Formal</option>
                  <option value="humorous">Humorous</option>
                  <option value="inspirational">Inspirational</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                  Length
                </label>
                <select
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="short">Short (1-10 sentences)</option>
                  <option value="medium">Medium (10-20 sentences)</option>
                  <option value="long">Long (20-1000 sentences)</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="creative">Creative</option>
                  <option value="analytical">Analytical</option>
                  <option value="descriptive">Descriptive</option>
                  <option value="narrative">Narrative</option>
                  <option value="instructional">Instructional</option>
                  <option value="persuasive">Persuasive</option>
                </select>
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g., developers, marketers, students"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Key Focus Areas */}
              <div>
                <label htmlFor="keyFocusAreas" className="block text-sm font-medium text-gray-700 mb-2">
                  Key Focus Areas
                </label>
                <input
                  type="text"
                  id="keyFocusAreas"
                  name="keyFocusAreas"
                  value={formData.keyFocusAreas}
                  onChange={handleInputChange}
                  placeholder="e.g., productivity, automation, best practices (comma-separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple areas with commas</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.topic}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Prompt
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Generated Prompt</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {!generatedPrompt && !error && !loading && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <p className="text-gray-500">Your generated prompt will appear here</p>
              </div>
            )}

            {generatedPrompt && (
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  {generatedPrompt.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-800 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition-all duration-200 border border-brand-200"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                        Copy to Clipboard
                      </>
                    )}
                  </button>

                  <button
                    onClick={shareOnTwitter}
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-brand-600 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all tools
          </Link>
        </div>
      </div>
    </>
  )
}

const QUIZ_QUESTIONS = [
  {
    id: 'mood',
    question: "What's your vibe right now?",
    options: [
      { emoji: '😊', label: 'Feel-good & uplifting', value: 'feel-good' },
      { emoji: '🌑', label: 'Dark & intense', value: 'dark' },
      { emoji: '😂', label: 'Funny & light', value: 'funny' },
      { emoji: '🤔', label: 'Thought-provoking', value: 'thought-provoking' },
    ],
  },
  {
    id: 'genre',
    question: 'Pick your genre',
    options: [
      { emoji: '🧙', label: 'Fantasy & Sci-Fi', value: 'fantasy' },
      { emoji: '🔍', label: 'Mystery & Thriller', value: 'mystery' },
      { emoji: '💕', label: 'Romance', value: 'romance' },
      { emoji: '📖', label: 'Literary Fiction', value: 'literary-fiction' },
      { emoji: '🌍', label: 'Non-fiction', value: 'non-fiction' },
    ],
  },
  {
    id: 'pace',
    question: 'How fast do you like your reads?',
    options: [
      { emoji: '⚡', label: 'Fast-paced page-turner', value: 'fast' },
      { emoji: '🌊', label: 'Slow & immersive', value: 'slow' },
      { emoji: '⚖️', label: 'Balanced mix', value: 'medium' },
    ],
  },
  {
    id: 'protagonist',
    question: "Who's the story about?",
    options: [
      { emoji: '👤', label: 'A lone hero on a quest', value: 'unlikely-hero' },
      { emoji: '👥', label: 'A group of friends/found family', value: 'group' },
      { emoji: '💑', label: 'Two people falling in love', value: 'romance-duo' },
      { emoji: '🌐', label: 'Society / big ideas', value: 'society' },
    ],
  },
  {
    id: 'setting',
    question: 'What setting excites you?',
    options: [
      { emoji: '🏰', label: 'Magical / fantasy world', value: 'fantasy-world' },
      { emoji: '🌆', label: 'Modern city life', value: 'contemporary' },
      { emoji: '🕰️', label: 'Historical past', value: 'historical' },
      { emoji: '🚀', label: 'Future / space', value: 'sci-fi' },
    ],
  },
  {
    id: 'length',
    question: 'How long is your attention span right now?',
    options: [
      { emoji: '📗', label: 'Short (under 300 pages)', value: 'short' },
      { emoji: '📘', label: 'Medium (300–500 pages)', value: 'medium' },
      { emoji: '📕', label: 'Long (500+ pages, bring it on)', value: 'long' },
    ],
  },
  {
    id: 'goal',
    question: 'What do you want from this book?',
    options: [
      { emoji: '🎢', label: 'Escapism & adventure', value: 'escapism' },
      { emoji: '💡', label: 'Learn something new', value: 'educational' },
      { emoji: '😢', label: 'Feel all the emotions', value: 'emotional' },
      { emoji: '😌', label: 'Comfort & coziness', value: 'comfort' },
    ],
  },
  {
    id: 'audience',
    question: 'Who are you reading for?',
    options: [
      { emoji: '🧒', label: "I'm a teen / young adult", value: 'young-adult' },
      { emoji: '🧑', label: "I'm an adult (20s–30s)", value: 'adult' },
      { emoji: '🧓', label: "I'm older (40s+)", value: 'mature' },
      { emoji: '👨‍👩‍👧', label: 'Reading with my kids', value: 'children' },
    ],
  },
]

function BookRecommendationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState('quiz') // 'quiz' | 'loading' | 'results'
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [animating, setAnimating] = useState(false)
  const submitting = useRef(false)

  const totalQuestions = QUIZ_QUESTIONS.length
  const progress = ((currentQuestion) / totalQuestions) * 100

  const handleAnswer = async (questionId, optionLabel) => {
    if (submitting.current) return
    const newAnswers = { ...answers, [questionId]: optionLabel }
    setAnswers(newAnswers)

    if (currentQuestion < totalQuestions - 1) {
      setAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setAnimating(false)
      }, 250)
    } else {
      // Last question answered — fetch recommendations
      submitting.current = true
      setPhase('loading')
      try {
        const res = await fetch('/api/book-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        })
        const data = await res.json()
        
        // DEBUG: Log response details
        console.log('[book-quiz] Response status:', res.ok)
        console.log('[book-quiz] Books received:', data.books?.length || 0)
        if (data.books?.length > 0) {
          console.log('[book-quiz] First book:', JSON.stringify(data.books[0], null, 2))
        }
        
        if (!res.ok) throw new Error(data.error || 'Failed to fetch recommendations')
        setBooks(data.books || [])
        setPhase('results')
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.')
        setPhase('results')
      } finally {
        submitting.current = false
      }
    }
  }

  const retakeQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setPhase('quiz')
    setBooks([])
    setError(null)
    setCopied(false)
  }

  const shareCaption = `I just discovered my next 8 reads with Bookshelfie's Book Quiz! 📚✨ Try it free at https://bookshelfie.app #BookRecommendations #Bookshelfie`

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(shareCaption)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: do nothing
    }
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCaption)}`,
      '_blank'
    )
  }

  const openSnapchat = () => {
    window.open('https://www.snapchat.com/scan', '_blank')
  }

  // ── Loading phase ──────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-6 animate-bounce">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Finding your perfect books…</h2>
        <p className="text-gray-500 text-lg">Searching through thousands of titles just for you</p>
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Results phase ──────────────────────────────────────────────────────────
  if (phase === 'results') {
    return (
      <div>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Book Picks Are In!</h2>
          <p className="text-gray-500 text-lg">
            Based on your answers, here are {books.length} books we think you'll love
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Book grid */}
        {books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Cover */}
                <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 h-44 flex items-center justify-center overflow-hidden">
                  {book.thumbnail ? (
                    <Image
                      src={book.thumbnail}
                      alt={book.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-5xl">📖</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-indigo-600 font-medium mb-2 line-clamp-1">
                    {book.authors.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                    {(book.description ?? '').substring(0, 100)}
                    {(book.description?.length ?? 0) > 100 ? '…' : ''}
                  </p>
                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
                    >
                      Preview on Google Books
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Share your results! 🎉</h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Let your friends know what you're reading next
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {/* Instagram — copy caption */}
            <button
              onClick={copyCaption}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              📸 {copied ? 'Caption Copied!' : 'Instagram'}
            </button>

            {/* Snapchat */}
            <button
              onClick={openSnapchat}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors shadow-sm"
            >
              👻 Snapchat
            </button>

            {/* Twitter/X */}
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gray-900 text-white hover:bg-gray-700 transition-colors shadow-sm"
            >
              🐦 Twitter / X
            </button>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center">
          <button
            onClick={retakeQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // ── Quiz phase ─────────────────────────────────────────────────────────────
  const q = QUIZ_QUESTIONS[currentQuestion]

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          📚 Book Recommendation Quiz
        </h1>
        <p className="text-gray-500 text-lg">
          Answer 8 quick questions and get your perfect reading list
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-indigo-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-400">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className={`transition-all duration-250 ${animating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
        style={{ transition: 'opacity 0.25s ease, transform 0.25s ease' }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
            {q.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.value
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(q.id, opt.value)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left font-medium transition-all duration-150 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                      : 'border-gray-200 bg-white text-gray-800'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                  <span className="text-sm sm:text-base leading-snug">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Back button */}
      {currentQuestion > 0 && (
        <div className="text-center">
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="text-sm text-gray-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Previous question
          </button>
        </div>
      )}
    </div>
  )
}

export default function ToolDetail() {
  const router = useRouter()
  const { id } = router.query

  // Handle AI Prompt Generator specifically
  if (id === 'ai-prompt-generator') {
    return <AIPromptGenerator />
  }

  // Handle Book Recommendation Quiz
  if (id === 'book-recommendation-quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <main className="max-w-4xl mx-auto px-4 py-12">
          <BookRecommendationQuiz />
        </main>
      </div>
    )
  }

  const tool = id ? getToolById(id) : null

  if (!tool) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  const colorClass = iconColors[tool.color] || iconColors.blue
  const badgeClass = iconBadgeColors[tool.color] || iconBadgeColors.blue

  // Get related tools (exclude current)
  const relatedTools = tools.filter(t => t.id !== tool.id).slice(0, 3)

  return (
    <>
      <Head>
        <title>{tool.title} — Book Shelfie</title>
        <meta name="description" content={tool.desc} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/#tools" className="hover:text-brand-600 transition-colors">Tools</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">{tool.title}</span>
        </nav>

        {/* Tool Header */}
        <div className="card p-8 sm:p-12 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClass}`}>
              <ToolIcon name={tool.iconName} className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{tool.title}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
                  Coming Soon
                </span>
              </div>
              
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
                {tool.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Get Book Shelfie App
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link href="/" className="btn-secondary">
                  ← Back to all tools
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColors[t.color] || iconColors.blue}`}>
                    <ToolIcon name={t.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{t.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{t.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
