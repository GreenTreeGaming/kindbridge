"use client";

import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);
  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "User";

  const isNonprofit = session?.user?.role === "nonprofit";

  return (
    <nav className="w-full bg-background/80 backdrop-blur-sm border-b border-neutral sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">KindBridge</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/donate/new" label="Donate" />
          <NavLink href="/nonprofits" label="Nonprofits" />
          <NavLink href="/about" label="About" />
          <NavLink href="/contact" label="Contact" />

          {isNonprofit && <NavLink href="/dashboard/nonprofit" label="Dashboard" />}

          {/* Authentication */}
          {status === "loading" ? null : session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-text-secondary">
                <User size={18} className="text-primary" />
                <span className="text-sm">{userName}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-error text-white px-5 py-2 rounded-xl font-medium hover:bg-red-500 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-primary text-white px-5 py-2 rounded-xl font-medium hover:bg-primary-light transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-primary focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral shadow-card">
          <div className="flex flex-col items-center py-4 space-y-4">
            <NavLink href="/" label="Home" onClick={() => setIsOpen(false)} />
            <NavLink href="/donate/new" label="Donate" onClick={() => setIsOpen(false)} />
            <NavLink href="/about" label="About" onClick={() => setIsOpen(false)} />
            <NavLink href="/contact" label="Contact" onClick={() => setIsOpen(false)} />

            {/* ✅ Nonprofit Dashboard link for nonprofit users only */}
            {isNonprofit && (
              <NavLink
                href="/dashboard/nonprofit"
                label="Dashboard"
                onClick={() => setIsOpen(false)}
              />
            )}

            {status === "loading" ? null : session ? (
              <>
                <div className="flex items-center gap-2 text-text-secondary">
                  <User size={18} className="text-primary" />
                  <span className="text-sm">{userName}</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="bg-error text-white px-6 py-2 rounded-xl font-medium hover:bg-red-500 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary-light transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/** 🔹 Reusable Nav Link Component */
function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-text-secondary hover:text-primary transition"
    >
      {label}
    </Link>
  );
}
