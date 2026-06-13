import { Router } from "express";
import { ok } from "./shared/responses/api-response";

import { healthRoutes } from "./modules/health/health.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { profilesRoutes } from "./modules/profiles/profiles.routes";
import { careersRoutes } from "./modules/careers/careers.routes";
import { vocationalReportsRoutes } from "./modules/vocational-reports/vocational-reports.routes";
import { comparisonsRoutes } from "./modules/comparisons/comparisons.routes";
import { syllabiRoutes } from "./modules/syllabi/syllabi.routes";
import { plansRoutes } from "./modules/plans/plans.routes";
import { sharesRoutes } from "./modules/shares/shares.routes";
import { eventsRoutes } from "./modules/events/events.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { aiRoutes } from "./modules/ai/ai.routes";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  return ok(res, {
    service: "UTP Match Backend API",
    version: "v1",
    status: "running"
  });
});

apiRouter.get("/modules", (_req, res) => {
  return ok(res, [
    "health",
    "auth",
    "profiles",
    "careers",
    "vocational-reports",
    "comparisons",
    "syllabi",
    "plans",
    "shares",
    "events",
    "admin",
    "ai"
  ]);
});

apiRouter.use("/health", healthRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/profiles", profilesRoutes);
apiRouter.use("/careers", careersRoutes);
apiRouter.use("/vocational-reports", vocationalReportsRoutes);
apiRouter.use("/comparisons", comparisonsRoutes);
apiRouter.use("/syllabi", syllabiRoutes);
apiRouter.use("/plans", plansRoutes);
apiRouter.use("/shares", sharesRoutes);
apiRouter.use("/events", eventsRoutes);
apiRouter.use("/admin", adminRoutes);
apiRouter.use("/ai", aiRoutes);
