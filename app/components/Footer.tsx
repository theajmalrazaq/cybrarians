import Link from "next/link";

const footerLinks = {
  navigation: [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Research", href: "/research" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
  ],
  contact: [
    { name: "Email Us", href: "mailto:contact@cybrarians.edu" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Cybrarians
            </h3>
            <p className="mt-2 text-sm text-muted">
              Academic research group advancing knowledge through collaborative
              research and innovation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Connect
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Cybrarians Research Group. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
