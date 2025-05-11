import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:gap-12">
        <div className="flex flex-1 flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Smart Meal Planner
          </h1>
          <p className="max-w-lg text-xl text-slate-700">
            Plan your meals, track your nutrition, and achieve your health goals
          </p>
          <div className="mt-2">
            <Link href="/sign-in">
              <Button size="lg" className="px-8 py-6 text-lg font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <Image
            src="/hero.png"
            alt="Meal planning illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
