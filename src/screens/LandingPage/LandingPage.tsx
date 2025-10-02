import React from "react";
import { NoticeSection } from "./sections/NoticeSection";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { EventsSection } from "./sections/EventsSection";
import { PhotoGallerySection } from "./sections/PhotoGallerySection";
import { UpcomingEventsSection } from "./sections/UpcomingEventsSection";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      {/* Header/Navigation */}
      <header className="w-full sticky top-0 z-50">
        <NoticeSection />
      </header>

      {/* Main Content */}
      <main className="bg-white w-full max-w-[1440px] relative">
        {/* Hero Section */}
        <section id="home" className="w-full">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about" className="w-full">
          <AboutSection />
        </section>

        {/* Events Section */}
        <section id="events" className="w-full">
          <EventsSection />
        </section>

        {/* Photo Gallery Section */}
        <section id="gallery" className="w-full bg-[#fff2f2]">
          <div className="py-12 text-center">
            <h2 className="font-['Montagu_Slab',Helvetica] font-semibold text-[#7886c7] text-4xl lg:text-5xl mb-4">
              Photo Gallery
            </h2>
            <p className="font-['Poppins',Helvetica] text-[#666a93] text-lg max-w-2xl mx-auto mb-8">
              Explore moments from our previous events and see the excitement of competition.
            </p>
          </div>
          <PhotoGallerySection />
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full">
        <UpcomingEventsSection />
      </footer>
    </div>
  );
};