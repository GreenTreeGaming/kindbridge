"use client";

import { useState } from "react";

export default function FindDonationPlacesPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    quantity: 1,
    location: "",
  });

  const [finding, setFinding] = useState(false);
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState<any[]>([]);

  // 🔍 Find matching nonprofits
  async function handleFindNonprofits() {
    if (!form.title || !form.category) {
      setMessage("⚠️ Please enter a title and select a category first.");
      return;
    }

    setFinding(true);
    setMessage("");
    setMatches([]);

    try {
      const res = await fetch("/api/match-nonprofits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch nonprofits");

      const data = await res.json();
      setMatches(data.matches || []);
      setMessage(
        data.matches?.length
          ? "✅ Found potential nonprofit matches!"
          : "⚠️ No matching nonprofits found."
      );
    } catch (error) {
      console.error(error);
      setMessage("❌ Error finding nonprofits.");
    } finally {
      setFinding(false);
    }
  }

  // ✏️ Handle input
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <main className="min-h-screen bg-background py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-card">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Find Places to Donate
        </h1>
        <p className="text-text-secondary mb-8">
          Tell us about what you’d like to donate — we’ll show you nearby or
          relevant nonprofits that could use it.
        </p>

        <div className="space-y-6">
          {/* 🏷️ Item Title */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Item Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g. Nonperishable groceries, winter coats"
            />
          </div>

          {/* 📦 Category */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select category</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Supplies">Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* 📝 Description */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Describe the items briefly"
            />
          </div>

          {/* 🔢 Quantity + 📍 Location */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                min={1}
                onChange={handleChange}
                className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border border-neutral rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="City or ZIP code"
              />
            </div>
          </div>

          {/* 🔎 Find Nonprofits Button */}
          <button
            type="button"
            onClick={handleFindNonprofits}
            disabled={finding}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-light transition disabled:opacity-70"
          >
            {finding ? "Finding..." : "Find Places to Donate"}
          </button>

          {/* 🗯️ Message */}
          {message && (
            <p
              className={`text-center text-sm font-medium mt-2 ${
                message.startsWith("✅")
                  ? "text-success"
                  : message.startsWith("⚠️")
                  ? "text-warning"
                  : "text-error"
              }`}
            >
              {message}
            </p>
          )}

          {/* 🏛️ Suggested Nonprofits */}
          {matches.length > 0 && (
            <div className="mt-8 border border-neutral/30 rounded-xl p-5 bg-accent/10">
              <h2 className="text-xl font-semibold text-primary mb-4 text-center">
                Suggested Nonprofits
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {matches.map((np) => (
                  <div
                    key={np._id}
                    className="bg-white p-5 rounded-xl shadow-sm border transition hover:shadow-md"
                  >
                    <h3 className="font-semibold text-lg text-primary">
                      {np.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-3">
                      {np.description}
                    </p>
                    <ul className="mt-3 text-sm text-text-secondary list-disc list-inside">
                      {np.needs?.slice(0, 3).map((n: string, i: number) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>

                    <div className="flex justify-end mt-4">
                      <a
                        href={np.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-light transition"
                      >
                        Visit & Donate →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
