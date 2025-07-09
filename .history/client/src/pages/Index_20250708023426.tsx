
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, Briefcase, Users, Zap, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import HeroSection from "@/pages/HeroSection";
import JobFeed from "@/components/JobFeed";
import NetworkingSection from "@/pages/NetworkingSection";
import WalletConnect from "@/pages/WalletConnect";
import AIFeatures from "@/pages/AIFeatures";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const { toast } = useToast();

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    toast({
      title: `Switched to ${section}`,
      description: `Now viewing the ${section} section`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation currentSection={currentSection} onSectionChange={handleSectionChange} />
      
      <main className="pt-16">
        {currentSection === "home" && (
          <>
            <HeroSection onGetStarted={() => handleSectionChange("jobs")} />
            <div className="py-16 px-4">
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
            </div>
          </>
        )}
        
        {currentSection === "jobs" && <JobFeed />}
        {currentSection === "network" && <NetworkingSection />}
        {currentSection === "wallet" && <WalletConnect />}
        {currentSection === "ai" && <AIFeatures />}
        {currentSection === "profile" && (
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Profile</CardTitle>
                  <CardDescription>Manage your professional presence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">Jane Doe</h3>
                        <p className="text-gray-600">Senior Software Engineer</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">TypeScript</Badge>
                          <Badge variant="secondary">Node.js</Badge>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
