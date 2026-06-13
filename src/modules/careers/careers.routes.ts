import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const careersRoutes = Router();

const careers = [
  {
    id: "software-engineering",
    name: "Ingeniería de Software",
    faculty: "Ingeniería",
    modality: "Presencial",
    employabilityTags: ["desarrollo web", "IA", "cloud", "apps"]
  },
  {
    id: "business-administration",
    name: "Administración de Empresas",
    faculty: "Negocios",
    modality: "Presencial",
    employabilityTags: ["gestión", "emprendimiento", "operaciones"]
  }
];

careersRoutes.get("/", (_req, res) => {
  return ok(res, careers);
});

careersRoutes.get("/:careerId", (req, res) => {
  const career = careers.find((item) => item.id === req.params.careerId);

  return ok(res, {
    career: career || null,
    status: career ? "found" : "mock_not_found"
  });
});

careersRoutes.get("/:careerId/curriculum", (req, res) => {
  return ok(res, {
    careerId: req.params.careerId,
    cycles: [
      {
        cycle: 1,
        courses: ["Matemática básica", "Comunicación", "Introducción a la carrera"]
      },
      {
        cycle: 2,
        courses: ["Fundamentos técnicos", "Herramientas digitales", "Proyecto integrador"]
      }
    ],
    status: "mock"
  });
});
