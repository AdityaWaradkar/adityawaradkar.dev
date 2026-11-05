import Hero from "@/components/Hero";
import BackendStatus from "@/components/BackendStatus";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Temporary API check section to verify connection */}
      <div className="max-w-content mx-auto px-6 pb-24 w-full">
        <div className="border-t border-brown-light/30 pt-8">
          <p className="text-brown-mid font-mono text-xs uppercase tracking-wider mb-4">System Status</p>
          <BackendStatus />
        </div>
      </div>
    </div>
  );
}