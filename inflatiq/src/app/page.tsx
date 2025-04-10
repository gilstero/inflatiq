'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const styles = `
.logo {
  position: absolute;
  top: 1.5rem; 
  right: 1.5rem; 
  width: 8rem; 
  height: auto;
  filter: drop-shadow(0 0 10px rgba(21, 168, 188, 0.3));
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes buttonGlow {
  0% { box-shadow: 0 0 10px rgba(21, 168, 188, 0.3); }
  50% { box-shadow: 0 0 20px rgba(21, 168, 188, 0.5); }
  100% { box-shadow: 0 0 10px rgba(21, 168, 188, 0.3); }
}

@keyframes backgroundGlow {
  0% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.05) 0%, rgba(0, 0, 0, 0) 60%); }
  5% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.06) 0%, rgba(0, 0, 0, 0) 61%); }
  10% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.07) 0%, rgba(0, 0, 0, 0) 62%); }
  15% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.08) 0%, rgba(0, 0, 0, 0) 63%); }
  20% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.09) 0%, rgba(0, 0, 0, 0) 64%); }
  25% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.10) 0%, rgba(0, 0, 0, 0) 65%); }
  30% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.11) 0%, rgba(0, 0, 0, 0) 66%); }
  35% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.12) 0%, rgba(0, 0, 0, 0) 67%); }
  40% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.13) 0%, rgba(0, 0, 0, 0) 68%); }
  45% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.14) 0%, rgba(0, 0, 0, 0) 70%); }
  50% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.15) 0%, rgba(0, 0, 0, 0) 72%); }
  55% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.14) 0%, rgba(0, 0, 0, 0) 70%); }
  60% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.13) 0%, rgba(0, 0, 0, 0) 68%); }
  65% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.12) 0%, rgba(0, 0, 0, 0) 67%); }
  70% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.11) 0%, rgba(0, 0, 0, 0) 66%); }
  75% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.10) 0%, rgba(0, 0, 0, 0) 65%); }
  80% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.09) 0%, rgba(0, 0, 0, 0) 64%); }
  85% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.08) 0%, rgba(0, 0, 0, 0) 63%); }
  90% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.07) 0%, rgba(0, 0, 0, 0) 62%); }
  95% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.06) 0%, rgba(0, 0, 0, 0) 61%); }
  100% { background: radial-gradient(circle at center, rgba(21, 168, 188, 0.05) 0%, rgba(0, 0, 0, 0) 60%); }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-button-entrance {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-glow {
  animation: buttonGlow 3s infinite;
}

.background-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  animation: backgroundGlow 4s infinite ease-in-out;
  z-index: 0;
}

.bg-gradient {
  background: linear-gradient(135deg, #000000 0%, #121212 100%);
}

.button-hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(21, 168, 188, 0.4);
}

.text-glow {
  text-shadow: 0 0 10px rgba(21, 168, 188, 0.5);
}

.button-glow-container {
  position: relative;
  width: 100%;
  height: 56px; /* Fixed height to prevent layout shifts */
}

.button-container {
  position: relative;
  width: 100%;
  height: 56px; /* Fixed height to match primary button */
}

.button-glow-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(21, 168, 188, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: -1;
  opacity: 0.7;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  position: absolute;
  bottom: 2rem;
  width: 100%;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  position: relative;
}

.footer-links a:hover {
  color: #15a8bc;
}

.footer-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #15a8bc;
  transition: width 0.3s ease;
}

.footer-links a:hover::after {
  width: 100%;
}
`;

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [showPeriod, setShowPeriod] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const fullText = "YOUR PURCHASING POWER IS ERODING";

  // Typing effect
  useEffect(() => {
    if (text.length < fullText.length) {
      const typing = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      
      return () => clearTimeout(typing);
    } else {
      setIsTypingComplete(true);
      // Show buttons after typing is complete with a slight delay
      setTimeout(() => setShowButtons(true), 400);
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
    <>
      <style jsx>{styles}</style>
      <div className="flex flex-col justify-center items-center font-sans min-h-screen bg-gradient text-white relative overflow-hidden">
        {/* Background glow effect */}
        <div className="background-glow"></div>
        
        <img
          src="public/inflatiqdark.png"
          alt="InflatiQ"
          className="logo"
        />
        
        {/* Fixed Header - No position changes */}
        <div className="flex flex-col items-center justify-center mt-8 mb-16 relative z-10">
          <h1 className="text-5xl font-bold tracking-tight text-center text-glow">
            {text}
            <span className="inline-block" style={{ width: '0.5em' }}>
              {(isTypingComplete && showPeriod) ? "." : " "}
            </span>
          </h1>
          
          {isTypingComplete && (
            <p className="text-xl mt-6 text-gray-300 animate-fadeIn">
              Let us help.
            </p>
          )}
        </div>

        {/* Fixed height button containers to prevent layout shifts */}
        <div className="flex flex-col space-y-4 w-80 mt-8 relative z-10">
          {/* Button containers exist even when buttons aren't shown to maintain layout */}
          <div className="button-glow-container">
            <div className={showButtons ? "button-glow-bg" : ""}></div>
            {showButtons && (
              <button 
                className="absolute top-0 left-0 py-4 px-6 rounded-lg bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition-all duration-300 button-hover-effect animate-button-entrance animate-glow w-full h-full"
                style={{ animationDelay: '0ms', backgroundColor: 'rgba(21, 168, 188, 0.8)', zIndex: 1 }}
                onClick={() => router.push('/trial')}
              >
                Try Free
              </button>
            )}
          </div>

          <div className="button-container">
            {showButtons && (
              <button 
                className="absolute top-0 left-0 py-4 px-6 rounded-lg bg-black/40 text-white font-medium border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-300 button-hover-effect animate-button-entrance w-full h-full"
                style={{ animationDelay: '150ms' }}
                onClick={() => router.push('/trial')}
              >
                Try Free
              </button>
            )}
          </div>
          
          <div className="button-container">
            {showButtons && (
              <button 
                className="absolute top-0 left-0 py-4 px-6 rounded-lg bg-black/40 text-white font-medium border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-300 button-hover-effect animate-button-entrance w-full h-full"
                style={{ animationDelay: '150ms' }}
                onClick={() => router.push('/login')}
              >
                Log In
              </button>
            )}
          </div>
          
          <div className="button-container">
            {showButtons && (
              <button 
                className="absolute top-0 left-0 py-4 px-6 rounded-lg bg-black/40 text-white font-medium border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-300 button-hover-effect animate-button-entrance w-full h-full"
                style={{ animationDelay: '300ms' }}
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/api">API</a>
          <a href="/privacy">Privacy</a>
          <a href="/about">About Us</a>
        </div>
      </div>
    </>
  );
}