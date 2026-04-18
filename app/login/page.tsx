"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import BackgroundImage from "@/public/background.png"
export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.trim() && user.password.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);

      await axios.post("/api/users/login", user);

      toast.success("Login successful 🎉");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Layer with overlay for text readability */}
      <div 
  className="absolute inset-0"
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

      {/* Glassmorphism Card Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          
          {/* Visual Hierarchy - Heading Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              {loading ? "Processing..." : "Welcome Back"}
            </h1>
            <p className="text-gray-700 text-sm font-medium">
              Sign in to continue to your account
            </p>
          </div>

          {/* Visual Hierarchy - Form Section */}
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 bg-white/80 hover:bg-white/90
                         placeholder:text-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 bg-white/80 hover:bg-white/90
                         placeholder:text-gray-400"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={onLogin}
              disabled={buttonDisabled || loading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-200
                ${buttonDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Visual Hierarchy - Footer Section */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <p className="text-center text-sm text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all duration-200">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}