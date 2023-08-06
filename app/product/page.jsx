'use client'
import React from 'react';
import setCookie from '@/lib/utils/setCookie';
import Link from 'next/link';

const Page = ({ jwt }) => {
  setCookie('jwt', jwt);
  return (
    <>
      <WelcomePage />
    </>
  );
};
export default Page

const WelcomePage = () => {
  return (
    <div className="font-sans">
      <section className="hero-section min-h-screen flex items-center justify-center">
        <div className="hero-content text-center mb-52">
          <h2 className="text-7xl text-blue-950 font-bold mb-10">Welcome Back to AI Interviewer</h2>
          <div className='flex justify-center'>
            <p className="text-xl text-blue-950 w-1/2 mb-8 leading-8">
              Prepare and Ace Your Developer Interview with AI Assistance. Get personalized interview questions,
              code challenges, and real-time feedback to enhance your skills and boost your confidence.
            </p>
          </div>

          <Link href="/direct"  className="get-started-btn bg-black px-6 py-3 rounded-lg font-semibold  ">
            <button className='text-white'>Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

