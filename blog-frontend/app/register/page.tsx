"use client";

import { useForm } from "react-hook-form";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: RegisterData) => {
    try {
      await axios.post("/auth/register", data);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          className="w-full p-2 border rounded"
          placeholder="Full Name"
        />
        <input
          {...register("email")}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
