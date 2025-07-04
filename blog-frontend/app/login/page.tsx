"use client";

import { useForm } from "react-hook-form";
import axios from "@/utils/axios";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; // Added for the link to the register page
import { Mail, Lock } from "lucide-react"; // Added for input icons

// The type definition for form data remains the same.
type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  // ==================================================================
  // YOUR LOGIC - 100% UNCHANGED, AS REQUESTED
  // ==================================================================
  const { register, handleSubmit } = useForm<LoginData>();
  const { setToken } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post("/auth/login", data);
      setToken(res.data.token);
      router.push("/");
    } catch {
      setError("Login failed");
    }
  };
  // ==================================================================
  // END OF YOUR LOGIC
  // ==================================================================

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // This JSX is structured to be perfectly consistent with the Register page.
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
