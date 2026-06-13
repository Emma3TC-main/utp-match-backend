import dotenv from "dotenv";

dotenv.config();

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`Falta configurar la variable de entorno: ${name}`);
  }

  if (
    value.includes("PEGAR_") ||
    value.includes("TU_") ||
    value.includes("PENDIENTE")
  ) {
    throw new Error(`La variable ${name} aún tiene un valor temporal`);
  }

  return value;
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

const databaseEnabled = optionalEnv("DATABASE_ENABLED", "false") === "true";
const chatlyEnabled = optionalEnv("CHATLY_ENABLED", "false") === "true";

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

  chatlyEnabled,
  chatlyApiKey: chatlyEnabled
    ? requiredEnv("CHATLY_API_KEY")
    : optionalEnv("CHATLY_API_KEY", ""),

  chatlyBaseUrl: optionalEnv("CHATLY_BASE_URL", "https://api.chatly.ai"),
  chatlyModel: optionalEnv("CHATLY_MODEL", "deepseek"),

  corsOrigin: optionalEnv("CORS_ORIGIN", "http://localhost:5173")
};
