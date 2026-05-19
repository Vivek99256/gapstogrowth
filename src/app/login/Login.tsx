"use client";

import Image from "next/image";
import { API_BASE_URL } from "../../components/utils/api_url";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [logMessage, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setSubmitting(true);

    // get server
    try {
      const response = await fetch(
        `${API_BASE_URL}/login?email=${email}&password=${password}&type=API`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setSubmitting(false);
      // console.log("data=", data);
      if (data.status === 0) {
        setMessage(data.message);
      } 
      else if(data.status===1) {
        // store user data in local storage
        setMessage('');
        localStorage.setItem("userData", JSON.stringify(data.sessionData));
        localStorage.setItem("loggedTime", new Date().toISOString());
        router.push("/Maindashboard");
      }
    } catch (error) {
      setSubmitting(false);
      setMessage(`Error fetching menu items: ${error}`);
      console.error("Error fetching menu items:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      {/* ══════════ Glassmorphism Background ══════════ */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* ── LAYER 0: Soft gradient canvas ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3F0FF] via-[#EDF2FF] to-[#FFF5EE] opacity-100" />

        {/* ── LAYER 1: Large soft-edge glass circle — LEFT ── */}
        <div className="absolute -top-[120px] -left-[180px] w-[680px] h-[680px] rounded-full bg-white/[0.08] backdrop-blur-[60px]
                        shadow-[0_8px_40px_12px_rgba(59,91,245,0.07)]
                        border border-white/20" />

        {/* ── LAYER 2: Diagonal frosted-glass panel — LEFT ── */}
        <div className="absolute top-[8%] left-0 w-[460px] h-[460px] -rotate-[18deg]
                        bg-white/[0.09] backdrop-blur-[50px]
                        shadow-[0_12px_60px_20px_rgba(59,91,245,0.08),inset_0_1px_0_0_rgba(255,255,255,0.35)]
                        border border-white/25 rounded-[32px]" />

        {/* ── LAYER 3: Large glass rounded-rect — RIGHT ── */}
        <div className="absolute bottom-[5%] -right-[140px] w-[520px] h-[420px] rounded-[36px]
                        bg-white/[0.07] backdrop-blur-[55px]
                        shadow-[0_10px_50px_18px_rgba(31,42,109,0.08),inset_0_1px_0_0_rgba(255,255,255,0.30)]
                        border border-white/20" />

        {/* ── LAYER 4: Floating glass sphere — RIGHT accent ── */}
        <div className="absolute top-[22%] -right-[80px] w-[260px] h-[260px] rounded-full
                        bg-gradient-to-br from-[#FF6A00]/[0.10] to-[#FF7A1A]/[0.06]
                        backdrop-blur-[40px]
                        shadow-[0_6px_30px_10px_rgba(255,106,0,0.07),inset_0_1px_0_0_rgba(255,255,255,0.30)]
                        border border-white/25" />

        {/* ── LAYER 5: Soft navy glow — upper center ── */}
        <div className="absolute top-[5%] left-[38%] w-[320px] h-[320px] rounded-full
                        bg-[radial-gradient(circle_at_center,#3B5BF5_0%,transparent_65%)]
                        opacity-[0.05] blur-[40px]" />

        {/* ── LAYER 6: Dotted micro-pattern overlay — faint ── */}
        <div className="absolute inset-0 opacity-[0.018]"
             style={{
               backgroundImage: `radial-gradient(circle, #1F2A6D 1.2px, transparent 1.2px)`,
               backgroundSize: '28px 28px',
             }} />

        {/* ── LAYER 7: Top line accent — glass border ── */}
        <div className="absolute top-0 left-[15%] right-[15%] h-px
                        bg-gradient-to-r from-transparent via-[#1F2A6D]/15 to-transparent" />

        {/* ── LAYER 8: Bottom strip gradient — navy ↘ orange ── */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none
                        bg-gradient-to-t from-[#1F2A6D]/[0.04] via-transparent to-transparent
                        opacity-70" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-[#1F2A6D]/10 overflow-hidden flex flex-col lg:flex-row">
        {/* ── Left Panel: Branding ── */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[#3B5BF5] via-[#2563EB] to-[#1F2A6D] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <pattern id="circles" x={0} y={0} width={60} height={60} patternUnits="userSpaceOnUse">
                <circle cx={30} cy={30} r={28} fill="none" stroke="white" strokeWidth={0.6} />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circles)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Cityscape Illustration */}
            <div className="w-full max-w-xs mb-10">
              <svg viewBox="0 0 320 180" className="w-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                {/* Sky glow */}
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
                {/* Atmosphere glow */}
                <rect x="0" y="40" width="320" height="140" rx="8" fill="url(#sky)" />

                {/* Far buildings */}
                <g opacity="0.3">
                  <rect x="10" y="80" width="28" height="100" rx="2" fill="#1F2A6D" />
                  <rect x="42" y="60" width="22" height="120" rx="2" fill="#1F2A6D" />
                  <rect x="260" y="90" width="50" height="90" rx="2" fill="#1F2A6D" />
                  <rect x="285" y="50" width="25" height="130" rx="2" fill="#1F2A6D" />
                </g>

                {/* Mid buildings */}
                <g opacity="0.5">
                  <rect x="55" y="85" width="40" height="95" rx="3" fill="#1F2A6D" />
                  <rect x="100" y="95" width="30" height="85" rx="3" fill="#1F2A6D" />
                  <rect x="200" y="88" width="42" height="92" rx="3" fill="#1F2A6D" />
                </g>

                {/* Main buildings */}
                <rect x="135" y="30" width="55" height="150" rx="6" fill="url(#bldg)" />
                <rect x="135" y="42" width="55" height="18" rx="4" fill="url(#glass)" />

                {/* Glass windows on main building */}
                {[58, 78, 98, 118, 138].map((y) => (
                  <g key={y}>
                    <rect x="140" y={y} width="10" height="12" rx="2" fill="url(#glass)" />
                    <rect x="155" y={y} width="10" height="12" rx="2" fill="url(#glass)" />
                    <rect x="170" y={y} width="10" height="12" rx="2" fill="url(#glass)" />
                  </g>
                ))}

                {/* Tower building */}
                <rect x="196" y="10" width="38" height="170" rx="6" fill="url(#bldg2)" />
                <rect x="203" y="20" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="215" y="30" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="203" y="44" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="215" y="58" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="203" y="72" width="8" height="8" rx="2" fill="url(#glass)" />
                <rect x="215" y="86" width="8" height="8" rx="2" fill="url(#glass)" />

                {/* Front buildings */}
                <rect x="245" y="90" width="38" height="90" rx="5" fill="url(#bldg)" />
                {/* Windows */}
                {[98, 118, 138, 158].map((y) => (
                  <g key={`f-${y}`}>
                    <rect x="250" y={y} width="9" height="10" rx="2" fill="url(#glass)" />
                    <rect x="263" y={y} width="9" height="10" rx="2" fill="url(#glass)" />
                    <rect x="276" y={y} width="9" height="10" rx="2" fill="url(#glass)" />
                  </g>
                ))}

                {/* Short front building */}
                <rect x="55" y="118" width="50" height="62" rx="5" fill="url(#bldg2)" />
                {[125, 140, 155, 170].map((y) => (
                  <g key={`s-${y}`}>
                    <rect x="60" y={y} width="11" height="10" rx="2" fill="url(#glass)" />
                    <rect x="75" y={y} width="11" height="10" rx="2" fill="url(#glass)" />
                    <rect x="90" y={y} width="11" height="10" rx="2" fill="url(#glass)" />
                  </g>
                ))}

                {/* Trees */}
                <g opacity="0.6">
                  <ellipse cx="120" cy="165" rx="16" ry="15" fill="#4ADE80" />
                  <rect x="117" y="168" width="6" height="12" rx="2" fill="#78350F" />
                  <ellipse cx="230" cy="168" rx="14" ry="13" fill="#4ADE80" />
                  <rect x="227" y="170" width="6" height="10" rx="2" fill="#78350F" />
                </g>

                {/* Ground line */}
                <line x1="10" y1="180" x2="310" y2="180" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>

            {/* Brand */}
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

        {/* ── Right Panel: Login Form ── */}
        <div className="lg:w-1/2 bg-[#F8FAFF] px-6 sm:px-10 lg:px-14 py-10 lg:py-14 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-[#1F2A6D] text-3xl font-bold mb-1">Hello Again!</h2>
            <p className="text-zinc-500 mb-8">Welcome Back</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1F2A6D] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-[#DCE8FF] rounded-xl bg-white text-[#1F2A6D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/40 focus:border-[#FF6A00] transition-all text-[15px]"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#1F2A6D] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 border border-[#DCE8FF] rounded-xl bg-white text-[#1F2A6D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/40 focus:border-[#FF6A00] transition-all text-[15px] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1F2A6D] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-semibold text-[#FF6A00] hover:text-[#FF7A1A] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#3B5BF5] hover:bg-[#2563EB] active:bg-[#1F2A6D] text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#3B5BF5]/30 hover:shadow-lg hover:shadow-[#3B5BF5]/40"
              >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

                                                                                            

   








          