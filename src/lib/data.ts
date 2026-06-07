
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
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

export const ABOUT_DATA = {
  headline:
    "I'm a Software Engineer with a passion for building innovative and user-friendly applications.",
  description:
    "I have over 2 years of experience in the software industry and have worked on a variety of projects ranging from web applications to desktop applications. I specialize in clean architecture, scalable systems, and modern web technologies. Currently, I'm pursuing an Ausbildung als Fachinformatiker für Anwendungsentwicklung in Germany.",
  stats: [
    { value: "8+", label: "Projects Completed" },
    { value: "2+", label: "Years Experience" },
    { value: "13+", label: "Technologies" },
  ],
} as const;

export const SKILLS = [
  { name: "Architecture", icon: "building" },
  { name: "Problem Solving", icon: "brain" },
  { name: "UI/UX Design", icon: "layout" },
  { name: "Teamwork", icon: "play" },
  { name: "Adaptability", icon: "refresh" },
  { name: "Creative Coding", icon: "code" },
] as const;

export const TECH_SKILLS = [
  { name: "C#", iconName: "SiSharp" },
  { name: "ASP.NET", iconName: "SiDotnet" },
  { name: "Entity Framework", iconName: "SiSharp" },
  { name: "LINQ", iconName: "SiDotnet" },
  { name: "HTML5", iconName: "SiHtml5" },
  { name: "CSS3", iconName: "SiCss" },
  { name: "JavaScript", iconName: "SiJavascript" },
  { name: "TypeScript", iconName: "SiTypescript" },
  { name: "Next.js", iconName: "SiNextdotjs" },
  { name: "Python", iconName: "SiPython" },
  { name: "PostgreSQL", iconName: "SiPostgresql" },
  { name: "SQL Server", iconName: "SiMysql" },
  { name: "Docker", iconName: "SiDocker" },
  { name: "Prisma", iconName: "SiPrisma" },
  { name: "JWT", iconName: "SiJsonwebtokens" },
  { name: "Git", iconName: "SiGit" },
  { name: "GitHub", iconName: "SiGithub" },
] as const;

export const CONTACT_DATA = {
  headline: "Let's Work Together",
  description:
    "Have a project in mind? I'd love to hear about it. Let's create something extraordinary.",
  email: "belamraoui21@gmail.com",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bilalelamraoui/",
    },
    { name: "GitHub", url: "https://github.com/b2i0l0a3l" },
  ],
} as const;

export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "belamraoui21@gmail.com";
