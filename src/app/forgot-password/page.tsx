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
      <section>
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-[#FF6A00]">Forgot Password?</p>
          <h1 className="text-3xl font-bold text-[#1F2A6D]">Reset Password</h1>
        </div>

        <form onSubmit={sendResetLink} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1F2A6D]">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email or mobile number"
              required
              className="w-full rounded-xl border border-[#DCE8FF] bg-white px-4 py-3 text-[15px] text-[#1F2A6D] transition-all placeholder:text-[#94A3B8] focus:border-[#FF6A00] focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/40"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#3B5BF5] px-4 py-3.5 font-semibold text-white shadow-md shadow-[#3B5BF5]/30 transition-all hover:bg-[#2563EB]"
            disabled={isSubmitting}
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
      </section>
    </AuthShell>
  );
}
