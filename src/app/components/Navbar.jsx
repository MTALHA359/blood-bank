"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for PWA install event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("PWA installed!");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        ❤️ BloodDonate
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/donate">Donate</Link>
        <Link href="/find">Find Donors</Link>
        <Link href="/contact">Contact</Link>
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="bg-white text-red-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
          >
            Install App
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-red-700 text-white flex flex-col items-center py-4 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/donate" onClick={() => setIsOpen(false)}>Donate</Link>
          <Link href="/find" onClick={() => setIsOpen(false)}>Find Donors</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          {deferredPrompt && (
            <button
              onClick={handleInstall}
              className="mt-3 bg-white text-red-600 px-4 py-2 rounded-lg"
            >
              Install App
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
