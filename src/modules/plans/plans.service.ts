import { randomUUID } from "crypto";
import {
  ActionPlanCreateDto,
  ActionPlanDto,
  ActionPlanPatchDto,
  ActionPlanQueryDto,
  PlanTaskDto,
  UpdatePlanTaskStatusDto
} from "./dto/plan.dto";

const planStore = new Map<string, ActionPlanDto>();

function withTaskIds(tasks: PlanTaskDto[]): PlanTaskDto[] {
  return tasks.map((task) => ({
    ...task,
    id: task.id || randomUUID(),
    status: task.status || "pending"
  }));
}

function calculateProgress(tasks: PlanTaskDto[]): number {
  if (tasks.length === 0) {
    return 0;
  }

  const done = tasks.filter((task) => task.status === "done").length;

  return Math.round((done / tasks.length) * 100);
}

function buildDefaultTasks(targetCareerId: string): PlanTaskDto[] {
  return withTaskIds([
    {
      title: "Revisar los cursos del primer ciclo",
      description:
        "Explorar los cursos iniciales para entender cómo se verá estudiar esta carrera en la práctica.",
      type: "review_syllabus",
      status: "pending",
      relatedCareerId: targetCareerId
    },
    {
      title: "Conversar la decisión con familia o asesor",
      description:
        "Usar el resumen de comparación para explicar por qué esta carrera puede encajar con el estudiante.",
      type: "talk_family",
      status: "pending",
      relatedCareerId: targetCareerId
    },
    {
      title: "Preparar una habilidad base",
      description:
        "Elegir una habilidad inicial vinculada a la carrera y practicarla durante la semana.",
      type: "prepare_skill",
      status: "pending",
      relatedCareerId: targetCareerId
    }
  ]);
}

export class PlansService {
  public async createPlan(input: ActionPlanCreateDto): Promise<ActionPlanDto> {
    const now = new Date().toISOString();
    const tasks = withTaskIds(
      input.tasks && input.tasks.length > 0
        ? input.tasks
        : buildDefaultTasks(input.targetCareerId)
    );

    const plan: ActionPlanDto = {
      id: randomUUID(),
      studentProfileId: input.studentProfileId,
      targetCareerId: input.targetCareerId,
      comparisonId: input.comparisonId,
      targetTerm: input.targetTerm,
      tasks,
      notes: input.notes,
      context: input.context,
      status: "active",
      progressPercent: calculateProgress(tasks),
      createdAt: now,
      updatedAt: now
    };

    planStore.set(plan.id, plan);

    return plan;
  }

  public async listPlans(query: ActionPlanQueryDto): Promise<ActionPlanDto[]> {
    return [...planStore.values()]
      .filter((plan) => {
        if (query.studentProfileId && plan.studentProfileId !== query.studentProfileId) {
          return false;
        }

        if (query.targetCareerId && plan.targetCareerId !== query.targetCareerId) {
          return false;
        }

        if (query.status && plan.status !== query.status) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, query.limit);
  }

  public async getPlanById(planId: string): Promise<ActionPlanDto | null> {
    return planStore.get(planId) || null;
  }

  public async updatePlan(
    planId: string,
    input: ActionPlanPatchDto
  ): Promise<ActionPlanDto | null> {
    const existing = planStore.get(planId);

    if (!existing) {
      return null;
    }

    const tasks = input.tasks ? withTaskIds(input.tasks) : existing.tasks;

    const updated: ActionPlanDto = {
      ...existing,
      status: input.status || existing.status,
      tasks,
      notes: input.notes ?? existing.notes,
      targetTerm: input.targetTerm ?? existing.targetTerm,
      progressPercent: calculateProgress(tasks),
      updatedAt: new Date().toISOString()
    };

    planStore.set(planId, updated);

    return updated;
  }

  public async updateTaskStatus(
    planId: string,
    taskId: string,
    input: UpdatePlanTaskStatusDto
  ): Promise<ActionPlanDto | null> {
    const existing = planStore.get(planId);

    if (!existing) {
      return null;
    }

    const taskExists = existing.tasks.some((task) => task.id === taskId);

    if (!taskExists) {
      return null;
    }

    const tasks = existing.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: input.status
          }
        : task
    );

    const updated: ActionPlanDto = {
      ...existing,
      tasks,
      progressPercent: calculateProgress(tasks),
      status:
        tasks.length > 0 && tasks.every((task) => task.status === "done")
          ? "completed"
          : existing.status,
      updatedAt: new Date().toISOString()
    };

    planStore.set(planId, updated);

    return updated;
  }
}
