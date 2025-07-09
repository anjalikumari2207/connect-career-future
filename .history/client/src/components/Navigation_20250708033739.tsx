import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  Zap,
  User,
  MessageSquare,
  Home,
} from "lucide-react"; // ✅ Import the correct icon for "Home"

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ currentSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "network", label: "Network", icon: Users },
    { id: "wallet", label: "Wallet", icon: Zap },
    { id: "ai", label: "AI Tools", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ProConnect
            </h1>
          </div>

          {/* Section Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className={`transition-all duration-200 ${
                    currentSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Auth / Actions */}
          <div className="flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              onClick={() => onSectionChange("jobs")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
