"use client"

import { useEffect, useState } from "react";

export default function NonprofitsPage() {
  const [nonprofits, setNonprofits] = useState([]);

  useEffect(() => {
    fetch("/api/nonprofits")
      .then((res) => res.json())
      .then((data) => setNonprofits(data));
  }, []);

  return (
    <main className="min-h-screen bg-background py-16 px-8">
      <h1 className="text-4xl font-bold text-primary text-center mb-12">
        Featured Nonprofits
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
        {nonprofits.map((n) => (
          <div key={n._id} className="bg-white p-6 rounded-2xl shadow-card transform transition hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-primary mb-2">{n.name}</h2>
            <p className="text-text-secondary mb-3">{n.description}</p>
            <p className="text-sm text-text-secondary mb-1">📍 {n.address}</p>
            <p className="text-sm text-text-secondary mb-1">📞 {n.phone}</p>
            <a
              href={n.website}
              target="_blank"
              className="text-primary text-sm font-medium hover:underline"
            >
              Visit Website →
            </a>
            <ul className="mt-3 text-sm list-disc ml-4 text-text-secondary">
              {n.needs?.map((need: string, i: number) => (
                <li key={i}>{need}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
