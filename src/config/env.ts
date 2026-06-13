import dotenv from "dotenv";

dotenv.config({ override: true });

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`Falta configurar la variable de entorno: ${name}`);
  }

  if (isPlaceholderValue(value)) {
    throw new Error(`La variable ${name} todavía tiene un valor temporal`);
  }

  return value;
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

function booleanEnv(name: string, defaultValue: boolean): boolean {
  const value = process.env[name];

  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

function numberEnv(name: string, defaultValue: number): number {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

function isPlaceholderValue(value: string): boolean {
  const normalized = value.trim().toUpperCase();

  return (
    normalized === "" ||
    normalized.includes("PEGAR_") ||
    normalized.includes("TU_") ||
    normalized.includes("PENDIENTE") ||
    normalized.includes("REEMPLAZAR") ||
    normalized.includes("CONFIGURAR")
  );
}

function isConfiguredSecret(value: string): boolean {
  return Boolean(value && !isPlaceholderValue(value));
}

const databaseEnabled = booleanEnv("DATABASE_ENABLED", false);
const aiEnabled = booleanEnv("AI_ENABLED", false);
const aiProvider = optionalEnv("AI_PROVIDER", "mock");

const rawGeminiApiKey = optionalEnv("GEMINI_API_KEY", "");
const geminiApiKeyConfigured = isConfiguredSecret(rawGeminiApiKey);

export const env = {
  port: Number(optionalEnv("PORT", "3000")),
  nodeEnv: optionalEnv("NODE_ENV", "development"),
  apiPrefix: optionalEnv("API_PREFIX", "/v1"),

  supabaseUrl: requiredEnv("SUPABASE_URL"),
  supabaseAnonKey: requiredEnv("SUPABASE_ANON_KEY"),

  databaseEnabled,
  databaseUrl: databaseEnabled
    ? requiredEnv("DATABASE_URL")
    : optionalEnv("DATABASE_URL", ""),

  jwtSecret: requiredEnv("JWT_SECRET"),

  aiEnabled,
  aiProvider,
  aiModel: optionalEnv("AI_MODEL", "gemini-3.1-flash-lite"),
  aiFallbackProvider: optionalEnv("AI_FALLBACK_PROVIDER", "mock"),

  geminiApiKey: aiEnabled && aiProvider === "gemini"
    ? requiredEnv("GEMINI_API_KEY")
    : rawGeminiApiKey,

  geminiApiKeyConfigured,
  geminiTimeoutMs: numberEnv("GEMINI_TIMEOUT_MS", 20000),

  frontendUrl: optionalEnv("FRONTEND_URL", "http://localhost:5173"),
  mobileUrl: optionalEnv("MOBILE_URL", "http://localhost:8081"),
  corsOrigin: optionalEnv("CORS_ORIGIN", "http://localhost:5173")
};

