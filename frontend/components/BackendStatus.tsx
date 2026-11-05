// frontend/components/BackendStatus.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

type HealthResponse = {
  status: string;
  message: string;
};

export default function BackendStatus() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<HealthResponse | null>(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const result = await fetchApi<HealthResponse>("/api/health");
        setData(result);
        setStatus("success");
      } catch (error) {
        console.error("Failed to fetch health status:", error);
        setStatus("error");
      }
    }

    checkHealth();
  }, []);

  if (status === "loading") {
    return <span className="text-brown-light text-sm font-mono">Checking backend connection...</span>;
  }

  if (status === "error") {
    return <span className="text-red-500 text-sm font-mono">Backend is unreachable</span>;
  }

  return (
    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-md font-mono text-sm shadow-sm">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      {data?.message}
    </div>
  );
}