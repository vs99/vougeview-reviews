"use client";
import { useState } from "react";
import Link from "next/link";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    message: string;
  }>({
    score: 0,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = "";

    if (password.length === 0) {
      setPasswordStrength({ score: 0, message: "" });
      return;
    }

    if (password.length > 7) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score < 2) {
      message = "Weak";
    } else if (score < 4) {
      message = "Medium";
    } else {
      message = "Strong";
    }

    setPasswordStrength({ score, message });
  };

  const getPasswordStrengthColor = () => {
    const { score } = passwordStrength;
    if (score < 2) return "bg-red-500";
    if (score < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error("Please enter your name");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!formData.agreeToTerms) {
        throw new Error("You must agree to the terms and conditions");
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      console.log("User registered:", data);
      window.location.href = "/auth/login";
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
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-[#5A5A5A]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#8B6E4E] hover:text-[#654E3E]"
          >
            Sign in
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#333333]"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-[#333333]"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
                />
              </div>
            </div>
          </div>

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
                value={formData.email}
                onChange={handleChange}
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
              />
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`}
                    style={{
                      width: `${(passwordStrength.score / 5) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password strength: {passwordStrength.message}
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#333333]"
            >
              Confirm password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-[#E0D4C7] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B6E4E] focus:border-[#8B6E4E] sm:text-sm"
              />
            </div>
            {formData.password &&
              formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  Passwords do not match
                </p>
              )}
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-[#E0D4C7] rounded"
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-[#333333]"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-[#8B6E4E] hover:text-[#654E3E]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#8B6E4E] hover:text-[#654E3E]"
              >
                Privacy Policy
              </Link>
            </label>
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
