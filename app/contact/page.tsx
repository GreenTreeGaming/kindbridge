import Image from "next/image";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">Contact Us</h1>
        <p className="text-text-secondary text-lg mb-16 max-w-2xl mx-auto">
          Have questions, feedback, or want to learn more?  
          Get in touch with our team — we’d love to hear from you.
        </p>

        {/* Contact Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center">
            <Mail className="text-primary mb-3" size={32} />
            <h3 className="font-semibold text-lg text-primary mb-1">Email</h3>
            <p className="text-text-secondary text-sm">support@donationoptimizer.org</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center">
            <Phone className="text-primary mb-3" size={32} />
            <h3 className="font-semibold text-lg text-primary mb-1">Phone</h3>
            <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center">
            <Clock className="text-primary mb-3" size={32} />
            <h3 className="font-semibold text-lg text-primary mb-1">Hours</h3>
            <p className="text-text-secondary text-sm">Mon–Fri: 9am – 5pm (CST)</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center">
            <MapPin className="text-primary mb-3" size={32} />
            <h3 className="font-semibold text-lg text-primary mb-1">Location</h3>
            <p className="text-text-secondary text-sm">Remote-first • Minneapolis, MN</p>
          </div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="w-full max-w-3xl mx-auto px-6 md:px-8 mb-20">
        <Image
          src="/image2.png"
          alt="Support illustration"
          width={600}
          height={320}
          className="rounded-2xl shadow-md mx-auto"
        />
      </section>

      {/* Footer */}
      <footer className="w-full bg-primary text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} DonationOptimizer. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-accent transition">Home</a>
            <a href="/about" className="hover:text-accent transition">About</a>
            <a href="/privacy" className="hover:text-accent transition">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}