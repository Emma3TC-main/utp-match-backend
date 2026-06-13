import {
  CareerCurriculumResponseDto,
  CareerDetailDto,
  CareerDto,
  CareerQueryDto,
  CurriculumCourseDto
} from "./dto/career.dto";

const careers: CareerDetailDto[] = [
  {
    id: "software-engineering",
    utpCode: "UTP-SOFT",
    name: "Ingeniería de Software",
    faculty: "Ingeniería",
    studyMode: "Presencial / Semipresencial",
    shortDescription:
      "Carrera enfocada en crear soluciones digitales, aplicaciones, sistemas web, arquitectura de software y productos tecnológicos.",
    tags: ["tecnologia", "programacion", "software", "apps", "ia"],
    status: "published",
    valueProposition:
      "Ideal para estudiantes que disfrutan resolver problemas con tecnología, crear productos digitales y trabajar por proyectos.",
    firstCycleSummary:
      "En los primeros ciclos el estudiante se acerca a lógica, programación, matemática base, comunicación y fundamentos de ingeniería.",
    dominantSkills: [
      "Pensamiento lógico",
      "Programación",
      "Resolución de problemas",
      "Trabajo por proyectos",
      "Diseño de soluciones digitales"
    ],
    possibleRoles: [
      "Desarrollador de software",
      "Backend developer",
      "Frontend developer",
      "QA analyst",
      "Product engineer"
    ],
    studentFitSignals: [
      "Le gusta crear aplicaciones o páginas web.",
      "Tiene curiosidad por la inteligencia artificial.",
      "Tolera probar, equivocarse y depurar errores.",
      "Prefiere proyectos concretos antes que teoría pura."
    ]
  },
  {
    id: "industrial-engineering",
    utpCode: "UTP-IND",
    name: "Ingeniería Industrial",
    faculty: "Ingeniería",
    studyMode: "Presencial / Semipresencial",
    shortDescription:
      "Carrera orientada a mejorar procesos, optimizar operaciones, analizar datos de negocio y gestionar recursos.",
    tags: ["procesos", "gestion", "operaciones", "datos", "productividad"],
    status: "published",
    valueProposition:
      "Ideal para estudiantes que quieren entender cómo funcionan las empresas y mejorar procesos con datos y gestión.",
    firstCycleSummary:
      "En los primeros ciclos el estudiante combina matemática, comunicación, fundamentos de ingeniería y visión de procesos.",
    dominantSkills: [
      "Análisis de procesos",
      "Gestión",
      "Optimización",
      "Comunicación",
      "Pensamiento sistémico"
    ],
    possibleRoles: [
      "Analista de procesos",
      "Coordinador de operaciones",
      "Analista de mejora continua",
      "Planner",
      "Consultor junior"
    ],
    studentFitSignals: [
      "Le interesa cómo funcionan las empresas.",
      "Disfruta organizar, medir y mejorar actividades.",
      "Tiene facilidad para comunicar ideas.",
      "Le atrae combinar números con gestión."
    ]
  },
  {
    id: "data-science",
    utpCode: "UTP-DATA",
    name: "Ciencia de Datos",
    faculty: "Ingeniería",
    studyMode: "Presencial / Semipresencial",
    shortDescription:
      "Carrera enfocada en analizar datos, construir modelos, interpretar información y apoyar decisiones con tecnología.",
    tags: ["datos", "analitica", "ia", "estadistica", "programacion"],
    status: "published",
    valueProposition:
      "Ideal para estudiantes curiosos que disfrutan encontrar patrones, analizar información y usar tecnología para tomar decisiones.",
    firstCycleSummary:
      "En los primeros ciclos el estudiante fortalece matemática, lógica, programación inicial y fundamentos de análisis.",
    dominantSkills: [
      "Análisis de datos",
      "Estadística",
      "Programación",
      "Pensamiento crítico",
      "Visualización"
    ],
    possibleRoles: [
      "Data analyst",
      "BI analyst",
      "Junior data scientist",
      "Analista de reporting",
      "Analista de datos de negocio"
    ],
    studentFitSignals: [
      "Le gusta encontrar patrones.",
      "Tiene curiosidad por gráficos, datos o predicciones.",
      "No le molesta trabajar con números.",
      "Quiere entender cómo la IA usa información."
    ]
  }
];

const coursesByCareer: Record<string, CurriculumCourseDto[]> = {
  "software-engineering": [
    {
      courseId: "soft-math-1",
      syllabusId: "syl-soft-math-1",
      name: "Matemática para Ingeniería I",
      credits: 4,
      area: "Matemática",
      cycleNumber: 1,
      summary:
        "Curso base para fortalecer razonamiento matemático aplicado a problemas de ingeniería.",
      intensity: {
        math: 8,
        coding: 2,
        reading: 4,
        practice: 7
      }
    },
    {
      courseId: "soft-prog-1",
      syllabusId: "syl-soft-prog-1",
      name: "Fundamentos de Programación",
      credits: 4,
      area: "Programación",
      cycleNumber: 1,
      summary:
        "Introduce lógica, algoritmos y construcción de programas simples.",
      intensity: {
        math: 5,
        coding: 9,
        reading: 4,
        practice: 9
      }
    },
    {
      courseId: "soft-comm-1",
      syllabusId: "syl-soft-comm-1",
      name: "Comunicación",
      credits: 3,
      area: "Formación general",
      cycleNumber: 1,
      summary:
        "Fortalece lectura, escritura y comunicación de ideas técnicas.",
      intensity: {
        math: 1,
        coding: 1,
        reading: 8,
        practice: 5
      }
    },
    {
      courseId: "soft-web-1",
      syllabusId: "syl-soft-web-1",
      name: "Introducción a Desarrollo Web",
      credits: 3,
      area: "Software",
      cycleNumber: 2,
      summary:
        "Presenta conceptos iniciales de interfaces, páginas web y estructura de aplicaciones.",
      intensity: {
        math: 3,
        coding: 8,
        reading: 5,
        practice: 8
      }
    }
  ],
  "industrial-engineering": [
    {
      courseId: "ind-math-1",
      syllabusId: "syl-ind-math-1",
      name: "Matemática para Ingeniería I",
      credits: 4,
      area: "Matemática",
      cycleNumber: 1,
      summary:
        "Curso base para modelar y resolver problemas cuantitativos.",
      intensity: {
        math: 8,
        coding: 1,
        reading: 4,
        practice: 7
      }
    },
    {
      courseId: "ind-intro",
      syllabusId: "syl-ind-intro",
      name: "Introducción a la Ingeniería Industrial",
      credits: 3,
      area: "Gestión y procesos",
      cycleNumber: 1,
      summary:
        "Presenta la carrera, sus campos de acción y la mejora de procesos.",
      intensity: {
        math: 4,
        coding: 1,
        reading: 6,
        practice: 7
      }
    },
    {
      courseId: "ind-comm-1",
      syllabusId: "syl-ind-comm-1",
      name: "Comunicación",
      credits: 3,
      area: "Formación general",
      cycleNumber: 1,
      summary:
        "Fortalece comunicación escrita y oral para contextos académicos y profesionales.",
      intensity: {
        math: 1,
        coding: 1,
        reading: 8,
        practice: 5
      }
    },
    {
      courseId: "ind-process-1",
      syllabusId: "syl-ind-process-1",
      name: "Procesos Organizacionales",
      credits: 3,
      area: "Procesos",
      cycleNumber: 2,
      summary:
        "Ayuda a entender cómo se organizan, miden y mejoran procesos dentro de una empresa.",
      intensity: {
        math: 5,
        coding: 1,
        reading: 7,
        practice: 8
      }
    }
  ],
  "data-science": [
    {
      courseId: "data-math-1",
      syllabusId: "syl-data-math-1",
      name: "Matemática para Ciencia de Datos",
      credits: 4,
      area: "Matemática",
      cycleNumber: 1,
      summary:
        "Refuerza bases matemáticas para análisis, modelos y toma de decisiones.",
      intensity: {
        math: 9,
        coding: 3,
        reading: 5,
        practice: 7
      }
    },
    {
      courseId: "data-prog-1",
      syllabusId: "syl-data-prog-1",
      name: "Programación para Datos",
      credits: 4,
      area: "Programación",
      cycleNumber: 1,
      summary:
        "Introduce programación aplicada a manipulación y análisis básico de información.",
      intensity: {
        math: 6,
        coding: 8,
        reading: 4,
        practice: 8
      }
    },
    {
      courseId: "data-stats-1",
      syllabusId: "syl-data-stats-1",
      name: "Fundamentos de Estadística",
      credits: 4,
      area: "Estadística",
      cycleNumber: 2,
      summary:
        "Presenta conceptos para interpretar datos, variabilidad y patrones.",
      intensity: {
        math: 8,
        coding: 4,
        reading: 6,
        practice: 7
      }
    }
  ]
};

export class CareersService {
  public async listCareers(query: CareerQueryDto): Promise<CareerDto[]> {
    const normalizedQ = query.q?.toLowerCase();
    const normalizedFaculty = query.faculty?.toLowerCase();
    const normalizedStudyMode = query.studyMode?.toLowerCase();
    const normalizedTag = query.tag?.toLowerCase();

    return careers
      .filter((career) => career.status === "published")
      .filter((career) => {
        if (!normalizedQ) return true;

        const searchableText = [
          career.name,
          career.shortDescription,
          career.valueProposition,
          ...career.tags
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQ);
      })
      .filter((career) => {
        if (!normalizedFaculty) return true;
        return career.faculty?.toLowerCase().includes(normalizedFaculty);
      })
      .filter((career) => {
        if (!normalizedStudyMode) return true;
        return career.studyMode?.toLowerCase().includes(normalizedStudyMode);
      })
      .filter((career) => {
        if (!normalizedTag) return true;
        return career.tags.some((tag) => tag.toLowerCase() === normalizedTag);
      })
      .slice(0, query.limit)
      .map(({ valueProposition, firstCycleSummary, dominantSkills, possibleRoles, studentFitSignals, ...career }) => career);
  }

  public async getCareerById(careerId: string): Promise<CareerDetailDto | null> {
    return careers.find((career) => career.id === careerId) || null;
  }

  public async getCareerCurriculum(
    careerId: string
  ): Promise<CareerCurriculumResponseDto | null> {
    const career = await this.getCareerById(careerId);

    if (!career) {
      return null;
    }

    const courses = coursesByCareer[careerId] || [];
    const cycleNumbers = [...new Set(courses.map((course) => course.cycleNumber))];

    return {
      careerId: career.id,
      careerName: career.name,
      faculty: career.faculty,
      studyMode: career.studyMode,
      cycles: cycleNumbers
        .sort((a, b) => a - b)
        .map((cycleNumber) => ({
          cycleNumber,
          courses: courses.filter((course) => course.cycleNumber === cycleNumber)
        }))
    };
  }
}
