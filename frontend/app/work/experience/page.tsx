import { experienceData } from "@/lib/data";

export default function Experience() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
        02 — Experience
      </span>
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-16">
        Professional Timeline
      </h1>

      <div className="max-w-3xl flex flex-col gap-12 relative before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-[1px] before:bg-brown-light/30">
        {experienceData.map((job, index) => (
          <div key={index} className="relative pl-10">
            <span className="absolute left-0 top-2 w-[15px] h-[15px] bg-cream border-2 border-accent rounded-full" />
            
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-mono text-sm text-brown-light">{job.duration}</span>
              <h2 className="text-2xl font-serif text-brown-deep">{job.role}</h2>
              <span className="text-accent font-medium">{job.company}</span>
              <span className="text-sm text-brown-light font-mono">{job.location}</span>
            </div>
            
            <ul className="list-disc list-outside ml-4 text-brown-mid mb-4 space-y-2">
              {job.description.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-brown-light border border-brown-light/30 px-2 py-1 rounded">
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