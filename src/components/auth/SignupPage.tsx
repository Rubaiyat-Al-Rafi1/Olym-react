import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Eye, EyeOff, Mail, Lock, User, Phone, GraduationCap, CheckCircle, Star, Users, BookOpen, Languages } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    phone: '',
    class: '',
    district: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await signup(formData);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: CheckCircle, title: t('about.feature4.title'), desc: t('about.feature4.desc') },
    { icon: Star, title: t('hero.prizes'), desc: "৳5L+ prize pool across competitions" },
    { icon: Users, title: t('about.feature3.title'), desc: t('about.feature3.desc') }
  ];

  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const districts = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
    'Comilla', 'Narayanganj', 'Gazipur', 'Tangail', 'Jamalpur', 'Sherpur', 'Netrokona'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bangladesh Flag Colors Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-red-400 to-green-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Benefits & Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain hover:scale-105 transition-transform" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{t('auth.signup_title')}</h1>
                <p className="text-green-100 text-sm">{t('hero.subtitle')}</p>
              </div>
            </div>
            <p className="text-xl text-white/90 max-w-lg">
              {t('hero.description')}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-slide-right"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-red-400 rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="text-white/80 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">{language === 'en' ? 'Join Our Success Stories' : 'আমাদের সফলতার গল্পে যোগ দিন'}</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-300">৫০,০০০+</div>
                <div className="text-white/80 text-sm">{t('hero.students')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">৫০০+</div>
                <div className="text-white/80 text-sm">{t('hero.schools')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">৯৫%</div>
                <div className="text-white/80 text-sm">{language === 'en' ? 'Satisfaction' : 'সন্তুষ্টি'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-slide-up">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'বাংলা' : 'English'}
                </span>
              </button>
            </div>
            
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-red-500 bg-clip-text text-transparent">
                {language === 'en' ? 'Register' : 'নিবন্ধন করুন'}
              </CardTitle>
              <p className="text-gray-600 mt-2">{t('auth.signup_desc')}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('auth.full_name')}</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                        placeholder={t('auth.full_name')}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('auth.email')}</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                        placeholder={t('auth.email')}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('auth.class')}</label>
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      required
                    >
                      <option value="">{t('common.select_class')}</option>
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('auth.district')}</label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      required
                    >
                      <option value="">{t('common.select_district')}</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('auth.school')}</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder={t('auth.school')}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('auth.phone')}</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder={t('auth.phone')}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('auth.password')}</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                        placeholder={t('auth.password')}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('auth.confirm_password')}</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                        placeholder={t('auth.confirm_password')}
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('common.loading')}
                    </div>
                  ) : (
                    t('auth.create_account')
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">{t('auth.already_account')}</span>
                  </div>
                </div>
                
                <Link 
                  to="/login" 
                  className="inline-block w-full py-3 px-4 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  {t('auth.sign_in_instead')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};