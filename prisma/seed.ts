import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const initialProjects = [
  {
    title: "Pos System",
    description: "A web application for managing sales and inventory built using C# and ASP.NET Core following Clean Architecture principles.",
    techStack: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "JWT"],
    githubLink: "https://github.com/b2i0l0a3l/Store",
    liveLink: null,
    image: null,
    category: "Web Application",
    featured: true,
    order: 1,
  },
  {
    title: "Student Management System",
    description: "A web application for managing student information, grades, course registration, and admin controls.",
    techStack: ["C#", "ASP.NET Core", "Entity Framework", "PostgreSQL", "Tailwind CSS"],
    githubLink: "https://github.com/b2i0l0a3l/school",
    liveLink: null,
    image: null,
    category: "Web Application",
    featured: false,
    order: 2,
  },
  {
    title: "Task Management",
    description: "A web application for managing tasks and projects using HTML, CSS, and vanilla JS with IndexedDB for offline data storage.",
    techStack: ["HTML5", "CSS3", "JavaScript", "IndexedDB"],
    githubLink: "https://github.com/b2i0l0a3l/TaskManager",
    liveLink: "https://task-manager-five-flax-72.vercel.app/",
    image: null,
    category: "Web Application",
    featured: true,
    order: 3,
  },
  {
    title: "DVLD",
    description: "A desktop application for Driving & Vehicle License Department management system.",
    techStack: ["C#", "SQL Server", "ADO.NET", "Windows Forms"],
    githubLink: "https://github.com/b2i0l0a3l/DVLD/tree/master",
    liveLink: null,
    image: null,
    category: "Desktop Application",
    featured: false,
    order: 4,
  },
];

async function main() {
  console.log("Seeding started...");

  await prisma.project.deleteMany();

  for (const project of initialProjects) {
    const created = await prisma.project.create({ data: project });
    console.log(`Created project: ${created.title}`);
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
