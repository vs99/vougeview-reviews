"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          window.dispatchEvent(new Event("userUpdated"));
          toast.success("Login successful!");
          router.push("/");
        } else {
          console.error("Login response missing user data:", data);
          toast.error("Login failed: User data missing from response");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Container styled similar to signup page */}
      <div className="w-full max-w-md bg-[#E0D4C7]/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-[#8B6E4E]">VougeView</h1>
          </Link>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-[#333333]">
          Sign in to your account
        </h2>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#333333]"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                disabled={loading}
                className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#333333]"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                disabled={loading}
                className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-[#8B6E4E] opacity-75"
                  : "bg-[#8B6E4E] hover:bg-[#654E3E]"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6E4E]`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#E0D4C7]/80 text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>
          <div className="mt-6 text-center">
            {/* Render as a simple text link instead of a button */}
            <Link
              href="/auth/register"
              className="font-medium text-[#8B6E4E] hover:text-[#654E3E]"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
