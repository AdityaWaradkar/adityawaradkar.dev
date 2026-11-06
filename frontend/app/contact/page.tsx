"use client";

import { useState } from "react";
import { socialsData } from "@/lib/socialsData";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <div className="max-w-4xl">
        <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
          08 — Contact
        </span>
        <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
          Let's Connect
        </h1>
        <p className="text-lg text-brown-mid mb-12">
          Whether it's about cloud architecture, a potential collaboration, or just to say hello.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {status === "success" ? (
              <div className="bg-accent/10 border border-accent text-accent p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-2">Message Sent</h3>
                <p className="text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 text-sm font-mono underline underline-offset-4">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Honeypot field (hidden from real users) */}
                <input 
                  type="text" 
                  name="honeypot" 
                  value={formData.honeypot} 
                  onChange={(e) => setFormData({...formData, honeypot: e.target.value})} 
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-brown-light mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-brown-light/50 py-2 text-brown-deep focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-brown-light mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-brown-light/50 py-2 text-brown-deep focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-brown-light mb-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b border-brown-light/50 py-2 text-brown-deep focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="bg-brown-deep text-cream px-8 py-4 rounded-md font-mono text-sm hover:bg-accent transition-colors disabled:opacity-50 mt-4 self-start"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                
                {status === "error" && (
                  <p className="text-red-500 text-sm font-mono mt-2">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>

          {/* Socials & Email */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-brown-light mb-4">Direct Email</h3>
              <a href="mailto:adityawaradkar2004@gmail.com" className="text-xl font-serif text-brown-deep hover:text-accent transition-colors">
                adityawaradkar2004@gmail.com
              </a>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-brown-light mb-4">Socials</h3>
              <div className="flex flex-col gap-3">
                {socialsData.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brown-mid hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    {social.name}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}