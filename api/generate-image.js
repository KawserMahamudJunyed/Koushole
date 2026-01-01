export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    const apiKey = process.env.HF_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server Config Error: Missing HF_API_KEY' });
    }

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Use FLUX.1-schnell - fast, open source model great for diagrams
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: `A clear, professional mathematical diagram showing: ${prompt}. 
Style: Clean educational illustration, textbook quality, geometric shapes with clear labels, mathematical notation visible, black lines on white background, simple and accurate, no decorations, technical drawing style.`,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HuggingFace API Error: ${response.status} - ${errorText}`);
        }

        // Response is a binary image
        const imageBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(imageBuffer).toString('base64');

        return res.status(200).json({
            image: `data:image/png;base64,${base64}`,
            success: true
        });

    } catch (error) {
        console.error("Image Generation Error:", error);
        return res.status(500).json({ error: error.message || 'Failed to generate image' });
    }
}
