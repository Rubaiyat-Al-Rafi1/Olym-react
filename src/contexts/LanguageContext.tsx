import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.events': 'Events',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.register': 'Register Now',
    
    // Hero Section
    'hero.title': 'Bangladesh Olympiad',
    'hero.subtitle': 'Academic Excellence • Class 1-12',
    'hero.welcome': 'Welcome back',
    'hero.tagline1': 'Academic Excellence Awaits',
    'hero.tagline2': 'Join 50,000+ Students',
    'hero.tagline3': 'Compete & Win Prizes',
    'hero.tagline4': 'Build Your Future',
    'hero.description': 'Join the largest academic competition in Bangladesh! Test your knowledge, compete with brilliant minds, and win amazing prizes.',
    'hero.cta': 'Register Now',
    'hero.learn_more': 'Learn More',
    'hero.rating': '4.9/5 Rating',
    'hero.certified': 'Certified Platform',
    'hero.students': 'Students',
    'hero.schools': 'Schools',
    'hero.subjects': 'Subjects',
    'hero.prizes': 'Prize Pool',
    'hero.total_prize': 'Total Prize Pool',
    
    // About Section
    'about.title': 'Empowering Young Minds Across Bangladesh',
    'about.description': 'A premier academic competition designed to identify, nurture, and celebrate the brightest school students across Bangladesh in various subjects from Class 1 to 12.',
    'about.feature1.title': 'Academic Excellence',
    'about.feature1.desc': 'Challenge yourself against the brightest students across Bangladesh in Mathematics, Science, English and more.',
    'about.feature2.title': 'Peer Learning',
    'about.feature2.desc': 'Connect with fellow students from 500+ schools and build lasting friendships through healthy competition.',
    'about.feature3.title': 'Skill Development',
    'about.feature3.desc': 'Enhance your problem-solving abilities and critical thinking skills through challenging questions.',
    'about.feature4.title': 'National Recognition',
    'about.feature4.desc': 'Gain recognition at the national level and boost your academic profile for future opportunities.',
    'about.subjects.title': 'Compete in Your Favorite Subjects',
    'about.subjects.desc': 'Choose from a wide range of subjects and showcase your expertise',
    'about.cta.title': 'Ready to Showcase Your Academic Skills?',
    'about.cta.desc': 'Don\'t miss this opportunity to test your knowledge, compete with peers across Bangladesh, and win exciting prizes. Registration is now open for all classes!',
    
    // Events Section
    'events.title': 'Join the Academic Challenge',
    'events.description': 'Participate in our exciting lineup of academic competitions and challenges. Each event is designed to test different subjects and enhance your learning experience.',
    'events.math.title': 'Mathematics Olympiad',
    'events.math.desc': 'Test your mathematical problem-solving skills with challenging questions designed for different class levels.',
    'events.math.prize': '৳5,00,000 Prize Pool',
    'events.science.title': 'Science Olympiad',
    'events.science.desc': 'Explore the wonders of science through exciting questions covering Physics, Chemistry, and Biology.',
    'events.science.prize': '৳3,00,000 Prize Pool',
    'events.english.title': 'English Language Competition',
    'events.english.desc': 'Demonstrate your English language proficiency through grammar, vocabulary, and comprehension challenges.',
    'events.english.prize': '৳2,00,000 Prize Pool',
    'events.status.open': 'Registration Open',
    'events.prize_pool': 'Prize Pool',
    'events.subjects_covered': 'Subjects Covered:',
    'events.more_coming': 'More Competitions Coming Soon',
    'events.view_all': 'View All Competitions',
    
    // Auth Pages
    'auth.welcome': 'Welcome',
    'auth.signup_title': 'Join Bangladesh Olympiad',
    'auth.login_desc': 'Sign in to continue your academic journey',
    'auth.signup_desc': 'Join the Bangladesh Olympiad',
    'auth.full_name': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.class': 'Class',
    'auth.district': 'District',
    'auth.school': 'School Name',
    'auth.phone': 'Phone',
    'auth.sign_in': 'Sign In',
    'auth.create_account': 'Create Account',
    'auth.already_account': 'Already have an account?',
    'auth.new_to_platform': 'New to Bangladesh Olympiad?',
    'auth.sign_in_instead': 'Sign In Instead',
    'auth.demo_accounts': 'Demo Accounts:',
    'auth.admin_panel': 'Admin Panel',
    'auth.student': 'Student',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.ready': 'Ready to take on new challenges?',
    'dashboard.your_class': 'Your Class',
    'dashboard.best_rank': 'Best Rank',
    'dashboard.performance': 'Your Performance',
    'dashboard.view_all_tests': 'View All Tests',
    'dashboard.tests_taken': 'Tests Taken',
    'dashboard.average_score': 'Average Score',
    'dashboard.total_points': 'Total Points',
    'dashboard.upcoming_exams': 'Upcoming Exams',
    'dashboard.recent_results': 'Recent Results',
    'dashboard.prize_money': 'Prize Money',
    'dashboard.total_earnings': 'Total Earnings',
    'dashboard.registered': 'Registered',
    'dashboard.available': 'Available',
    'dashboard.register_now': 'Register Now',
    'dashboard.score': 'Score',
    'dashboard.rank': 'Rank',
    
    // Footer
    'footer.description': 'Empowering young minds across Bangladesh through academic competitions, fostering excellence, and building the future leaders of our nation.',
    'footer.get_in_touch': 'Get in Touch',
    'footer.follow_us': 'Follow Us',
    'footer.quick_links': 'Quick Links',
    'footer.community': 'Community',
    'footer.students': 'Students',
    'footer.teachers': 'Teachers',
    'footer.schools': 'Schools',
    'footer.partners': 'Partners',
    'footer.stay_updated': 'Stay Updated',
    'footer.newsletter_desc': 'Get the latest updates about competitions and events.',
    'footer.enter_email': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': '© 2025 Bangladesh Olympiad. All rights reserved.',
    'footer.made_with_love': 'Made with love for Bangladesh\'s future leaders',
    
    // Common
    'common.loading': 'Loading...',
    'common.view_details': 'View Details',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.location': 'Location',
    'common.participants': 'Participants',
    'common.duration': 'Duration',
    'common.questions': 'Questions',
    'common.minutes': 'minutes',
    'common.select_class': 'Select Class',
    'common.select_district': 'Select District',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.about': 'সম্পর্কে',
    'nav.events': 'ইভেন্ট',
    'nav.gallery': 'গ্যালারি',
    'nav.contact': 'যোগাযোগ',
    'nav.login': 'লগইন',
    'nav.signup': 'সাইন আপ',
    'nav.register': 'এখনই নিবন্ধন করুন',
    
    // Hero Section
    'hero.title': 'বাংলাদেশ অলিম্পিয়াড',
    'hero.subtitle': 'একাডেমিক এক্সিলেন্স • ক্লাস ১-১২',
    'hero.welcome': 'স্বাগতম',
    'hero.tagline1': 'একাডেমিক এক্সিলেন্স অপেক্ষা করছে',
    'hero.tagline2': '৫০,০০০+ শিক্ষার্থীর সাথে যোগ দিন',
    'hero.tagline3': 'প্রতিযোগিতা করুন ও পুরস্কার জিতুন',
    'hero.tagline4': 'আপনার ভবিষ্যৎ গড়ুন',
    'hero.description': 'বাংলাদেশের সবচেয়ে বড় একাডেমিক প্রতিযোগিতায় যোগ দিন! আপনার জ্ঞান পরীক্ষা করুন, মেধাবী শিক্ষার্থীদের সাথে প্রতিযোগিতা করুন এবং আকর্ষণীয় পুরস্কার জিতুন।',
    'hero.cta': 'নিবন্ধন করুন',
    'hero.learn_more': 'আরও জানুন',
    'hero.rating': '৪.৯/৫ রেটিং',
    'hero.certified': 'সার্টিফাইড প্ল্যাটফর্ম',
    'hero.students': 'শিক্ষার্থী',
    'hero.schools': 'স্কুল',
    'hero.subjects': 'বিষয়',
    'hero.prizes': 'পুরস্কার পুল',
    'hero.total_prize': 'মোট পুরস্কার পুল',
    
    // About Section
    'about.title': 'বাংলাদেশ জুড়ে তরুণ মনের ক্ষমতায়ন',
    'about.description': 'ক্লাস ১ থেকে ১২ পর্যন্ত বিভিন্ন বিষয়ে বাংলাদেশের সবচেয়ে মেধাবী স্কুল শিক্ষার্থীদের চিহ্নিত করা, লালন করা এবং উদযাপন করার জন্য ডিজাইন করা একটি প্রিমিয়ার একাডেমিক প্রতিযোগিতা।',
    'about.feature1.title': 'একাডেমিক এক্সিলেন্স',
    'about.feature1.desc': 'গণিত, বিজ্ঞান, ইংরেজি এবং আরও অনেক বিষয়ে বাংলাদেশের সবচেয়ে মেধাবী শিক্ষার্থীদের বিরুদ্ধে নিজেকে চ্যালেঞ্জ করুন।',
    'about.feature2.title': 'সহপাঠী শিক্ষা',
    'about.feature2.desc': '৫০০+ স্কুলের সহপাঠীদের সাথে সংযোগ স্থাপন করুন এবং স্বাস্থ্যকর প্রতিযোগিতার মাধ্যমে দীর্ঘস্থায়ী বন্ধুত্ব গড়ুন।',
    'about.feature3.title': 'দক্ষতা উন্নয়ন',
    'about.feature3.desc': 'চ্যালেঞ্জিং প্রশ্নের মাধ্যমে আপনার সমস্যা সমাধানের ক্ষমতা এবং সমালোচনামূলক চিন্তাভাবনার দক্ষতা বৃদ্ধি করুন।',
    'about.feature4.title': 'জাতীয় স্বীকৃতি',
    'about.feature4.desc': 'জাতীয় পর্যায়ে স্বীকৃতি অর্জন করুন এবং ভবিষ্যতের সুযোগের জন্য আপনার একাডেমিক প্রোফাইল উন্নত করুন।',
    'about.subjects.title': 'আপনার প্রিয় বিষয়ে প্রতিযোগিতা করুন',
    'about.subjects.desc': 'বিস্তৃত বিষয়ের পরিসর থেকে বেছে নিন এবং আপনার দক্ষতা প্রদর্শন করুন',
    'about.cta.title': 'আপনার একাডেমিক দক্ষতা প্রদর্শনের জন্য প্রস্তুত?',
    'about.cta.desc': 'আপনার জ্ঞান পরীক্ষা করার, বাংলাদেশ জুড়ে সহপাঠীদের সাথে প্রতিযোগিতা করার এবং রোমাঞ্চকর পুরস্কার জেতার এই সুযোগটি হাতছাড়া করবেন না। সব ক্লাসের জন্য নিবন্ধন এখন খোলা!',
    
    // Events Section
    'events.title': 'একাডেমিক চ্যালেঞ্জে যোগ দিন',
    'events.description': 'আমাদের রোমাঞ্চকর একাডেমিক প্রতিযোগিতা এবং চ্যালেঞ্জের লাইনআপে অংশগ্রহণ করুন। প্রতিটি ইভেন্ট বিভিন্ন বিষয় পরীক্ষা করতে এবং আপনার শেখার অভিজ্ঞতা বাড়াতে ডিজাইন করা হয়েছে।',
    'events.math.title': 'গণিত অলিম্পিয়াড',
    'events.math.desc': 'বিভিন্ন ক্লাস স্তরের জন্য ডিজাইন করা চ্যালেঞ্জিং প্রশ্নের মাধ্যমে আপনার গাণিতিক সমস্যা সমাধানের দক্ষতা পরীক্ষা করুন।',
    'events.math.prize': '৳৫,০০,০০০ পুরস্কার পুল',
    'events.science.title': 'বিজ্ঞান অলিম্পিয়াড',
    'events.science.desc': 'পদার্থবিজ্ঞান, রসায়ন এবং জীববিজ্ঞান কভার করে রোমাঞ্চকর প্রশ্নের মাধ্যমে বিজ্ঞানের বিস্ময় অন্বেষণ করুন।',
    'events.science.prize': '৳৩,০০,০০০ পুরস্কার পুল',
    'events.english.title': 'ইংরেজি ভাষা প্রতিযোগিতা',
    'events.english.desc': 'ব্যাকরণ, শব্দভাণ্ডার এবং বোধগম্যতার চ্যালেঞ্জের মাধ্যমে আপনার ইংরেজি ভাষার দক্ষতা প্রদর্শন করুন।',
    'events.english.prize': '৳২,০০,০০০ পুরস্কার পুল',
    'events.status.open': 'নিবন্ধন খোলা',
    'events.prize_pool': 'পুরস্কার পুল',
    'events.subjects_covered': 'অন্তর্ভুক্ত বিষয়সমূহ:',
    'events.more_coming': 'আরও প্রতিযোগিতা শীঘ্রই আসছে',
    'events.view_all': 'সব প্রতিযোগিতা দেখুন',
    
    // Auth Pages
    'auth.welcome': 'স্বাগতম',
    'auth.signup_title': 'বাংলাদেশ অলিম্পিয়াডে যোগ দিন',
    'auth.login_desc': 'আপনার একাডেমিক যাত্রা চালিয়ে যেতে সাইন ইন করুন',
    'auth.signup_desc': 'বাংলাদেশ অলিম্পিয়াডে যোগ দিন',
    'auth.full_name': 'পূর্ণ নাম',
    'auth.email': 'ইমেইল ঠিকানা',
    'auth.password': 'পাসওয়ার্ড',
    'auth.confirm_password': 'পাসওয়ার্ড নিশ্চিত করুন',
    'auth.class': 'ক্লাস',
    'auth.district': 'জেলা',
    'auth.school': 'স্কুলের নাম',
    'auth.phone': 'ফোন',
    'auth.sign_in': 'সাইন ইন',
    'auth.create_account': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.already_account': 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    'auth.new_to_platform': 'বাংলাদেশ অলিম্পিয়াডে নতুন?',
    'auth.sign_in_instead': 'পরিবর্তে সাইন ইন করুন',
    'auth.demo_accounts': 'ডেমো অ্যাকাউন্ট:',
    'auth.admin_panel': 'অ্যাডমিন প্যানেল',
    'auth.student': 'শিক্ষার্থী',
    
    // Dashboard
    'dashboard.welcome': 'স্বাগতম',
    'dashboard.ready': 'নতুন চ্যালেঞ্জ নিতে প্রস্তুত?',
    'dashboard.your_class': 'আপনার ক্লাস',
    'dashboard.best_rank': 'সেরা র‍্যাঙ্ক',
    'dashboard.performance': 'আপনার পারফরম্যান্স',
    'dashboard.view_all_tests': 'সব পরীক্ষা দেখুন',
    'dashboard.tests_taken': 'পরীক্ষা দেওয়া হয়েছে',
    'dashboard.average_score': 'গড় স্কোর',
    'dashboard.total_points': 'মোট পয়েন্ট',
    'dashboard.upcoming_exams': 'আসন্ন পরীক্ষা',
    'dashboard.recent_results': 'সাম্প্রতিক ফলাফল',
    'dashboard.prize_money': 'পুরস্কারের টাকা',
    'dashboard.total_earnings': 'মোট আয়',
    'dashboard.registered': 'নিবন্ধিত',
    'dashboard.available': 'উপলব্ধ',
    'dashboard.register_now': 'এখনই নিবন্ধন করুন',
    'dashboard.score': 'স্কোর',
    'dashboard.rank': 'র‍্যাঙ্ক',
    
    // Footer
    'footer.description': 'একাডেমিক প্রতিযোগিতার মাধ্যমে বাংলাদেশ জুড়ে তরুণ মনের ক্ষমতায়ন, উৎকর্ষতা বৃদ্ধি এবং আমাদের জাতির ভবিষ্যৎ নেতা তৈরি করা।',
    'footer.get_in_touch': 'যোগাযোগ করুন',
    'footer.follow_us': 'আমাদের ফলো করুন',
    'footer.quick_links': 'দ্রুত লিংক',
    'footer.community': 'কমিউনিটি',
    'footer.students': 'শিক্ষার্থী',
    'footer.teachers': 'শিক্ষক',
    'footer.schools': 'স্কুল',
    'footer.partners': 'অংশীদার',
    'footer.stay_updated': 'আপডেট থাকুন',
    'footer.newsletter_desc': 'প্রতিযোগিতা এবং ইভেন্ট সম্পর্কে সর্বশেষ আপডেট পান।',
    'footer.enter_email': 'আপনার ইমেইল লিখুন',
    'footer.subscribe': 'সাবস্ক্রাইব',
    'footer.copyright': '© ২০২৫ বাংলাদেশ অলিম্পিয়াড। সকল অধিকার সংরক্ষিত।',
    'footer.made_with_love': 'বাংলাদেশের ভবিষ্যৎ নেতাদের জন্য ভালোবাসা দিয়ে তৈরি',
    
    // Common
    'common.loading': 'লোড হচ্ছে...',
    'common.view_details': 'বিস্তারিত দেখুন',
    'common.edit': 'সম্পাদনা',
    'common.delete': 'মুছুন',
    'common.save': 'সংরক্ষণ',
    'common.cancel': 'বাতিল',
    'common.search': 'খুঁজুন...',
    'common.filter': 'ফিল্টার',
    'common.all': 'সব',
    'common.date': 'তারিখ',
    'common.time': 'সময়',
    'common.location': 'অবস্থান',
    'common.participants': 'অংশগ্রহণকারী',
    'common.duration': 'সময়কাল',
    'common.questions': 'প্রশ্ন',
    'common.minutes': 'মিনিট',
    'common.select_class': 'ক্লাস নির্বাচন করুন',
    'common.select_district': 'জেলা নির্বাচন করুন',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};