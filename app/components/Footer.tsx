"use client";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-600 text-gray-200 py-3 px-4 flex flex-col sm:flex-row items-center justify-between text-sm">
      {/* Links */}
      <div className="flex space-x-4 mb-2 sm:mb-0">
        <a href="mailto:youremail@example.com" className="hover:underline">
          Contact
        </a>
        <a href="https://twitter.com/fakeaccount" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Twitter
        </a>
      </div>

      {/* Copyright */}
      <div className="text-xs sm:text-sm text-gray-200">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  );
}
