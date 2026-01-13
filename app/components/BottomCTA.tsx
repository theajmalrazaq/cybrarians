"use client";

import React from "react";
import Link from "next/link";
import DotGrid from "./DotGrid";

interface BottomCTAProps {
  title?: string;
  description?: string;
}

export default function BottomCTA({
  title = "Ready To Accelerate Your Project?",
  description = "Contact Us To Discuss How We Can Help With Your Project Or Research Needs. Our Team Is Ready To Collaborate And Innovate.",
}: BottomCTAProps) {
  return (
    <section className="mt-10">
      <div className="group relative overflow-hidden w-full px-6 md:px-16 lg:px-24 py-12 md:py-24 text-center transition-all hover:border-brand/20">
        {/* Background Grid Layer */}
        <div className="absolute inset-0 -z-0 opacity-40 transition-opacity group-hover:opacity-50">
          <DotGrid
            dotSize={2}
            gap={15}
            baseColor="#f5f5f5"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            style={{}}
          />
        </div>

        {/* Large Background Text */}
        <div className="absolute inset-x-0 bottom-[-10vw] pointer-events-none select-none z-0 flex justify-center items-center overflow-hidden opacity-10">
          <span className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap bg-gradient-to-b from-transparent to-black bg-clip-text text-transparent">
            CYBRARIANS
          </span>
        </div>

        <div className="relative z-10 w-full">
          <h2 className="text-3xl font-semibold md:text-4xl leading-tight tracking-tight text-black text-gradient transition-transform duration-500">
            {title}
          </h2>
          <p className="mt-6 text-sm text-zinc-500 font-medium max-w-lg mx-auto">
            {description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-[48px] items-center justify-between rounded-none pl-6 pr-4 py-0 text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 bg-brand text-white whitespace-nowrap after:content-['→'] after:ml-3 after:flex after:h-7 after:w-7 after:items-center after:justify-center after:rounded-none after:bg-white/10 after:text-white shadow-lg shadow-brand/20"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="inline-flex h-[48px] items-center justify-center rounded-none px-8 text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 border border-zinc-200 bg-white text-black hover:bg-zinc-50"
            >
              About Group
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
