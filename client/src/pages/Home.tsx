// src/pages/Home.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="text-center bg-slate-50 py-20 px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Your Career, <span className="text-indigo-600">Supercharged</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          The future of professional networking is here. Connect, discover opportunities,
          and get paid seamlessly with blockchain technology and AI-powered matching.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Input
            placeholder="Enter your email"
            className="w-full sm:w-72"
          />
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            Get Started Free
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mt-6">
          <span>✨ AI-Powered Matching</span>
          <span>🔗 Blockchain Payments</span>
          <span>🚀 Smart Networking</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Professional Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines the best of professional networking, job discovery,
              and blockchain-powered payments in one seamless experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Smart Job Matching</CardTitle>
                <CardDescription>
                  AI-powered job recommendations based on your skills and preferences
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Professional Networking</CardTitle>
                <CardDescription>
                  Connect with like-minded professionals and expand your network
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Blockchain Payments</CardTitle>
                <CardDescription>
                  Secure, transparent payments powered by blockchain technology
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
