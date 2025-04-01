'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();



    return (
        <div className="flex flex-col justify-center items-center font-sans min-h-screen">
            <img
                src="/inflatiqdark.png"
                alt="Company Logo"
                className="logo mb-4"
            />
            <div className="loginbox items-center shadow-neon-blue">
            </div>

        </div>
    );
}