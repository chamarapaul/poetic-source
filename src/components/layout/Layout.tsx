// components/layout/Layout.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Github, Search, X, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
    <Link href="/poems" className="text-gray-600 hover:text-gray-900 flex items-center">
      Browse
    </Link>
    <Link href="/forms" className="text-gray-600 hover:text-gray-900 flex items-center">
      Forms
    </Link>
    <Link href="/languages" className="text-gray-600 hover:text-gray-900 flex items-center">
      Languages
    </Link>
    <Link href="/about" className="text-gray-600 hover:text-gray-900 flex items-center">
      About
    </Link>
  </>
);

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  onSearchChange,
  onSubmit,
  onClear,
  className = ""
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
            <Link href="/" className="flex items-center text-xl font-bold text-gray-900">
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
            <Link
              href="https://github.com/chamarapaul/poetic-source"
              className="flex items-center text-gray-600 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;