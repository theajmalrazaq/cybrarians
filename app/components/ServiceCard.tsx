import Image from "next/image";
import { Service } from "@/app/lib/data";

type Props = {
  service: Service;
  reverse?: boolean;
};

export default function ServiceCard({ service, reverse = false }: Props) {
  return (
    <div
      className={`flex flex-col gap-8 py-12 md:flex-row md:items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-surface">
          <Image
            src={service.image}
            alt={service.title}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{service.description}</p>
      </div>
    </div>
  );
}
