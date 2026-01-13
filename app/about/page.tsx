import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import BottomCTA from "@/app/components/BottomCTA";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        badge="Our Mission"
        title={
          <>
            Bridging The Gap Between <br />
            <span className="text-gradient transition-transform duration-500">
              Theory & Application.
            </span>
          </>
        }
        description="Cybrarians Is An Academic Powerhouse Dedicated To Advancing The Frontiers Of Computer Science Through Rigorous Research And Development."
      />

      <div className="w-full px-6 md:px-16 lg:px-24 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <section className="rounded-none border border-zinc-100 bg-zinc-50/30 p-12 md:p-16">
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-none bg-black text-white text-xl font-bold italic">
              01
            </div>
            <h2 className="mb-6 text-3xl font-semibold text-black">
              Our Vision
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium">
              To foster innovation and excellence in academic research by
              creating a supportive environment where Research Assistants mentor
              students, knowledge is shared freely, and groundbreaking ideas are
              transformed into impactful solutions for real-world problems.
            </p>
          </section>

          <section className="rounded-none border border-zinc-100 bg-white p-12 md:p-16">
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-none bg-brand text-white text-xl font-bold italic">
              02
            </div>
            <h2 className="mb-6 text-3xl font-semibold text-black">
              What We Do
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium">
              Our research spans machine learning, natural language processing,
              blockchain technology, IoT systems, and more. We collaborate with
              industry partners to bridge the gap between academic research and
              practical applications through high-fidelity prototyping.
            </p>
          </section>
        </div>
      </div>
      <BottomCTA />
    </div>
  );
}
