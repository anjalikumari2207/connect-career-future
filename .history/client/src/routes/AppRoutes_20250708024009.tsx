// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

// ✅ FIXED paths: If Home was a component (like HeroSection), import from components
import Home from "@/pages/Home"; // or "@/components/Home" if it's actually there
import JobFeed from "@/pages/JobFeed";
import ProfilePage from "@/pages/ProfilePage";
import NetworkingSection from "@/components/NetworkingSection";
import WalletConnect from "@/components/WalletConnect";
import AIFeatures from "@/components/AIFeatures";

// ✅ Optional: Add a NotFound route for unmatched paths
const NotFound = () => <div className="text-center py-16 text-xl text-gray-600">404 - Page Not Found</div>;

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobs" element={<JobFeed />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/network" element={<NetworkingSection />} />
    <Route path="/wallet" element={<WalletConnect />} />
    <Route path="/ai" element={<AIFeatures />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
