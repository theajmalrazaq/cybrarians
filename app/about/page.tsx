import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Cybrarians Research Group",
  description: "Learn about our mission and research focus.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">About Us</h1>
          <p className="mt-4 text-lg text-muted">
            Cybrarians is an academic research group dedicated to advancing
            knowledge in computer science, information systems, and emerging
            technologies.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Our Mission
          </h2>
          <p className="text-muted leading-relaxed">
            To foster innovation and excellence in academic research by creating
            a supportive environment where Research Assistants mentor students,
            knowledge is shared freely, and groundbreaking ideas are transformed
            into impactful solutions for real-world problems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            What We Do
          </h2>
          <p className="text-muted leading-relaxed">
            Our research spans machine learning, natural language processing,
            blockchain technology, IoT systems, and more. We collaborate with
            industry partners to bridge the gap between academic research and
            practical applications.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Join Us
          </h2>
          <p className="text-muted leading-relaxed">
            We are always looking for motivated students and researchers to join
            our team. If you are interested in contributing to cutting-edge
            research, reach out to us.
          </p>
        </section>
      </div>
    </div>
  );
}
