import OpenAI from "openai";
import { getTechNews } from "./tools.js";

// ✅ Create OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAgent() {
  try {
    console.log("🧠 Running AI Agent...");

    // 🟢 Step 1 — Fetch news (RSS + Reddit)
    const news = await getTechNews();

    if (!news || news.length === 0) {
      console.log("⚠️ No news fetched");
      return [];
    }

    // 🟢 Step 2 — Call LLM
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an expert tech analyst.

Your job:
- Select ONLY top 3 most important news
- Focus on:
  - AI
  - startups
  - big tech

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include any text outside JSON
- Do NOT explain anything

FORMAT:
{
  "items": [
    {
      "title": "string",
      "summary": "string",
      "why": "string",
      "url": "string"
    }
  ]
}
`,
        },
        {
          role: "user",
          content: `
Here is the latest tech news data:

${JSON.stringify(news)}

Analyze and return top 3 most important stories.
`,
        },
      ],
    });

    // 🟢 Step 3 — Extract response safely
    const raw = response.choices?.[0]?.message?.content ?? "{}";

    console.log("🔍 RAW LLM OUTPUT:", raw);

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("❌ JSON parse failed");

      // ✅ fallback (prevents empty email)
      return [
        {
          title: "Error parsing news",
          summary: "AI response could not be parsed",
          why: "Model did not return valid JSON",
          url: "#",
        },
      ];
    }

    // 🟢 Step 4 — Validate structure
    if (!parsed.items || !Array.isArray(parsed.items)) {
      console.log("⚠️ Invalid structure from LLM");
      return [];
    }

    return parsed.items;
  } catch (error) {
    console.error("❌ Agent failed:", error);

    return [
      {
        title: "Agent Error",
        summary: "Something went wrong while fetching news",
        why: "Check logs",
        url: "#",
      },
    ];
  }
}