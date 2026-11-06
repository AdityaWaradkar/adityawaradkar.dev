import Link from "next/link";

type BlogPost = {
  title: string;
  link: string;
  date: string;
  excerpt: string;
};

async function getPosts(): Promise<BlogPost[]> {
  try {
    // Fetch from the Go backend using the Docker service name
    const res = await fetch("http://backend:8080/api/blog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Helper to safely format the RSS date without using `new Date()`
function formatDate(dateString: string) {
  if (!dateString) return "";
  const parts = dateString.split(" ");
  if (parts.length >= 4) {
    return `${parts[2]} ${parts[3]}`; // Returns "MMM YYYY" e.g. "Nov 2025"
  }
  return dateString;
}

// REMOVED: export const dynamic = 'force-dynamic';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
          07 — Blog
        </span>
        <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
          Writing
        </h1>
        <p className="text-lg text-brown-mid">
          Thoughts on cloud architecture, DevOps, and the occasional dive into art and philosophy. 
          All articles are published on Medium.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="border border-brown-light/30 rounded-lg p-8 bg-cream flex flex-col items-center justify-center text-center">
          <p className="text-brown-mid text-sm mb-4">
            Recent blog posts are currently unavailable.
          </p>
          <a 
            href="https://medium.com/@adityawaradkar.learning" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent font-mono text-sm hover:underline underline-offset-4"
          >
            Read directly on Medium ↗
          </a>
        </div>
      ) : (
        <div className="flex flex-col border-t border-brown-light/30 max-w-3xl">
          {posts.map((post, index) => (
            <Link 
              key={index} 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 py-8 border-b border-brown-light/30 hover:bg-brown-light/5 transition-colors px-4 -mx-4"
            >
              <div className="flex justify-between items-baseline gap-4">
                <h2 className="text-2xl font-serif text-brown-deep group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <span className="font-mono text-xs text-brown-light whitespace-nowrap">
                  {formatDate(post.date)}
                </span>
              </div>
              <p className="text-brown-mid text-sm">{post.excerpt}</p>
              <span className="font-mono text-xs text-accent mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Read on Medium <span className="text-lg">↗</span>
              </span>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-12">
        <a 
          href="https://medium.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-sm text-brown-mid hover:text-accent underline-offset-4 hover:underline"
        >
          View all articles on Medium →
        </a>
      </div>
    </div>
  );
}