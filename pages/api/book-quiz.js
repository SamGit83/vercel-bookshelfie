/**
 * Book Recommendation Quiz API
 * Accepts POST { answers: { mood, genre, pace, protagonist, setting, length, goal, audience } }
 * Uses Google Books API to search for books matching user preferences
 * Returns { books: [ { id, title, authors, description, thumbnail, previewLink } ] }
 */

const ALLOWED_QUESTION_IDS = ['mood', 'genre', 'pace', 'protagonist', 'setting', 'length', 'goal', 'audience']

// Maps for converting quiz answers to search keywords
const genreMap = {
  'fantasy': 'fantasy fiction',
  'sci-fi': 'science fiction',
  'mystery': 'mystery fiction',
  'thriller': 'thriller',
  'romance': 'romance novel',
  'horror': 'horror fiction',
  'non-fiction': 'nonfiction',
  'biography': 'biography',
  'self-help': 'self help',
  'history': 'historical',
  'business': 'business',
  'poetry': 'poetry',
}

const moodMap = {
  'feel-good': 'feel good',
  'dark': 'dark fiction',
  'uplifting': 'inspirational',
  'tense': 'suspense',
  'wholesome': 'wholesome',
  'adventurous': 'adventure',
  'thought-provoking': 'intellectual',
  'funny': 'humor',
  'emotional': 'emotional',
  'action-packed': 'action',
}

const paceMap = {
  'fast': 'fast paced',
  'medium': 'moderate pace',
  'slow': 'slow burn',
}

const lengthMap = {
  'short': 'short book',
  'medium': 'novel',
  'long': 'long novel',
  'epic': 'epic',
}

const protagonistMap = {
  'strong-female': 'strong female protagonist',
  'strong-male': 'male protagonist',
  'group': 'ensemble cast',
  'unlikely-hero': 'unlikely hero',
  'anti-hero': 'antihero',
  'everyday': 'ordinary protagonist',
}

const audienceMap = {
  'general': '',
  'young-adult': 'young adult',
  'adult': 'adult fiction',
  'mature': 'mature',
  'teen': 'teen',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { answers } = req.body

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid request body: answers required' })
  }

  // Validate that only known question IDs are present and values are non-empty strings
  for (const key of Object.keys(answers)) {
    if (!ALLOWED_QUESTION_IDS.includes(key)) {
      return res.status(400).json({ error: `Unknown answer key: ${key}` })
    }
    if (typeof answers[key] !== 'string' || answers[key].trim() === '' || answers[key].length > 200) {
      return res.status(400).json({ error: `Invalid value for answer key: ${key}` })
    }
  }

  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY

    // DEBUG: Log whether API key is present
    console.log('[book-quiz] API key present:', !!apiKey)
    if (apiKey) {
      console.log('[book-quiz] API key first 5 chars:', apiKey.substring(0, 5))
    } else {
      console.log('[book-quiz] ERROR: GOOGLE_BOOKS_API_KEY is not set in environment')
    }

    // Build search query from answers using space-separated keywords
    const searchTerms = []

    // Add genre keywords
    const genre = answers.genre?.toLowerCase().trim()
    if (genre && genreMap[genre]) {
      searchTerms.push(genreMap[genre])
    }

    // Add mood keywords
    const mood = answers.mood?.toLowerCase().trim()
    if (mood && moodMap[mood]) {
      searchTerms.push(moodMap[mood])
    }

    // Add pace keywords
    const pace = answers.pace?.toLowerCase().trim()
    if (pace && paceMap[pace]) {
      searchTerms.push(paceMap[pace])
    }

    // Add length keywords
    const length = answers.length?.toLowerCase().trim()
    if (length && lengthMap[length]) {
      searchTerms.push(lengthMap[length])
    }

    // Add protagonist type keywords
    const protagonist = answers.protagonist?.toLowerCase().trim()
    if (protagonist && protagonistMap[protagonist]) {
      searchTerms.push(protagonistMap[protagonist])
    }

    // Add audience keywords
    const audience = answers.audience?.toLowerCase().trim()
    if (audience && audienceMap[audience]) {
      searchTerms.push(audienceMap[audience])
    }

    // Fallback: use mood and genre directly if no mapping found
    if (searchTerms.length < 2) {
      if (genre && !searchTerms.includes(genre)) {
        searchTerms.push(genre)
      }
      if (mood && !searchTerms.includes(mood)) {
        searchTerms.push(mood)
      }
    }

    // Construct the search query
    const query = searchTerms.join(' ')
    
    if (!query) {
      return res.status(400).json({ error: 'Could not build search query from answers' })
    }

    console.log('[book-quiz] Google Books query:', query)

    // Call Google Books API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&printType=books&langRestrict=en&key=${apiKey}`
    
    // DEBUG: Log the URL with API key redacted for security
    const urlRedacted = url.replace(apiKey, 'REDACTED')
    console.log('[book-quiz] Google Books API URL:', urlRedacted)
    
    const response = await fetch(url)

    // Handle specific API errors - read the full error response from Google
    if (response.status === 401 || response.status === 403) {
      // Read the error response body to get the actual error message from Google
      const errorText = await response.text()
      console.error('[book-quiz] Google Books API auth error - Status:', response.status)
      console.error('[book-quiz] Google Books API auth error - Response:', errorText)
      
      // Try to parse as JSON to get structured error
      let errorMessage = 'Book search service authentication failed'
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.error) {
          errorMessage = errorJson.error.message || errorJson.error.message || JSON.stringify(errorJson.error)
          console.error('[book-quiz] Parsed Google error message:', errorMessage)
        }
      } catch (parseErr) {
        console.error('[book-quiz] Could not parse error response as JSON')
      }
      
      return res.status(500).json({ error: errorMessage + ' (HTTP ' + response.status + ')' })
    }

    if (response.status === 429) {
      const errorText = await response.text()
      console.error('[book-quiz] Google Books API rate limit error - Status:', response.status)
      console.error('[book-quiz] Google Books API rate limit error - Response:', errorText)
      return res.status(500).json({ error: 'Book search service rate limit exceeded. Please try again later.' })
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[book-quiz] Google Books API error - Status:', response.status)
      console.error('[book-quiz] Google Books API error - Response:', errorText)
      
      // Try to parse as JSON to get structured error message
      let errorDetails = ''
      try {
        const errorData = JSON.parse(errorText)
        if (errorData.error && errorData.error.message) {
          errorDetails = errorData.error.message
          console.error('[book-quiz] Parsed Google error message:', errorDetails)
        }
      } catch (parseErr) {
        errorDetails = errorText.substring(0, 200)
      }
      throw new Error(`Google Books API error: ${response.status} - ${errorDetails}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return res.status(200).json({ books: [], message: 'No books found for your preferences. Try different answers!' })
    }

    // Deduplicate and normalize books
    const seen = new Set()
    const normalised = []

    for (const item of data.items) {
      const volumeInfo = item.volumeInfo || {}
      
      // Skip if no title
      if (!volumeInfo.title) continue

      // Create unique identifier
      const title = volumeInfo.title.trim()
      const authors = volumeInfo.authors || ['Unknown Author']
      const id = item.id || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}-${(authors[0] || 'unknown').toLowerCase().replace(/[^a-z0-9]+/g, '').substring(0, 10)}`

      // Skip duplicates based on title+author
      const key = `${title.toLowerCase()}-${(authors[0] || '').toLowerCase()}`
      if (seen.has(key)) continue
      seen.add(key)

      // Get description (truncated)
      const rawDescription = typeof volumeInfo.description === 'string' ? volumeInfo.description.trim() : ''
      const description = rawDescription ? rawDescription.substring(0, 300) : 'No description available.'

      // Get thumbnail
      const thumbnail = volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null

      // Get preview link
      const previewLink = volumeInfo.previewLink || null

      normalised.push({
        id,
        title,
        authors,
        description,
        thumbnail,
        previewLink,
      })

      if (normalised.length >= 10) break
    }

    console.log('[book-quiz] Found books:', normalised.length)

    return res.status(200).json({ books: normalised })
  } catch (error) {
    console.error('[book-quiz] Error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate book recommendations' })
  }
}
