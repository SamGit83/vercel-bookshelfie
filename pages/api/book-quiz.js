/**
 * Book Recommendation Quiz API
 * Hybrid approach:
 * 1. Uses Grok AI to generate intelligent book recommendations (title, author, description)
 * 2. Uses Google Books API only to fetch cover images for those books
 * 
 * Input: POST { answers: { mood, genre, pace, protagonist, setting, length, goal, audience } }
 * Output: { books: [ { id, title, authors, description, thumbnail, previewLink } ] }
 */

const ALLOWED_QUESTION_IDS = ['mood', 'genre', 'pace', 'protagonist', 'setting', 'length', 'goal', 'audience']

// Maps for converting quiz answers to search keywords (for Grok prompt)
const genreMap = {
  'fantasy': 'fantasy',
  'sci-fi': 'science fiction',
  'mystery': 'mystery',
  'thriller': 'thriller',
  'romance': 'romance',
  'horror': 'horror',
  'non-fiction': 'non-fiction',
  'biography': 'biography',
  'self-help': 'self-help',
  'history': 'history',
  'business': 'business',
  'poetry': 'poetry',
}

const moodMap = {
  'feel-good': 'feel-good',
  'dark': 'dark',
  'uplifting': 'uplifting',
  'tense': 'tense',
  'wholesome': 'wholesome',
  'adventurous': 'adventurous',
  'thought-provoking': 'thought-provoking',
  'funny': 'funny',
  'emotional': 'emotional',
  'action-packed': 'action-packed',
}

const paceMap = {
  'fast': 'fast-paced',
  'medium': 'moderate pace',
  'slow': 'slow-burn',
}

const lengthMap = {
  'short': 'short (under 200 pages)',
  'medium': 'medium length (200-400 pages)',
  'long': 'long (400-600 pages)',
  'epic': 'epic (over 600 pages)',
}

const protagonistMap = {
  'strong-female': 'strong female protagonist',
  'strong-male': 'strong male protagonist',
  'group': 'ensemble cast',
  'unlikely-hero': 'unlikely hero',
  'anti-hero': 'anti-hero',
  'everyday': 'everyday ordinary protagonist',
}

const audienceMap = {
  'general': 'general audience',
  'young-adult': 'young adult',
  'adult': 'adult',
  'mature': 'mature',
  'teen': 'teen',
}

/**
 * Fetches cover image and preview link from Open Library as a fallback
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @returns {Promise<{thumbnail: string|null, previewLink: string|null}>}
 */
async function fetchBookCoverFromOpenLibrary(title, author) {
  try {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`
    const response = await fetch(url)

    if (!response.ok) {
      console.log(`[book-quiz] Open Library cover fetch failed for "${title}" - HTTP ${response.status}`)
      return { thumbnail: null, previewLink: null }
    }

    const data = await response.json()

    if (!data.docs || data.docs.length === 0) {
      console.log(`[book-quiz] No Open Library result for "${title}" by ${author}`)
      return { thumbnail: null, previewLink: null }
    }

    const doc = data.docs[0]
    const coverId = doc.cover_i
    const workKey = doc.key // e.g. "/works/OL45804W"

    const thumbnail = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : null

    let previewLink = null
    if (workKey) {
      const olid = workKey.replace('/works/', '')
      previewLink = `https://openlibrary.org/works/${olid}`
    }

    return { thumbnail, previewLink }
  } catch (error) {
    console.log(`[book-quiz] Open Library error for "${title}":`, error.message)
    return { thumbnail: null, previewLink: null }
  }
}

/**
 * Fetches cover image and preview link for a single book.
 * First tries Google Books API; falls back to Open Library on any failure.
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @param {string} apiKey - Google Books API key
 * @returns {Promise<{thumbnail: string|null, previewLink: string|null}>}
 */
async function fetchBookCover(title, author, apiKey) {
  try {
    // Search by title and author
    const query = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&printType=books&langRestrict=en&key=${apiKey}`

    const response = await fetch(url)

    if (!response.ok) {
      console.log(`[book-quiz] Google Books cover fetch failed for "${title}" - HTTP ${response.status}, trying Open Library...`)
      return fetchBookCoverFromOpenLibrary(title, author)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      console.log(`[book-quiz] No Google Books result for "${title}" by ${author}, trying Open Library...`)
      return fetchBookCoverFromOpenLibrary(title, author)
    }

    const volumeInfo = data.items[0].volumeInfo || {}
    const thumbnail = volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null
    const previewLink = volumeInfo.previewLink || null

    return { thumbnail, previewLink }
  } catch (error) {
    console.log(`[book-quiz] Google Books error for "${title}":`, error.message, '— trying Open Library...')
    return fetchBookCoverFromOpenLibrary(title, author)
  }
}

/**
 * Parses Grok's JSON response to extract book recommendations
 * @param {string} content - The raw content from Grok response
 * @returns {Array<{title: string, author: string, description: string}>}
 */
function parseGrokBooksResponse(content) {
  const books = []
  
  // Try to extract JSON array from the response
  // Grok might return markdown code blocks, plain JSON, or text with JSON
  
  // First, try to find JSON array in the content
  let jsonMatch = content.match(/\[[\s\S]*?\](?=\s*$|\s*```)/)
  
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0])
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      // Try to fix common JSON issues
      try {
        // Remove markdown code blocks if present
        const cleaned = jsonMatch[0].replace(/```json/g, '').replace(/```/g, '').trim()
        const parsed = JSON.parse(cleaned)
        if (Array.isArray(parsed)) {
          return parsed
        }
      } catch (e2) {
        console.log('[book-quiz] Could not parse JSON from Grok response')
      }
    }
  }
  
  // If JSON parsing fails, try to extract book info from text
  // Look for patterns like "1. Title by Author - Description"
  const lines = content.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    // Try to match pattern: "Title by Author" or "Title - Author" or "Title, Author"
    // Then capture description after
    
    // Match numbered list items like "1. Book Title by Author"
    const numberedMatch = line.match(/^\d+[.)]\s*(.+?)\s+(?:by|written by|by author of)\s+([^\-\n]+)(?:\s*[-–—]\s*(.+))?$/i)
    if (numberedMatch) {
      const title = numberedMatch[1].trim()
      const author = numberedMatch[2].trim()
      const description = numberedMatch[3]?.trim() || 'No description available.'
      
      if (title && author && title.length > 2) {
        books.push({ title, author, description: description.substring(0, 300) })
      }
      continue
    }
    
    // Match patterns like "Book Title - Author - Description"
    const dashMatch = line.match(/^(.+?)\s*[-–—]\s*([^\-]+?)(?:\s*[-–—]\s*(.+))?$/)
    if (dashMatch && dashMatch[1].length > 2) {
      const title = dashMatch[1].trim()
      const author = dashMatch[2].trim()
      const description = dashMatch[3]?.trim() || 'No description available.'
      
      if (title && author && title.length > 2 && !title.match(/^(recommended|here are|books like)/i)) {
        books.push({ title, author, description: description.substring(0, 300) })
      }
    }
  }
  
  return books
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
    const grokApiKey = process.env.GROK_API_KEY
    const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY

    if (!grokApiKey) {
      return res.status(500).json({ error: 'GROK_API_KEY is not configured' })
    }

    // Build user preferences description for Grok
    const preferences = []
    
    const genre = answers.genre?.toLowerCase().trim()
    if (genre && genreMap[genre]) {
      preferences.push(`Genre: ${genreMap[genre]}`)
    }
    
    const mood = answers.mood?.toLowerCase().trim()
    if (mood && moodMap[mood]) {
      preferences.push(`Mood: ${moodMap[mood]}`)
    }
    
    const pace = answers.pace?.toLowerCase().trim()
    if (pace && paceMap[pace]) {
      preferences.push(`Pace: ${paceMap[pace]}`)
    }
    
    const length = answers.length?.toLowerCase().trim()
    if (length && lengthMap[length]) {
      preferences.push(`Length: ${lengthMap[length]}`)
    }
    
    const protagonist = answers.protagonist?.toLowerCase().trim()
    if (protagonist && protagonistMap[protagonist]) {
      preferences.push(`Protagonist: ${protagonistMap[protagonist]}`)
    }
    
    const audience = answers.audience?.toLowerCase().trim()
    if (audience && audienceMap[audience]) {
      preferences.push(`Audience: ${audienceMap[audience]}`)
    }

    const preferencesText = preferences.join(', ') || 'general fiction preferences'
    
    console.log('[book-quiz] Generating recommendations for:', preferencesText)

    // Call Grok API to get book recommendations
    const systemPrompt = `You are a knowledgeable book recommendation expert. Based on the user's preferences, recommend 8-10 books that match their tastes. 

IMPORTANT: Your response MUST be a valid JSON array of objects. Each object must have exactly these fields:
- "title": The book title
- "author": The author's name  
- "description": A brief 1-2 sentence description of the book (max 200 characters)

Return ONLY the JSON array, no additional text, no markdown code blocks.`

    const userPrompt = `Recommend 8-10 books based on these preferences: ${preferencesText}. 

Return a JSON array with each book containing title, author, and a brief description.`

    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${grokApiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'grok-3-mini',
        stream: false,
        temperature: 0.7,
      }),
    })

    if (!grokResponse.ok) {
      const errorData = await grokResponse.json().catch(() => ({}))
      console.error('[book-quiz] Grok API error:', errorData)
      throw new Error(`Grok API error: ${grokResponse.status}`)
    }

    const grokData = await grokResponse.json()
    const grokContent = grokData.choices?.[0]?.message?.content

    if (!grokContent) {
      throw new Error('No recommendations generated from Grok')
    }

    console.log('[book-quiz] Grok response received, parsing books...')

    // Parse Grok response to extract book recommendations
    let grokBooks = parseGrokBooksResponse(grokContent)

    if (grokBooks.length === 0) {
      console.log('[book-quiz] Could not parse books from Grok response, attempting JSON parse...')
      // Last attempt: try to parse entire response as JSON
      try {
        const cleaned = grokContent.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsed = JSON.parse(cleaned)
        if (Array.isArray(parsed)) {
          grokBooks = parsed
        }
      } catch (e) {
        console.log('[book-quiz] Final JSON parse attempt failed')
      }
    }

    if (grokBooks.length === 0) {
      return res.status(200).json({ 
        books: [], 
        message: 'Could not generate book recommendations. Please try again!' 
      })
    }

    console.log(`[book-quiz] Parsed ${grokBooks.length} books from Grok, fetching covers...`)

    // For each book, fetch cover image from Google Books
    const finalBooks = []
    
    for (let i = 0; i < grokBooks.length; i++) {
      const book = grokBooks[i]
      
      // Ensure we have required fields
      const title = book.title?.trim()
      const author = book.author?.trim()
      const description = book.description?.trim() || 'No description available.'
      
      if (!title || !author) {
        console.log(`[book-quiz] Skipping book with missing title/author:`, book)
        continue
      }

      // Fetch cover from Google Books (if API key available)
      let thumbnail = null
      let previewLink = null
      
      if (googleBooksApiKey) {
        const coverData = await fetchBookCover(title, author, googleBooksApiKey)
        thumbnail = coverData.thumbnail
        previewLink = coverData.previewLink
        
        if (thumbnail) {
          console.log(`[book-quiz] Got cover for "${title}"`)
        }
      } else {
        console.log('[book-quiz] No Google Books API key available, skipping cover fetch')
      }

      // Create unique ID
      const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}-${author.toLowerCase().replace(/[^a-z0-9]+/g, '').substring(0, 10)}`

      finalBooks.push({
        id,
        title,
        authors: [author],
        description: description.substring(0, 300),
        thumbnail,
        previewLink,
      })

      // Limit to 10 books
      if (finalBooks.length >= 10) break
    }

    console.log('[book-quiz] Final book count:', finalBooks.length)

    return res.status(200).json({ books: finalBooks })
  } catch (error) {
    console.error('[book-quiz] Error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate book recommendations' })
  }
}
