export type TeamMember = {
  id: string;
  name: string;
  role: "ra" | "fyp";
  title: string;
  bio: string;
  image: string;
  email?: string;
};

export type Research = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  type: "paper" | "fyp";
  tags: string[];
  link?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
  tags: string[];
};

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Ahmed",
    role: "ra",
    title: "Research Assistant",
    bio: "PhD in Computer Science with focus on machine learning and data analytics. Leading research initiatives in NLP and document classification systems.",
    image: "/globe.svg",
    email: "sarah.ahmed@university.edu",
  },
  {
    id: "2",
    name: "Ali Hassan",
    role: "ra",
    title: "Research Assistant",
    bio: "MS in Software Engineering, specializing in web technologies and cloud computing. Passionate about building scalable distributed systems.",
    image: "/globe.svg",
    email: "ali.hassan@university.edu",
  },
  {
    id: "3",
    name: "Fatima Khan",
    role: "fyp",
    title: "FYP Student",
    bio: "Working on AI-powered document classification systems. Exploring transformer architectures for academic literature analysis.",
    image: "/globe.svg",
  },
  {
    id: "4",
    name: "Omar Malik",
    role: "fyp",
    title: "FYP Student",
    bio: "Researching blockchain applications in academic credential verification. Building decentralized solutions for secure record management.",
    image: "/globe.svg",
  },
  {
    id: "5",
    name: "Ayesha Tariq",
    role: "fyp",
    title: "FYP Student",
    bio: "Developing a smart library management system using IoT. Integrating sensor networks with cloud-based inventory tracking.",
    image: "/globe.svg",
  },
];

export const research: Research[] = [
  {
    id: "1",
    title: "Machine Learning Approaches for Academic Literature Classification",
    authors: ["Dr. Sarah Ahmed", "Ali Hassan"],
    abstract:
      "This paper presents a novel approach to classifying academic literature using transformer-based models.",
    year: 2024,
    type: "paper",
    tags: ["Machine Learning", "NLP", "Classification"],
    link: "#",
  },
  {
    id: "2",
    title: "Blockchain-Based Academic Credential Verification System",
    authors: ["Omar Malik", "Dr. Sarah Ahmed"],
    abstract:
      "A decentralized system for verifying academic credentials using blockchain technology.",
    year: 2024,
    type: "fyp",
    tags: ["Blockchain", "Security", "Web3"],
  },
  {
    id: "3",
    title: "IoT-Enabled Smart Library Management System",
    authors: ["Ayesha Tariq", "Ali Hassan"],
    abstract:
      "An intelligent library system leveraging IoT sensors for automated book tracking and management.",
    year: 2024,
    type: "fyp",
    tags: ["IoT", "Automation", "Library Science"],
  },
  {
    id: "4",
    title: "Deep Learning for Document Digitization and OCR",
    authors: ["Fatima Khan", "Dr. Sarah Ahmed"],
    abstract:
      "Improving OCR accuracy on historical documents using deep learning techniques.",
    year: 2023,
    type: "paper",
    tags: ["Deep Learning", "OCR", "Computer Vision"],
    link: "#",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Industry Projects",
    description:
      "Partner with us on real-world projects. We bring academic rigor to solve your business challenges with cutting-edge research. Our team collaborates closely with industry partners to develop innovative solutions that bridge the gap between theoretical research and practical applications.",
    image: "/window.svg",
  },
  {
    id: "2",
    title: "Applied Research",
    description:
      "Collaborative research initiatives focused on practical applications and industry-relevant solutions. We work with organizations to identify research opportunities and develop solutions that address real-world challenges while advancing academic knowledge.",
    image: "/file.svg",
  },
  {
    id: "3",
    title: "Technical Consultation",
    description:
      "Expert guidance on technology adoption, system architecture, and digital transformation strategies. Our experienced researchers provide insights and recommendations to help organizations navigate complex technical decisions.",
    image: "/globe.svg",
  },
  {
    id: "4",
    title: "Training and Workshops",
    description:
      "Customized training programs and workshops on emerging technologies for your team. We design and deliver educational sessions tailored to your organization's needs, covering topics from machine learning to blockchain technology.",
    image: "/window.svg",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Research Methodology",
    excerpt:
      "A comprehensive guide for new researchers on establishing a solid methodology foundation.",
    author: "Dr. Sarah Ahmed",
    date: "2024-12-15",
    slug: "research-methodology-guide",
    tags: ["Research", "Methodology", "Guide"],
  },
  {
    id: "2",
    title: "The Future of AI in Academic Libraries",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we manage and access academic resources.",
    author: "Ali Hassan",
    date: "2024-12-01",
    slug: "ai-academic-libraries",
    tags: ["AI", "Libraries", "Future Tech"],
  },
  {
    id: "3",
    title: "Best Practices for FYP Success",
    excerpt:
      "Tips and strategies from our RAs to help FYP students complete their projects successfully.",
    author: "Dr. Sarah Ahmed",
    date: "2024-11-20",
    slug: "fyp-best-practices",
    tags: ["FYP", "Tips", "Students"],
  },
];
