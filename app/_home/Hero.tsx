import learnImg from "@/assets/cover/learn.jpg";
import Image from "next/image";

interface HeroProps {}

export const Hero = ({ ...rest }: HeroProps) => {
  return (
    <div {...rest} className="grid grid-cols-1 lg:grid-cols-2 px-8 py-2">
      <div>
        <p className="flex items-center font-bold text-2xl">
          Learn From the Best
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae,
          magnam!
        </p>
      </div>
      <Image src={learnImg} alt="Learn from the best" />
    </div>
  );
};


