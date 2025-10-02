import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { formatBDTCompact, TOTAL_PRIZE_POOL } from "../../../../utils/currency";
import { Button } from "../../../../components/ui/button";
import { Play, Award, Users, BookOpen, Star } from "lucide-react";

export const HeroSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentText, setCurrentText] = useState(0);
  const logoPath = `${import.meta.env.BASE_URL}logo.png`;
  
  const heroTexts = [
    t('hero.tagline1'),
    t('hero.tagline2'),
    t('hero.tagline3'),
    t('hero.tagline4')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-red-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large floating shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-white/40 to-yellow-300/40 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Geometric shapes */}
        <div className="absolute top-32 right-32 w-16 h-16 border-4 border-white/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-yellow-400/30 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Logo and Title */}
              <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="relative group">
                  <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 animate-morphing">
                    <img src={logoPath} alt="Bangladesh Olympiad logo" width="64" height="64" decoding="async" fetchpriority="high" className="w-16 h-16 object-contain" />
                  </div>
                  <div className="absolute -inset-2 z-0 pointer-events-none bg-gradient-to-r from-green-400 to-red-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-glow"></div>
                </div>
                <div className="text-white">
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
                    {t('hero.title')}
                  </h1>
                  <p className="text-green-100 text-lg font-medium">{t('hero.subtitle')}</p>
                </div>
              </div>

              {/* Dynamic subtitle */}
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <h2 className="text-2xl lg:text-3xl font-bold text-white animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-white">
                  {heroTexts[currentText]}
                </h2>
              </div>

              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                {t('hero.description')}
                <span className="font-bold text-yellow-300"> {t('hero.tagline4')}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button 
                onClick={() => navigate('/signup')}
                className="group bg-white text-green-600 hover:bg-green-50 font-bold text-xl px-10 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500"
              >
                <span className="mr-3">🚀</span>
                {t('hero.cta')}
                <Play className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold text-xl px-10 py-6 rounded-full backdrop-blur-sm bg-white/10 hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
              >
                {t('hero.learn_more')}
                <BookOpen className="ml-3 w-6 h-6" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{t('hero.rating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">{t('hero.certified')}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Stats */}
          <div className="relative">
            {/* Main stats container */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, number: "50,000+", label: t('hero.students'), color: "from-blue-500 to-purple-600" },
                { icon: BookOpen, number: "500+", label: t('hero.schools'), color: "from-green-500 to-teal-600" },
                { icon: Award, number: "12", label: t('hero.subjects'), color: "from-yellow-500 to-orange-600" },
                { icon: Star, number: formatBDTCompact(TOTAL_PRIZE_POOL), label: t('hero.prizes'), color: "from-pink-500 to-red-600" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group glass-card p-8 text-center hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Floating achievement badges */}
            <div className="absolute -top-8 -right-8 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce-slow">
              🏆 #1 Platform
            </div>
            <div className="absolute -bottom-8 -left-8 bg-green-400 text-green-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce-slow delay-1000">
              ✨ Trusted by Schools
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};