"use client";

import Image from "next/image";
import { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative h-screen overflow-hidden bg-[linear-gradient(135deg,#f8f9ff_0%,#ffffff_100%)] text-[#071957]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(46,58,140,0.18),transparent_34%),radial-gradient(circle_at_91%_72%,rgba(255,106,0,0.20),transparent_32%)]" />
      <div className="absolute left-[-11%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(46,58,140,0.26),transparent_68%)] blur-2xl" />
      <div className="absolute right-[-7%] bottom-[4%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.30),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-[48%] lg:block">
        <div className="absolute inset-x-0 bottom-[44px] h-[255px] bg-[#2e3a8c]/10 blur-[2px] [clip-path:ellipse(66%_42%_at_32%_70%)]" />
        <div className="absolute inset-x-0 bottom-[18px] h-[245px] bg-[#1f2a6d]/15 blur-[1.5px] [clip-path:ellipse(69%_42%_at_53%_68%)]" />
        <div className="absolute inset-x-0 bottom-[68px] h-[238px] bg-[linear-gradient(112deg,rgba(46,58,140,0.10),rgba(255,122,26,0.12))] [clip-path:polygon(0_42%,18%_64%,35%_72%,53%_40%,70%_24%,86%_45%,100%_34%,100%_100%,0_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[235px] bg-[linear-gradient(90deg,#0f1d63_0%,#1f2a6d_58%,#2e3a8c_100%)] [clip-path:polygon(0_26%,13%_36%,30%_60%,47%_54%,64%_42%,82%_26%,100%_8%,100%_100%,0_100%)]" />
        <div className="absolute right-[2%] bottom-[14%] h-[260px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.28),transparent_68%)] blur-2xl" />
      </div>

      <section className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="relative hidden h-full flex-col overflow-hidden px-6 py-4 sm:px-10 sm:py-5 lg:flex lg:px-14 lg:py-5 xl:px-20">
          <div className="relative z-20 h-[98px] w-[186px] overflow-hidden sm:h-[112px] sm:w-[214px]">
            <Image
              src="/assets/loading/gapstogrowth.png"
              alt="Gaps to Growth"
              width={260}
              height={260}
              priority
              className="absolute -left-[23px] -top-[58px] h-[230px] w-[230px] max-w-none sm:-left-[26px] sm:-top-[62px] sm:h-[260px] sm:w-[260px]"
            />
          </div>

          <div className="relative z-20 mt-2 max-w-2xl sm:mt-3 lg:mt-4">
            <h1 className="text-[34px] font-extrabold leading-[1.16] tracking-normal text-[#071c66] sm:text-[46px] lg:text-[48px] xl:text-[54px] 2xl:text-[58px]">
              Bridging Gaps,
              <br />
              Accelerating{" "}
              <span className="text-[#ff5b05]">Growth</span>
            </h1>
            <p className="mt-4 max-w-[560px] text-base leading-7 text-[#526083] xl:text-lg">
              Empowering organizations to build the right skills,
              <br className="hidden sm:block" />
              assign the right roles, and unlock the right opportunities
              <br className="hidden sm:block" />
              for everyone.
            </p>
          </div>

          <RocketIllustration />

          <QuoteSection />

          <DotPattern className="left-2 bottom-[92px]" />
          <DotPattern className="right-4 bottom-[96px] hidden lg:block" />
        </div>

        <div className="relative flex h-full items-center justify-center px-5 py-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-[#1f2a6d]/10 to-transparent lg:block" />
          <div className="w-full max-w-[540px] rounded-[20px] border border-[#d9dfec] bg-white/95 px-6 py-6 shadow-[0_24px_80px_rgba(16,31,82,0.14)] backdrop-blur-sm sm:px-8 sm:py-7 lg:px-10 lg:py-7 xl:px-11 2xl:max-w-[560px]">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

function RocketIllustration() {
  return (
    <div className="absolute bottom-[315px] left-[78%] z-30 hidden h-[320px] w-[545px] -translate-x-1/2 sm:block lg:bottom-[188px] lg:left-[37%] lg:h-[348px] lg:w-[610px] lg:translate-x-0 xl:bottom-[200px] xl:left-[37%] xl:h-[372px] xl:w-[650px] 2xl:bottom-[212px] 2xl:left-[38%] 2xl:h-[392px] 2xl:w-[680px]">
      <svg
        viewBox="0 -70 590 370"
        className="h-full w-full overflow-visible drop-shadow-[0_28px_22px_rgba(255,91,5,0.22)]"
        role="img"
        aria-label="Growth rocket illustration"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="barBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E3A8C" />
            <stop offset="100%" stopColor="#1F2A6D" />
          </linearGradient>
          <linearGradient id="barOrange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7A1A" />
            <stop offset="100%" stopColor="#FF6A00" />
          </linearGradient>
          <linearGradient id="barOrangeLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD0A3" />
            <stop offset="100%" stopColor="#FF9A3D" />
          </linearGradient>
          <linearGradient id="trail" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE0A8" />
            <stop offset="52%" stopColor="#FF7A1A" />
            <stop offset="100%" stopColor="#FF6A00" />
          </linearGradient>
          <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c9d6ff" />
          </linearGradient>
        </defs>

        {[26, 82, 138, 194, 250, 306, 362, 418, 474].map((x, index) => (
          <rect
            key={x}
            x={x}
            y={236 - index * 27}
            width="34"
            height={54 + index * 27}
            rx="4"
            fill={index < 4 ? "url(#barBlue)" : index > 3 ? "url(#barOrangeLight)" : "url(#barOrange)"}
            opacity={index === 3 ? 0.72 : index > 3 ? 0.82 : 1}
          />
        ))}

        <path
          d="M18 276C142 256 273 210 396 42"
          fill="none"
          stroke="#fff5cf"
          strokeWidth="7"
          strokeLinecap="round"
          opacity=".95"
        />
        <path
          d="M28 273C158 248 293 193 414 26"
          fill="none"
          stroke="url(#trail)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M74 262C192 232 305 174 420 34"
          fill="none"
          stroke="#ffc76e"
          strokeWidth="5"
          strokeLinecap="round"
          opacity=".9"
        />
        <path
          d="M324 164C358 133 388 82 414 26"
          fill="none"
          stroke="#ff6a00"
          strokeWidth="8"
          strokeLinecap="round"
          opacity=".72"
        />

        <g transform="translate(396 -44) rotate(34)">
          <path d="M18 94C-6 101-18 113-26 135C-1 130 17 119 31 100Z" fill="#FF6A00" />
          <path d="M88 94C112 101 124 113 132 135C107 130 89 119 75 100Z" fill="#FF6A00" />
          <path d="M51 96L28 139H78Z" fill="#1F2A6D" />
          <path d="M52 0C17 35 8 72 21 112H83C96 72 87 35 52 0Z" fill="url(#rocketBody)" />
          <path d="M52 0C41 11 33 23 27 36H77C71 23 63 11 52 0Z" fill="#FF6A00" />
          <circle cx="52" cy="58" r="13" fill="#141b46" />
          <path d="M41 115C33 136 32 158 37 181C52 158 62 137 64 115Z" fill="#FF7A1A" />
        </g>
      </svg>
    </div>
  );
}

function QuoteSection() {
  return (
    <div className="absolute bottom-6 left-6 z-40 max-w-[calc(100%-48px)] text-[14px] font-semibold text-white sm:bottom-7 sm:left-[10%] sm:text-[17px] lg:left-[18%]">
      <span className="text-[#ff7a05]">&ldquo;</span>
      Growth happens when preparation meets{" "}
      <span className="text-[#ff7a05]">opportunity.</span>
      <span className="text-[#ff7a05]">&rdquo;</span>
    </div>
  );
}

function DotPattern({ className }: { className: string }) {
  return (
    <div
      className={`absolute z-20 h-24 w-28 opacity-60 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.82) 2px, transparent 2px)",
        backgroundSize: "18px 18px",
      }}
    />
  );
}