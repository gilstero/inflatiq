'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [showPeriod, setShowPeriod] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "YOUR PURCHASING POWER IS ERRODING";

  // Typing effect
  useEffect(() => {
    if (text.length < fullText.length) {
      const typing = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      
      return () => clearTimeout(typing);
    } else {
      setIsTypingComplete(true);
    }
  }, [text]);

  // Only start blinking period after typing is complete
  useEffect(() => {
    if (isTypingComplete) {
      const blinking = setInterval(() => {
        setShowPeriod(prev => !prev);
      }, 500);
      
      return () => clearInterval(blinking);
    }
  }, [isTypingComplete]);

  return (
    <div className="flex flex-col justify-center items-center font-sans">
      <img
        src="/inflatiqdark.png"
        alt="Company Logo"
        className="logo mb-4"
      />
      
      {/* Dynamic Header */}
      <div className="titlebox">
        <h1 className="text-5xl font-bold mb-2">
          {text}
          <span className="inline-block w-2">
            {(isTypingComplete && showPeriod) ? "." : " "}
          </span>
        </h1>
        {
          !isTypingComplete && (
            <p className="filler">
            </p>
          )
        }
        {isTypingComplete && (
          <p className="text-xl mt-2 opacity-80 animate-fadeIn">
            Let us help.
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-4">
        <button className="w-128 py-4 px-6 rounded-full bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition duration-300 shadow-neon-blue hover:shadow-neon-blue"
        onClick={() => router.push('/trial')}>
          Try Free
        </button>
        <button className="w-128 py-4 px-6 rounded-full bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition duration-300 shadow-neon-blue hover:shadow-neon-blue"
        onClick={() => router.push('/login')}>
          Log In
        </button>
        <button className="w-128 py-4 px-6 rounded-full bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition duration-300 shadow-neon-blue hover:shadow-neon-blue"
         onClick={() => router.push('/signup')}>
          Sign Up
        </button>
      </div>
      <div className="links">
        
      </div>
    </div>
  );
}