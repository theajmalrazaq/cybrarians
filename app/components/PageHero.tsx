"use client";

import React from "react";
import DotGrid from "./DotGrid";

interface PageHeroProps {
  badge?: string;
  badgeContent?: React.ReactNode;
  title: React.ReactNode;
  description: string;
}

export default function PageHero({
  badge,
  badgeContent,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-32 -mt-24">
      {/* Background DotGrid with fade */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 h-full">
          <DotGrid
            dotSize={2}
            gap={15}
            baseColor="#dcd3ffff"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            style={{}}
          />
        </div>
        {/* Bottom Fade Gradient for blending */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          {badgeContent ? (
            <div className="mb-8 flex justify-center">{badgeContent}</div>
          ) : badge ? (
            <span className="mb-8 inline-flex items-center rounded-none border border-border bg-white/50 px-3 py-1 text-[11px] font-semibold text-zinc-500 backdrop-blur-sm">
              {badge}
            </span>
          ) : null}
          <h1 className="w-full text-4xl font-semibold tracking-tight md:text-5xl lg:text-5xl leading-[1.15] ">
            {title}
          </h1>
          <p className="mt-6 w-full max-w-2xl mx-auto text-base text-zinc-500 font-medium">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
