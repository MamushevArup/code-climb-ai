"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import Code_Climb from "@/lib/image/Code_Climb.png";

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src={Code_Climb}
              alt="N17R logo"
              width="150"
              height="150"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>
          <div>
            {session ? (
              <>
                <div className='absolute top-6 right-2/3 cursor-pointer'>
                    <Link href={"direct"}>
                      <p className='text-white'>interview</p>
                    </Link>
                  </div>
                <UserDropdown session={session} />
              </>
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
