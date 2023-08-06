
import Balancer from "react-wrap-balancer";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Landing() {
  return (
    <>
      <div className="z-10 max-w-3xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Welcome to CodeClimb </Balancer>
          <Balancer>Meet your interview AI assistant</Balancer>
        </h1>
 
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href={""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowRightIcon className="h-6 w-6"/>
            <p className="text"> Get Started</p>
          </a>
        </div>
      </div>
    </>
  )
}