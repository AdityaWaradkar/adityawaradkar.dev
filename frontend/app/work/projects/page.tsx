import { projectsData } from "@/lib/data";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
        03 — Projects
      </span>
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-16">
        Selected Work
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <div 
            key={index} 
            className={`group border border-brown-light/30 p-8 rounded-lg bg-cream hover:shadow-md transition-all flex flex-col ${
              project.featured ? "md:col-span-2" : "col-span-1"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-serif text-brown-deep group-hover:text-accent transition-colors">
                {project.title}
              </h2>
              {project.featured && (
                <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-1 rounded uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-brown-mid mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-brown-deep bg-brown-light/10 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4 mt-auto">
              <Link href={project.link} className="text-sm font-mono text-brown-deep hover:text-accent underline-offset-4 hover:underline">
                Live Demo
              </Link>
              <Link href={project.github} className="text-sm font-mono text-brown-deep hover:text-accent underline-offset-4 hover:underline">
                GitHub
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}