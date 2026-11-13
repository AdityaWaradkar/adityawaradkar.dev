"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

// Type definitions matching the Go backend response
type ContributionDay = {
  contributionCount: number;
  date: string;
};

type Week = {
  contributionDays: ContributionDay[];
};

type CalendarData = {
  totalContributions: number;
  weeks: Week[];
};

export default function GitHubGraph() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the contribution data from our Go backend
    async function fetchData() {
      try {
        const json = await fetchApi<CalendarData>("/api/github");
        setData(json);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- Render States ---

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center font-mono text-sm text-brown-light animate-pulse">
        Loading contributions...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full border border-brown-light/30 rounded-lg p-6 bg-cream shadow-sm flex flex-col items-center justify-center text-center py-12">
        <p className="font-mono text-sm text-brown-light mb-2">GitHub Activity</p>
        <p className="text-brown-mid text-sm">
          Contribution data is currently unavailable. 
          <br />
          <a 
            href="https://github.com/AdityaWaradkar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-accent underline underline-offset-4 mt-2 inline-block"
          >
            View profile directly on GitHub ↗
          </a>
        </p>
      </div>
    );
  }

  // Helper function to map contribution counts to our custom color palette
  const getColor = (count: number) => {
    if (count === 0) return "bg-brown-light/20";
    if (count <= 3) return "bg-accent/30";
    if (count <= 6) return "bg-accent/60";
    if (count <= 9) return "bg-accent/80";
    return "bg-accent";
  };

  return (
    <div className="w-full border border-brown-light/30 rounded-lg p-6 bg-cream shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
        <div>
          <h3 className="font-serif text-2xl text-brown-deep">GitHub Activity</h3>
          <p className="text-brown-mid text-sm mt-1">
            {data.totalContributions} contributions in the last year
          </p>
        </div>
        <a 
          href="https://github.com/AdityaWaradkar" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-mono text-xs text-accent hover:underline underline-offset-4"
        >
          View Profile ↗
        </a>
      </div>

      {/* Contribution Graph Grid */}
      <div className="overflow-x-auto pb-2">
        {/* 
          The graph is rendered as columns (weeks) and rows (days).
          We use flex column for weeks, and flex row for days.
        */}
        <div className="flex gap-1 min-w-[700px]">
          {data.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                  className={`w-3 h-3 rounded-[2px] transition-colors ${getColor(day.contributionCount)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end font-mono text-[10px] text-brown-light uppercase tracking-wider">
        <span>Less</span>
        <div className="w-3 h-3 rounded-[2px] bg-brown-light/20" />
        <div className="w-3 h-3 rounded-[2px] bg-accent/30" />
        <div className="w-3 h-3 rounded-[2px] bg-accent/60" />
        <div className="w-3 h-3 rounded-[2px] bg-accent/80" />
        <div className="w-3 h-3 rounded-[2px] bg-accent" />
        <span>More</span>
      </div>
    </div>
  );
}