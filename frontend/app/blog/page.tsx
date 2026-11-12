import Link from "next/link";
import Image from "next/image";

type BlogPost = {
  title: string;
  link: string;
  date: string;
  excerpt: string;
  thumbnail: string;
};

async function getPosts(): Promise<BlogPost[]> {
  try {
    // Use the environment variable, fallback to local for dev
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';
    const res = await fetch(`${apiUrl}/api/blog`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function formatDate(dateString: string) {
  if (!dateString) return "";
  const parts = dateString.split(" ");
  if (parts.length >= 4) {
    return `${parts[2]} ${parts[3]}`; 
  }
  return dateString;
}

export default async function Blog() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-sm text-brown-mid tracking-widest uppercase font-semibold mb-4 block">
          07 — Blog
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-brown-deep tracking-tight mb-6">
          Technical Writingclea
        </h1>
        <p className="text-lg text-brown-mid">
          Thoughts on technical things. All articles are published on Medium.
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
        <div className="flex flex-col gap-12">
          
          {/* Featured Post */}
          {featuredPost && (
            <Link 
              href={featuredPost.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-brown-light/30 rounded-xl overflow-hidden hover:shadow-md transition-all bg-cream"
            >
              {/* Featured Image Container */}
              <div className="relative w-full aspect-video md:aspect-auto md:h-full min-h-[300px] md:min-h-[400px] bg-[#F5F2EB] border-b md:border-b-0 md:border-r border-brown-light/20 p-6">
                {featuredPost.thumbnail ? (
                  <Image
                    src={featuredPost.thumbnail}
                    alt={featuredPost.title}
                    fill
                    // Changed to object-contain to prevent cutting
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-brown-light">No Image</div>
                )}
              </div>
              
              {/* Featured Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="font-mono text-xs text-accent uppercase tracking-wider mb-4 block">
                  Latest Article
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-brown-deep group-hover:text-accent transition-colors leading-[1.2] mb-6">
                  {featuredPost.title}
                </h2>
                <p className="text-brown-mid mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brown-light/20">
                  <span className="font-mono text-sm text-brown-light">{formatDate(featuredPost.date)}</span>
                  <span className="font-mono text-sm text-brown-deep group-hover:text-accent transition-colors flex items-center gap-2">
                    Read on Medium <span className="text-lg">↗</span>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {remainingPosts.map((post, index) => (
              <Link 
                key={index} 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border border-brown-light/30 rounded-xl overflow-hidden hover:shadow-md transition-all bg-cream"
              >
                {/* Grid Image Container */}
                <div className="relative w-full aspect-[16/9] bg-[#F5F2EB] border-b border-brown-light/20 p-4">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      // Changed to object-contain to prevent cutting
                      className="object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-brown-light">No Image</div>
                  )}
                </div>
                
                {/* Grid Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-serif text-brown-deep group-hover:text-accent transition-colors leading-tight mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-brown-mid text-sm mb-6 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-brown-light/20">
                    <span className="font-mono text-xs text-brown-light">{formatDate(post.date)}</span>
                    <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Read ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer Link */}
      <div className="mt-16 text-center">
        <a 
          href="https://medium.com/@adityawaradkar.learning" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block border border-brown-light/40 px-8 py-3 rounded-md font-mono text-sm text-brown-deep hover:bg-brown-light/10 transition-colors"
        >
          View all articles on Medium
        </a>
      </div>
    </div>
  );
}