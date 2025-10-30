"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // 🔹 Try signing in without redirect first
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    // 🔹 Fetch session info to check user role
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    // ✅ Conditional redirect based on role
    if (session?.user?.role === "nonprofit") {
      window.location.href = "/dashboard/nonprofit";
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-card w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-light transition"
          >
            Sign In
          </button>

          {error && <p className="text-error text-center text-sm mt-3">{error}</p>}
        </form>

        <p className="text-sm text-center text-text-secondary mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-medium hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </main>
  );
}
