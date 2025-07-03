"use client";

import { useForm } from "react-hook-form";
import axios from "@/utils/axios";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginData>();
  const { setToken } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post("/auth/login", data);
      const token = res.data.token;
      setToken(token);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          Login
        </button>
      </form>
    </div>
  );
}
