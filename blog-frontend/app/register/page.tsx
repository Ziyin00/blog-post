"use client";

import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios"; // Import `isAxiosError` for type checking
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock } from "lucide-react"; // Icons for the inputs

// The type definition for form data remains the same.
type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  // ==================================================================
  // YOUR LOGIC - WITH UPGRADED, TYPE-SAFE ERROR HANDLING
  // ==================================================================
  const { register, handleSubmit } = useForm<RegisterData>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: RegisterData) => {
    try {
      await axios.post("/auth/register", data);
      router.push("/login"); // Redirect to login page on successful registration
    } catch (err) {
      // --- THE PERFECTED, TYPE-SAFE ERROR HANDLING ---
      if (isAxiosError(err)) {
        // This is a specific error from the backend via Axios
        setError(
          err.response?.data?.message ||
            "Registration failed. Please check your details."
        );
      } else if (err instanceof Error) {
        // This is a generic JavaScript error (e.g., network issue)
        setError(err.message);
      } else {
        // This is an unexpected error type
        setError("An unexpected error occurred during registration.");
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
