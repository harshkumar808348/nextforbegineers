"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { token } = params;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirm) return setMessage("Fill all fields");
    if (password.length < 6) return setMessage("Password must be ≥6 characters");
    if (password !== confirm) return setMessage("Passwords don't match");

    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Success! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.error || "Failed");
        setError(true);
      }
    } catch {
      setMessage("Something went wrong");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
        <p className="text-gray-600 mb-5">Enter a new password.</p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-3"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-3"
        />

        {message && (
          <div className={`text-sm p-2 rounded mb-3 ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded disabled:bg-gray-300"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>

        <p className="text-center text-sm mt-4">
          Remember? <Link href="/login" className="font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}