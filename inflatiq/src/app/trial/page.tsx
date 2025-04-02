'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Trial() {

    


    return (
        <div className="flex flex-col justify-center items-center font-sans">
            <div className="flex justify-end items-center space-x-4 w-full navbar">
                <button className="float-right w-55 py-4 px-6 mr-10 rounded-full bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition duration-300">
                Profile
                </button> 
                <button className="float-right w-55 py-4 px-6 mr-10 rounded-full bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition duration-300">
                Sign Up
                </button>
                <button> </button>
            </div>
            <div>

            </div>
        </div>
    );
}