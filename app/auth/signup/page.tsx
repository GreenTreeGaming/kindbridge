"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    location: "",
    organization: "",
  });
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-card w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
          />

          <select
            name="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
          >
            <option value="donor">Donor</option>
            <option value="nonprofit">Nonprofit</option>
          </select>

          {form.role === "nonprofit" && (
            <input
              type="text"
              placeholder="Organization Name"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
            />
          )}

          <input
            type="text"
            placeholder="Location"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary"
          />

          <button className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-light transition">
            Sign Up
          </button>

          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>

        {/* ✅ Signin Link */}
        <p className="text-sm text-center text-text-secondary mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  );
}
