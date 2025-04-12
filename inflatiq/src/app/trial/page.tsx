'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD

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
=======
import NavbarFree from '../components/navbarFree';

export default function Trial() {
    const router = useRouter();
    
    // inital amounts for the sliders
    const [income, setIncome] = useState(75000);
    const [savings, setSavings] = useState(15);
    const [inflation, setInflation] = useState(3.2);
    const [yearsProjection, setYearsProjection] = useState(10);
    
    // Inital investment allocation percentages
    const [allocations, setAllocations] = useState({
        stocks: 40,
        bonds: 30,
        realEstate: 20,
        cash: 10
    });
    
    // Initial projected values, starting at 0
    const [projectedValues, setProjectedValues] = useState({
        futureIncome: 0,
        futureSavings: 0,
        purchasingPower: 0,
        wealthPreservation: 0
    });
    
    useEffect(() => {
        // Calculate future income adjusted for inflation
        const futureIncome = income * Math.pow(1 + (inflation / 100), yearsProjection);
        
        // Calculate future savings
        const monthlySavings = income * (savings / 100) / 12;
        const futureSavingsValue = calculateFutureSavings(
            monthlySavings, 
            yearsProjection, 
            inflation / 100, 
            allocations
        );
        
        // Calculate purchasing power erosion
        const currentPurchasingPower = income;
        const futurePurchasingPower = income / Math.pow(1 + (inflation / 100), yearsProjection);
        const purchasingPowerLoss = ((currentPurchasingPower - futurePurchasingPower) / currentPurchasingPower) * 100;
        
        // Calculate wealth preservation score (simple model)
        const wealthPreservation = calculateWealthPreservation(allocations, inflation);
        
        setProjectedValues({
            futureIncome: Math.round(futureIncome),
            futureSavings: Math.round(futureSavingsValue),
            purchasingPower: Math.round(purchasingPowerLoss),
            wealthPreservation: wealthPreservation
        });
    }, [income, savings, inflation, yearsProjection, allocations]);
    
    // Helper function to calculate future savings with allocation returns
    const calculateFutureSavings = (monthlySavings: number, 
        years: number, 
        inflationRate: number, 
        allocations: {
            stocks: number,
            bonds: number,
            realEstate: number,
            cash: number}) => {
        // Simplified average returns by asset class (adjust as needed)

        const avgReturns = {
            stocks: 0.07,
            bonds: 0.04,
            realEstate: 0.06,
            cash: 0.01
        };
        
        // Calculate weighted return based on allocations
        const weightedReturn = 
            (allocations.stocks / 100) * avgReturns.stocks + 
            (allocations.bonds / 100) * avgReturns.bonds + 
            (allocations.realEstate / 100) * avgReturns.realEstate + 
            (allocations.cash / 100) * avgReturns.cash;
        
        // Calculate real return (adjusted for inflation)
        const realReturn = weightedReturn - inflationRate;
        
        // Future value of monthly savings with compound interest
        let futureValue = 0;
        for (let i = 0; i < years * 12; i++) {
            futureValue = (futureValue + monthlySavings) * (1 + realReturn / 12);
        }
        
        return futureValue;
    };
    
    // Helper function to calculate wealth preservation score
    const calculateWealthPreservation = (allocations: {
        stocks: number,
        bonds: number,
        realEstate: number,
        cash: number}, 
    inflationRate: number) => {
        // Simplified model for inflation resistance by asset class
        const inflationResistance = {
            stocks: 0.7,
            bonds: 0.3,
            realEstate: 0.8,
            cash: 0.1
        };
        
        // Calculate weighted inflation resistance
        const weightedResistance = 
            (allocations.stocks / 100) * inflationResistance.stocks + 
            (allocations.bonds / 100) * inflationResistance.bonds + 
            (allocations.realEstate / 100) * inflationResistance.realEstate + 
            (allocations.cash / 100) * inflationResistance.cash;
        
        // Convert to a 0-100 score based on resistance and inflation rate
        return Math.round(weightedResistance * 100 * (1 - (inflationRate / 10)));
    };
    
    type AllocationType = 'stocks' | 'bonds' | 'realEstate' | 'cash';

    type Allocations = {
      stocks: number;
      bonds: number;
      realEstate: number;
      cash: number;
    };
    
    const handleAllocationChange = (type: AllocationType, value: number) => {
        const newAllocations: Allocations = { ...allocations, [type]: value };
        
        // Calculate total allocation (should be 100%)
        const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
        
        // If total is exactly 100, update normally
        if (total === 100) {
            setAllocations(newAllocations);
            return;
        }
        
        // If changing allocation would make total > 100%, adjust other allocations proportionally
        if (total > 100) {
            // Calculate how much we need to reduce other allocations
            const excess = total - 100;
            const otherTypes = Object.keys(newAllocations).filter(t => t !== type) as AllocationType[];
            const otherTotal = otherTypes.reduce((sum, t) => sum + newAllocations[t], 0);
            
            // Distribute the excess reduction proportionally
            const adjusted: Allocations = { ...newAllocations };
            otherTypes.forEach(t => {
                const proportion = newAllocations[t] / otherTotal;
                adjusted[t] = Math.max(0, Math.round(newAllocations[t] - (excess * proportion)));
            });
            
            // Ensure total is exactly 100% (fix any rounding issues)
            const adjustedTotal = Object.values(adjusted).reduce((sum, val) => sum + val, 0);
            if (adjustedTotal !== 100) {
                const diff = 100 - adjustedTotal;
                // Add the difference to the first non-zero allocation
                for (const t of otherTypes) {
                    if (adjusted[t] > 0) {
                        adjusted[t] += diff;
                        break;
                    }
                }
            }
            
            setAllocations(adjusted);
        } else {
            // If total < 100, we'll allow it temporarily (user is still adjusting)
            setAllocations(newAllocations);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gradient text-white">
            <NavbarFree />
            
            {/* Hero section with main pitch */}
            <section className="pt-20 pb-16 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <h1 className="text-4xl font-bold text-white mb-6 animate-fadeIn text-glow">
                        See How Inflation Impacts <span className="text-neon-blue">Your</span> Financial Future
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
                        Adjust the parameters below to visualize your personal inflation impact and discover strategies to protect your wealth.
                    </p>
                </div>
            </section>
            
            {/* Personal Information Section */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Your Financial Profile</h2>
                    
                    <div className="glass-effect rounded-2xl p-6 mb-12 animate-fadeIn" style={{ animationDelay: "300ms" }}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-gray-300 mb-2">Annual Income</label>
                                <div className="flex items-center mb-4">
                                    <input 
                                        type="range" 
                                        min="20000" 
                                        max="500000" 
                                        step="5000" 
                                        value={income} 
                                        onChange={(e) => setIncome(parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[120px] text-right">
                                        ${income.toLocaleString()}
                                    </span>
                                </div>
                                
                                <label className="block text-gray-300 mb-2">Monthly Savings Rate (%)</label>
                                <div className="flex items-center mb-4">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="50" 
                                        step="1" 
                                        value={savings} 
                                        onChange={(e) => setSavings(parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[120px] text-right">
                                        {savings}%
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-2">Expected Inflation Rate (%)</label>
                                <div className="flex items-center mb-4">
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="10" 
                                        step="0.1" 
                                        value={inflation} 
                                        onChange={(e) => setInflation(parseFloat(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[120px] text-right">
                                        {inflation}%
                                    </span>
                                </div>
                                
                                <label className="block text-gray-300 mb-2">Projection Years</label>
                                <div className="flex items-center">
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="30" 
                                        step="1" 
                                        value={yearsProjection} 
                                        onChange={(e) => setYearsProjection(parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[120px] text-right">
                                        {yearsProjection} years
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Investment Allocation Section */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Investment Allocation</h2>
                    
                    <div className="glass-effect rounded-2xl p-6 mb-12 animate-fadeIn" style={{ animationDelay: "400ms" }}>
                        <p className="text-gray-300 mb-6 text-center">
                            Adjust how you allocate your investments across different asset classes (Total: {Object.values(allocations).reduce((sum, val) => sum + val, 0)}%)
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-gray-300 mb-2">Stocks</label>
                                <div className="flex items-center mb-6">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="1" 
                                        value={allocations.stocks} 
                                        onChange={(e) => handleAllocationChange('stocks', parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[60px] text-right">
                                        {allocations.stocks}%
                                    </span>
                                </div>
                                
                                <label className="block text-gray-300 mb-2">Bonds</label>
                                <div className="flex items-center mb-6">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="1" 
                                        value={allocations.bonds} 
                                        onChange={(e) => handleAllocationChange('bonds', parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[60px] text-right">
                                        {allocations.bonds}%
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-2">Real Estate</label>
                                <div className="flex items-center mb-6">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="1" 
                                        value={allocations.realEstate} 
                                        onChange={(e) => handleAllocationChange('realEstate', parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[60px] text-right">
                                        {allocations.realEstate}%
                                    </span>
                                </div>
                                
                                <label className="block text-gray-300 mb-2">Cash</label>
                                <div className="flex items-center mb-6">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="1" 
                                        value={allocations.cash} 
                                        onChange={(e) => handleAllocationChange('cash', parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none bg-gray-700 mr-4"
                                    />
                                    <span className="text-neon-blue font-medium min-w-[60px] text-right">
                                        {allocations.cash}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 bg-black/30 p-4 rounded-lg">
                            <div className="flex justify-between">
                                {Object.entries(allocations).map(([type, value]) => (
                                    <div key={type} className="text-center">
                                        <div 
                                            className="w-full h-24 mx-1 rounded-md" 
                                            style={{ 
                                                background: type === 'stocks' ? '#4f46e5' : 
                                                           type === 'bonds' ? '#10b981' : 
                                                           type === 'realEstate' ? '#f59e0b' : 
                                                           '#6b7280',
                                                height: `${Math.max(24, value * 1.5)}px`
                                            }}
                                        ></div>
                                        <p className="mt-2 text-sm text-gray-300">
                                            {type === 'realEstate' ? 'Real Estate' : 
                                             type.charAt(0).toUpperCase() + type.slice(1)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Results Section */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Your Inflation Impact Analysis</h2>
                    
                    <div className="glass-effect rounded-2xl p-6 mb-12 animate-fadeIn" style={{ animationDelay: "500ms" }}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-black/30 p-4 rounded-lg border border-gray-700 text-center">
                                <h3 className="text-lg font-medium text-gray-300 mb-2">Future Income Needs</h3>
                                <p className="text-3xl font-bold text-neon-blue">${projectedValues.futureIncome.toLocaleString()}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Income needed in {yearsProjection} years to maintain your current lifestyle
                                </p>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-lg border border-gray-700 text-center">
                                <h3 className="text-lg font-medium text-gray-300 mb-2">Projected Savings</h3>
                                <p className="text-3xl font-bold text-neon-blue">${projectedValues.futureSavings.toLocaleString()}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Total savings after {yearsProjection} years with your current allocations
                                </p>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-lg border border-gray-700 text-center">
                                <h3 className="text-lg font-medium text-gray-300 mb-2">Purchasing Power Loss</h3>
                                <p className="text-3xl font-bold text-neon-blue">{projectedValues.purchasingPower}%</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Erosion of your purchasing power over {yearsProjection} years
                                </p>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-lg border border-gray-700 text-center">
                                <h3 className="text-lg font-medium text-gray-300 mb-2">Wealth Protection Score</h3>
                                <p className="text-3xl font-bold text-neon-blue">{projectedValues.wealthPreservation}/100</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    How well your strategy protects against inflation
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-8 p-5 bg-black/50 rounded-lg border border-neon-blue/30">
                            <h3 className="text-xl font-medium text-white mb-3">Analysis Summary</h3>
                            <p className="text-gray-300 mb-4">
                                At {inflation}% inflation over {yearsProjection} years, your purchasing power will erode by approximately {projectedValues.purchasingPower}%. 
                                Your current investment allocation provides a Wealth Protection Score of {projectedValues.wealthPreservation}/100.
                                {projectedValues.wealthPreservation < 50 ? ' Consider adjusting your allocation strategy to better protect against inflation.' : 
                                 projectedValues.wealthPreservation < 75 ? ' Your strategy offers moderate protection against inflation.' : 
                                 ' Your allocation strategy is well positioned to combat inflation.'}
                            </p>
                            
                            <div className="mt-6 text-center">
                                <button 
                                    className="py-3 px-6 rounded-lg bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition-all duration-300 shadow-neon-blue hover:shadow-neon-blue transform hover:-translate-y-1 animate-glow"
                                    onClick={() => router.push('/signup')}
                                >
                                    Get Your Full Inflation Protection Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Recommendations Section */}
            <section className="py-8 px-4 mb-16">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Personalized Recommendations</h2>
                    
                    <div className="glass-effect rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: "600ms" }}>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-black/30 p-5 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-medium text-white mb-3">Asset Allocation</h3>
                                <p className="text-gray-400 mb-4">
                                    Based on your inputs, we recommend the following adjustments to your investment allocation:
                                </p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {allocations.stocks < 50 && inflation > 3 && (
                                        <li>Consider increasing your stock allocation for better inflation protection</li>
                                    )}
                                    {allocations.bonds > 40 && inflation > 4 && (
                                        <li>Reduce bond exposure to mitigate inflation risk</li>
                                    )}
                                    {allocations.realEstate < 15 && inflation > 3 && (
                                        <li>Add more real estate to your portfolio as an inflation hedge</li>
                                    )}
                                    {allocations.cash > 20 && (
                                        <li>Reduce cash holdings which are most vulnerable to inflation</li>
                                    )}
                                    {projectedValues.wealthPreservation < 50 && (
                                        <li>Your current allocation needs significant adjustment for inflation protection</li>
                                    )}
                                </ul>
                            </div>
                            
                            <div className="bg-black/30 p-5 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-medium text-white mb-3">Savings Strategy</h3>
                                <p className="text-gray-400 mb-4">
                                    Optimize your savings approach to combat the erosion of purchasing power:
                                </p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {savings < 15 && (
                                        <li>Increase your savings rate to at least 15% to offset inflation impact</li>
                                    )}
                                    {inflation > 4 && (
                                        <li>Consider inflation-protected securities (TIPS) for part of your portfolio</li>
                                    )}
                                    <li>Establish an emergency fund that accounts for rising costs</li>
                                    {income > 100000 && (
                                        <li>Explore tax-advantaged investment vehicles to maximize growth</li>
                                    )}
                                    <li>Set up automatic increases to your savings rate annually</li>
                                </ul>
                            </div>
                            
                            <div className="bg-black/30 p-5 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-medium text-white mb-3">Advanced Strategies</h3>
                                <p className="text-gray-400 mb-4">
                                    Unlock premium strategies with a full InflatiQ account:
                                </p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    <li>Detailed asset allocation models customized to your risk profile</li>
                                    <li>Sector-specific investment recommendations for inflation protection</li>
                                    <li>Automated rebalancing schedules to maintain optimal allocation</li>
                                    <li>Tax-optimization strategies for inflation-resistant investing</li>
                                    <li>Advanced Monte Carlo simulations of inflation scenarios</li>
                                </ul>
                                <div className="mt-6">
                                    <button 
                                        className="w-full py-2 rounded-lg border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
                                        onClick={() => router.push('/signup')}
                                    >
                                        Unlock Premium Features
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Call to action section */}
            <section className="py-12 px-4 mb-16">
                <div className="container mx-auto max-w-4xl">
                    <div className="glass-effect rounded-2xl overflow-hidden animate-fadeIn shadow-neon-blue p-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Take Control of Your Financial Future</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Sign up today to get your complete inflation protection plan, personalized recommendations, and ongoing monitoring of your financial resilience.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                                className="py-3 px-8 rounded-lg bg-neon-blue text-white font-medium hover:bg-neon-blue-dark transition-all duration-300 shadow-neon-blue hover:shadow-neon-blue transform hover:-translate-y-1"
                                onClick={() => router.push('/signup')}
                            >
                                Create Free Account
                            </button>
                            <button 
                                className="py-3 px-8 rounded-lg bg-black/40 text-white font-medium border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-300 transform hover:-translate-y-1"
                                onClick={() => router.push('/login')}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <div className="footer-links mt-auto py-6">
                <a href="/">Home</a>
                <a href="/api">API</a>
                <a href="/privacy">Privacy</a>
                <a href="/goals">Our Vision</a>
            </div>
        </div>
    );
};
>>>>>>> c3b8db3a34e5944027bc9ee53aee25f9b2da2a51
