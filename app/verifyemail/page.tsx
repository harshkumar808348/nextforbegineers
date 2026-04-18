"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      setVerified(false);
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Verify Email</h1>

      {loading && (
        <div>
          <h2 className="text-2xl">Verifying your email...</h2>
        </div>
      )}

      {verified && (
        <div className="bg-green-500 text-white p-4 rounded">
          <h2>Email verified successfully!</h2>
          <p>Your email has been verified.</p>
          <Link href="/login" className="text-white underline">
            Go to Login
          </Link>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-500 text-white p-4 rounded">
          <h2>Error</h2>
          <p>Invalid or expired token. Please try again.</p>
          <Link href="/signup" className="text-white underline">
            Go back to Sign Up
          </Link>
        </div>
      )}

      {!token && !loading && (
        <div>
          <h2>No token provided</h2>
        </div>
      )}
    </div>
  );
}