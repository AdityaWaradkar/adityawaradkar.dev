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
    liveDemo: true,
    link: "https://jit-iam-portal.vercel.app/",
    github: "https://github.com/AdityaWaradkar/jit-iam-portal",
    featured: true
  },
  {
    title: "SAFE: Smart Adaptive Fire Evacuation",
    description: "Developed a smart building safety system that detects fire outbreaks and dynamically routes occupants to the safest exit. The system features an admin dashboard with a live floor map visualizing real-time sensor data and calculated escape routes. Engineered the dynamic routing algorithm that processes current sensor values to calculate the safest path, paired with physical LED strips in corridors to guide evacuees.",
    tags: ["Linux","Algorithm Design", "IoT", "Dashboard", "Real-time Systems"],
    liveDemo: false,
    link: "#",
    github: "https://github.com/AdityaWaradkar/SAFE", 
    featured: false
  },
  {
    title: "Gratia: Leftover Food Redistribution Platform",
    description: "Developed a microservices platform connecting food donors with NGOs to streamline surplus food listing and pickup. Built Go backend microservices for authentication, user profiles, food listings, and claims using PostgreSQL and JWT tokens, containerizing each service with Docker. Added background checks and database locking to automatically expire old listings and prevent double-claiming.",
    tags: ["Go Lang", "PostgreSQL", "Next.js", "Docker", "Kubernetes", "Microservices"],
    liveDemo: true,
    link: "https://gratia-eta.vercel.app/",
    github: "https://github.com/AdityaWaradkar/Gratia",
    featured: false
  },
  {
    title: "Deepfake Detector",
    description: "Developed a deepfake detection system utilizing Convolutional Neural Networks (CNNs) to accurately classify whether facial images are real or AI-generated. Gained deep practical experience in CNN architecture, feature extraction, and model training to identify subtle artifacting left by generative models.",
    tags: ["Python", "CNN", "Machine Learning", "Computer Vision"],
    liveDemo: false,
    link: "#",
    github: "https://github.com/AdityaWaradkar/deepfake_detector", 
    featured: false
  },
  {
    title: "ParkSense",
    description: "Engineered a smart parking solution for commercial buildings and urban areas, allowing users to book and manage parking spots via a mobile application. The system automates the entire parking lifecycle, ensuring efficient space utilization and maintenance. The research paper detailing this IoT-driven system was published in Springer as part of the ICT4SD 2025 international conference.",
    tags: ["IoT", "Research", "Springer Publication", "Mobile App"],
    liveDemo: false,
    link: "#",
    github: "https://github.com/AdityaWaradkar/IoT_based_smart_parking_system", 
    featured: false
  }
];