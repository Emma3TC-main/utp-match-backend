import { randomUUID } from "crypto";
import {
  StudentProfileCreateDto,
  StudentProfileDto,
  StudentProfilePatchDto,
  StudentProfileQueryDto
} from "./dto/profile.dto";

const profileStore = new Map<string, StudentProfileDto>();

function nowIso(): string {
  return new Date().toISOString();
}

function buildDemoProfile(): StudentProfileDto {
  const now = nowIso();

  return {
    id: "profile-demo-001",
    userId: "user-demo-001",
    firstName: "Estudiante Demo",
    schoolYear: "5_secundaria",
    campusInterest: "Lima",
    ageBand: "16_17",
    preferredLanguage: "es-PE",
    familyShareEnabled: false,
    interests: [
      "tecnología",
      "inteligencia artificial",
      "resolver problemas"
    ],
    strengths: [
      "pensamiento lógico",
      "curiosidad",
      "aprendizaje autónomo"
    ],
    concerns: [
      "miedo a la matemática",
      "no saber cómo serán los primeros ciclos"
    ],
    source: "mock_demo",
    metadata: {
      seeded: true
    },
    createdAt: now,
    updatedAt: now
  };
}

function ensureDemoProfile(): StudentProfileDto {
  const existing = profileStore.get("profile-demo-001");

  if (existing) {
    return existing;
  }

  const demo = buildDemoProfile();
  profileStore.set(demo.id, demo);

  return demo;
}

export class ProfilesService {
  public async createProfile(
    input: StudentProfileCreateDto
  ): Promise<StudentProfileDto> {
    const now = nowIso();
    const profileId = randomUUID();

    const profile: StudentProfileDto = {
      id: profileId,
      userId: input.userId || `user-${profileId}`,
      firstName: input.firstName,
      schoolYear: input.schoolYear,
      campusInterest: input.campusInterest,
      ageBand: input.ageBand,
      preferredLanguage: input.preferredLanguage,
      familyShareEnabled: input.familyShareEnabled,
      interests: input.interests,
      strengths: input.strengths,
      concerns: input.concerns,
      source: input.source,
      metadata: input.metadata,
      createdAt: now,
      updatedAt: now
    };

    profileStore.set(profile.id, profile);

    return profile;
  }

  public async listProfiles(
    query: StudentProfileQueryDto
  ): Promise<StudentProfileDto[]> {
    ensureDemoProfile();

    return [...profileStore.values()]
      .filter((profile) => {
        if (query.userId && profile.userId !== query.userId) {
          return false;
        }

        if (query.schoolYear && profile.schoolYear !== query.schoolYear) {
          return false;
        }

        if (query.ageBand && profile.ageBand !== query.ageBand) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, query.limit);
  }

  public async getProfileById(
    profileId: string
  ): Promise<StudentProfileDto | null> {
    ensureDemoProfile();

    return profileStore.get(profileId) || null;
  }

  public async getCurrentProfile(
    profileId?: string | null
  ): Promise<StudentProfileDto> {
    ensureDemoProfile();

    if (profileId) {
      const profile = profileStore.get(profileId);

      if (profile) {
        return profile;
      }
    }

    return ensureDemoProfile();
  }

  public async updateProfile(
    profileId: string,
    input: StudentProfilePatchDto
  ): Promise<StudentProfileDto | null> {
    const existing = await this.getProfileById(profileId);

    if (!existing) {
      return null;
    }

    const updated: StudentProfileDto = {
      ...existing,
      firstName: input.firstName ?? existing.firstName,
      schoolYear: input.schoolYear ?? existing.schoolYear,
      campusInterest: input.campusInterest ?? existing.campusInterest,
      ageBand: input.ageBand ?? existing.ageBand,
      preferredLanguage: input.preferredLanguage ?? existing.preferredLanguage,
      familyShareEnabled:
        input.familyShareEnabled ?? existing.familyShareEnabled,
      interests: input.interests ?? existing.interests,
      strengths: input.strengths ?? existing.strengths,
      concerns: input.concerns ?? existing.concerns,
      metadata: {
        ...existing.metadata,
        ...(input.metadata || {})
      },
      updatedAt: nowIso()
    };

    profileStore.set(profileId, updated);

    return updated;
  }
}
