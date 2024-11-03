import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Poetic Source
            </Link>
            <div className="flex space-x-6">
              <Link href="/poems" className="text-gray-600 hover:text-gray-900">
                Browse
              </Link>
              <Link href="/forms" className="text-gray-600 hover:text-gray-900">
                Forms
              </Link>
              <Link href="/languages" className="text-gray-600 hover:text-gray-900">
                Languages
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Poetic Source
            </p>
            <a 
              href="https://github.com/yourusername/poetic-source" 
              className="flex items-center text-gray-600 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}