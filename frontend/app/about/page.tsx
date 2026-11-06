import Link from "next/link";
import type { Metadata } from "next";
import GitHubGraph from "@/components/GitHubGraph";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Aditya Waradkar, a computer engineer specializing in DevOps and Cloud infrastructure.",
};

export default function About() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
        01 — About
      </span>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
        {/* Left Column: Bio */}
        <div className="md:col-span-8 flex flex-col gap-6 text-brown-mid leading-relaxed text-lg">
          <p>
            I am a computer engineering student at S.I.E.S Graduate School of Technology with a deep focus on DevOps and Cloud infrastructure. 
            My professional career is built around designing resilient, scalable systems, automating the boring parts, and ensuring that applications run smoothly behind the scenes.
          </p>
          <p>
            Outside of the terminal, I am a visual artist. I specialize in realistic pencil sketches 
            and paintings. I find that the patience required to render a realistic portrait is exactly 
            the same patience required to debug a complex distributed system.
          </p>
          <p>
            I am also a lifelong student of music and literature. This site serves as a living archive 
            of my technical work, my art, and the media that inspires me.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-serif text-brown-deep mb-4">Technical Arsenal</h3>
            
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-brown-light uppercase tracking-wider block mb-2">Cloud & DevOps</span>
                <div className="flex flex-wrap gap-2">
                  {["Linux", "AWS", "Kubernetes", "Docker", "Terraform", "CI/CD (GitHub Actions)", "Bash"].map((tool) => (
                    <span key={tool} className="border border-brown-light/50 px-3 py-1 rounded-full text-sm font-mono text-brown-deep">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-mono text-xs text-brown-light uppercase tracking-wider block mb-2">Languages & Databases</span>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Go Lang", "PostgreSQL", "Neon"].map((tool) => (
                    <span key={tool} className="border border-brown-light/50 px-3 py-1 rounded-full text-sm font-mono text-brown-deep">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-mono text-xs text-brown-light uppercase tracking-wider block mb-2">Tools</span>
                <div className="flex flex-wrap gap-2">
                  {["Git", "GitHub", "Open Policy Agent", "HashiCorp Vault"].map((tool) => (
                    <span key={tool} className="border border-brown-light/50 px-3 py-1 rounded-full text-sm font-mono text-brown-deep">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Graph Inserted Here */}
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
                <span className="text-sm text-brown-mid block mt-1">S.I.E.S GST (2022-2026)</span>
                <span className="text-sm text-accent font-mono block mt-1">CGPA: 9.20</span>
              </div>
              <div>
                <span className="text-xs text-brown-light block mb-1">Reading</span>
                <span className="text-brown-deep font-medium">Designing Data-Intensive Applications</span>
              </div>
              <div>
                <span className="text-xs text-brown-light block mb-1">Listening to</span>
                <span className="text-brown-deep font-medium">Ambient Focus Playlists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}