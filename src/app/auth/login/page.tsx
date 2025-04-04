"use client";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate input fields
      if (!email.trim() || !password.trim()) {
        throw new Error("Please enter both email and password");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("User logged in:", data);
      // Store user data in localStorage for later use (e.g., in Navbar)
      localStorage.setItem("user", JSON.stringify(data.data));

      // Redirect to homepage after successful login
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Translucent brown/beige square container */}
      <div className="w-full max-w-md bg-[#E0D4C7]/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-[#8B6E4E]">VougeView</h1>
          </Link>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-[#333333]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#5A5A5A]">
          Or{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-[#8B6E4E] hover:text-[#654E3E]"
          >
            create a new account
          </Link>
        </p>

        {error && (
          <div
            className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#8B6E4E] focus:ring-[#8B6E4E] border-[#E0D4C7] rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[#5A5A5A]"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-[#8B6E4E] hover:text-[#654E3E]"
              >
                Forgot your password?
              </Link>
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
      </div>
    </div>
  );
};

export default LoginPage;
