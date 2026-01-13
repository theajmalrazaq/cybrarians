import Link from "next/link";
import Image from "next/image";
import { team } from "@/app/lib/data";
import PageHero from "./components/PageHero";
import BottomCTA from "./components/BottomCTA";

export default function Home() {
  const experts = team.filter((m) => m.role === "ra").slice(0, 3);

  return (
    <div className="flex flex-col">
      <PageHero
        badgeContent={
          <Link
            href="/research"
            className="inline-flex items-center gap-2.5 rounded-none border border-zinc-100 bg-white/50 py-2.5 px-2 pr-4 text-[11px] font-bold backdrop-blur-sm transition-all hover:bg-white hover:border-brand/20 group"
          >
            <span className="flex items-center gap-1.5 rounded-none bg-brand px-3 py-2 text-[9px] font-black text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
              2026
            </span>
            <div className="flex items-center gap-2 text-zinc-500 font-bold">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
              >
                <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z"></path>
              </svg>
              <span>View our Research Portfolio</span>
            </div>
          </Link>
        }
        title={
          <>
            Shaping The Future Of <br />
            <span className="text-gradient transition-transform duration-500">
              Digital Knowledge And AI Research.
            </span>
          </>
        }
        description="A Dedicated Collective Of Researchers And Students Building The Future Of Information Science, AI-Driven Classification, And Secure Authentication."
      />
      <div className="relative -mt-20 z-20 flex justify-center pb-20">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/research"
            className="inline-flex h-[48px] items-center justify-between rounded-none pl-5 pr-4 py-0 text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 bg-brand text-white border-t border-r border-b border-white/10 min-w-[180px] whitespace-nowrap after:content-['→'] after:ml-3 after:flex after:h-6 after:w-6 after:items-center after:justify-center after:rounded-none after:bg-white/10 after:text-white"
          >
            Explore Our Work
          </Link>
          <Link
            href="/team"
            className="inline-flex h-[48px] items-center justify-center rounded-none px-8 text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 border border-zinc-200 bg-white text-black hover:bg-zinc-50"
          >
            Meet the Experts
          </Link>
        </div>
      </div>

      {/* Brand Marquee Section */}
      <section className="border-y border-zinc-100 bg-zinc-50/30 py-10 overflow-hidden">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-10">
            Official Research Branding
          </p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap gap-16 md:gap-24 opacity-30 items-center">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-4 shrink-0">
                <span className="text-xl font-bold tracking-tighter">
                  CYBRARIANS
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Expertises */}
      <section className="py-16 md:py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="mb-16 text-center w-full">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">
                Advancing Knowledge Across Domains
              </span>
            </h2>
            <p className="mt-4 text-base text-zinc-500 font-medium">
              Leverage The Best Academic Minds To Solve Complex Challenges.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Digital Archiving",
                desc: "Preserving global knowledge through resilient, decentralized systems and smart indexing.",
                icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25",
              },
              {
                title: "AI-Driven Literacy",
                desc: "Utilizing NLP and machine learning to classify, curate, and analyze academic literature.",
                icon: "M9.75 3.104v1.244c0 .462.338.841.791.957a11.166 11.166 0 002.408.105.75.75 0 00.726-.548 5.945 5.945 0 011.216-1.959.75.75 0 00-.773-1.258 7.445 7.445 0 00-1.822 1.385 1.125 1.125 0 01-1.581 0 7.445 7.445 0 00-1.822-1.385.75.75 0 00-.773 1.258 5.945 5.945 0 011.216 1.959.75.75 0 00.726.548 11.103 11.103 0 002.408-.105.792.792 0 00.791-.957V3.104m-9-1.375a3 3 0 00-3 3v15.75a3 3 0 003 3h15.75a3 3 0 003-3V4.729a3 3 0 00-3-3H6.75z",
              },
              {
                title: "Information Security",
                desc: "Securing institutional data architectures with robust encryption and protocol analysis.",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group relative rounded-none border border-zinc-100 bg-zinc-50/50 p-8 transition-all hover:bg-white hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-none bg-brand text-white group-hover:bg-black transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={f.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
                <Link
                  href="/research"
                  className="mt-6 inline-flex items-center text-[13px] font-medium text-brand hover:gap-2 transition-all"
                >
                  Details <span className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experts */}
      <section className="bg-zinc-50/50 py-16 md:py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="mb-16 text-center w-full flex flex-col items-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">Our Research Assistants</span>
            </h2>
            <p className="mt-4 text-base text-zinc-500 font-medium">
              The Bright Minds Driving Our Laboratory's Publications And
              Innovations.
            </p>
            <Link
              href="/team"
              className="mt-8 inline-flex h-[42px] items-center justify-center rounded-none px-8 text-[13px] font-medium bg-brand text-white transition-all hover:opacity-90 active:scale-95 border-t border-white/10 shadow-lg shadow-brand/20"
            >
              Meet All Team Members
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="group flex flex-col items-start rounded-none border border-zinc-100 bg-zinc-50/50 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-brand/5 hover:border-brand/20"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-none border-2 border-zinc-50 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold">{expert.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mt-1">
                    {expert.title}
                  </p>
                  <p className="mt-4 text-sm text-zinc-500 leading-relaxed font-medium line-clamp-3">
                    {expert.bio}
                  </p>
                </div>
                <Link
                  href="/team"
                  className="mt-6 inline-flex items-center text-[13px] font-medium text-brand hover:gap-2 transition-all"
                >
                  Profile <span className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomCTA />
    </div>
  );
}
