"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {  useState } from "react";
import { API_BASE_URL } from "../../components/utils/api_url";
import AuthShell from "../login/AuthShell";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const searchParams = useSearchParams();
    // Read email + token from query params (reset link you send in email should contain them)
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const createNewPassword = async  (e:  React.FormEvent) => {
   e.preventDefault();
    setLoading(true);
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          type: "API",
          email: email,
          token: token,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();
      setMessage(data.message || "Password updated successfully!");

      if (res.ok) {
        setTimeout(() => router.push("/"), 2000); // Redirect back to login
      }
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
          <p className="mb-2 text-sm font-semibold text-[#FF6A00]">
            Create New Password
          </p>
          <h1 className="text-3xl font-bold text-[#1F2A6D]">
            Reset Password
          </h1>
        </div>

        {!isSuccess ? (
          <form onSubmit={createNewPassword} className="space-y-5">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-[#1F2A6D] mb-2">Create New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-3 border border-[#DCE8FF] rounded-xl bg-white text-[#1F2A6D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/40 focus:border-[#FF6A00] transition-all text-[15px]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1F2A6D] mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full px-4 py-3 border border-[#DCE8FF] rounded-xl bg-white text-[#1F2A6D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/40 focus:border-[#FF6A00] transition-all text-[15px]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 bg-[#3B5BF5] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#2563EB] active:bg-[#1F2A6D] shadow-md shadow-[#3B5BF5]/30 hover:shadow-lg hover:shadow-[#3B5BF5]/40'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full rounded-xl bg-[#3B5BF5] px-4 py-3.5 font-semibold text-white shadow-md shadow-[#3B5BF5]/30 transition-all hover:bg-[#2563EB]"
          >
            Login Again
          </button>
        )}

        {message && (
          <p
            className={`mt-5 rounded-xl px-4 py-3 text-sm font-medium ${
              isSuccess
                ? "bg-green-50 text-green-700"
                : "bg-[#FFF4ED] text-[#C2410C]"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </AuthShell>
  );
}
