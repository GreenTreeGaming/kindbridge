import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Heart, Users, Globe2 } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col items-center font-sans">
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 px-8 py-20">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-primary">
            About KindBridge
          </h1>
          <p className="text-lg text-text-secondary">
            KindBridge bridges generosity with need. We help donors,
            nonprofits, and volunteers work together through smart, AI-powered
            matching — ensuring every donation makes the biggest possible impact.
          </p>
          <p className="text-md text-text-secondary">
            Built with transparency, accessibility, and community in mind, we’re
            redefining how giving happens in the modern world.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/image.png"
            alt="People collaborating on donation matching"
            width={450}
            height={450}
            className="drop-shadow-lg rounded-2xl"
          />
        </div>
      </section>

      <section className="w-full bg-accent py-16">
        <div className="max-w-6xl mx-auto px-8 text-center space-y-12">
          <h2 className="text-3xl font-semibold text-primary-dark">
            Our Mission
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col items-center transform transition hover:-translate-y-2">
              <Heart className="text-primary mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-semibold text-xl mb-2">
                Empower Generosity
              </h3>
              <p className="text-text-secondary">
                We make it easy for donors to give meaningfully — connecting
                individual acts of kindness with real community needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col items-center transform transition hover:-translate-y-2">
              <Users className="text-primary mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-semibold text-xl mb-2">
                Support Nonprofits
              </h3>
              <p className="text-text-secondary">
                Nonprofits can clearly express their needs, update capacities,
                and get matched with donors who can help — in seconds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col items-center transform transition hover:-translate-y-2">
              <Globe2 className="text-primary mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-semibold text-xl mb-2">
                Scale Social Impact
              </h3>
              <p className="text-text-secondary">
                By combining data, compassion, and AI, we reduce waste and make
                generosity measurable, efficient, and impactful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 px-8 text-center space-y-12">
        <h2 className="text-3xl font-semibold text-primary-dark">
          Meet the Team
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Our team blends technology, empathy, and design to bring KindBridge
          to life. We’re committed to building tools that amplify generosity
          and create lasting community connections.
        </p>

       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { name: "Sarvajith Karun", role: "Backend Developer", img: "/sarva.jpg" },
          { name: "Shubham Panchal", role: "Front-End Developer", img: "/shubham.png" },
          { name: "Shrihan Avilala", role: "Nonprofit Coordinator", img: "/shrihan.jpeg" },
          { name: "Rithick Amarnath", role: "Donor Management", img: "/rithick.jpeg" },
        ].map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center transform transition hover:-translate-y-2"
          >
            <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
              <Image
                src={member.img}
                alt={member.name}
                width={128}
                height={128}
                className={`w-full h-full object-cover ${
                  member.name === "Sarvajith Karun" ? "object-top" : "object-center"
                }`}
              />
            </div>
            <h3 className="font-semibold text-lg text-primary-dark">{member.name}</h3>
            <p className="text-text-secondary text-sm">{member.role}</p>
          </div>
        ))}
      </div>


      </section>

      {/* Footer */}
      <footer className="w-full bg-primary text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} DonationOptimizer. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-accent transition">Home</a>
            <a href="/contact" className="hover:text-accent transition">Contact</a>
            <a href="/privacy" className="hover:text-accent transition">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
