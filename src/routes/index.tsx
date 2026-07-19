import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features, HowItWorks, TechStack, Testimonials, Cta } from "@/components/landing/sections";
import { Footer } from "@/components/landing/footer";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TechStack />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
