'use client';

import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();



    return (
        <div className="flex flex-col justify-center items-center font-sans min-h-screen">
            <img
                src="/inflatiqdark.png"
                alt="Company Logo"
                className="logo mb-4"
            />
            <title>Welcome.</title>
            <div className="loginbox flex flex-col items-center justify-center shadow-neon-blue p-6 rounded-lg w-80">
                <p className="text-3xl mb-10">
                    Sign Up
                </p>
                <label htmlFor="email" className="sr-only">
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    className="input-field mb-3 p-2 border border-gray-300 rounded"
                />

                <label htmlFor="psw" className="self-start mb-1 font-bold">
                </label>
                <input
                    type="text"
                    id="psw"
                    name="psw"
                    placeholder="Enter Password"
                    required
                    className="input-field mb-3 p-2 border border-gray-300 rounded"
                />
                <label htmlFor="psw" className="self-start mb-1 font-bold">
                </label>
                <input
                    type="text"
                    id="psw"
                    name="psw"
                    placeholder="Re-Enter Password"
                    required
                    className="input-field mb-3 p-2 border border-gray-300 rounded"
                />
                <button className="w-55 py-4 px-6 mt-10 rounded-full bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition duration-300 shadow-neon-blue hover:shadow-neon-blue"
                onClick={() => router.push('/signup')}>
                Lets Go
                </button>
            </div>
            <div className="justify-center">
            <a href="/" className="mt-6 underline mr-2" >home</a>
            <a href="/" className="mt-6 underline ml-2 mr-2">API</a>
            <a href="/" className="mt-6 underline ml-2 mr-2">privacy policy</a>
            <a href="/" className="mt-6 underline ml-2 ">our goals</a>
            </div>
        </div>
    );
}