// Site content. `public/resume.pdf` is the source of truth.
export const profile = {
    name: ['Avish', 'Parekh'],
    email: 'avishparekh@utexas.edu',
    phone: '(972) 207-1875',
    location: 'Austin, TX',
    github: 'https://github.com/avishparekh06',
    linkedin: 'https://linkedin.com/in/avishparekh',
    intro: 'I build scalable products and AI-driven systems, from RAG pipelines and marketplaces to a voice AI agent serving thousands of businesses.',
};

export const education = {
    school: 'The University of Texas at Austin',
    degree: 'Bachelor of Science, Computer Science',
    details: 'Minor in Statistics and Data Science',
    gpa: '3.89',
    graduation: 'May 2028',
    coursework: [
        'Data Structures and Algorithms', 'Operating Systems', 'Computer Architecture',
        'Machine Learning', 'Object-Oriented Programming', 'Cloud Native Computing',
        'Linear Algebra', 'Multivariable Calculus', 'Discrete Mathematics',
    ],
};

export const skills = [
    { name: 'Languages', tools: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'C', 'Go', 'Rust', 'Swift', 'R', 'HTML', 'CSS'] },
    { name: 'Frameworks & Tools', tools: ['React', 'Node.js', 'Express.js', 'Flask', 'FastAPI', 'Next.js', 'Docker', 'Git', 'AWS', 'GCP', 'TailwindCSS', 'Splunk'] },
    { name: 'Databases', tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'SQLite', 'pgvector', 'Neo4j'] },
    { name: 'AI / ML', tools: ['RAG Pipelines', 'LangGraph', 'PyTorch', 'TensorFlow', 'OpenCV', 'Pandas', 'NumPy', 'scikit-learn'] },
];

export const experiences = [
    {
        company: 'Visa',
        title: 'Software Engineer Intern',
        period: 'May 2026 – Aug 2026',
        bullets: [
            'Reduced triage time 70% by building system to autonomously detect and diagnose issues across 57M+ daily logs.',
            'Grouped error logs into actionable categories via RAG embeddings in pgvector, condensing raw volume by 85%.',
            'Developed LLM-driven pipeline to classify error severity, triggering automated email alerts on critical spikes.',
            'Designed root cause engine with LangGraph agents traversing Neo4j knowledge graph of codebases to suggest fixes.',
        ],
        tags: ['LangGraph', 'RAG', 'pgvector', 'Neo4j', 'LLM'],
    },
    {
        company: 'RealWork',
        title: 'Software Engineer Intern',
        period: 'May 2025 – May 2026',
        bullets: [
            'Condensed reporting workload by 40% for 10,000+ businesses by building SEO dashboard with Flask and React.',
            'Aggregated 52M+ keyword and visibility data points to deliver growth insights and improve platform performance.',
            'Increased review conversion by 30% through AI call bots designed with context injection and SMS follow-ups.',
            'Engineered AI system that produced job summaries for each service area using job metadata to boost SEO performance.',
        ],
        tags: ['React', 'Flask', 'AI/ML', 'SEO', 'PostgreSQL'],
    },
    {
        company: 'Soche Software',
        title: 'Software Engineer Intern',
        period: 'Jan 2025 – May 2025',
        bullets: [
            'Improved local discovery for 3,000+ users by developing mobile app features for events, happy hours, and live music.',
            'Implemented RAG pipeline to process scraped event data and deliver more accurate, context-aware recommendations.',
            'Enhanced usability and boosted engagement by redesigning UI with modern layouts and responsive components.',
        ],
        tags: ['Mobile Dev', 'RAG', 'UI/UX'],
    },
    {
        company: 'CodeAssist',
        title: 'Software Engineer',
        period: 'Aug 2024 – Dec 2024',
        bullets: [
            'Built OpenAI-assisted system to automate evaluation of code quality and design with ReactJS, Flask, and PostgreSQL.',
            'Decreased assessment time 50% by optimizing evaluation workflows for 100+ student code submissions each semester.',
            'Improved reliability and deployment speed by containerizing service with Docker and integrating CI/CD pipelines.',
        ],
        tags: ['ReactJS', 'Flask', 'PostgreSQL', 'Docker', 'CI/CD'],
    },
];

export const projects = [
    {
        title: 'MyToyota',
        subtitle: null,
        award: '1st Place · Best Toyota Hack, HackTX',
        date: 'October 2025',
        bullets: [
            'Car recommendation platform customizing vehicle matching based on financial and personal preferences.',
            'Engineered a RAG pipeline with embeddings for user profiles and car data.',
            'Integrated Gemini API and ElevenLabs for context-aware voice interactions, reducing dealership call time by 15%.',
        ],
        tech: ['RAG', 'Gemini API', 'ElevenLabs', 'Voice AI', 'Python'],
        github: 'https://github.com/avishparekh06/my-toyota',
    },
    {
        title: 'Pintos',
        subtitle: 'Operating Systems Kernel',
        award: null,
        date: 'April 2026',
        bullets: [
            'Engineered a complete user program pipeline with argument passing, syscall handling, and process synchronization.',
            'Built a virtual memory subsystem with on-demand paging, frame table, swap, clock eviction, and stack growth detection.',
            'Implemented a full file system with extensible inodes, nested subdirectories, and buffer cache.',
        ],
        tech: ['C', 'OS', 'Virtual Memory', 'File Systems', 'Systems Programming'],
        github: null,
    },
    {
        title: 'charmV5',
        subtitle: 'ARM Pipeline Emulator',
        award: null,
        date: 'November 2025',
        bullets: [
            'Developed a full 5-stage ARM pipeline emulator in C covering fetch, decode, execute, memory, and writeback stages.',
            'Designed hazard control, forwarding logic, and pipeline registers to handle data and control hazards across stages.',
        ],
        tech: ['C', 'ARM Architecture', 'CPU Pipeline', 'Computer Architecture'],
        github: null,
    },
];
