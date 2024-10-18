import Image from "next/image";
import logo from "@/public/hotelhunger-logo.svg"

export default function Home() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="relative max-w-4xl max-h-4xl">
        <Image
          src={logo}
          alt="hotelhunger logo"
          width={500}
          height={500}
          unoptimized
          priority
        />
      </div>
    </div>
  );
}