'use client';

import { useRouter } from 'next/navigation';

export default function Privacy() {


    return (
        <>
            <div className="flex flex-col justify-center items-center font-sans min-h-screen bg-gradient">
                <img
                src="public/inflatiqdark.png"
                alt="InflatiQ"
                className="logo animate-fadeIn"
                />
                <p className="glass-effect rounded-2xl overflow-hidden animate-fadeIn shadow-neon-blue p-8 w-200 transition-all duration-300 mt-30">
                    <strong className="text-xl">Privacy Policy</strong><br/><br/>
                    <span className="font-semibold">Effective Date: 04-02-2025</span><br/><br/>

                    <strong className="text-lg">1. Introduction</strong><br/>
                    Welcome to Inflatiq ("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website inflatiq.net.<br/><br/>

                    <strong className="text-lg">2. Information We Collect</strong><br/>
                    We may collect the following types of information:<br/>
                    - <span className="font-semibold">Personal Information:</span> Name, email address, and other contact details if you register or subscribe to our services.<br/>
                    - <span className="font-semibold">Usage Data:</span> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent.<br/>
                    - <span className="font-semibold">Cookies and Tracking Technologies:</span> We use cookies to enhance your experience and analyze website traffic. You can control cookie settings in your browser.<br/><br/>

                    <strong className="text-lg">3. How We Use Your Information</strong><br/>
                    We use collected data to:<br/>
                    - Provide and maintain our website<br/>
                    - Improve user experience and website functionality<br/>
                    - Send updates, newsletters, or promotional content (if opted in)<br/>
                    - Ensure security and prevent fraudulent activities<br/><br/>

                    <strong className="text-lg">4. Sharing of Information</strong><br/>
                    We do not sell, trade, or rent your personal information. We may share data with third-party service providers to assist with website operations, comply with legal obligations, or protect our rights.<br/><br/>

                    <strong className="text-lg">5. Data Security</strong><br/>
                    We implement security measures to protect your data but cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials (if applicable).<br/><br/>

                    <strong className="text-lg">6. Third-Party Links</strong><br/>
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies before providing personal information.<br/><br/>

                    <strong className="text-lg">7. Your Rights and Choices</strong><br/>
                    You have the right to:<br/>
                    - Access, correct, or delete your personal information<br/>
                    - Opt-out of marketing communications<br/>
                    - Disable cookies through browser settings<br/><br/>

                    <strong className="text-lg">8. Changes to This Policy</strong><br/>
                    We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.<br/><br/>

                    <strong className="text-lg">9. Contact Us</strong><br/>
                    If you have any questions about this Privacy Policy, contact us at <a href="mailto:ogilste@emory.edu" className="text-blue-400 hover:underline">ogilste@emory.edu</a>.
                </p>
                <div className="footer-links mt-12 mb-6">
                    <a href="/">Home</a>
                    <a href="/api">API</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/goals">Our Vision</a>
                </div>
            </div>
        </>
    )
}