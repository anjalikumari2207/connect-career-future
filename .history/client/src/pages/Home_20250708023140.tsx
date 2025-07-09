// src/pages/Home.tsx
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection onGetStarted={() => window.scrollTo({ top: 0 })} />
    </>
  );
};

export default Home;
