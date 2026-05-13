// api/admin.js
// Secure admin API — handles law CRUD operations
// Protected by ADMIN_PASSWORD environment variable

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Check password from Authorization header
  const auth = req.headers.authorization || "";
  const password = auth.replace("Bearer ", "");

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const SUPABASE_URL  = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY  = process.env.VITE_SUPABASE_ANON_KEY;

  const supabaseHeaders = {
    "Content-Type":  "application/json",
    "apikey":        SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Prefer":        "return=representation",
  };

  try {

    // GET — fetch all laws
    if (req.method === "GET") {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/laws?order=cat.asc,title.asc&select=*`,
        { headers: supabaseHeaders }
      );
      const data = await r.json();
      return res.status(200).json(data);
    }

    // POST — add new law
    if (req.method === "POST") {
      const law = req.body;
      const r = await fetch(`${SUPABASE_URL}/rest/v1/laws`, {
        method:  "POST",
        headers: supabaseHeaders,
        body:    JSON.stringify(law),
      });
      const data = await r.json();
      return res.status(201).json(data);
    }

    // PUT — update existing law
    if (req.method === "PUT") {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: "ID required" });
      updates.updated_at = new Date().toISOString();
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/laws?id=eq.${id}`,
        {
          method:  "PATCH",
          headers: supabaseHeaders,
          body:    JSON.stringify(updates),
        }
      );
      const data = await r.json();
      return res.status(200).json(data);
    }

    // DELETE — toggle law active/inactive
    if (req.method === "DELETE") {
      const { id, active } = req.body;
      if (!id) return res.status(400).json({ error: "ID required" });
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/laws?id=eq.${id}`,
        {
          method:  "PATCH",
          headers: supabaseHeaders,
          body:    JSON.stringify({ active: active ?? false, updated_at: new Date().toISOString() }),
        }
      );
      const data = await r.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("Admin error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
