'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbarFree'; // Import the Navbar component

export default function Trial() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gradient">
            {/* Add the Navbar component at the top */}
            <Navbar />
            
            {/* Main content with proper spacing for fixed navbar */}
            <main className="flex-grow pt-16 flex flex-col items-center">
                <div className="container mx-auto px-4 py-12">
                    <div className="glass-effect rounded-2xl overflow-hidden animate-fadeIn shadow-neon-blue p-8 max-w-3xl mx-auto">
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <div className="footer-links mt-auto py-6">
                <a href="/">Home</a>
                <a href="/api">API</a>
                <a href="/privacy">Privacy</a>
                <a href="/goals">Our Vision</a>
            </div>
        </div>
    );
}