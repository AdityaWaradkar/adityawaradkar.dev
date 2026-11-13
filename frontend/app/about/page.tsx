import type { Metadata } from "next";
import GitHubGraph from "@/components/GitHubGraph";

// SEO Metadata for the About page
export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Aditya Waradkar, a computer engineer specializing in DevOps and Cloud infrastructure.",
};

// Data arrays for the Technical Arsenal to keep the JSX clean
const cloudDevops = ["Linux", "AWS", "Kubernetes", "Docker", "Terraform", "CI/CD (GitHub Actions)", "Bash"];
const languagesDb = ["Python", "Go Lang", "PostgreSQL", "Neon"];
const tools = ["Git", "GitHub", "Open Policy Agent", "HashiCorp Vault"];

export default function About() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      {/* Page Header */}
      <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
        01 — About
      </span>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
        {/* Left Column: Bio & Arsenal */}
        <div className="md:col-span-8 flex flex-col gap-6 text-brown-mid leading-relaxed text-lg">
          <p>
            I am a Computer Engineering graduate from S.I.E.S Graduate School of Technology, with a strong focus on DevOps and Cloud infrastructure. I enjoy designing resilient, scalable systems, automating repetitive tasks, and ensuring that applications run smoothly behind the scenes.
          </p>
          <p>
            Outside the terminal, I specialize in realistic pencil sketches and paintings. I’ve found that the meticulous patience required to render a lifelike portrait is exactly the same patience needed to debug a complex distributed system.
          </p>
          <p>
            Beyond code and graphite, my downtime is fueled by reading and a deep love for music, particularly metal. This site serves as a living archive of my technical builds, my artwork, and the media that inspires me.
          </p>
          
          {/* Technical Arsenal Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-serif text-brown-deep mb-4">Technical Arsenal</h3>
            
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-brown-light uppercase tracking-wider block mb-2">Cloud & DevOps</span>
                <div className="flex flex-wrap gap-2">
                  {cloudDevops.map((tool) => (
                    <span key={tool} className="border border-brown-light/50 px-3 py-1 rounded-full text-sm font-mono text-brown-deep">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-mono text-xs text-brown-light uppercase tracking-wider block mb-2">Languages & Databases</span>
                <div className="flex flex-wrap gap-2">
                  {languagesDb.map((tool) => (
                    <span key={tool} className="border border-brown-light/50 px-3 py-1 rounded-full text-sm font-mono text-brown-deep">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-mono text-xs text-brown-light uppercase tracking-wider block mb-2">Tools</span>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span key={tool} className="border border-brown-light/50 px-3 py-1 rounded-full text-sm font-mono text-brown-deep">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Contribution Graph */}
          <div className="mt-12">
            <GitHubGraph />
          </div>
        </div>

        {/* Right Column: Currently Card */}
        <div className="md:col-span-4">
          <div className="bg-cream border border-brown-light/30 p-8 rounded-lg shadow-sm sticky top-28">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brown-light mb-6">
              Currently
            </h3>
            
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs text-brown-light block mb-1">Education</span>
                <span className="text-brown-deep font-medium">B.E. Computer Engineering</span>
                <span className="text-sm text-brown-mid block mt-1">S.I.E.S Graduate School of Technology</span>
                <span className="text-sm text-accent font-mono block mt-1">CGPA: 9.20</span>
              </div>
              <div>
                <span className="text-xs text-brown-light block mb-1">Status</span>
                <span className="text-brown-deep font-medium">Open to opportunities</span>
              </div>
              <div>
                <span className="text-xs text-brown-light block mb-1">Reading</span>
                <span className="text-brown-deep font-medium">Psycho-Cybernetics by Maxwell Maltz</span>
              </div>
              <div>
                <span className="text-xs text-brown-light block mb-1">Listening to</span>
                <span className="text-brown-deep font-medium">Foo Fighters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}