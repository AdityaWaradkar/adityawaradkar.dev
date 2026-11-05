// frontend/lib/data.ts

export const experienceData = [
  {
    role: "Data Analytics Intern",
    company: "Tata Power Renewable Energy Limited",
    duration: "Dec 2024 — Mar 2025",
    location: "On-site (Carnac Office, Mumbai)",
    description: [
      "Developed a Python-based analysis module for 'Energy Loss Analysis due to DC Shortfall at Solar Sites' to quantify energy generation losses across multiple solar plants.",
      "Collaborated directly with the Solar O&M team and senior leadership to evaluate critical metrics, directly improving operational and strategic decisions.",
      "Built interactive dashboards using Streamlit and Plotly to visualize complex generation data."
    ],
    tags: ["Python", "Streamlit", "Pandas", "Plotly", "Data Analytics"]
  }
];

export const projectsData = [
  {
    title: "JIT IAM Portal: Zero-Trust Ephemeral Access",
    description: "Developed a web portal for developers to request short-term, elevated cloud access instead of keeping permanent passwords or keys. Automated temporary credential generation and auto-revocation after a set duration, ensuring access expires as soon as the task is completed. Implemented automated security policy checks and logging to verify approval rules and track all access requests.",
    tags: ["Python", "FastAPI", "Next.js", "Open Policy Agent", "HashiCorp Vault", "AWS", "Terraform", "Docker"],
    link: "#",
    github: "#", // Add your GitHub link here
    featured: true
  },
  {
    title: "Gratia: Leftover Food Redistribution Platform",
    description: "Developed a microservices platform connecting food donors with NGOs to streamline surplus food listing and pickup. Built Go backend microservices for authentication, user profiles, food listings, and claims using PostgreSQL and JWT tokens, containerizing each service with Docker. Added background checks and database locking to automatically expire old listings and prevent double-claiming.",
    tags: ["Go Lang", "PostgreSQL", "Next.js", "Docker", "Kubernetes", "Microservices"],
    link: "#",
    github: "#", // Add your GitHub link here
    featured: false
  }
];