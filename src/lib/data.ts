
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  link: string;
  demo?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_DATA = {
  greeting: "Hello, I'm",
  name: "Bilal Elamraoui",
  title: "CREATING\nSOFTWARE\nSOLUTIONS.",
  subtitle:
    "Software Engineer crafting immersive experiences at the intersection of technology and culture.",
  cta: "View My Work",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Pos System",
    category: "Web Application",
    year: "2026",
    description:
      "A web application for managing sales and inventory.",
    image: "/projects/project-1.webp",
    link: "https://github.com/b2i0l0a3l/Store",
  },
  {
    id: "02",
    title: "Student Management System",
    category: "Web Application",
    year: "2026",
    description:
      "A web application for managing student information and grades.",
    image: "/projects/project-s.webp",
    link: "https://github.com/b2i0l0a3l/school",
  },
  {
    id: "03",
    title: "Task Management",
    category: "Web Application",
    year: "2026",
    description:
      "A web application for managing tasks and projects using html css js(indexeddb).",
    image: "/projects/project-t.webp",
    link: "https://github.com/b2i0l0a3l/TaskManager",
    demo: "https://task-manager-five-flax-72.vercel.app/",
  },
  {
    id: "04",
    title: "Dvld",
    category: "Desktop Application",
    year: "2025",
    description:
      "A desktop application for managing files and folders.",
    image: "/projects/project-d.webp",
    link: "https://github.com/b2i0l0a3l/DVLD/tree/master",
  },
];


export const SKILLS: Skill[] = [
  { name: "Architecture", icon: "building" },
  { name: "problem solving", icon: "brain" },
  { name: "UI/UX Design", icon: "layout" },
  { name: "teamwork", icon: "play" },
  { name: "adaptability", icon: "refresh" },
  { name: "creative coding", icon: "code" },
];

export const TECH_SKILLS = [
  { name: "C#", iconName: "SiSharp" },
  { name: "ASP.NET", iconName: "SiDotnet" },
  { name: "Entity Framework", iconName: "SiSharp" }, 
  { name: "LINQ", iconName: "SiDotnet" }, 
  { name: "HTML5", iconName: "SiHtml5" },
  { name: "CSS3", iconName: "SiCss" },
  { name: "JavaScript", iconName: "SiJavascript" },
  { name: "Next.js", iconName: "SiNextdotjs" },
  { name: "PostgreSQL", iconName: "SiPostgresql" },
  { name: "SQL Server", iconName: "SiMysql" },
  { name: "JWT", iconName: "SiJsonwebtokens" },
  { name: "Git", iconName: "SiGit" },
  { name: "GitHub", iconName: "SiGithub" },
];

export const ABOUT_DATA = {
  headline: "I'm a software engineer with a passion for building innovative and user-friendly applications.",
  description:
    "I am a software engineer with a passion for building innovative and user-friendly applications. I have over 2 years of experience in the software industry and have worked on a variety of projects ranging from web applications to desktop applications. I am a quick learner and am always looking for new challenges to take on.",
  stats: [
    { value: "5+", label: "Projects Completed" },
    { value: "2+", label: "Years of Experience" },
  ],
} as const;

export const CONTACT_DATA = {
  headline: "Let's Work Together",
  description:
    "Have a project in mind? I'd love to hear about it. Let's create something extraordinary.",
  email: "belamraoui21@gmail.com",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/bilalelamraoui/" },
    { name: "GitHub", url: "https://github.com/b2i0l0a3l" },
  ],
} as const;
