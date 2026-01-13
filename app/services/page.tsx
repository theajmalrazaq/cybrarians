import { services } from "@/app/lib/data";
import ServiceCard from "@/app/components/ServiceCard";
import PageHero from "@/app/components/PageHero";
import BottomCTA from "@/app/components/BottomCTA";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        badge="Our Expertise"
        title={
          <>
            Specialized Solutions For <br />
            <span className="text-gradient transition-transform duration-500">
              Complex Challenges.
            </span>
          </>
        }
        description="We Bridge The Gap Between Academic Research And Real-World Applications. Partner With Us To Leverage Cutting-Edge Research For Your Organization."
      />

      <div className="w-full px-6 md:px-16 lg:px-24 py-20">
        <div className="space-y-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
      <BottomCTA />
    </div>
  );
}
