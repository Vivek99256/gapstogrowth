"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthShell from "../login/AuthShell";
import { API_BASE_URL } from "../../components/utils/api_url";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const sendResetLink = async (e:  React.FormEvent) => {
   e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/forget-password`, {
        method: "POST",
        body: new URLSearchParams({
          email: email,
          type: "API",
          reset_url: `https://gapstogrowth.vercel.app/resetpassword`, // from your Postman example
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await res.json();
      setMessage(data.message || "Please check your email.");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="text-center">
        <h2 className="text-[28px] font-extrabold text-[#071c66] sm:text-[34px]">
          <span className="text-[#ff5b05]">Forgot Password?</span>
        </h2>
        <p className="mt-3 text-base text-[#586485]">
          Enter your email to reset your password
        </p>
      </div>

      <form onSubmit={sendResetLink} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-[#111b45]"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="h-[52px] w-full rounded-xl border border-[#d4dae8] bg-white px-5 pr-14 text-base text-[#111b45] shadow-[0_4px_10px_rgba(17,27,69,0.03)] outline-none transition placeholder:text-[#8b95b7] focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex h-[52px] w-full items-center justify-center rounded-xl bg-[linear-gradient(100deg,#14258e_0%,#671d69_45%,#ff5b05_100%)] px-4 text-base font-bold text-white shadow-[0_13px_22px_rgba(255,91,5,0.14)] transition ${isSubmitting
            ? "cursor-not-allowed opacity-80"
            : "hover:brightness-105 active:scale-[0.99]"
            }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
        <div className="text-center pt-2">
            <button type="button" onClick={() => router.push('/login')} className="text-sm text-[#FF6A00] font-semibold">Back to Login</button>
          </div>
      </form>

      {message && (
        <p className="mt-5 rounded-xl bg-[#EEF4FF] px-4 py-3 text-sm font-medium text-[#1F2A6D]">{message}</p>
      )}
    </AuthShell>
  );
}
