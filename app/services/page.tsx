import { services } from "@/app/lib/data";
import ServiceCard from "@/app/components/ServiceCard";

export const metadata = {
  title: "Services | Cybrarians",
  description:
    "Partner with us on industry projects, applied research, technical consultation, and training.",
};

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Our Services</h1>
          <p className="mt-4 text-lg text-muted">
            We bridge the gap between academic research and real-world
            applications. Partner with us to leverage cutting-edge research for
            your organization.
          </p>
        </div>

        <div className="divide-y divide-border">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Contact us to discuss how we can help with your project or research
            needs. Our team is ready to collaborate.
          </p>
          <a
            href="mailto:contact@cybrarians.edu"
            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
