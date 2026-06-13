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
    value.includes("PENDIENTE") ||
    value.includes("REEMPLAZAR")
  ) {
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

export const env = {
  port: Number(optionalEnv("PORT", "3000")),
  nodeEnv: optionalEnv("NODE_ENV", "development"),
  apiPrefix: optionalEnv("API_PREFIX", "/v1"),

  supabaseUrl: requiredEnv("SUPABASE_URL"),
  supabaseAnonKey: requiredEnv("SUPABASE_ANON_KEY"),

  databaseEnabled: booleanEnv("DATABASE_ENABLED", false),
  databaseUrl: booleanEnv("DATABASE_ENABLED", false)
    ? requiredEnv("DATABASE_URL")
    : optionalEnv("DATABASE_URL", ""),

  jwtSecret: requiredEnv("JWT_SECRET"),

  chatlyEnabled: booleanEnv("CHATLY_ENABLED", false),
  chatlyApiKey: booleanEnv("CHATLY_ENABLED", false)
    ? requiredEnv("CHATLY_API_KEY")
    : optionalEnv("CHATLY_API_KEY", ""),

  chatlyBaseUrl: optionalEnv("CHATLY_BASE_URL", "https://api.chatly.ai"),
  chatlyModel: optionalEnv("CHATLY_MODEL", "deepseek"),

  frontendUrl: optionalEnv("FRONTEND_URL", "http://localhost:5173"),
  mobileUrl: optionalEnv("MOBILE_URL", "http://localhost:8081"),
  corsOrigin: optionalEnv("CORS_ORIGIN", "http://localhost:5173")
};
