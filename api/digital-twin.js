const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1500;
const contentRoot = path.join(process.cwd(), "content");

function readMdxDirectory(section) {
  const directory = path.join(contentRoot, section);
  if (!fs.existsSync(directory)) return [];

  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
  return files.map((file) => {
    const fullPath = path.join(directory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: file.replace(/\.mdx$/, ""),
      meta: data || {},
      content: (content || "").trim(),
    };
  });
}

function asLine(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function buildProjectsSection(entries) {
  if (!entries.length) return "Projects: None available.";
  const lines = entries.map((entry) => {
    const title = asLine(entry.meta.title) || entry.slug;
    const description = asLine(entry.meta.description);
    const technologies = asStringArray(entry.meta.technologies);
    const features = asStringArray(entry.meta.features);
    const detail = [
      description ? `Description: ${description}` : "",
      technologies.length ? `Technologies: ${technologies.join(", ")}` : "",
      features.length ? `Features: ${features.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
    return `- ${title}${detail ? ` (${detail})` : ""}`;
  });
  return `Projects:\n${lines.join("\n")}`;
}

function byOrder(a, b) {
  return Number(a.meta.order ?? 999) - Number(b.meta.order ?? 999);
}

function getDigitalTwinSystemPrompt() {
  const career = readMdxDirectory("career-journey").sort(byOrder);
  const education = readMdxDirectory("education").sort(byOrder);
  const certifications = readMdxDirectory("certifications").sort(byOrder);
  const projects = readMdxDirectory("projects");

  const careerLines = career.length
    ? career
        .map((entry) => {
          const company = asLine(entry.meta.company) || entry.slug;
          const role = asLine(entry.meta.role);
          const period = asLine(entry.meta.period);
          const highlight = asLine(entry.meta.highlight);
          return `- ${company}${role ? ` - ${role}` : ""}${period ? ` (${period})` : ""}${highlight ? `: ${highlight}` : ""}`;
        })
        .join("\n")
    : "- None available.";

  const educationLines = education.length
    ? education
        .map((entry) => {
          const school = asLine(entry.meta.school) || entry.slug;
          const degree = asLine(entry.meta.degree);
          return `- ${school}${degree ? ` - ${degree}` : ""}`;
        })
        .join("\n")
    : "- None available.";

  const certificationLines = certifications.length
    ? certifications
        .map((entry) => {
          const title = asLine(entry.meta.title) || entry.slug;
          const issuer = asLine(entry.meta.issuer);
          const date = asLine(entry.meta.date);
          return `- ${title}${issuer ? ` - ${issuer}` : ""}${date ? ` (${date})` : ""}`;
        })
        .join("\n")
    : "- None available.";

  return `
You are Victor Gonzalez's Digital Twin.
Answer questions about Victor's career, skills, education, certifications, and projects using only the portfolio context below.
If a question asks for unavailable details, say you do not have that detail and suggest contacting Victor directly.
Keep responses concise, professional, and factual.

Career journey:
${careerLines}

Education:
${educationLines}

Certifications:
${certificationLines}

${buildProjectsSection(projects)}
`.trim();
}

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async function handler(req, res) {
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "OPENROUTER_API_KEY is missing in environment variables." });
      return;
    }

    const body = req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const incomingMessages = messages.filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_CONTENT_LENGTH
    );

    if (!incomingMessages.length) {
      res.status(400).json({ error: "At least one message is required." });
      return;
    }

    if (incomingMessages.length > MAX_MESSAGES) {
      res.status(400).json({ error: `Too many messages. Maximum is ${MAX_MESSAGES}.` });
      return;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        messages: [{ role: "system", content: getDigitalTwinSystemPrompt() }, ...incomingMessages],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter request failed", { status: response.status, body: errorText.slice(0, 500) });
      res.status(502).json({ error: "Digital Twin service is temporarily unavailable. Please try again." });
      return;
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      res.status(502).json({ error: "No response from model." });
      return;
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Digital Twin serverless handler error", error);
    res.status(500).json({ error: "Unexpected server error while processing your request." });
  }
};
