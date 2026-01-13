import Image from "next/image";
import { Service } from "@/app/lib/data";

type Props = {
  service: Service;
  reverse?: boolean;
};

export default function ServiceCard({ service, reverse = false }: Props) {
  return (
    <div
      className={`flex flex-col gap-12 py-16 md:flex-row md:items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-none border border-zinc-100 bg-zinc-50/50 group">
          <Image
            src={service.image}
            alt={service.title}
            width={160}
            height={160}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4 block">
          Service Offering
        </span>
        <h3 className="text-3xl font-semibold tracking-tight text-black leading-tight">
          {service.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-zinc-500 font-medium">
          {service.description}
        </p>
        <div className="mt-8">
          <button className="inline-flex h-[42px] items-center justify-between rounded-none pl-4 pr-3 py-0 text-[12px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 bg-brand text-white border-t border-r border-b border-white/10 min-w-[160px] whitespace-nowrap after:content-['→'] after:ml-2.5 after:flex after:h-5 after:w-5 after:items-center after:justify-center after:rounded-none after:bg-white/10 after:text-white">
            Inquire Details
          </button>
        </div>
      </div>
    </div>
  );
}
