import { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3F0FF] via-[#EDF2FF] to-[#FFF5EE] opacity-100" />

        <div className="absolute -top-[120px] -left-[180px] w-[680px] h-[680px] rounded-full bg-white/[0.08] backdrop-blur-[60px]
                        shadow-[0_8px_40px_12px_rgba(59,91,245,0.07)]
                        border border-white/20" />

        <div className="absolute top-[8%] left-0 w-[460px] h-[460px] -rotate-[18deg]
                        bg-white/[0.09] backdrop-blur-[50px]
                        shadow-[0_12px_60px_20px_rgba(59,91,245,0.08),inset_0_1px_0_0_rgba(255,255,255,0.35)]
                        border border-white/25 rounded-[32px]" />

        <div className="absolute bottom-[5%] -right-[140px] w-[520px] h-[420px] rounded-[36px]
                        bg-white/[0.07] backdrop-blur-[55px]
                        shadow-[0_10px_50px_18px_rgba(31,42,109,0.08),inset_0_1px_0_0_rgba(255,255,255,0.30)]
                        border border-white/20" />

        <div className="absolute top-[22%] -right-[80px] w-[260px] h-[260px] rounded-full
                        bg-gradient-to-br from-[#FF6A00]/[0.10] to-[#FF7A1A]/[0.06]
                        backdrop-blur-[40px]
                        shadow-[0_6px_30px_10px_rgba(255,106,0,0.07),inset_0_1px_0_0_rgba(255,255,255,0.30)]
                        border border-white/25" />

        <div className="absolute top-[5%] left-[38%] w-[320px] h-[320px] rounded-full
                        bg-[radial-gradient(circle_at_center,#3B5BF5_0%,transparent_65%)]
                        opacity-[0.05] blur-[40px]" />

        <div className="absolute inset-0 opacity-[0.018]"
             style={{
               backgroundImage: `radial-gradient(circle, #1F2A6D 1.2px, transparent 1.2px)`,
               backgroundSize: '28px 28px',
             }} />

        <div className="absolute top-0 left-[15%] right-[15%] h-px
                        bg-gradient-to-r from-transparent via-[#1F2A6D]/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none
                        bg-gradient-to-t from-[#1F2A6D]/[0.04] via-transparent to-transparent
                        opacity-70" />
      </div>

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-[#1F2A6D]/10 overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-gradient-to-br from-[#3B5BF5] via-[#2563EB] to-[#1F2A6D] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <pattern id="circles" x={0} y={0} width={60} height={60} patternUnits="userSpaceOnUse">
                <circle cx={30} cy={30} r={28} fill="none" stroke="white" strokeWidth={0.6} />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circles)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-full max-w-xs mb-10">
              <svg viewBox="0 0 320 180" className="w-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#1F2A6D" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#1F2A6D" />
                  </linearGradient>
                  <linearGradient id="bldg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <rect x="0" y="40" width="320" height="140" rx="8" fill="url(#sky)" />

                <g opacity="0.3">
                  <rect x="10" y="80" width="28" height="100" rx="2" fill="#1F2A6D" />
                  <rect x="42" y="60" width="22" height="120" rx="2" fill="#1F2A6D" />
                  <rect x="260" y="90" width="50" height="90" rx="2" fill="#1F2A6D" />
                  <rect x="285" y="50" width="25" height="130" rx="2" fill="#1F2A6D" />
                </g>

                <g opacity="0.5">
                  <rect x="55" y="85" width="40" height="95" rx="3" fill="#1F2A6D" />
                  <rect x="100" y="95" width="30" height="85" rx="3" fill="#1F2A6D" />
                  <rect x="200" y="88" width="42" height="92" rx="3" fill="#1F2A6D" />
                </g>

                <rect x="135" y="30" width="55" height="150" rx="6" fill="url(#bldg)" />
                <rect x="135" y="42" width="55" height="18" rx="4" fill="url(#glass)" />

                {[58, 78, 98, 118, 138].map((y) => (
                  <g key={y}>
                    <rect x="140" y={y} width="10" height="12" rx="2" fill="url(#glass)" />
                    <rect x="155" y={y} width="10" height="12" rx="2" fill="url(#glass)" />
                    <rect x="170" y={y} width="10" height="12" rx="2" fill="url(#glass)" />
                  </g>
                ))}

                <rect x="196" y="10" width="38" height="170" rx="6" fill="url(#bldg2)" />
                <rect x="203" y="20" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="215" y="30" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="203" y="44" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="215" y="58" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="203" y="72" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="215" y="86" width="8" height="8" rx="2" fill="url(#glass)" />

                <rect x="245" y="90" width="38" height="90" rx="5" fill="url(#bldg)" />
                {[98, 118, 138, 158].map((y) => (
                  <g key={`f-${y}`}>
                    <rect x="250" y={y} width="9" height="10" rx="2" fill="url(#glass)" />
                    <rect x="263" y={y} width="9" height="10" rx="2" fill="url(#glass)" />
                    <rect x="276" y={y} width="9" height="10" rx="2" fill="url(#glass)" />
                  </g>
                ))}

                <rect x="55" y="118" width="50" height="62" rx="5" fill="url(#bldg2)" />
                {[125, 140, 155, 170].map((y) => (
                  <g key={`s-${y}`}>
                    <rect x="60" y={y} width="11" height="10" rx="2" fill="url(#glass)" />
                    <rect x="75" y={y} width="11" height="10" rx="2" fill="url(#glass)" />
                    <rect x="90" y={y} width="11" height="10" rx="2" fill="url(#glass)" />
                  </g>
                ))}

                <g opacity="0.6">
                  <ellipse cx="120" cy="165" rx="16" ry="15" fill="#4ADE80" />
                  <rect x="117" y="168" width="6" height="12" rx="2" fill="#78350F" />
                  <ellipse cx="230" cy="168" rx="14" ry="13" fill="#4ADE80" />
                  <rect x="227" y="170" width="6" height="10" rx="2" fill="#78350F" />
                </g>

                <line x1="10" y1="180" x2="310" y2="180" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#FF6A00] flex items-center justify-center shadow-lg shadow-[#FF6A00]/40">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Gaps to Growth</h1>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-3 tracking-tight">
              Empowering skills for a <br />brighter future
            </h2>
            <p className="text-white/55 text-xs sm:text-sm leading-relaxed max-w-[260px] font-normal">
              Skill-building for people and organizations.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 bg-[#F8FAFF] px-6 sm:px-10 lg:px-14 py-10 lg:py-14 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
