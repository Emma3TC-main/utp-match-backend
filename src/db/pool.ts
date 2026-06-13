import { Pool } from "pg";
import { env } from "../config/env";

export const pool = env.databaseEnabled
  ? new Pool({
      connectionString: env.databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    })
  : null;

export async function checkDatabaseConnection(): Promise<{
  enabled: boolean;
  connected: boolean;
  message: string;
}> {
  if (!env.databaseEnabled) {
    return {
      enabled: false,
      connected: false,
      message: "Base de datos desactivada temporalmente. Configurar DATABASE_ENABLED=true cuando se tenga la URI correcta de Supabase."
    };
  }

  if (!pool) {
    return {
      enabled: true,
      connected: false,
      message: "Pool de base de datos no inicializado."
    };
  }

  const result = await pool.query("SELECT 1 AS ok");

  return {
    enabled: true,
    connected: result.rows[0]?.ok === 1,
    message: "Conexión a base de datos verificada."
  };
}
