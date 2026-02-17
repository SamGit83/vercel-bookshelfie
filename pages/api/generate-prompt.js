export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, tone, length, style } = req.body

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' })
  }

  try {
    // Debug: Log incoming form data
    console.log('[DEBUG] Form data received:', { topic, tone, length, style })

    const apiKey = process.env.GROK_API_KEY

    if (!apiKey) {
      throw new Error('GROK_API_KEY is not configured')
    }

    // Construct the prompt for Grok
    const systemPrompt = `You are a creative AI prompt generator. Generate a high-quality, detailed prompt based on the user's specifications. The prompt should be clear, engaging, and ready to use.

IMPORTANT: Format your response in clear, well-structured paragraphs for easy reading. Use double line breaks between paragraphs. Each paragraph should focus on a distinct aspect or idea.`
    
    // Map qualitative length to explicit sentence counts
    const lengthMap = {
      short: '1-10 sentences',
      medium: '10-20 sentences',
      long: '20-1000 sentences'
    }

    const userPrompt = `Generate a prompt about "${topic}" with a ${tone} tone. 
The prompt should be ${lengthMap[length] || 'medium length'}. 
Format it as a ${style} prompt that is clear and ready to use.`

    // Debug: Log the full prompt being sent to AI
    console.log('[DEBUG] Full userPrompt being sent to AI:', userPrompt)
    console.log('[DEBUG] userPrompt length:', userPrompt.length, 'characters')

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
