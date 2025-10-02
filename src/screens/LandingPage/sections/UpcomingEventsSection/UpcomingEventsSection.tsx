import { MapPinIcon, PhoneIcon, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin, Heart } from "lucide-react";
import React from "react";

export const UpcomingEventsSection = (): JSX.Element => {
  const logoPath = `${import.meta.env.BASE_URL}logo.png`;
  // Contact information data
  const contactInfo = [
    {
      icon: <MapPinIcon className="w-6 h-6 text-white" />,
      text: "Bishal Centre, 3rd Floor, Adapt F/K Complex, Kuratoli Rd, Dhaka 1229",
      link: null,
    },
    {
      icon: <PhoneIcon className="w-6 h-6 text-white" />,
      text: "01581-716993",
      link: "tel:01581716993",
    },
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      text: "info@bangladesholympiad.com",
      link: "mailto:info@bangladesholympiad.com",
    },
  ];

  // Social media icons data
  const socialIcons = [
    { 
      icon: Facebook, 
      alt: "Facebook", 
      link: "#",
      color: "hover:bg-blue-600"
    },
    { 
      icon: Twitter, 
      alt: "Twitter", 
      link: "#",
      color: "hover:bg-sky-500"
    },
    { 
      icon: Instagram, 
      alt: "Instagram", 
      link: "#",
      color: "hover:bg-pink-600"
    },
    { 
      icon: Youtube, 
      alt: "YouTube", 
      link: "#",
      color: "hover:bg-red-600"
    },
    { 
      icon: Linkedin, 
      alt: "LinkedIn", 
      link: "#",
      color: "hover:bg-blue-700"
    },
  ];

  // Menu links data
  const menuLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" }
  ];

  // Team links data
  const teamLinks = [
    { name: "Students", href: "/signup" },
    { name: "Teachers", href: "/login" },
    { name: "Schools", href: "/login" },
    { name: "Partners", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Main footer section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Logo and description */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-morphing">
                      <img src={logoPath} alt="Bangladesh Olympiad logo" width="48" height="48" loading="lazy" decoding="async" className="w-12 h-12 object-contain" />
                    </div>
                    <div className="absolute -inset-1 z-0 pointer-events-none bg-gradient-to-r from-green-400 to-red-400 rounded-full blur opacity-40 animate-pulse-glow"></div>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">Bangladesh Olympiad</h3>
                    <p className="text-gray-300">Academic Excellence • Class 1-12</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Empowering young minds across Bangladesh through academic competitions, 
                  fostering excellence, and building the future leaders of our nation.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">Get in Touch</h4>
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 p-2 bg-gradient-to-r from-green-600 to-red-500 rounded-lg group-hover:shadow-lg transition-all duration-300">
                      {item.icon}
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-300 hover:text-white transition-colors duration-300 leading-relaxed"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-300 leading-relaxed">
                        {item.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {socialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className={`p-3 bg-gray-700 rounded-full text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.alt}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
                <nav>
                  <ul className="space-y-3">
                    {menuLinks.map((link, index) => (
                      <li key={index}>
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-green-500 rounded-full group-hover:w-2 transition-all duration-300"></span>
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Community */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Community</h4>
                <nav>
                  <ul className="space-y-3">
                    {teamLinks.map((link, index) => (
                      <li key={index}>
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300"></span>
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Stay Updated</h4>
                <p className="text-gray-300 text-sm">
                  Get the latest updates about competitions and events.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-red-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span>© 2025 Bangladesh Olympiad. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>for Bangladesh's future leaders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};