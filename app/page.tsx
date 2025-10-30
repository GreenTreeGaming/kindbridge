import Image from "next/image";
import Link from "next/link";
import { Gift, Handshake, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 px-8 py-20">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-primary">
            Bridge Generosity with Impact
          </h1>
          <p className="text-lg text-text-secondary">
            KindBridge makes giving simple. Tell us what you have, and we’ll
            connect you with verified nonprofits that are looking for exactly
            those items — so your donations reach the people who need them most.
          </p>

          {/* ✅ Linked buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/donate/new"
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-light transition text-center"
            >
              Find Where to Donate
            </Link>

            <Link
              href="/nonprofits"
              className="bg-accent text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary-light/10 transition text-center"
            >
              Browse Nonprofits
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/illustration-donation.png"
            alt="Donation illustration"
            width={450}
            height={450}
            className="drop-shadow-lg rounded-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-accent py-16">
        <div className="max-w-6xl mx-auto px-8 text-center space-y-12">
          <h2 className="text-3xl font-semibold text-primary">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col items-center transform transition hover:-translate-y-2">
              <Gift className="text-primary mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-semibold text-xl mb-2">1. Share What You Have</h3>
              <p className="text-text-secondary">
                Post items you’d like to donate — from clothes and food to
                furniture and essentials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col items-center transform transition hover:-translate-y-2">
              <Handshake className="text-primary mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-semibold text-xl mb-2">2. We Find the Right Match</h3>
              <p className="text-text-secondary">
                Our matching system finds nonprofits actively seeking the kinds
                of items you’re donating.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col items-center transform transition hover:-translate-y-2">
              <Globe className="text-primary mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-semibold text-xl mb-2">3. Donate Directly</h3>
              <p className="text-text-secondary">
                Visit the nonprofit’s website, coordinate your donation, and
                make a direct impact in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 px-8 text-center space-y-6">
        <h2 className="text-3xl font-semibold text-primary">
          Ready to make an impact?
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          KindBridge helps you turn generosity into action — connecting your
          donations to the people and organizations that truly need them.
        </p>

        <Link
          href="/donate/new"
          className="bg-success text-white px-8 py-4 rounded-2xl font-medium hover:bg-green-600 transition inline-block"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}