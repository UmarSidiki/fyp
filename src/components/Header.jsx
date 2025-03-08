// @ts-nocheck
'use client';
/* eslint-disable react-dom/no-missing-button-type */
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export const BaseTemplate = (props: {
  signOut: React.ReactNode;
}) => {

export default function Header() {
  const [language, setLanguage] = useState('ENG');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  const dropdownRef = useRef(null);
  // const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // const toggleSignIn = () => {
  //   setIsSignedIn(!isSignedIn);
  // };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full py-4 px-4 sm:px-6 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center ">
          <Link href="/" className="mr-4 sm:mr-8">
            <h1 className="text-xl sm:text-3xl font-serif italic font-bold">The Travelers</h1>
          </Link>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-[190px]">
            <Link href="/" className="font-medium hover:text-primary">
              HOME
            </Link>
            <Link href="/blog" className="font-medium hover:text-primary">
              BLOG
            </Link>
            <Link href="/social" className="font-medium hover:text-primary">
              SOCIAL
            </Link>
            <Link href="/guide" className="font-medium hover:text-primary">
              GUIDE
            </Link>
            <Link href="/ai" className="font-medium hover:text-primary">
              AI
            </Link>
          </nav>
        </div>

        {/* Right Side Actions - Both Mobile and Desktop */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Sign Up Button - Always visible */}
          <Link href="/sign-up" className="font-medium hover:text-primary">
            <Button
              className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full px-4 sm:px-6"
              // For demo purposes to toggle sign-in state
            >
              Sign Up
            </Button>
          </Link>
          <Link href="/sign-in" className="font-medium hover:text-primary">
            LOGIN
          </Link>

          {/* Dark Mode Toggle - Now visible on all screen sizes */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language Selector - Desktop Only */}
          <div className="relative hidden lg:block" ref={dropdownRef}>
            <button
              className="flex items-center space-x-1 border border-green-400 rounded px-2 py-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <span className="text-sm font-medium">{language}</span>
              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                <div className="py-1">
                 
                <ul className="flex flex-col space-y-4">{props.rightNav}</ul>

                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - On the right */}
          <div className="flex lg:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Now opens from the right */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
          style={{ marginTop: '0' }}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/" className="font-medium hover:text-primary px-2" onClick={() => setIsMobileMenuOpen(false)}>
              HOME
            </Link>
            <Link
              href="/blog"
              className="font-medium hover:text-primary px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BLOG
            </Link>
            <Link
              href="/social"
              className="font-medium hover:text-primary px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SOCIAL
            </Link>
            <Link
              href="/guide"
              className="font-medium hover:text-primary px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GUIDE
            </Link>
            <Link href="/ai" className="font-medium hover:text-primary px-2" onClick={() => setIsMobileMenuOpen(false)}>
              AI
            </Link>
          </nav>

          <div className="flex flex-col space-y-4 p-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Language Selector in Mobile Menu */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 border border-green-400 rounded px-2 py-1 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <span className="text-sm font-medium">{language}</span>
                <ChevronDown size={16} className="ml-auto" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setLanguage('ENG');
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      ENG
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('URD');
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      URD
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}
    </header>
  );
}
}