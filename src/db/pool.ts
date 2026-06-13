import { Pool } from "pg";
import { env } from "../config/env";

type DatabaseHealth = {
  enabled: boolean;
  connected: boolean;
  message: string;
  metadata?: {
    now?: string;
    database?: string;
  };
};

function createPool(): Pool | null {
  if (!env.databaseEnabled) {
    return null;
  }

  return new Pool({
    connectionString: env.databaseUrl,
    ssl: {
      rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
  });
}

export const pool = createPool();

export async function query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
  if (!env.databaseEnabled || !pool) {
    throw new Error("La base de datos está desactivada. Revisar DATABASE_ENABLED en .env.");
  }

  const result = await pool.query(sql, params);
  return result.rows as T[];
}

export async function checkDatabaseConnection(): Promise<DatabaseHealth> {
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

  const result = await pool.query<{
    ok: number;
    now: string;
    database: string;
  }>("SELECT 1 AS ok, NOW()::text AS now, current_database() AS database");

  const row = result.rows[0];

  return {
    enabled: true,
    connected: row?.ok === 1,
    message: "Conexión a base de datos verificada.",
    metadata: {
      now: row?.now,
      database: row?.database
    }
  };
}
