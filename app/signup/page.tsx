"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Enable button only when all fields are filled
  useEffect(() => {
    if (
      user.email.trim() &&
      user.password.trim() &&
      user.username.trim()
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Signup function
  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success:", response.data);

      toast.success("Signup successful 🎉");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed:", error.message);
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Layer with overlay for text readability */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/background.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.3, // Change 0.8 to 0.5, 0.6, 0.7, etc.
          
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glassmorphism Card Container - Compact size */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
          
          {/* Visual Hierarchy - Heading Section */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
              {loading ? "Processing..." : "Create Account"}
            </h1>
            <p className="text-gray-700 text-xs font-medium">
              Join us today and get started
            </p>
          </div>

          {/* Visual Hierarchy - Form Section */}
          <div className="space-y-3">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                placeholder="Choose a username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 bg-white/80 hover:bg-white/90
                         placeholder:text-gray-400"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 bg-white/80 hover:bg-white/90
                         placeholder:text-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                placeholder="Create a strong password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 bg-white/80 hover:bg-white/90
                         placeholder:text-gray-400"
              />
            </div>

            {/* Password Requirements Hint */}
            <div className="text-xs text-gray-600 mt-0.5">
              <p>Password should be at least 6 characters</p>
            </div>

            {/* Signup Button */}
            <button
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-200 mt-1
                ${buttonDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99]"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-4">
            <p className="text-xs text-center text-gray-600">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800 hover:underline">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline">
                Privacy
              </Link>
            </p>
          </div>

          {/* Visual Hierarchy - Footer Section */}
          <div className="mt-4 pt-4 border-t border-gray-200/50">
            <p className="text-center text-xs text-gray-700">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}