'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NavbarFree = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              className="text-white font-bold text-xl flex items-center"
              onClick={() => router.push('/')}
            >
              <span className="text-glow text-neon-blue mr-1.5">InflatiQ</span>
            </button>
          </div>
          
          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
          <button
              onClick={() => router.push('/help')}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-700 text-white hover:border-neon-blue hover:text-neon-blue transition-all duration-300"
            >
              News
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm font-medium text-white hover:text-neon-blue transition-colors duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-neon-blue text-white hover:bg-neon-blue-dark transition-all duration-300 shadow-neon-blue hover:shadow-neon-blue transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} glass-effect border-b border-gray-800 animate-fadeIn`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex flex-col space-y-3 px-3">
          <button
              onClick={() => {
                router.push('/help');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center rounded-md text-white border border-gray-700 hover:border-neon-blue transition-all duration-300"
            >
              News
            </button>
            <button
              onClick={() => {
                router.push('/login');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center rounded-md text-white border border-gray-700 hover:border-neon-blue transition-all duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                router.push('/signup');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center rounded-md bg-neon-blue text-white hover:bg-neon-blue-dark transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarFree;