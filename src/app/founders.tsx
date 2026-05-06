import { FounderCard } from "@/components/ui/founder-card";
import foundersData from "@/data/founders.json";

export function Founders() {
  return (
    <div className="mt-16 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
      {foundersData.founders.map((founder) => (
        <FounderCard
          key={founder.name}
          name={founder.name}
          role={founder.role}
          image={founder.image}
          rotate={founder.rotate}
          objectPosition={"objectPosition" in founder ? founder.objectPosition : undefined}
          scale={"scale" in founder ? founder.scale : undefined}
        />
      ))}
    </div>
  );
}
