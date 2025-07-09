import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "@/components/Navigation";
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import PostJob from "@/pages/PostJob";
import JobFeed from "@/pages/JobFeed";
import Home from "@/pages/Home";
import NetworkingSection from "@/pages/NetworkingSection";
import PhantomConnect from "./components/blockchain/PhantomConnect";
import AIFeatures from "@/pages/AIFeatures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* ✅ Show Navigation on every page */}
        <Navigation />
        
        {/* ✅ All routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage onLogin={(user) => console.log("Logged in:", user)} />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs" element={<JobFeed />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/network" element={<NetworkingSection />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/phantom" element={<PhantomConnect />} />
          <Route path="/ai" element={<AIFeatures />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
