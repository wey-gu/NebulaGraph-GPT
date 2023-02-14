import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          nGQL-GPT.siwei.io
        </h1>
      </Link>
      <a
        href="https://github.com/vesoft-inc/nebula"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="NebulaGraph Icon"
          src="/nebulagraph.svg"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a>
    </header>
  );
}
