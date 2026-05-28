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
      <div className="text-center">
        <h2 className="text-[28px] font-extrabold text-[#071c66] sm:text-[34px]">
          Reset <span className="text-[#ff5b05]">Password</span>
        </h2>
        <p className="mt-3 text-base text-[#586485]">
          Create a new password for your account
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={createNewPassword} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-bold text-[#111b45]"
            >
              Create New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter new password"
                required
                className="h-[52px] w-full rounded-xl border border-[#d4dae8] bg-white px-5 pr-14 text-base text-[#111b45] shadow-[0_4px_10px_rgba(17,27,69,0.03)] outline-none transition placeholder:text-[#8b95b7] focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-bold text-[#111b45]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                required
                className="h-[52px] w-full rounded-xl border border-[#d4dae8] bg-white px-5 pr-14 text-base text-[#111b45] shadow-[0_4px_10px_rgba(17,27,69,0.03)] outline-none transition placeholder:text-[#8b95b7] focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex h-[52px] w-full items-center justify-center rounded-xl bg-[linear-gradient(100deg,#14258e_0%,#671d69_45%,#ff5b05_100%)] px-4 text-base font-bold text-white shadow-[0_13px_22px_rgba(255,91,5,0.14)] transition ${isLoading
              ? "cursor-not-allowed opacity-80"
              : "hover:brightness-105 active:scale-[0.99]"
              }`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[linear-gradient(100deg,#14258e_0%,#671d69_45%,#ff5b05_100%)] px-4 text-base font-bold text-white shadow-[0_13px_22px_rgba(255,91,5,0.14)] transition hover:brightness-105"
        >
          Login Again
        </button>
      )}

      {message && (
        <p
          className={`mt-5 rounded-xl bg-[#fff4ed] px-4 py-3 text-sm font-medium text-[#c2410c]`}
        >
          {message}
        </p>
      )}
    </AuthShell>
  );
}
