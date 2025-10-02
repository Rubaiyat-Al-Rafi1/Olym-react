import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Trophy, Users, Target, Zap, BookOpen, Award, Star, Globe } from "lucide-react";

export const AboutSection = (): JSX.Element => {
  const features = [
    {
      icon: <Trophy className="w-10 h-10 text-white" />,
      title: "Academic Excellence",
      description: "Challenge yourself against the brightest students across Bangladesh in Mathematics, Science, English and more.",
      gradient: "from-yellow-500 to-orange-600",
      delay: "0ms"
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: "Peer Learning",
      description: "Connect with fellow students from 500+ schools and build lasting friendships through healthy competition.",
      gradient: "from-blue-500 to-purple-600",
      delay: "200ms"
    },
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: "Skill Development",
      description: "Enhance your problem-solving abilities and critical thinking skills through challenging questions.",
      gradient: "from-green-500 to-teal-600",
      delay: "400ms"
    },
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "National Recognition",
      description: "Gain recognition at the national level and boost your academic profile for future opportunities.",
      gradient: "from-pink-500 to-red-600",
      delay: "600ms"
    }
  ];

  const subjects = [
    { name: "Mathematics", icon: "🔢", students: "15,000+" },
    { name: "Science", icon: "🔬", students: "12,000+" },
    { name: "English", icon: "📚", students: "10,000+" },
    { name: "General Knowledge", icon: "🌍", students: "8,000+" },
    { name: "Computer Science", icon: "💻", students: "6,000+" },
    { name: "Bengali", icon: "📖", students: "5,000+" }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200/30 rounded-full blur-xl animate-float"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm mb-6 shadow-lg">
            <Globe className="w-5 h-5" />
            About Bangladesh Olympiad
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold gradient-text mb-8 leading-tight">
            Empowering Young Minds
            <span className="block text-4xl lg:text-5xl">Across Bangladesh</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A premier academic competition designed to identify, nurture, and celebrate 
            the brightest school students across Bangladesh in various subjects from 
            <span className="font-bold text-green-600"> Class 1 to 12</span>.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group card-modern hover-lift border-0 overflow-hidden animate-slide-up"
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="p-8 text-center relative">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                  {feature.icon}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subjects Section */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Compete in Your Favorite Subjects
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of subjects and showcase your expertise
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{subject.name}</h4>
                <p className="text-sm text-green-600 font-medium">{subject.students}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <Card className="card-modern border-0 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-red-500 opacity-95"></div>
              
              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 rounded-full animate-float delay-1000"></div>
              <div className="absolute top-1/2 right-16 w-8 h-8 bg-white/20 rounded-full animate-bounce-slow"></div>
              
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-yellow-300 fill-current animate-pulse" />
                  <h3 className="text-3xl lg:text-4xl font-bold">
                    Ready to Showcase Your Academic Skills?
                  </h3>
                  <Star className="w-8 h-8 text-yellow-300 fill-current animate-pulse delay-500" />
                </div>
                
                <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Don't miss this opportunity to test your knowledge, compete with peers across Bangladesh, 
                  and win exciting prizes. Registration is now open for all classes!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-300" />
                      <span className="font-medium">₹5L+ Prize Pool</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-yellow-300" />
                      <span className="font-medium">50,000+ Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};