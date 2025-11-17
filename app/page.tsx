import Stories from "@/components/storeis";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="container mx-auto px-4 py-6">
        <Stories />
      </div>
      {/*  Signature */}
      <div className={"fixed text-sm bottom-3 right-3 animate-pulse"}>
        By Ronald Tchuekou <br />{" "}
        <Link
          href={"https://roncoder-beta.vercel.app"}
          target={"_blank"}
          className={"text-pink-500"}
        >
          Check my portfolio 💕
        </Link>
      </div>
    </main>
  );
}
