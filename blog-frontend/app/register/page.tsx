"use client";

import { useForm } from "react-hook-form";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; // Added for the link to the login page
import { User, Mail, Lock } from "lucide-react"; // Added for input icons

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  // ==================================================================
  // YOUR LOGIC - 100% UNCHANGED, AS REQUESTED
  // ==================================================================
  const { register, handleSubmit } = useForm<RegisterData>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: RegisterData) => {
    try {
      await axios.post("/auth/register", data);
      router.push("/login");
    } catch {
      setError("Registration failed");
    }
  };
  // ==================================================================
  // END OF YOUR LOGIC
  // ==================================================================

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // This JSX is structured for our new CSS, but wired to your logic.
  // ==================================================================
  return (
    <main className="page-container">
      <div className="form-container">
        <header className="form-header">
          <h1 className="form-title">Create an Account</h1>
          <p className="form-subtitle">
            Already have an account?{" "}
            <Link href="/login" className="form-link">
              Log in here.
            </Link>
          </p>
        </header>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="form-body">
          {/* Full Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <div className="input-with-icon">
              <User className="input-icon" />
              <input
                id="name"
                {...register("name")}
                className="form-input with-icon"
                placeholder="e.g., Jane Doe"
                required
              />
            </div>
          </div>

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
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
