// src/pages/Home.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 overflow-hidden min-h-screen bg-slate-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
            Your Career,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Supercharged
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            The future of professional networking is here. Connect, discover opportunities, 
            and get paid seamlessly with blockchain technology and AI-powered matching.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => navigate("/jobs")}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-8 whitespace-nowrap"
            >
              Get Started Free
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              ✨ <span>AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2">
              🔗 <span>Blockchain Payments</span>
            </div>
            <div className="flex items-center gap-2">
              🚀 <span>Smart Networking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
