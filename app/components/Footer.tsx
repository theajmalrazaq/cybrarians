import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "Exploration",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Research", href: "/research" },
      { label: "Blog", href: "/blog" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "Connection",
    links: [
      { label: "GitHub Repository", href: "https://github.com" },
      { label: "LinkedIn Profile", href: "https://linkedin.com" },
      { label: "Research Scholar", href: "#" },
      { label: "X / Twitter", href: "https://x.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative -top-10 z-20 mx-5 mb-5 border border-border bg-white/10 backdrop-blur-sm py-16 md:py-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-bold tracking-tighter hover:text-brand transition-colors">
                CYBRARIANS
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-zinc-500 font-medium leading-relaxed">
              Pioneering the future of collaborative research and academic
              innovation in the digital age. A dedicated collective building the
              future of AI-driven classification, secure authentication, and
              institutional knowledge preservation.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                {section.title}
              </h4>
              <ul className="mt-6 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-brand transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-100 pt-8 md:flex-row">
          <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-widest">
            © 2026 Cybrarians Research Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
