"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/store/auth";
import axios, { isAxiosError } from "axios"; // Import `isAxiosError` for type checking
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react"; // Icons for the inputs

// The type definition for form data remains the same.
type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  // ==================================================================
  // LOGIC WITH UPGRADED, TYPE-SAFE ERROR HANDLING
  // ==================================================================
  const { register, handleSubmit } = useForm<LoginData>();
  const { setToken } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post("/auth/login", data);
      const token = res.data.token;
      setToken(token);
      router.push("/"); // Redirect to homepage on successful login
    } catch (err) {
      // UPGRADED: Type-safe error handling
      if (isAxiosError(err)) {
        // This is a specific error from the backend via Axios
        setError(
          err.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      } else if (err instanceof Error) {
        // This is a generic JavaScript error (e.g., network issue)
        setError(err.message);
      } else {
        // This is an unexpected error type
        setError("An unexpected error occurred during login.");
      }
    }
  };
  // ==================================================================
  // END OF LOGIC
  // ==================================================================

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // ==================================================================
  return (
    <main className="page-container">
      <div className="form-container">
        <header className="form-header">
          <h1 className="form-title">Welcome Back</h1>
          <p className="form-subtitle">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="form-link">
              Sign up for free.
            </Link>
          </p>
        </header>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="form-body">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-with-icon">
              <Mail className="input-icon" />
              <input
                id="email"
                type="email"
                {...register("email")}
                className="form-input with-icon"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-with-icon">
              <Lock className="input-icon" />
              <input
                id="password"
                type="password"
                {...register("password")}
                className="form-input with-icon"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="form-submit-button">
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
