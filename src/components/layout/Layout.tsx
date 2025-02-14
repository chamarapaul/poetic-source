// components/layout/Layout.tsx
import { Menu, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

interface SearchFormProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  className?: string;
}

const NavLinks = () => (
  <>
    <Link
      href="/poems"
      className="text-gray-600 hover:text-gray-900 flex items-center"
    >
      Browse
    </Link>
    <Link
      href="/forms"
      className="text-gray-600 hover:text-gray-900 flex items-center"
    >
      Forms
    </Link>
    <Link
      href="/languages"
      className="text-gray-600 hover:text-gray-900 flex items-center"
    >
      Languages
    </Link>
    <Link
      href="/about"
      className="text-gray-600 hover:text-gray-900 flex items-center"
    >
      About
    </Link>
  </>
);

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  onSearchChange,
  onSubmit,
  onClear,
  className = '',
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
            ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search poems..."
          className="w-full md:w-48 pl-9 pr-8 py-1.5 text-sm border rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center text-xl font-bold text-gray-900"
            >
              <span>Poetic</span>
              <span className="text-blue-600 mx-1">/</span>
              <span>Source</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
              <SearchForm
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSubmit={handleSearch}
                onClear={clearSearch}
              />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <SearchForm
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      onSubmit={handleSearch}
                      onClear={clearSearch}
                      className="mb-8"
                    />
                    <div className="space-y-4">
                      <NavLinks />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-8 px-4">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Poetic Source
            </p>
            <div className="flex items-center gap-4 text-gray-600">
              <Link
                href="https://github.com/chamarapaul/poetic-source/issues"
                className="flex items-center text-sm hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Report Issue</span>
              </Link>
              <Link
                href="https://github.com/chamarapaul/poetic-source"
                className="flex items-center text-sm hover:text-gray-900 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 98 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-1 fill-gray-600 group-hover:fill-gray-900 transition-colors"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                </svg>
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
