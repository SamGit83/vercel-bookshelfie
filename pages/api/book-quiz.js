/**
 * Book Recommendation Quiz API
 * Accepts POST { answers: { mood, genre, pace, protagonist, setting, length, goal, audience } }
 * Calls the Google Books API to find 8–10 personalised book recommendations
 * Returns { books: [ { id, title, authors, description, thumbnail, previewLink, categories } ] }
 */

const ALLOWED_QUESTION_IDS = ['mood', 'genre', 'pace', 'protagonist', 'setting', 'length', 'goal', 'audience']

const genreMap = {
  '🧙 Fantasy & Sci-Fi': 'fantasy',
  '🔍 Mystery & Thriller': 'mystery thriller',
  '💕 Romance': 'romance',
  '📖 Literary Fiction': 'literary fiction',
  '🌍 Non-fiction': 'nonfiction',
}

const moodMap = {
  '😊 Feel-good & uplifting': 'uplifting feel-good',
  '🌑 Dark & intense': 'dark psychological',
  '😂 Funny & light': 'humor comedy',
  '🤔 Thought-provoking': 'philosophical thought-provoking',
}

const paceMap = {
  '⚡ Fast-paced page-turner': 'thriller action fast-paced',
  '🌊 Slow & immersive': 'literary immersive',
  '⚖️ Balanced mix': 'adventure drama',
}

const protagonistMap = {
  '👤 A lone hero on a quest': 'hero quest adventure',
  '👥 A group of friends/found family': 'found family friendship',
  '💑 Two people falling in love': 'love romance',
  '🌐 Society / big ideas': 'society dystopia ideas',
}

const settingMap = {
  '🏰 Magical / fantasy world': 'fantasy magic',
  '🌆 Modern city life': 'contemporary urban',
  '🕰️ Historical past': 'historical fiction',
  '🚀 Future / space': 'science fiction space',
}

const goalMap = {
  '🎢 Escapism & adventure': 'adventure escapism',
  '💡 Learn something new': 'nonfiction educational',
  '😢 Feel all the emotions': 'emotional drama',
  '😌 Comfort & coziness': 'cozy comfort',
}

const audienceMap = {
  "🧒 I'm a teen / young adult": 'young adult',
  "🧑 I'm an adult (20s–30s)": 'adult fiction',
  "🧓 I'm older (40s+)": 'literary fiction',
  '👨‍👩‍👧 Reading with my kids': 'children family',
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

    // Build lookup terms from answers
    const genreTerm = genreMap[answers.genre] || ''
    const moodTerm = moodMap[answers.mood] || ''
    const paceTerm = paceMap[answers.pace] || ''
    const protagonistTerm = protagonistMap[answers.protagonist] || ''
    const settingTerm = settingMap[answers.setting] || ''
    const goalTerm = goalMap[answers.goal] || ''
    const audienceTerm = audienceMap[answers.audience] || ''

    // Query 1: genre + mood
    const query1Parts = [genreTerm, moodTerm].filter(Boolean)
    const query1 = query1Parts.join(' ')

    // Query 2: setting + pace + audience (fallback to genre if empty)
    const query2Parts = [settingTerm, paceTerm, audienceTerm].filter(Boolean)
    const query2 = query2Parts.length > 0 ? query2Parts.join(' ') : genreTerm

    // Query 3: goal + protagonist + genre
    const query3Parts = [goalTerm, protagonistTerm, genreTerm].filter(Boolean)
    const query3 = query3Parts.join(' ')

    const buildUrl = (query) => {
      const base = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&printType=books&langRestrict=en`
      return apiKey ? `${base}&key=${apiKey}` : base
    }

    const queries = [query1, query2, query3].filter(Boolean)

    const results = await Promise.allSettled(
      queries.map((q) =>
        fetch(buildUrl(q)).then((r) => {
          if (!r.ok) {
            const status = r.status
            let errorMessage = `Google Books API error: ${status}`
            
            if (status === 401 || status === 403) {
              errorMessage = 'Google Books API auth failed. Make sure GOOGLE_BOOKS_API_KEY is set and valid, and the Google Books API is enabled in Google Cloud Console.'
            } else if (status === 429) {
              errorMessage = 'Google Books API quota exceeded. Try again later or use an API key for higher limits.'
            } else if (status >= 500) {
              errorMessage = 'Google Books API server error. Try again later.'
            }
            
            throw new Error(errorMessage)
          }
          return r.json()
        })
      )
    )

    // Debug: Log query results to diagnose API failures
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      if (result.status === 'rejected') {
        console.error(`[book-quiz] Query ${i + 1} failed: ${queries[i]}`)
        console.error(`[book-quiz] Error:`, result.reason)
      } else {
        const itemCount = result.value?.items?.length || 0
        console.log(`[book-quiz] Query ${i + 1} succeeded: ${queries[i]} - returned ${itemCount} items`)
      }
    }

    // Collect and deduplicate items by id
    const seenIds = new Set()
    const allItems = []

    for (const result of results) {
      if (result.status === 'fulfilled' && Array.isArray(result.value?.items)) {
        for (const item of result.value.items) {
          if (item.id && !seenIds.has(item.id)) {
            seenIds.add(item.id)
            allItems.push(item)
          }
        }
      }
    }

    // Normalise each book
    const normalised = allItems.slice(0, 10).map((item) => {
      const info = item.volumeInfo || {}
      const rawDescription = typeof info.description === 'string' ? info.description.trim() : ''
      const description = rawDescription
        ? rawDescription.substring(0, 300)
        : 'No description available.'

      const imageLinks = info.imageLinks || {}
      const thumbnail = imageLinks.thumbnail || imageLinks.smallThumbnail || null

      const previewLink = info.previewLink || info.infoLink || null

      return {
        id: item.id,
        title: typeof info.title === 'string' && info.title.trim() ? info.title.trim() : 'Unknown Title',
        authors: Array.isArray(info.authors) && info.authors.length > 0 ? info.authors : ['Unknown Author'],
        description,
        thumbnail,
        previewLink,
        categories: Array.isArray(info.categories) ? info.categories : [],
      }
    })

    // DEBUG: Log final results before returning
    console.log('[book-quiz] Queries:', queries)
    console.log('[book-quiz] Raw items count:', allItems.length)
    console.log('[book-quiz] Final books count:', normalised.length)
    if (normalised.length > 0) {
      console.log('[book-quiz] Sample book:', JSON.stringify(normalised[0], null, 2))
    }

    if (normalised.length === 0) {
      return res.status(200).json({ books: [], message: 'No books found for your preferences. Try different answers!' })
    }

    return res.status(200).json({ books: normalised })
  } catch (error) {
    console.error('[book-quiz] Error:', error)
    return res.status(500).json({ error: error.message || 'Failed to fetch book recommendations' })
  }
}
