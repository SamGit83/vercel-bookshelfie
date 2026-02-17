export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, tone, length, style } = req.body

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' })
  }

  try {
    const apiKey = process.env.GROK_API_KEY

    if (!apiKey) {
      throw new Error('GROK_API_KEY is not configured')
    }

    // Construct the prompt for Grok
    const systemPrompt = `You are a creative AI prompt generator. Generate a high-quality, detailed prompt based on the user's specifications. The prompt should be clear, engaging, and ready to use.`
    
    const userPrompt = `Generate a ${length} ${style} prompt about "${topic}" with a ${tone} tone. The prompt should be well-structured and inspiring.`

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
        model: 'grok-beta',
        stream: false,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Grok API error:', errorData)
      throw new Error(`Grok API error: ${response.status}`)
    }

    const data = await response.json()
    const generatedPrompt = data.choices?.[0]?.message?.content

    if (!generatedPrompt) {
      throw new Error('No prompt generated')
    }

    return res.status(200).json({ prompt: generatedPrompt })
  } catch (error) {
    console.error('Error generating prompt:', error)
    return res.status(500).json({ 
      error: 'Failed to generate prompt. Please try again later.',
      details: error.message 
    })
  }
}
