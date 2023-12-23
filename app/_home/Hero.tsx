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
        <p className="mt-5  text-slate-600 ">
          Dive into a world where opens the doors to limitless possibilities. We
          are not just a blog; we are a journey of exploration, discovery, and
          inspiration. Here, we curate content that transcends boundaries,
          bringing you the latest insights, trends, and stories that matter.
        </p>
      </div>
      <Image
        src={learnImg}
        alt="Learn from the best"
        className="aspect-video object-cover rounded-md"
      />
    </div>
  );
};
