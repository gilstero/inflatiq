'use client';

import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();



    return (
        <div className="flex flex-col justify-center items-center font-sans min-h-screen bg-gradient">
          <img
            src="../inflatiqdark.png"
            alt="InflatiQ"
            className="logo animate-fadeIn"
          />
          
          <div className="glass-effect rounded-2xl overflow-hidden animate-fadeIn shadow-neon-blue p-8 w-96 transition-all duration-300">
            <h1 className="text-3xl font-medium text-white text-center mb-8">Welcome Back</h1>
            
            <div className="space-y-5">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full bg-black/30 text-white px-4 py-3 rounded-lg border border-gray-700 input-focus-effect transition-all duration-300"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  id="psw"
                  name="psw"
                  placeholder="Password"
                  required
                  className="w-full bg-black/30 text-white px-4 py-3 rounded-lg border border-gray-700 input-focus-effect transition-all duration-300"
                />
              </div>
              
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button 
                className="w-full py-3 mt-6 rounded-lg bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition-all duration-300 shadow-neon-blue hover:shadow-neon-blue transform hover:-translate-y-1"
                onClick={() => router.push('/dashboard')}
              >
                Sign In
              </button>
              
              <p className="text-gray-400 text-center text-sm mt-6">
                Don't have an account? <a href="/signup" className="text-neon-blue hover:underline" onClick={(e) => {e.preventDefault(); router.push('/signup')}}>Create one</a>
              </p>
            </div>
          </div>
          
          <div className="footer-links mt-12 mb-6">
            <a href="/">Home</a>
            <a href="/api">API</a>
            <a href="/privacy">Privacy</a>
            <a href="/goals">Our Vision</a>
          </div>
        </div>
    );
}