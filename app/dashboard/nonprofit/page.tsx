"use client";

import { useState, useEffect } from "react";

export default function NonprofitDashboard() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    website: "",
    needs: "",
    published: false,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/nonprofits/me");
      const data = await res.json();
      if (data?._id) setForm({ ...data, needs: data.needs?.join(", ") || "" });
    }
    fetchData();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/nonprofits/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, needs: form.needs.split(",").map(n => n.trim()) }),
    });
    if (res.ok) setMessage("✅ Changes saved!");
  }

  async function handlePublish(publish: boolean) {
    const res = await fetch("/api/nonprofits/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publish }),
    });
    const data = await res.json();
    setMessage(data.message);
    setForm({ ...form, published: publish });
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16 flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-card w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Nonprofit Dashboard</h1>
        <form onSubmit={handleSave} className="space-y-5">
          <input
            type="text"
            placeholder="Organization Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3"
            rows={3}
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3"
          />
          <input
            type="text"
            placeholder="Website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3"
          />
          <input
            type="text"
            placeholder="Needs (comma-separated)"
            value={form.needs}
            onChange={(e) => setForm({ ...form, needs: e.target.value })}
            className="w-full border border-neutral rounded-xl p-3"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-light transition"
          >
            Save Changes
          </button>
        </form>

        <div className="flex gap-4 mt-6">
          {form.published ? (
            <button
              onClick={() => handlePublish(false)}
              className="flex-1 bg-error text-white py-3 rounded-xl hover:bg-red-500 transition"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={() => handlePublish(true)}
              className="flex-1 bg-success text-white py-3 rounded-xl hover:bg-green-600 transition"
            >
              Publish
            </button>
          )}
        </div>

        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </div>
    </main>
  );
}
