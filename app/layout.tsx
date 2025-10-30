import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "KindBridge",
  description: "Connect donors with nonprofits through AI-powered matching",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary flex flex-col min-h-screen">
        <SessionProviderWrapper>
          <Navbar />

          {/* Main content fills available space */}
          <main className="flex-grow">{children}</main>

          {/* ✅ Global Footer */}
          <footer className="w-full bg-primary text-white py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <p className="text-sm">
                © {new Date().getFullYear()} KindBridge. All rights reserved.
              </p>
            </div>
          </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}