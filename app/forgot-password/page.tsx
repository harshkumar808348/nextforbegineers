"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage("Please enter your email address");
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setError(false);
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong");
        setError(true);
      }
    } catch (err) {
      setMessage("Failed to send reset link");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Forgot your password?
          </h1>
          <p className="text-gray-600">
            Enter your email and we'll send you a link to reset it.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-gray-900
                       focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                       disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                       placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Message */}
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !email.trim()}
            className="w-full bg-gray-900 text-white px-4 py-2.5 rounded font-medium
                     hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed
                     transition-colors text-sm"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-gray-900 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 