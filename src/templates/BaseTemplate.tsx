// src/templates/BaseTemplate.tsx
'use client';

import { Menu, Moon, Sun, User, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
  local?: React.ReactNode;

}) => {
  const t = useTranslations('BaseTemplate');
  // const [language, setLanguage] = useState('ENG');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // const router = useRouter();
  const locale = useLocale();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isProfileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, isProfileDropdownOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="w-full  text-gray-700  dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <div className="mx-auto ">
        <header className="w-full py-4 px-4 sm:px-6 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200 relative border-b border-gray-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="mr-4 sm:mr-8">
                <h1 className="text-xl sm:text-3xl font-serif italic font-bold">The Travelers</h1>
              </Link>

              {/* Desktop Navigation - Hidden on mobile and tablet */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-[190px]">
                <>
                  <Link href="/" className="font-medium hover:text-primary">
                    HOME
                  </Link>
                  <Link href="/Blog" className="font-medium hover:text-primary">
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
                </>

              </nav>
            </div>

            {/* Right Side Actions - Both Mobile and Desktop */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Profile Icon with Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  className="p-2 mx-[-10px] rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  }}
                  aria-label="Profile menu"
                >
                  <User size={26} className="text-gray-700 dark:text-gray-200" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-2 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10 w-48">
                    <div className="py-0.5 px-2">
                      <Link
                        href={`/${locale}/dashboard/user-profile`}
                        className="flex items-center px- py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        <span>{t('profile')}</span>
                      </Link>

                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle - Visible on all screen sizes */}
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle dark mode"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Language Selector - Desktop Only */}
              <div className="relative hidden lg:block  " ref={dropdownRef}>
                <div className="flex justify-between gap-2">
                  <ul className="flex flex-wrap gap-x-5 text-xl cursor-pointer">{props.rightNav}</ul>
                  <ul className="flex flex-wrap gap-x-5 text-xl items-center space-x-1 border border-green-400 rounded px-2 py-0">{props.local}</ul>
                </div>
              </div>

              {/* Mobile Menu Button - On the right */}
              <div className="flex lg:hidden">
                <button
                  type="button"
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

          {/* Mobile Menu - Opens from the right */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="fixed top-0 right-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
              style={{ marginTop: '0' }}
            >
              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200"
                  aria-label="Close mobile menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4 p-4">

                <>
                  <Link href="/home" className="font-medium hover:text-primary px-2" onClick={() => setIsMobileMenuOpen(false)}>
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
                </>

              </nav>

              <div className="flex flex-col space-y-4 p-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Profile Options in Mobile Menu */}
                <Link
                  href={`/${locale}/dashboard/user-profile`}
                  className="flex items-center font-medium hover:text-primary px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={16} className="mr-2" />
                  <span>{t('profile')}</span>
                </Link>

                {/* Language Selector in Mobile Menu */}
                <div className="relative mt-4">

                  <ul className="flex flex-col space-y-4">{props.rightNav}</ul>

                </div>
              </div>
            </div>
          )}

          {/* Overlay when mobile menu is open */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          )}
        </header>

        <main>{props.children}</main>

      </div>
    </div>
  );
};
