/**
 * Book Recommendation Quiz API
 * Accepts POST { answers: { mood, genre, pace, protagonist, setting, length, goal, audience } }
 * Calls the Grok (xAI) API to generate 8-10 personalised book recommendations
 * Returns { books: [ { id, title, authors, description, thumbnail, previewLink } ] }
 */

const ALLOWED_QUESTION_IDS = ['mood', 'genre', 'pace', 'protagonist', 'setting', 'length', 'goal', 'audience']

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
    const apiKey = process.env.GROK_API_KEY

    if (!apiKey) {
      throw new Error('GROK_API_KEY is not configured')
    }

    // Build user preferences from answers
    const preferences = Object.entries(answers)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')

    // Construct prompt for Grok
    const systemPrompt = `You are a knowledgeable book recommendation expert. Your task is to recommend books based on the user's preferences from a book quiz.

IMPORTANT: You must respond ONLY with a valid JSON array of book objects. No additional text, no markdown formatting, no explanations. The response must be parseable by JSON.parse().

Each book object must have exactly these fields:
- id: a unique string identifier (use a slug format like "title-author-lastname", e.g., "the-hobbit-tolkien")
- title: the book title (string)
- authors: an array of author names (array of strings)
- description: a brief description of the book (string, max 300 characters)
- thumbnail: null (you cannot provide images)
- previewLink: null (you cannot provide links)

Recommend 8-10 books that match the user's preferences. Be specific and diverse in your recommendations.`

    const userPrompt = `Based on my book quiz preferences, recommend 8-10 books I would enjoy.

My preferences: ${preferences}

Please provide book recommendations that match these preferences. Consider the genre, mood, pacing, protagonist type, setting, and target audience.`

    // Debug: Log the prompt being sent to Grok
    console.log('[book-quiz] Sending prompt to Grok:', userPrompt)

    // Call Grok AI API
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        model: 'grok-3-mini',
        stream: false,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[book-quiz] Grok API error:', errorData)
      throw new Error(`Grok API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No content generated from Grok')
    }

    // Debug: Log raw Grok response
    console.log('[book-quiz] Raw Grok response:', content)

    // Parse JSON from Grok's response
    let books
    try {
      // Try to extract JSON from the response (in case there's any wrapper text)
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No JSON array found in response')
      }
      books = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('[book-quiz] JSON parse error:', parseError)
      console.error('[book-quiz] Failed content:', content)
      throw new Error('Failed to parse book recommendations from AI response')
    }

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(200).json({ books: [], message: 'No books found for your preferences. Try different answers!' })
    }

    // Normalise each book to match frontend expectations
    const normalised = books.slice(0, 10).map((book) => {
      const title = typeof book.title === 'string' && book.title.trim() ? book.title.trim() : 'Unknown Title'
      const authors = Array.isArray(book.authors) && book.authors.length > 0 
        ? book.authors 
        : ['Unknown Author']
      
      // Generate unique id from title and author if not provided
      const id = book.id || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}-${authors[0].toLowerCase().replace(/[^a-z0-9]+/g, '').substring(0, 10)}`

      const rawDescription = typeof book.description === 'string' ? book.description.trim() : ''
      const description = rawDescription
        ? rawDescription.substring(0, 300)
        : 'No description available.'

      return {
        id,
        title,
        authors,
        description,
        thumbnail: null,
        previewLink: null,
      }
    })

    // DEBUG: Log final results before returning
    console.log('[book-quiz] Raw books count:', books.length)
    console.log('[book-quiz] Final books count:', normalised.length)
    if (normalised.length > 0) {
      console.log('[book-quiz] Sample book:', JSON.stringify(normalised[0], null, 2))
    }

    return res.status(200).json({ books: normalised })
  } catch (error) {
    console.error('[book-quiz] Error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate book recommendations' })
  }
}
