import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { fail } from "./shared/responses/api-response";
import { apiRouter } from "./routes";

export const app = express();

app.use(cors({
  origin: env.corsOrigin.split(",").map((origin) => origin.trim()),
  credentials: true
}));

app.use(express.json());

app.use(env.apiPrefix, apiRouter);

app.use((_req, res) => {
  return fail(
    res,
    404,
    "NOT_FOUND",
    "Ruta no encontrada"
  );
});
