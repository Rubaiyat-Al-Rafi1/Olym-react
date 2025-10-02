import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { formatBDT, PRIZE_POOLS } from "../../../../utils/currency";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Calendar, Clock, MapPin, Users, Trophy, Star, Zap, BookOpen } from "lucide-react";

export const EventsSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const upcomingEvents = [
    {
      title: "Mathematics Olympiad",
      titleKey: "events.math.title",
      date: "March 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Online Platform",
      participants: "5,000+ Registered",
      description: "Test your mathematical problem-solving skills with challenging questions designed for different class levels.",
      descKey: "events.math.desc",
      status: "Registration Open",
      prize: formatBDT(PRIZE_POOLS.MATHEMATICS),
      difficulty: "All Levels",
      subjects: ["Algebra", "Geometry", "Number Theory"],
      gradient: "from-blue-500 to-purple-600",
      icon: "🔢"
    },
    {
      title: "Science Olympiad",
      titleKey: "events.science.title",
      date: "March 22, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Online Platform",
      participants: "4,500+ Registered",
      description: "Explore the wonders of science through exciting questions covering Physics, Chemistry, and Biology.",
      descKey: "events.science.desc",
      status: "Registration Open",
      prize: formatBDT(PRIZE_POOLS.SCIENCE),
      difficulty: "Intermediate",
      subjects: ["Physics", "Chemistry", "Biology"],
      gradient: "from-green-500 to-teal-600",
      icon: "🔬"
    },
    {
      title: "English Language Competition",
      titleKey: "events.english.title",
      date: "March 29, 2025",
      time: "11:00 AM - 1:00 PM",
      location: "Online Platform",
      participants: "3,800+ Registered",
      description: "Demonstrate your English language proficiency through grammar, vocabulary, and comprehension challenges.",
      descKey: "events.english.desc",
      status: "Registration Open",
      prize: formatBDT(PRIZE_POOLS.ENGLISH),
      difficulty: "All Levels",
      subjects: ["Grammar", "Vocabulary", "Comprehension"],
      gradient: "from-pink-500 to-red-600",
      icon: "📚"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-red-50 via-white to-green-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-32 w-16 h-16 border-4 border-green-300/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-red-300/30 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm mb-6 shadow-lg">
            <Zap className="w-5 h-5" />
            Upcoming Competitions
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold gradient-text mb-8 leading-tight">
            Join the Academic
            <span className="block">Challenge</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Participate in our exciting lineup of academic competitions and challenges. 
            Each event is designed to test different subjects and enhance your learning experience.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {upcomingEvents.map((event, index) => (
            <Card 
              key={index} 
              className="group card-modern hover-lift border-0 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0 relative">
                {/* Header with gradient */}
                <div className={`relative p-8 bg-gradient-to-r ${event.gradient} text-white overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 text-6xl opacity-30">{event.icon}</div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl">{event.icon}</div>
                      <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        {event.status}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                      {t(event.titleKey)}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-white/90">
                      <Trophy className="w-5 h-5" />
                      <span className="font-bold text-lg">{event.prize}</span>
                      <span className="text-sm">Prize Pool</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {t(event.descKey)}
                  </p>

                  {/* Event details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className={`p-2 bg-gradient-to-r ${event.gradient} rounded-lg`}>
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className={`p-2 bg-gradient-to-r ${event.gradient} rounded-lg`}>
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className={`p-2 bg-gradient-to-r ${event.gradient} rounded-lg`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className={`p-2 bg-gradient-to-r ${event.gradient} rounded-lg`}>
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{event.participants}</span>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Subjects Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.subjects.map((subject, idx) => (
                        <span 
                          key={idx}
                          className={`px-3 py-1 bg-gradient-to-r ${event.gradient} text-white text-sm rounded-full font-medium`}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    onClick={() => navigate('/signup')}
                    className={`w-full bg-gradient-to-r ${event.gradient} hover:shadow-xl text-white font-bold py-4 rounded-xl transform hover:scale-105 transition-all duration-300 group-hover:shadow-2xl`}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    নিবন্ধন করুন
                    <Zap className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-slide-up">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
            <span className="text-gray-500 font-medium">More Competitions Coming Soon</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold px-12 py-4 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Trophy className="w-6 h-6 mr-3" />
            View All Competitions
            <Star className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </section>
  );
};