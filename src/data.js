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
            'Cut triage time 90% by building system to autonomously detect and diagnose issues across 57M+ daily logs.',
            'Condensed raw logs into ~2K actionable error groups via embedding-based clustering and service field matching.',
            'Designed LangGraph agent tracing live logs to root causes through Neo4j graph of 14 services and 5K+ nodes.',
            'Delivered customizable severity-based alerting on EWMA baselines notifying live-site engineers of critical error spikes.',
        ],
        tags: ['LangGraph', 'Embeddings', 'Neo4j', 'EWMA', 'Alerting'],
    },
    {
        company: 'RealWork',
        title: 'Software Engineer Intern',
        period: 'May 2025 – May 2026',
        bullets: [
            'Shortened widget load times 80% with new backend using precomputed aggregate tables fed by CDC pipeline.',
            'Boosted review request conversion 30% by adding context-aware AI call bots to existing SMS and email flow.',
            'Developed SEO dashboard with Flask and React aggregating 52M+ keyword data points for 10,000+ businesses.',
        ],
        tags: ['React', 'Flask', 'CDC', 'AI/ML', 'PostgreSQL'],
    },
    {
        company: 'Soche Software',
        title: 'Software Engineer Intern',
        period: 'Jan 2025 – May 2025',
        bullets: [
            'Accelerated API response times 70% by migrating unstructured app data to Flask backend with Supabase database.',
            'Implemented RAG pipeline over 150+ weekly events to deliver personalized event recommendations for each user.',
            'Shipped modern Swift UI from Figma designs, upgrading outdated app interface used by 3,000+ active mobile users.',
        ],
        tags: ['Swift', 'Flask', 'Supabase', 'RAG'],
    },
    {
        company: 'CodeAssist',
        title: 'Software Engineer',
        period: 'Aug 2024 – Dec 2024',
        bullets: [
            'Automated ~95% of manual grading work with OpenAI-assisted evaluation of student code quality and design.',
            'Deployed full-stack grading platform with React, Flask, and PostgreSQL supporting over 100 submissions per day.',
            'Containerized services with Docker and automated builds through CI/CD pipelines for repeatable deployments.',
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
            'Created full-stack car recommendation platform with React, TypeScript, Node.js, Express, and MongoDB.',
            'Architected RAG pipeline ranking top 5 cars for each user via Gemini embeddings and 4 weighted scoring factors.',
            'Integrated Vapi voice API connecting prospective buyers to dealerships live with car details, cutting call time 20%.',
        ],
        tech: ['RAG', 'Gemini', 'Vapi', 'React', 'MongoDB'],
        github: 'https://github.com/avishparekh06/my-toyota',
    },
    {
        title: 'Pintos',
        subtitle: 'Operating Systems Kernel',
        award: null,
        date: 'April 2026',
        bullets: [
            'Built virtual memory subsystem with on-demand paging, frame table, swap, clock eviction, and stack growth detection.',
            'Wrote persistent file system with extensible inodes, nested subdirectories, and buffer cache for faster disk I/O.',
            'Engineered kernel-level user program support with argument passing, syscall handling, and process synchronization.',
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
            'Emulated five-stage ARM pipeline in C, modeling fetch, decode, execute, memory, and writeback with stage registers.',
            'Resolved data and control hazards with forwarding and stall logic, keeping execution correct across pipeline stages.',
        ],
        tech: ['C', 'ARM Architecture', 'CPU Pipeline', 'Computer Architecture'],
        github: null,
    },
];
