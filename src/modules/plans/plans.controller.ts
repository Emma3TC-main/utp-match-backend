import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  ActionPlanCreateDto,
  ActionPlanPatchDto,
  ActionPlanQueryDto,
  UpdatePlanTaskStatusDto
} from "./dto/plan.dto";
import { PlansService } from "./plans.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class PlansController {
  constructor(private readonly plansService = new PlansService()) {}

  public createPlan = async (req: Request, res: Response) => {
    const input = req.body as ActionPlanCreateDto;
    const plan = await this.plansService.createPlan(input);

    return ok(res, {
      plan
    });
  };

  public listPlans = async (req: Request, res: Response) => {
    const query = req.query as unknown as ActionPlanQueryDto;
    const items = await this.plansService.listPlans(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getPlanById = async (req: Request, res: Response) => {
    const planId = getParamAsString(req.params.planId);

    if (!planId) {
      return fail(
        res,
        400,
        "PLAN_ID_REQUIRED",
        "El id del plan es obligatorio."
      );
    }

    const plan = await this.plansService.getPlanById(planId);

    if (!plan) {
      return fail(
        res,
        404,
        "PLAN_NOT_FOUND",
        "No se encontró el plan solicitado.",
        [{ planId }]
      );
    }

    return ok(res, {
      plan
    });
  };

  public updatePlan = async (req: Request, res: Response) => {
    const planId = getParamAsString(req.params.planId);

    if (!planId) {
      return fail(
        res,
        400,
        "PLAN_ID_REQUIRED",
        "El id del plan es obligatorio."
      );
    }

    const input = req.body as ActionPlanPatchDto;
    const plan = await this.plansService.updatePlan(planId, input);

    if (!plan) {
      return fail(
        res,
        404,
        "PLAN_NOT_FOUND",
        "No se encontró el plan solicitado.",
        [{ planId }]
      );
    }

    return ok(res, {
      plan
    });
  };

  public updateTaskStatus = async (req: Request, res: Response) => {
    const planId = getParamAsString(req.params.planId);
    const taskId = getParamAsString(req.params.taskId);

    if (!planId || !taskId) {
      return fail(
        res,
        400,
        "PLAN_TASK_ID_REQUIRED",
        "El id del plan y de la tarea son obligatorios."
      );
    }

    const input = req.body as UpdatePlanTaskStatusDto;
    const plan = await this.plansService.updateTaskStatus(planId, taskId, input);

    if (!plan) {
      return fail(
        res,
        404,
        "PLAN_OR_TASK_NOT_FOUND",
        "No se encontró el plan o la tarea solicitada.",
        [{ planId, taskId }]
      );
    }

    return ok(res, {
      plan
    });
  };
}
