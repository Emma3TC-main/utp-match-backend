import { randomUUID } from "crypto";
import {
  AdminAuditQueryDto,
  AdminAuditRecordDto,
  AdminCareerCreateDto,
  AdminCatalogRecordDto,
  AdminSyllabusCreateDto
} from "./dto/admin.dto";

const catalogStore = new Map<string, AdminCatalogRecordDto>();
const auditStore: AdminAuditRecordDto[] = [];

function nowIso(): string {
  return new Date().toISOString();
}

function pushAudit(input: {
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}) {
  auditStore.unshift({
    id: randomUUID(),
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    actor: "admin-local-mock",
    metadata: input.metadata || {},
    createdAt: nowIso()
  });
}

export class AdminService {
  public async getStatus() {
    return {
      module: "admin",
      status: "ready",
      mode: "mock-local",
      capabilities: [
        "catalog_overview",
        "create_career",
        "create_syllabus",
        "audit_summary"
      ]
    };
  }

  public async getCatalogOverview() {
    const records = [...catalogStore.values()];

    const careers = records.filter((record) => record.entityType === "career");
    const syllabi = records.filter((record) => record.entityType === "syllabus");

    return {
      totals: {
        records: records.length,
        careers: careers.length,
        syllabi: syllabi.length,
        auditEvents: auditStore.length
      },
      byStatus: {
        draft: records.filter((record) => record.status === "draft").length,
        published: records.filter((record) => record.status === "published").length,
        archived: records.filter((record) => record.status === "archived").length
      },
      lastUpdatedAt:
        records
          .map((record) => record.updatedAt)
          .sort()
          .reverse()[0] || null
    };
  }

  public async createCareer(
    input: AdminCareerCreateDto
  ): Promise<AdminCatalogRecordDto> {
    const timestamp = nowIso();
    const careerId = input.id || randomUUID();

    const record: AdminCatalogRecordDto = {
      id: careerId,
      entityType: "career",
      status: input.status,
      payload: {
        ...input,
        id: careerId
      },
      createdAt: timestamp,
      updatedAt: timestamp
    };

    catalogStore.set(record.id, record);

    pushAudit({
      action: "career_created",
      entityType: "career",
      entityId: record.id,
      metadata: {
        name: input.name,
        status: input.status
      }
    });

    return record;
  }

  public async createSyllabus(
    input: AdminSyllabusCreateDto
  ): Promise<AdminCatalogRecordDto> {
    const timestamp = nowIso();
    const syllabusId = input.syllabusId || randomUUID();

    const record: AdminCatalogRecordDto = {
      id: syllabusId,
      entityType: "syllabus",
      status: input.status,
      payload: {
        ...input,
        syllabusId
      },
      createdAt: timestamp,
      updatedAt: timestamp
    };

    catalogStore.set(record.id, record);

    pushAudit({
      action: "syllabus_created",
      entityType: "syllabus",
      entityId: record.id,
      metadata: {
        careerId: input.careerId,
        courseId: input.courseId,
        courseName: input.courseName,
        status: input.status
      }
    });

    return record;
  }

  public async getAuditSummary(query: AdminAuditQueryDto) {
    const items = auditStore
      .filter((audit) => {
        if (query.entityType === "all") {
          return true;
        }

        return audit.entityType === query.entityType;
      })
      .slice(0, query.limit);

    return {
      items,
      total: items.length
    };
  }
}
