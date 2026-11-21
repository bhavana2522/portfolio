export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'AI & EdTech' | 'Web Design';
  label: string;
  accentColor: string;
  summary: string;
  stack: string[];
  contributions: string[];
  architectureModules: {
    layer: string;
    detail: string;
  }[];
  previewTheme: 'commerce' | 'edtech' | 'portfolio';
}

export interface SkillGroup {
  id: string;
  category: string;
  filterKey: 'Languages' | 'Web & UI' | 'Databases' | 'AI & Data' | 'CS Core';
  accentColor: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  status: string;
  timeframe: string;
  focus: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  focus: string;
}

export const PROFILE = {
  name: 'Bhavana N Masare',
  shortName: 'Bhavana Masare',
  role: 'Information Technology Graduate · M.Tech Student',
  headline: 'Engineering Practical Web, AI & Database Systems.',
  location: 'Maharashtra, India',
  phone: '+91 9767537552',
  email: 'bhavanamasare73@gmail.com',
  availability: 'Open to Entry-Level Software & IT Opportunities',
  resumeUrl: '/assets/aistudio/BhavanaMasare_5_cc51a045.pdf',
  photoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-15_at_10.48.13_AM_178cc671.jpeg',
  summary:
    'Information Technology graduate currently pursuing an M.Tech in Computer Science, with foundational knowledge of programming, database management, software development, and problem-solving. Familiar with Python, C, C++, Java, SQL, and modern web technologies—combining collaborative engineering experience across e-commerce, AI-assisted education, and responsive web interfaces.',
  careerInterests: [
    'Software Development',
    'Python Development',
    'AI Applications',
    'Database Management',
  ],
  highlights: [
    {
      label: 'Current Degree',
      value: 'M.Tech CS',
      detail: 'Pursuing · Expected 2028',
    },
    {
      label: 'Undergraduate',
      value: 'B.Tech IT',
      detail: 'Sinhgad College of Engineering',
    },
    {
      label: 'Featured Work',
      value: '03 Builds',
      detail: 'Full-Stack, AI EdTech & Web',
    },
    {
      label: 'Core Focus',
      value: '06 Domains',
      detail: 'Python, React, SQL & AI',
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'solivaguard',
    index: '01',
    title: 'SolivaGuard',
    subtitle: 'E-Commerce Platform & Admin Dashboard',
    category: 'Full-Stack',
    label: 'Live Website',
    accentColor: '#3B82F6',
    summary:
      'A collaborative live e-commerce platform designed to unify customer storefront shopping flows with centralized administrative operations, inventory control, and payment processing.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay'],
    contributions: [
      'Collaborated on a live e-commerce platform combining customer shopping workflows with centralized administrative controls.',
      'Contributed to React.js frontend interfaces, Express.js backend API workflows, and MongoDB-backed product and order operations.',
      'Supported user authentication flows and Razorpay payment integration alongside team-wide feature delivery.',
    ],
    architectureModules: [
      { layer: 'Client Storefront', detail: 'React.js product catalog, cart state, and checkout experience' },
      { layer: 'API & Auth Layer', detail: 'Node.js & Express.js endpoints for sessions, orders, and access control' },
      { layer: 'Data & Payments', detail: 'MongoDB collections paired with Razorpay transaction verification' },
    ],
    previewTheme: 'commerce',
  },
  {
    id: 'edviko',
    index: '02',
    title: 'EDVIKO',
    subtitle: 'AI-Powered Educational Platform',
    category: 'AI & EdTech',
    label: 'Live Application',
    accentColor: '#10B981',
    summary:
      'An educational technology application centered on digital learning and AI-assisted study workflows, built collaboratively to support structured student engagement.',
    stack: ['AI-Assisted Learning', 'Educational Technology', 'Application Development', 'API Integration'],
    contributions: [
      'Collaborated on an educational technology application focused on digital learning and AI-assisted academic experiences.',
      'Contributed to application implementation, core feature development, and educational user workflows with the engineering team.',
      'Participated in shaping an interactive digital learning interface aimed at making study activities clearer and more accessible.',
    ],
    architectureModules: [
      { layer: 'Learning Interface', detail: 'Interactive educational views tailored for guided student workflows' },
      { layer: 'AI Assistance Flow', detail: 'API-integrated study support and structured learning prompts' },
      { layer: 'Team Implementation', detail: 'Modular feature integration across collaborative sprints' },
    ],
    previewTheme: 'edtech',
  },
  {
    id: 'personal-portfolio',
    index: '03',
    title: 'Personal Portfolio Website',
    subtitle: 'Structured Academic & Engineering Profile',
    category: 'Web Design',
    label: 'Portfolio',
    accentColor: '#F43F5E',
    summary:
      'A responsive personal web interface designed to present academic qualifications, technical competencies, and collaborative software projects in a single cohesive digital profile.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
    contributions: [
      'Built a clean, structured web interface highlighting academic milestones, core skills, and project case summaries.',
      'Organized professional details, technical competencies, and direct contact pathways for clear recruiter navigation.',
      'Applied responsive layout principles to maintain readability across desktop and mobile viewports.',
    ],
    architectureModules: [
      { layer: 'Semantic Markup', detail: 'Clean HTML5 document hierarchy for accessible content scanning' },
      { layer: 'Responsive Layout', detail: 'Adaptive CSS grids and mobile-first spacing discipline' },
      { layer: 'Interactive Navigation', detail: 'Lightweight JavaScript controls and section flow' },
    ],
    previewTheme: 'portfolio',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'programming-languages',
    category: 'Programming Languages',
    filterKey: 'Languages',
    accentColor: '#F2B705',
    description: 'Foundational languages applied across academic coursework, problem-solving, and backend scripting.',
    skills: ['Python', 'C', 'C++', 'Java'],
  },
  {
    id: 'web-technologies',
    category: 'Web Technologies',
    filterKey: 'Web & UI',
    accentColor: '#3B82F6',
    description: 'Modern frontend building blocks for responsive interfaces and component-driven web applications.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js'],
  },
  {
    id: 'database-technologies',
    category: 'Database Technologies',
    filterKey: 'Databases',
    accentColor: '#10B981',
    description: 'Relational and document-oriented data modeling, querying, and structured schema management.',
    skills: ['SQL', 'MySQL', 'MongoDB', 'DBMS'],
  },
  {
    id: 'ai-development',
    category: 'AI & Development',
    filterKey: 'AI & Data',
    accentColor: '#8B5CF6',
    description: 'Applying AI/ML fundamentals and external API integration to real-world software workflows.',
    skills: ['AI/ML Fundamentals', 'API Integration', 'Application Development'],
  },
  {
    id: 'data-visualization',
    category: 'Data & Visualization',
    filterKey: 'AI & Data',
    accentColor: '#06B6D4',
    description: 'Translating structured datasets into clear analytical dashboards and operational insights.',
    skills: ['Power BI', 'Tableau'],
  },
  {
    id: 'core-cs',
    category: 'Core Computer Science',
    filterKey: 'CS Core',
    accentColor: '#F43F5E',
    description: 'Algorithmic reasoning and object-oriented software architecture principles.',
    skills: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'Problem Solving'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'mtech',
    institution: 'Raisoni SkillTech University, Nagpur',
    degree: 'Master of Technology (M.Tech) in Computer Science',
    location: 'Nagpur, Maharashtra',
    status: 'Pursuing',
    timeframe: 'Expected Completion: 2028',
    focus: 'Advancing deeper foundations in computer science systems, AI applications, and software engineering.',
  },
  {
    id: 'btech',
    institution: 'Sinhgad College of Engineering, Vadgaon, Pune',
    degree: 'Bachelor of Technology (B.Tech) in Information Technology',
    location: 'Pune, Maharashtra',
    status: 'Graduated',
    timeframe: 'Undergraduate Degree',
    focus: 'Core curriculum in software development, database management systems, data structures, and web engineering.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'python-cert',
    title: 'Python Certificate',
    issuer: 'Great Learning',
    year: '2026',
    focus: 'Programming fundamentals, data structures, and Python application logic.',
  },
  {
    id: 'mysql-cert',
    title: 'MySQL for Data Analytics',
    issuer: 'Great Learning',
    year: '2026',
    focus: 'Relational querying, analytical aggregations, and database management.',
  },
];

export const LEADERSHIP_ACTIVITIES: string[] = [
  'Participated in college technical events, workshops, and academic activities to strengthen technical knowledge and collaborative learning.',
  'Collaborated with classmates on academic projects, demonstrating teamwork, clear communication, and structured problem-solving.',
  'Participated in badminton competitions at Shantiniketan English School and College.',
];
