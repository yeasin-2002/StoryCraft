import Link from "next/link";
interface LogoProps {}

export const Logo = ({}: LogoProps) => {
  return (
    <Link href={"/"} className="font-bold text-lg  ">
      Story Craft
    </Link>
  );
};
