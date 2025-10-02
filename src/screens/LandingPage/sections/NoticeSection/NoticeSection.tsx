import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { Button } from "../../../../components/ui/button";
import { Menu, X, Globe, Bell, Languages, Search, User, ChevronDown, Sparkles, Trophy, BookOpen, Users } from "lucide-react";

export const NoticeSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const logoPath = `${import.meta.env.BASE_URL}logo.png`;

  // Navigation menu items with icons
  const navItems = [
    { label: t('nav.home'), href: "#home", icon: Globe },
    { label: t('nav.about'), href: "#about", icon: BookOpen },
    { label: t('nav.events'), href: "#events", icon: Trophy },
    { label: t('nav.gallery'), href: "#gallery", icon: Users },
    { label: t('nav.contact'), href: "#contact", icon: User },
    { label: "Dashboard", href: "/dashboard", icon: User },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-green-100/50' 
        : 'bg-gradient-to-r from-green-600/95 to-red-500/95 backdrop-blur-md'
    }`}>
      {/* Top notification bar */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-red-600 text-white py-3 px-4 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-wave"></div>
        </div>
        
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm relative z-10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 animate-bounce text-yellow-300" />
            <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
          </div>
          <span className="font-bold text-center">
            🎉 {language === 'en' 
              ? 'Registration Open for Mathematics Olympiad 2025! Limited Seats Available - Register Now!'
              : 'গণিত অলিম্পিয়াড ২০২৫ এর জন্য নিবন্ধন খোলা! সীমিত আসন উপলব্ধ - এখনই নিবন্ধন করুন!'
            }
          </span>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 animate-bounce delay-300 text-yellow-300" />
            <Sparkles className="w-4 h-4 animate-pulse delay-500 text-yellow-300" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => scrollToSection('#home')}
          >
            <div className="relative">
              {/* Main logo container */}
              <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 via-green-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 animate-morphing">
                <img src={logoPath} alt="Bangladesh Olympiad logo" width="48" height="48" decoding="async" fetchpriority="high" className="w-12 h-12 object-contain filter drop-shadow-lg" />
              </div>
              {/* Animated rings */}
              <div className="absolute -inset-2 z-0 pointer-events-none bg-gradient-to-r from-green-400 to-red-400 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse-glow"></div>
              <div className="absolute -inset-4 z-0 pointer-events-none bg-gradient-to-r from-green-300 to-red-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-spin-slow"></div>
              {/* Sparkle effects */}
              <Sparkles className="absolute -top-2 -right-2 z-20 pointer-events-none w-5 h-5 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className={`transition-all duration-500 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              <div className="text-xl font-bold leading-tight group-hover:scale-105 transition-transform duration-300">
                Bangladesh Olympiad
              </div>
              <div className="text-sm opacity-80 font-medium">
                {language === 'en' ? 'Academic Excellence • Class 1-12' : 'একাডেমিক এক্সিলেন্স • ক্লাস ১-১২'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.href.startsWith('#') ? scrollToSection(item.href) : navigate(item.href)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                    : 'text-white hover:text-green-200 hover:bg-white/10'
                }`}
              >
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <item.icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">{item.label}</span>
                
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-red-500 group-hover:w-full transition-all duration-500 rounded-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Advanced Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-green-600' 
                    : 'text-white hover:bg-white/10 hover:text-green-200'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Search dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-slide-up">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Search competitions, subjects...' : 'প্রতিযোগিতা, বিষয় খুঁজুন...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    {language === 'en' ? 'Popular: Mathematics, Science, English' : 'জনপ্রিয়: গণিত, বিজ্ঞান, ইংরেজি'}
                  </div>
                </div>
              )}
            </div>
            
            {/* Language Toggle with Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-green-600' 
                    : 'text-white hover:bg-white/10 hover:text-green-200'
                }`}
              >
                <Languages className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  {language === 'en' ? 'বাংলা' : 'English'}
                </span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Enhanced Auth Buttons */}
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className={`font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled 
                  ? 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white' 
                  : 'border-2 border-white text-white hover:bg-white hover:text-green-600'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              {t('nav.login')}
            </Button>

            <Button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Sparkles className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">{t('nav.register')}</span>
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl border-t border-gray-100 animate-slide-up">
            <div className="px-6 py-8 space-y-6">
              {/* Mobile search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search...' : 'খুঁজুন...'}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              {/* Mobile nav items */}
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.href.startsWith('#') ? scrollToSection(item.href) : navigate(item.href)}
                  className="flex items-center gap-4 w-full text-left py-4 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-2 bg-gradient-to-r from-green-500 to-red-500 rounded-lg group-hover:shadow-lg transition-all duration-300">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
              
              <div className="border-t pt-6 space-y-4">
                {/* Mobile language toggle */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-3 py-4 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Languages className="w-5 h-5" />
                  <span>{language === 'en' ? 'Switch to বাংলা' : 'Switch to English'}</span>
                </button>
                
                {/* Mobile auth buttons */}
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.login')}
                </Button>
                
                <Button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t('nav.register')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};