export interface Experience {
  n: string;
  year: string;
  chapter: string;
  role: string;
  org: string;
  period: string;
  location: string;
  body: string;
  image: string;
  gallery: string[];
  bullets: string[];
  tags: string[];
}

export interface Certificate {
  title: string;
  org: string;
  year: string;
  desc: string;
  details: string;
  skills: string[];
  image: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  gpa: string;
  details: string;
}

export interface Reference {
  name: string;
  role: string;
  org: string;
  phone: string;
  email: string;
  quote: string;
}

export const experiences: Experience[] = [
  {
    n: "03",
    year: "2024",
    chapter: "Chapter 03",
    role: "Community Training Manager",
    org: "Voice of Africa",
    period: "Oct 2024 — Dec 2024",
    location: "Addis Ababa",
    body: "Led community training programs focused on empowering young African women, utilizing capacity building and peer education techniques to promote social inclusion and leadership development.",
    image: "/gallery/IMG_20260922_185844_168.jpg",
    gallery: [
      "/gallery/IMG_20260922_185846_438.jpg",
      "/gallery/IMG_20260922_185849_390.jpg",
      "/gallery/123IMG-20260802-WA0004.jpg",
      "/gallery/665IMG_20260922_190007_888.jpg"
    ],
    bullets: [
      "Led community training programs focused on empowering young African women, utilizing capacity building and peer education techniques to promote social inclusion and leadership development.",
      "Designed and implemented training modules to enhance community engagement, advocacy skills, and entrepreneurship among marginalized youth, aligning with community development goals.",
      "Facilitated interactive workshops and peer-led sessions to amplify youth voices, fostering collective action and local community resilience.",
      "Collaborated with local stakeholders to develop training curricula that address gender equality, SRHR, and economic empowerment, ensuring culturally sensitive delivery.",
      "Monitored and evaluated training outcomes to measure impact on community participation and youth empowerment, adjusting strategies for maximum engagement.",
      "Built partnerships with NGOs, government agencies, and community leaders to scale training initiatives and promote sustainable development."
    ],
    tags: [
      "Community Training",
      "Capacity Building",
      "Youth Empowerment"
    ]
  },
  {
    n: "02",
    year: "2021",
    chapter: "Chapter 02",
    role: "Program Lead & Coordinator, SRHR & Youth Engagement",
    org: "Forum for African Women Educationalists (FAWE) Ethiopia",
    period: "Aug 2021 — Mar 2024",
    location: "Addis Ababa",
    body: "Established governance frameworks and strategic plans for SRHR and adolescent youth programs, emphasizing community-based approaches to health education.",
    image: "/gallery/IMG_20260922_185937_614.jpg",
    gallery: [
      "/gallery/IMG_20260922_185940_986.jpg",
      "/gallery/IMG_20260922_185951_029.jpg",
      "/gallery/IMG_20260922_185957_259.jpg",
      "/gallery/56IMG_20260922_190007_832.jpg"
    ],
    bullets: [
      "Established governance frameworks and strategic plans for SRHR and adolescent youth programs, emphasizing community-based approaches to health education.",
      "Led capacity-building workshops for civil society organizations and stakeholders to enhance service delivery and advocacy for accessible, affordable, and quality SRHR services.",
      "Directed training sessions on community mobilization, policy advocacy, and stakeholder engagement to promote inclusive health services for marginalized youth.",
      "Facilitated bilateral meetings with government agencies and NGOs to align community training efforts with national health and education policies.",
      "Developed training materials and advocacy campaigns to increase community awareness on gender rights and youth health issues.",
      "Evaluated program impact through feedback collection and performance metrics, ensuring continuous improvement of community engagement strategies."
    ],
    tags: [
      "SRHR",
      "Youth Engagement",
      "Advocacy",
      "Governance"
    ]
  },
  {
    n: "01",
    year: "2017",
    chapter: "Chapter 01",
    role: "Adolescent Girls Programming Officer",
    org: "International Rescue Committee (IRC)",
    period: "Nov 2017 — Aug 2021",
    location: "Assosa, Sherkole Camp",
    body: "Designed and delivered life skills training for adolescent girls, emphasizing empowerment, self-efficacy, and community participation to foster social cohesion.",
    image: "/gallery/IMG_20260922_185916_101.jpg",
    gallery: [
      "/gallery/IMG_20260922_190021_107.jpg",
      "/gallery/IMG_20260922_190021_344.jpg",
      "/gallery/222IMG_20260922_185916_033.jpg",
      "/gallery/444IMG_20260922_190002_684.jpg"
    ],
    bullets: [
      "Designed and delivered life skills training for adolescent girls, emphasizing empowerment, self-efficacy, and community participation to foster social cohesion.",
      "Supervised mentors to ensure quality delivery of peer education programs, promoting behavior change and gender equality within refugee and host communities.",
      "Distributed sanitary kits and dignity supplies to support adolescent health and gender-sensitive programming, reducing gender-based violence risks.",
      "Conducted training on case management and referral pathways to strengthen community-based support systems for vulnerable youth.",
      "Collaborated with community leaders and stakeholders to identify adolescent girls for targeted training on SRHR and life skills.",
      "Assessed community needs and contributed to program design to ensure relevance and sustainability of youth-focused interventions."
    ],
    tags: [
      "Refugee Protection",
      "Gender Equality",
      "Life Skills",
      "Case Management"
    ]
  }
];

export const certificates: Certificate[] = [
  {
    title: "Project Management Essentials",
    org: "PM4NGOs / PMI",
    year: "2023",
    desc: "Comprehensive project cycle management, strategic planning, resource optimization, and multi-agency execution.",
    details: "Demonstrates mastery of core project cycle management methodologies tailored to humanitarian and development interventions. Focuses on project initiation, scope verification, schedule estimation, budget management, risk governance, and multi-agency stakeholder synchronization to ensure accountable, high-impact community program delivery.",
    skills: [
      "Project Cycle Management",
      "Risk Governance",
      "Resource Allocation",
      "Stakeholder Coordination"
    ],
    image: "/certificate_Project_Management_Essentials.jpg"
  },
  {
    title: "UNHCR PSEA Certification",
    org: "UNHCR",
    year: "2022",
    desc: "Protection from Sexual Exploitation and Abuse standards and compliance, securing humanitarian protection protocols.",
    details: "Focused on Protection from Sexual Exploitation and Abuse (PSEA), this certification provides comprehensive training on establishing and enforcing safeguarding protocols within humanitarian and refugee contexts. Covers secure reporting mechanisms, survivor-centered response strategies, and zero-tolerance compliance standards across all community touchpoints.",
    skills: [
      "Safeguarding Protocols",
      "Survivor-Centered Response",
      "Compliance Standards",
      "Humanitarian Ethics"
    ],
    image: "/UNHCR_PSEA_Certificate_of_Completion.jpg"
  },
  {
    title: "Child Protection in Emergencies",
    org: "UNICEF",
    year: "2023",
    desc: "Specialized child protection principles, case management, psycho-social care, and child-safe programming.",
    details: "In-depth certification covering the minimum standards for child protection in humanitarian action (CPMS). Emphasizes rapid assessment of vulnerable minors, establishment of child-friendly spaces, tracing and reunification protocols, psycho-social first aid, and inter-agency case referral networks.",
    skills: [
      "Child Protection Standards",
      "Case Referral Systems",
      "Psychosocial Support",
      "Vulnerability Assessment"
    ],
    image: "/unicef_child_protection_EN_Certificate_of_Completion.jpg"
  },
  {
    title: "GBV Information Management System",
    org: "GBVIMS / Inter-Agency",
    year: "2022",
    desc: "Safe, ethical collection, storage, and analysis of gender-based violence data using global standard classification.",
    details: "Advanced technical certification in utilizing the Gender-Based Violence Information Management System (GBVIMS). Ensures strict adherence to confidentiality, data protection protocols, informed consent standards, and data analysis to inform humanitarian advocacy and resource allocation while safeguarding survivor identities.",
    skills: [
      "GBVIMS Database",
      "Ethical Data Management",
      "Confidentiality Protocols",
      "Trend Analysis & Reporting"
    ],
    image: "/GenderBased_Violence_Information_Management_System_Completion_Certificate.jpg"
  },
  {
    title: "GBV & PSEA Operational Standards",
    org: "IASC / Global Cluster",
    year: "2022",
    desc: "Operational integration of gender-based violence prevention and PSEA across emergency relief frameworks.",
    details: "Equips practitioners with the operational framework to weave GBV risk mitigation and PSEA accountability throughout program lifecycles. Emphasizes community-based complaint mechanisms (CBCMs), safe access to essential services, and survivor-centered justice pathways.",
    skills: [
      "Community Complaint Mechanisms",
      "PSEA Accountability",
      "Survivor Support",
      "Inter-Agency Guidelines"
    ],
    image: "/GBV__PSEA.jpg"
  },
  {
    title: "GBV Legal Framework & Ethiopian Law",
    org: "Ethiopian Human Rights Commission",
    year: "2021",
    desc: "In-depth review of national legal frameworks, constitutional rights, and statutory protections addressing GBV in Ethiopia.",
    details: "Comprehensive legal training examining Ethiopian criminal law, family law, and international human rights treaties pertaining to gender-based violence. Focuses on legal aid coordination, courtroom accompaniment, evidentiary integrity, and advocating for survivor rights within formal and customary judicial systems.",
    skills: [
      "Ethiopian Legal Codes",
      "Survivor Rights Advocacy",
      "Courtroom Accompaniment",
      "Legal Referral Coordination"
    ],
    image: "/GBV__Ethiopian_law.jpg"
  },
  {
    title: "Protection Mainstreaming",
    org: "Global Protection Cluster",
    year: "2021",
    desc: "Integration of core protection principles into all humanitarian sectors: Do No Harm, non-discrimination, and meaningful access.",
    details: "Focuses on the four key pillars of protection mainstreaming: prioritizing safety and dignity, meaningful access without discrimination, accountability to affected populations (AAP), and participatory empowerment. Applies rigorous Do No Harm assessments across relief and rehabilitation activities.",
    skills: [
      "Do No Harm Principles",
      "Accountability to Affected Populations",
      "Equal Access Assessment",
      "Safety & Dignity Audits"
    ],
    image: "/protection_meanstrming_certificate.jpg"
  },
  {
    title: "Safeguarding Essentials",
    org: "Humanitarian Leadership Academy",
    year: "2022",
    desc: "Essential safeguarding principles, risk identification, safe recruitment, and proactive harm prevention.",
    details: "Provides essential competencies for creating and sustaining safe institutional cultures. Covers identifying and reporting safeguarding concerns, conducting safeguarding risk assessments for community activities, enforcing codes of conduct, and upholding institutional zero-tolerance policies.",
    skills: [
      "Safe Organizational Culture",
      "Incident Reporting",
      "Risk Assessment",
      "Child & Adult Safeguarding"
    ],
    image: "/Safeguarding_Essentials_Completion_certificate.jpg"
  },
  {
    title: "Intersectional SRHR Advocacy",
    org: "IPPF / UNFPA",
    year: "2020",
    desc: "Sexual and reproductive health rights advocacy through an intersectional, human-rights-based lens.",
    details: "Advanced training on championing universal access to comprehensive sexual and reproductive healthcare. Emphasizes the intersection of gender, disability, age, and displacement status in health outcomes, alongside coalition building, youth engagement, and evidence-based policy dialogue.",
    skills: [
      "Intersectional Health Equity",
      "Policy Dialogue",
      "Coalition Building",
      "Youth Empowerment"
    ],
    image: "/intersectional_SRHR.jpg"
  },
  {
    title: "Proposal & Report Writing",
    org: "DisasterReady / Kaya",
    year: "2021",
    desc: "High-impact donor proposal development, results-oriented reporting, logframe structuring, and grant compliance.",
    details: "Strategic training on formulating competitive grant proposals and clear donor reports for international funding partners (USAID, EU, UN, Global Fund). Highlights theory of change construction, SMART indicators, budget narratives, and impact storytelling.",
    skills: [
      "Donor Proposal Development",
      "Theory of Change",
      "Grant Compliance",
      "Results-Based Reporting"
    ],
    image: "/Intro_to_Proposal_and_Report_Writing_Certificate_of_Completion.jpg"
  },
  {
    title: "Anti-Sexual Harassment - Global",
    org: "International Training Centre",
    year: "2022",
    desc: "Global workplace compliance, respectful workplace culture, investigation procedures, and harassment prevention.",
    details: "International compliance credential addressing sexual harassment prevention in international non-governmental settings. Covers subtle and overt harassment indicators, bystander intervention techniques, disciplinary protocols, and fostering inclusive, respectful work environments.",
    skills: [
      "Workplace Compliance",
      "Bystander Intervention",
      "Investigative Standards",
      "Zero-Tolerance Culture"
    ],
    image: "/Anti-Sexual_Harassment_Training_-_Global_Completion_certificate.jpg"
  },
  {
    title: "Certificate in English Language",
    org: "American English School",
    year: "2016",
    desc: "Advanced professional proficiency in oral, written, and cross-cultural diplomatic communications.",
    details: "A comprehensive language program that certified advanced proficiency in both written and spoken English. The coursework focused on professional communication, technical writing, and effective presentation skills for high-level reporting and international grant management.",
    skills: [
      "Professional Communication",
      "Technical Writing",
      "Presentation Skills",
      "Cross-Cultural Dialogue"
    ],
    image: "/English_certificate.jpg"
  },
  {
    title: "French Language Proficiency (A1)",
    org: "Language Institute / Alliance",
    year: "2018",
    desc: "Foundational French language proficiency supporting multi-lingual regional humanitarian coordination.",
    details: "Official language certification validating fundamental conversational and written competency in French. Supports international humanitarian collaboration across Francophone partners, regional coordination bodies, and multi-agency working groups.",
    skills: [
      "Multilingual Coordination",
      "French Communication",
      "Regional Partner Engagement",
      "Diplomatic Etiquette"
    ],
    image: "/L_A1.jpg"
  }
];

export const education: Education[] = [
  {
    degree: "MBA",
    institution: "Maryland International University College Ethiopia",
    location: "Addis Ababa",
    year: "2024",
    gpa: "",
    details: "Developed leadership, project management, and training design skills through coursework focused on community development and program evaluation, directly applicable to training management in community settings."
  },
  {
    degree: "BSC In Rural Development",
    institution: "Bahidar University Ethiopia",
    location: "Bahidar",
    year: "2009",
    gpa: "",
    details: "Gained foundational knowledge in rural community development, agricultural economics, and sustainable livelihoods, essential for designing community capacity-building programs and training initiatives."
  }
];

export const references: Reference[] = [
  {
    name: "MOLLA BEHIRE",
    role: "Reference",
    org: "International Rescue Committee",
    phone: "+251187985746",
    email: "molamirte@gmail.com",
    quote: "A driven professional capable of managing critical initiatives with high empathy."
  },
  {
    name: "RUTH AFEWORK",
    role: "Reference",
    org: "FAWE-Ethiopia",
    phone: "+25109965679139",
    email: "ruth.afework@gmail.com",
    quote: "An exceptional leader who consistently champions the rights and safety of young women."
  },
  {
    name: "GADISE GIRMA",
    role: "Reference",
    org: "UNHCR",
    phone: "+2510911536169",
    email: "amartigamada@gmail.com",
    quote: "Working alongside Yodit has been a masterclass in resilience and operational excellence."
  },
  {
    name: "FRANK BRYANT",
    role: "Reference",
    org: "Voice of Africa",
    phone: "+1(201)303-5541",
    email: "bryantfrank689@gmail.com",
    quote: "Visionary, decisive, and deeply committed. Yodit transformed our community engagement metrics."
  }
];

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Education", href: "/education" },
  {
    label: "Certificates",
    href: "/certificates",
    sublinks: certificates.map((c, i) => ({ label: c.title, href: `/certificates/${i}` })),
  },
  {
    label: "Experience",
    href: "/experience",
    sublinks: experiences.map((e, i) => ({ label: e.role, href: `/experience/${i}` })),
  },
  {
    label: "Skills",
    href: "/skills",
    sublinks: [
      { label: "Program Management", href: "/skills/program-management" },
      { label: "Community Development", href: "/skills/community-development" },
      { label: "Gender Advocacy", href: "/skills/gender-advocacy" },
      { label: "Communication", href: "/skills/communication" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  { label: "Advocacy", href: "/advocacy" },
  { label: "Publications", href: "/publications" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "References", href: "/references" },
];

