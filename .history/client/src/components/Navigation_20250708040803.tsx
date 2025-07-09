// src/components/Navigation.tsx
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Zap, User, MessageSquare, Link as LinkIcon } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: LinkIcon },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/network", label: "Network", icon: Users },
  { path: "/wallet", label: "Wallet", icon: Zap },
  { path: "/ai", label: "AI Tools", icon: MessageSquare },
  { path: "/profile", label: "Profile", icon: User },
];

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ProConnect
            </h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "hover:bg-blue-50 text-gray-700"
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/jobs">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
