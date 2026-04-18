"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface PageProps {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: PageProps) {
  const router = useRouter();
  const { token } = params; // token comes from the dynamic route, not from query string

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      setMessage("Please fill in all fields");
      setError(true);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successfully. Redirecting to login...");
        setError(false);
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          router.push("/users/login"); // adjust to your actual login path
        }, 2000);
      } else {
        setMessage(data.error || "Failed to reset password");
        setError(true);
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleReset();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Reset your password
          </h1>
          <p className="text-gray-600">
            Enter a new password to secure your account.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900
                         focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                         disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                         placeholder:text-gray-400 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M15.171 13.591l1.473 1.473a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l1.473 1.473A10.016 10.016 0 00.458 10C1.732 14.057 5.522 17 10 17a9.958 9.958 0 004.512-1.074l1.473 1.473a1 1 0 001.414-1.414l-14-14z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-900 mb-2">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900
                         focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                         disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                         placeholder:text-gray-400 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M15.171 13.591l1.473 1.473a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l1.473 1.473A10.016 10.016 0 00.458 10C1.732 14.057 5.522 17 10 17a9.958 9.958 0 004.512-1.074l1.473 1.473a1 1 0 001.414-1.414l-14-14z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`text-sm px-4 py-3 rounded ${
                error
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleReset}
            disabled={loading || !password.trim() || !confirmPassword.trim()}
            className="w-full bg-gray-900 text-white px-4 py-2.5 rounded font-medium
                     hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed
                     transition-colors text-sm"
          >
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link href="/users/login" className="text-gray-900 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}