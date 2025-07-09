// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import JobFeed from "@/pages/JobFeed";
import ProfilePage from "@/pages/ProfilePage";
import NetworkingSection from "@/pages/NetworkingSection";
import WalletConnect from "@/pages/WalletConnect";
import AIFeatures from "@/pages/AIFeatures";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobs" element={<JobFeed />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/network" element={<NetworkingSection />} />
    <Route path="/wallet" element={<WalletConnect />} />
    <Route path="/ai" element={<AIFeatures />} />
  </Routes>
);

export default AppRoutes;
