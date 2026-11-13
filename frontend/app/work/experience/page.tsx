import { experienceData } from "@/lib/data";
import type { Metadata } from "next";

// SEO Metadata for the Experience page
export const metadata: Metadata = {
  title: "Experience",
  description: "Professional timeline and work experience of Aditya Waradkar.",
};

export default function Experience() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      
      {/* Page Header */}
      <span className="font-mono text-sm text-brown-mid tracking-widest uppercase font-semibold mb-4 block">
        02 — Experience
      </span>
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-16">
        Professional Timeline
      </h1>

      {/* 
        Timeline Container
        The 'before:' pseudo-element creates the vertical line connecting the dots.
        It is positioned absolute relative to this container.
      */}
      <div className="max-w-3xl flex flex-col gap-12 relative before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-[1px] before:bg-brown-light/30">
        
        {experienceData.map((job, index) => (
          <div key={index} className="relative pl-10">
            
            {/* Timeline Dot */}
            <span className="absolute left-0 top-2 w-[15px] h-[15px] bg-cream border-2 border-accent rounded-full z-10" />
            
            {/* Job Header Info */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-mono text-sm text-brown-light">{job.duration}</span>
              <h2 className="text-2xl font-serif text-brown-deep">{job.role}</h2>
              <span className="text-accent font-medium">{job.company}</span>
              <span className="text-sm text-brown-light font-mono">{job.location}</span>
            </div>
            
            {/* Job Achievements (Bullet Points) */}
            <ul className="list-disc list-outside ml-4 text-brown-mid mb-4 space-y-2">
              {job.description.map((bullet, i) => (
                <li key={i} className="leading-relaxed">{bullet}</li>
              ))}
            </ul>
            
            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-brown-deep bg-brown-light/10 border border-brown-light/20 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}