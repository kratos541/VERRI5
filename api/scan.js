// api/scan.js
export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    console.log("Scan called — key exists:", !!process.env.ANTHROPIC_KEY);
    const { imageBase64, mediaType } = req.body || {};
    if (!imageBase64) return res.status(400).json({ error: "No image provided" });
    console.log("Image length:", imageBase64.length);

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         process.env.ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-5",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type:       "base64",
                media_type: mediaType || "image/jpeg",
                data:       imageBase64,
              },
            },
            {
              type: "text",
              text: "Read this Pakistani business document. Return ONLY a JSON object with these fields: doc_type, business_name, issuing_authority, issue_date (YYYY-MM-DD or null), expiry_date (YYYY-MM-DD or null), licence_number, city, is_expired (boolean). No other text.",
            },
          ],
        }],
      }),
    });

    console.log("Claude status:", claudeRes.status);
    const data = await claudeRes.json();

    if (!claudeRes.ok) {
      console.error("Claude error:", JSON.stringify(data));
      return res.status(500).json({ error: data?.error?.message || "Claude error" });
    }

    const text = data.content?.[0]?.text || "{}";
    console.log("Claude reply:", text.slice(0, 300));

    let extracted;
    try {
      const cleaned = text.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
      extracted = JSON.parse(cleaned);
    } catch {
      extracted = { doc_type: "unknown", raw_text: text };
    }

    return res.status(200).json({ success: true, data: extracted });

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
