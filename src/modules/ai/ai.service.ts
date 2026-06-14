import { readFileSync } from "fs";
import { join } from "path";
import { env } from "../../config/env";
import { AiAskRequestDto } from "./dto/ai.dto";

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  usageMetadata?: unknown;
  modelVersion?: string;
};

type KnowledgeItem = {
  id: string;
  type: string;
  title: string;
  score: number;
  content: unknown;
};

type KnowledgeDocument = {
  product: Record<string, unknown>;
  rules: Array<Record<string, unknown> & { id: string; title: string }>;
  careers: Array<Record<string, unknown> & { id: string; type: string; title: string }>;
  syllabi: Array<Record<string, unknown> & { id: string; type: string; courseName: string }>;
};

function getGeminiGenerateUrl(): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${env.aiModel}:generateContent`;
}

function getKnowledgePath(): string {
  return join(process.cwd(), "src", "modules", "ai", "knowledge", "utp-match.knowledge.json");
}

function loadKnowledge(): KnowledgeDocument {
  const raw = readFileSync(getKnowledgePath(), "utf8");
  return JSON.parse(raw) as KnowledgeDocument;
}

function normalizeText(value: unknown): string {
  return JSON.stringify(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9ñ]+/i)
    .map((term) => term.trim())
    .filter((term) => term.length >= 3);
}

function scoreItem(item: Record<string, unknown>, terms: string[]): number {
  const normalized = normalizeText(item);

  return terms.reduce((score, term) => {
    return normalized.includes(term) ? score + 1 : score;
  }, 0);
}

function retrieveContext(input: AiAskRequestDto): KnowledgeItem[] {
  const knowledge = loadKnowledge();
  const terms = tokenize(input.question);

  const baseItems: KnowledgeItem[] = [
    {
      id: "product",
      type: "product",
      title: "UTP Match / SyllabusX",
      score: 100,
      content: knowledge.product
    },
    ...knowledge.rules.map((rule) => ({
      id: rule.id,
      type: "rule",
      title: rule.title,
      score: 90,
      content: rule
    }))
  ];

  const careerItems: KnowledgeItem[] = knowledge.careers
    .filter((career) => {
      if (input.careerIds.length === 0) return true;
      return input.careerIds.includes(career.id);
    })
    .map((career) => ({
      id: career.id,
      type: "career",
      title: career.title,
      score: (input.careerIds.includes(career.id) ? 50 : 0) + scoreItem(career, terms),
      content: career
    }));

  const syllabusItems: KnowledgeItem[] = knowledge.syllabi
    .filter((syllabus) => {
      if (input.syllabusIds.length === 0) return true;
      return input.syllabusIds.includes(syllabus.id);
    })
    .map((syllabus) => ({
      id: syllabus.id,
      type: "syllabus",
      title: syllabus.courseName,
      score: (input.syllabusIds.includes(syllabus.id) ? 50 : 0) + scoreItem(syllabus, terms),
      content: syllabus
    }));

  return [...baseItems, ...careerItems, ...syllabusItems]
    .sort((a, b) => b.score - a.score)
    .slice(0, input.maxContextItems);
}

function buildPrompt(input: AiAskRequestDto, context: KnowledgeItem[]): string {
  return [
    "Eres el asistente IA de UTP Match / SyllabusX.",
    "Tu trabajo es ayudar a estudiantes de secundaria a entender carreras, sílabos y próximos pasos vocacionales.",
    "",
    "Reglas:",
    "- Responde en español.",
    "- Usa tono claro, juvenil, empático y directo.",
    "- Basa tu respuesta solo en el contexto proporcionado.",
    "- Si falta información, dilo claramente.",
    "- No prometas empleabilidad garantizada.",
    "- No digas que una carrera es la única opción correcta.",
    "- Cierra con un siguiente paso práctico.",
    "",
    "Contexto disponible:",
    JSON.stringify(context, null, 2),
    "",
    "Pregunta del estudiante:",
    input.question,
    "",
    "Respuesta:"
  ].join("\n");
}

export class AiService {
  public async generateText(prompt: string, maxOutputTokens = 800) {
    if (!env.aiEnabled) {
      throw new Error("AI_DISABLED");
    }

    if (env.aiProvider !== "gemini") {
      throw new Error("AI_PROVIDER_NOT_SUPPORTED");
    }

    if (!env.geminiApiKeyConfigured) {
      throw new Error("GEMINI_API_KEY_NOT_CONFIGURED");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.geminiTimeoutMs);
    const startedAt = Date.now();

    try {
      const response = await fetch(getGeminiGenerateUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.geminiApiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens
          }
        }),
        signal: controller.signal
      });

      const rawText = await response.text();

      if (!response.ok) {
        throw new Error(`GEMINI_API_ERROR ${response.status}: ${rawText.slice(0, 1000)}`);
      }

      const data = JSON.parse(rawText) as GeminiGenerateContentResponse;

      const generatedText =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || "")
          .join("")
          .trim() || "";

      if (!generatedText) {
        throw new Error("GEMINI_EMPTY_RESPONSE");
      }

      return {
        generatedText,
        modelVersion: data.modelVersion || null,
        usageMetadata: data.usageMetadata || null,
        latencyMs: Date.now() - startedAt
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  public async askWithKnowledge(input: AiAskRequestDto) {
    const context = retrieveContext(input);
    const prompt = buildPrompt(input, context);
    const result = await this.generateText(prompt, 900);

    return {
      provider: env.aiProvider,
      model: env.aiModel,
      question: input.question,
      answer: result.generatedText,
      usedContext: context,
      latencyMs: result.latencyMs,
      modelVersion: result.modelVersion,
      usageMetadata: result.usageMetadata
    };
  }
}
