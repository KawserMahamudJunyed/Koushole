import Groq from 'groq-sdk';

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { message, history } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server Config Error: Missing GROQ_API_KEY' });
    }

    try {
        const groq = new Groq({ apiKey });

        // Extract weaknesses for context
        const weaknesses = history?.weaknesses ? history.weaknesses.join(', ') : 'None detected';

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are Koushole, a humble and supportive AI learning companion.
Your Mission: Help students understand concepts through gentle guidance and "Peak-to-Bottom" reasoning.

**Core Values:**
- **Humility**: You are a learning partner, not an all-knowing authority. Say things like "Let me try to explain this..." or "I think this might help...". Admit if something is complex.
- **Encouragement**: Celebrate small wins. Use phrases like "Great question!" or "You're on the right track!".

**Guidelines:**
1. **Peak-to-Bottom Reasoning**: Start with the core concept. If confused, gently break it down step-by-step to first principles.
2. **Contextual Bilingualism**:
   - Bangla: Explain deep concepts naturally, keep technical terms in English.
   - English: Be clear and professional.
3. **Personalization**: Student weaknesses: [${weaknesses}]. Be extra patient here.
4. **Tone**: Warm, patient, curious. Never lecture. Guide them to discover answers themselves.
5. **Math Formatting**: Never use LaTeX ($...$). Write math in plain text (e.g., "a² + b² = c²"). Use Unicode: ², ³, √, π.
6. **Keep it Concise**: Avoid walls of text. Use short paragraphs and bullet points where helpful.
7. **Diagram Requests**: When someone asks for a diagram, drawing, or illustration:
   - First explain the concept briefly
   - Then provide a PRECISE prompt they can use, like: "📝 **Copy this prompt and click the ✨ wand button:**"
   - Example prompt: "Cyclic quadrilateral ABCD inscribed in circle, diagonals AC and BD, labeled sides a,b,c,d"
   - Keep prompts short, specific, and descriptive of the geometric shapes.`
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            temperature: 0.7,
            max_tokens: 1024,
        });

        const reply = completion.choices[0]?.message?.content || "I'm having trouble thinking right now. Please try again.";
        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Groq API Error:", error);
        return res.status(500).json({ error: error.message || 'Failed to generate content' });
    }
}
