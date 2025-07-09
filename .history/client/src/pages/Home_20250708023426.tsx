// src/pages/Home.tsx
import HeroSection from "@/pages/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection onGetStarted={() => window.scrollTo({ top: 0 })} />
    </>
  );
};

export default Home;
