// api/scan.js
// Vercel serverless function — receives image, sends to Claude, returns extracted data
// Deployed automatically by Vercel — no extra setup needed

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageBase64, mediaType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Call Claude API with the image
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType || "image/jpeg",
                  data: imageBase64,
                },
              },
              {
                type: "text",
                text: `You are reading a Pakistani business licence or government document. Extract the following information and return ONLY a JSON object with no other text:

{
  "doc_type": "type of document (e.g. Trade Licence, PFA Licence, NTN Certificate, EOBI Certificate, Drug Sale Licence, etc.)",
  "business_name": "name of the business on the document",
  "issuing_authority": "the government body that issued it (e.g. Lahore Metropolitan Corporation, Punjab Food Authority, FBR, etc.)",
  "issue_date": "date issued in YYYY-MM-DD format or null if not found",
  "expiry_date": "expiry/renewal date in YYYY-MM-DD format or null if not found",
  "licence_number": "the licence or registration number or null if not found",
  "city": "city where the business is located or null if not found",
  "is_expired": true or false based on whether expiry date has passed today
}

If you cannot read the document clearly, return your best guess based on what is visible. If it is not a business document, return {"doc_type": "unknown", "business_name": null, "issuing_authority": null, "issue_date": null, "expiry_date": null, "licence_number": null, "city": null, "is_expired": false}.`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API error:", data);
      return res.status(500).json({ error: "Claude API error", details: data });
    }

    // Extract the text response from Claude
    const text = data.content?.[0]?.text || "{}";

    // Parse the JSON from Claude's response
    let extracted;
    try {
      // Remove any markdown code blocks if Claude added them
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      extracted = JSON.parse(cleaned);
    } catch {
      // If parsing fails, return what we got
      extracted = { doc_type: "unknown", raw_text: text };
    }

    return res.status(200).json({ success: true, data: extracted });

  } catch (error) {
    console.error("Scan error:", error);
    return res.status(500).json({ error: error.message });
  }
}
