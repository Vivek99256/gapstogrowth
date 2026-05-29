"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import AuthShell from "./AuthShell";
import { API_BASE_URL } from "../../components/utils/api_url";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [logMessage, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

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

      if (data.status === 0) {
        setMessage(data.message);
      } else if (data.status === 1) {
        setMessage("");
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
    <AuthShell 
      heading="Welcome Back!"
      description="Login to continue your growth journey"
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            <Mail className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a96b6]" />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-[#111b45]"
          >
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
              className="h-[52px] w-full rounded-xl border border-[#d4dae8] bg-white px-5 pr-24 text-base text-[#111b45] shadow-[0_4px_10px_rgba(17,27,69,0.03)] outline-none transition placeholder:text-[#8b95b7] focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20"
            />
            <Lock className="absolute right-[62px] top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a96b6]" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#8a96b6] transition hover:text-[#071c66]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 text-sm">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="font-medium text-[#0069ff] transition hover:text-[#ff5b05]"
          >
            Forgot Password?
          </button>
        </div>

        {logMessage && (
          <p className="rounded-lg bg-[#fff4ed] px-4 py-3 text-sm font-medium text-[#c2410c]">
            {logMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex h-[52px] w-full items-center justify-center rounded-xl bg-[linear-gradient(100deg,#14258e_0%,#671d69_45%,#ff5b05_100%)] px-4 text-base font-bold text-white shadow-[0_13px_22px_rgba(255,91,5,0.14)] transition ${isSubmitting
              ? "cursor-not-allowed opacity-80"
              : "hover:brightness-105 active:scale-[0.99]"
              }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-6 text-sm font-semibold text-[#7882a0]">
        <span className="h-px flex-1 bg-[#dce2ef]" />
        OR
        <span className="h-px flex-1 bg-[#dce2ef]" />
      </div>

      <button
        type="button"
        className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-[#aeb7d0] bg-white px-4 text-base font-bold text-[#111b45] transition hover:border-[#071c66] hover:bg-[#f8faff]"
      >
        <GoogleIcon />
        Login with Google
      </button>

      <p className="mt-5 text-center text-sm text-[#5f6a89]">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="font-semibold text-[#0069ff] transition hover:text-[#ff5b05]"
        >
          Sign Up
        </button>
      </p>
    </AuthShell>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}