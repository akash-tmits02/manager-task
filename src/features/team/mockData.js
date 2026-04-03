export const TEAM_ROLES = ["Admin", "Manager", "Member"];
export const AVAILABILITY_STATUS = ["Available", "Busy", "On Leave"];

export const teamMembers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Product Manager",
    roleType: "Manager",
    email: "sarah.j@enterprise.com",
    timezone: "EST (GMT-5)",
    status: "Available",
    workload: 65,
    tasksAssigned: 12,
    tasksDue: 4,
    overdue: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    reportsTo: null,
    bio: "Sarah is a seasoned Product Manager with over 8 years of experience in scaling B2B SaaS platforms. She specializes in user-centric design and cross-functional leadership.",
    skills: ["Product Strategy", "User Research", "Agile Roadmap", "Competitive Analysis"],
    projects: ["Task Management v3.0", "Enterprise Sync Engine", "Mobile App Launch"]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    roleType: "Member",
    email: "m.chen@enterprise.com",
    timezone: "PST (GMT-8)",
    status: "Busy",
    workload: 88,
    tasksAssigned: 18,
    tasksDue: 8,
    overdue: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    reportsTo: 1,
    bio: "Michael is the lead architect of the TaskFlow engine. A full-stack wizard who loves solving complex backend bottlenecks and optimizing distributed systems.",
    skills: ["Next.js", "Node.js", "PostgreSQL", "System Design", "Cloud Infrastructure"],
    projects: ["Auth Refactor", "Real-time Notifications", "Performance Audit"]
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Senior Designer",
    roleType: "Member",
    email: "emily.d@enterprise.com",
    timezone: "GMT (GMT+0)",
    status: "Available",
    workload: 42,
    tasksAssigned: 7,
    tasksDue: 2,
    overdue: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    reportsTo: 1,
    bio: "Emily leads the visual language of TaskFlow. She believes that good design is invisible and focuses on creating intuitive, accessible user experiences.",
    skills: ["UI Design", "Visual Language", "Figma", "Design Systems", "Motion Design"],
    projects: ["Brand Rebrand", "Design Tokens", "Accessibility Audit"]
  },
  {
    id: 4,
    name: "David Wilson",
    role: "QA Engineer",
    roleType: "Member",
    email: "david.w@enterprise.com",
    timezone: "EST (GMT-5)",
    status: "On Leave",
    workload: 0,
    tasksAssigned: 0,
    tasksDue: 0,
    overdue: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    reportsTo: 2,
    bio: "David is the gatekeeper of quality. He ensures every release is bug-free and meets the high standards of our enterprise clients.",
    skills: ["Unit Testing", "E2E Automation", "Cypress", "Selenium", "Jest"],
    projects: ["Automation Pipeline", "Security Testing", "Onboarding Flow"]
  },
  {
    id: 5,
    name: "Alex Rivera",
    role: "Frontend Dev",
    roleType: "Member",
    email: "alex.r@enterprise.com",
    timezone: "CET (GMT+1)",
    status: "Available",
    workload: 75,
    tasksAssigned: 10,
    tasksDue: 5,
    overdue: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    reportsTo: 2,
    bio: "Alex is a frontend enthusiast who loves building pixel-perfect interfaces and smooth micro-animations. A dedicated CSS art and React performer.",
    skills: ["React", "TypeScript", "Tailwind CSS", "MUI", "Framer Motion"],
    projects: ["Analytics Dashboard", "Member Directory", "Dark Mode"]
  }
];

export const getWorkloadColor = (workload) => {
  if (workload >= 80) return "#EF4444"; // Danger
  if (workload >= 50) return "#F59E0B"; // Warning
  return "#22C55E"; // Success
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Available": return "#22C55E";
    case "Busy": return "#F59E0B";
    case "On Leave": return "#94A3B8";
    default: return "#64748B";
  }
};
