/**
 * mockJobs.ts
 * Seed job data that powers the candidate recommendation flow.
 * No recruiter interaction needed — these are auto-loaded.
 */

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  experience: string; // e.g. "2-4 years"
  postedAt: string;   // relative string
  tags: string[];
};

export const MOCK_JOBS: Job[] = [
  {
    id: "job-001",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $160k",
    description:
      "Build beautiful, performant UIs using React and TypeScript. Own the frontend architecture, mentor junior engineers, and collaborate closely with product and design.",
    requiredSkills: ["React", "TypeScript", "CSS", "REST APIs", "Git"],
    niceToHaveSkills: ["GraphQL", "Next.js", "AWS", "Testing"],
    experience: "4-7 years",
    postedAt: "2 days ago",
    tags: ["Frontend", "React", "TypeScript"],
  },
  {
    id: "job-002",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Remote",
    salary: "$110k - $140k",
    description:
      "Join a fast-growing startup to build our core product. You'll work across the entire stack — React frontend, Node.js backend, and PostgreSQL database.",
    requiredSkills: ["React", "Node.js", "PostgreSQL", "REST APIs", "Docker"],
    niceToHaveSkills: ["TypeScript", "Redis", "AWS", "GraphQL"],
    experience: "3-5 years",
    postedAt: "3 days ago",
    tags: ["Full Stack", "Node.js", "Startup"],
  },
  {
    id: "job-003",
    title: "React Native Developer",
    company: "MobileFirst Inc",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $130k",
    description:
      "Build cross-platform mobile applications using React Native. Work with a talented team to deliver high-quality mobile experiences for iOS and Android.",
    requiredSkills: ["React Native", "JavaScript", "iOS", "Android", "Git"],
    niceToHaveSkills: ["TypeScript", "Redux", "Firebase", "Testing"],
    experience: "2-4 years",
    postedAt: "1 week ago",
    tags: ["Mobile", "React Native", "iOS", "Android"],
  },
  {
    id: "job-004",
    title: "Python Backend Engineer",
    company: "DataStream AI",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$120k - $155k",
    description:
      "Design and build scalable backend services using Python and FastAPI. Work on AI/ML pipelines and help drive the data infrastructure.",
    requiredSkills: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs"],
    niceToHaveSkills: ["AWS", "Kubernetes", "Redis", "Machine Learning"],
    experience: "3-6 years",
    postedAt: "5 days ago",
    tags: ["Backend", "Python", "AI/ML"],
  },
  {
    id: "job-005",
    title: "DevOps Engineer",
    company: "CloudNine Systems",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$125k - $160k",
    description:
      "Lead our cloud infrastructure and CI/CD pipelines. Work with AWS, Kubernetes, and Terraform to ensure reliability and scalability at scale.",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    niceToHaveSkills: ["Python", "Ansible", "Prometheus", "Grafana"],
    experience: "3-5 years",
    postedAt: "1 week ago",
    tags: ["DevOps", "AWS", "Kubernetes"],
  },
  {
    id: "job-006",
    title: "Machine Learning Engineer",
    company: "Nexus AI",
    location: "Remote",
    type: "Remote",
    salary: "$140k - $185k",
    description:
      "Design and implement machine learning models for our recommendation engine. Collaborate with data scientists to productionize ML pipelines.",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Data Science"],
    niceToHaveSkills: ["Kubernetes", "AWS", "Spark", "MLflow"],
    experience: "3-6 years",
    postedAt: "4 days ago",
    tags: ["ML", "AI", "Python", "Remote"],
  },
  {
    id: "job-007",
    title: "UI/UX Designer & Developer",
    company: "DesignCraft",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$90k - $120k",
    description:
      "Bridge the gap between design and engineering. Create stunning interfaces in Figma and bring them to life with React and modern CSS.",
    requiredSkills: ["Figma", "React", "CSS", "HTML", "User Research"],
    niceToHaveSkills: ["TypeScript", "Animation", "Accessibility", "Testing"],
    experience: "2-5 years",
    postedAt: "3 days ago",
    tags: ["Design", "Frontend", "UX"],
  },
  {
    id: "job-008",
    title: "Node.js Backend Developer",
    company: "ApiFirst Corp",
    location: "Remote",
    type: "Remote",
    salary: "$105k - $135k",
    description:
      "Build robust REST and GraphQL APIs using Node.js and Express. Own the backend of our SaaS platform and help scale it to millions of users.",
    requiredSkills: ["Node.js", "Express", "GraphQL", "MongoDB", "REST APIs"],
    niceToHaveSkills: ["TypeScript", "Redis", "Docker", "JWT"],
    experience: "2-5 years",
    postedAt: "6 days ago",
    tags: ["Backend", "Node.js", "GraphQL"],
  },
  {
    id: "job-009",
    title: "Data Engineer",
    company: "Insightful Analytics",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$115k - $145k",
    description:
      "Design and maintain data pipelines that power our analytics platform. Work with large-scale data processing technologies and ensure data quality.",
    requiredSkills: ["Python", "SQL", "Apache Spark", "Data Engineering", "ETL"],
    niceToHaveSkills: ["AWS", "Airflow", "dbt", "Kafka"],
    experience: "2-4 years",
    postedAt: "2 weeks ago",
    tags: ["Data", "Python", "Analytics"],
  },
  {
    id: "job-010",
    title: "Cloud Solutions Architect",
    company: "GlobalTech",
    location: "Remote",
    type: "Remote",
    salary: "$155k - $200k",
    description:
      "Lead cloud migration and architecture initiatives for enterprise clients. Design highly available, secure, and cost-optimized cloud solutions.",
    requiredSkills: ["AWS", "Azure", "Cloud Architecture", "Solution Design", "Terraform"],
    niceToHaveSkills: ["Kubernetes", "Security", "Networking", "Cost Optimization"],
    experience: "6-10 years",
    postedAt: "1 week ago",
    tags: ["Cloud", "Architecture", "AWS"],
  },
];
