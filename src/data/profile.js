export const profile = {
  name: "Fernandes Ariadi Simanjuntak",
  role: "Software Engineer — Full Stack",
  location: "West Jakarta, DKI Jakarta",
  email: "nandessimanjuntak1803@gmail.com",
  phone: "+62 81387077785",
  linkedin: "https://www.linkedin.com/in/fernandessimanjuntak/",
  github: "https://github.com/nandes007",
  resumeUrl: "/resume.pdf",
  careerStartYear: 2019,
  summary:
    "I am a software engineer focused on full stack development, working across the stacks below. I'm not limited to that pile and open to learning new stacks and taking on new challenges.",
};

export const skills = [
  "PHP", "Laravel", "Java", "JavaScript", "Node.js", "Golang",
  "PostgreSQL", "Redis", "Elasticsearch", "Apache Kafka",
  "Apache Flink", "Protocol Buffer", "gRPC",
];

export const experiences = [
  {
    role: "Software Engineer",
    company: "PT. Tiki Jalur Nugraha Ekakurir (JNE)",
    location: "West Jakarta, Jakarta",
    period: "08/2024 – Present",
    bullets: [
      "Upgraded Laravel framework from v6.x to v12.x.",
      "Designed and developed robust, scalable RESTful APIs using Laravel.",
      "Engineered an event-driven architecture using Apache Kafka and Protocol Buffers for real-time event processing.",
      "Built an ETL pipeline with Java, Apache Kafka, and Apache Flink, storing processed data into an OLAP database for real-time analytics.",
      "Developed middleware for seamless data integration between legacy and new systems during migration.",
      "Implemented comprehensive unit and integration testing.",
    ],
  },
  {
    role: "Software Engineer (Freelance)",
    company: "PT. Vixpro Digital Teknologi",
    location: "South Jakarta, Jakarta",
    period: "04/2025 – 11/2025",
    bullets: [
      "Architected a multi-tier backoffice payment gateway with automated fee distribution and cascading commission logic.",
      "Integrated a blockchain payment gateway (CAMP Investment Technologies) with webhook-driven reconciliation.",
      "Built an automated monthly reconciliation engine and pooled balance management with idempotent, fault-tolerant processing.",
    ],
  },
  {
    role: "Software Engineer (Freelance)",
    company: "PT. Klik Digital Sinergi",
    location: "South Jakarta, Jakarta",
    period: "09/2024 – 01/2025",
    bullets: [
      "Built a Points Management API ecosystem for Telkomsel agents with a multi-level referral architecture and automated commission distribution.",
      "Integrated a LinkAja e-wallet pipeline for point-to-fiat conversion with a 99.8% redemption success rate via exponential backoff retries.",
      "Optimized database schema and indexing for audit logging with fault-tolerant transaction handling.",
    ],
  },
  {
    role: "Software Engineer",
    company: "PT. Global Putera Asia",
    location: "South Jakarta, Jakarta",
    period: "10/2022 – 08/2024",
    bullets: [
      "Designed and built a comprehensive Inventory Management System with master data, real-time stock tracking, and cycle count workflows.",
      "Developed an HHT mobile app for warehouse stock opname via barcode scanning with offline/online sync.",
      "Engineered a high-throughput POS system with offline resilience.",
      "Implemented a Finance Module: fixed asset depreciation, automated journal entries, GL ledger reporting.",
      "Optimized complex SQL queries and indexing for large datasets.",
      "Mentored junior engineers via code review, architecture discussions, and pairing.",
    ],
  },
  {
    role: "Information Technology",
    company: "PT. Gelael Supermarket",
    location: "South Jakarta, Jakarta",
    period: "06/2019 – 09/2022",
    bullets: [
      "Designed and developed a membership web application for customer registration and account management.",
      "Built member portal features: real-time points tracking, transaction history, personalized dashboards.",
      "Acted as technical liaison between the development vendor and management.",
      "Led multi-branch rollout and staff training.",
      "Established documentation for feedback, bug reports, and feature requests.",
    ],
  },
];

// TODO: replace description/tags with real content later
export const projects = [
  {
    name: "Meeting Room Booking",
    description: "PLACEHOLDER — add real description.",
    tags: ["PLACEHOLDER"],
    github: "https://github.com/nandes007/meeting-room-booking",
    demo: "", // add when deployed
  },
  {
    name: "Chinese Translator",
    description: "PLACEHOLDER — add real description.",
    tags: ["PLACEHOLDER"],
    github: "https://github.com/nandes007/chinese-translator",
    demo: "", // add when deployed
  },
];
