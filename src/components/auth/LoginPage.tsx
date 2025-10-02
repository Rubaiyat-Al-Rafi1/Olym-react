import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Eye, EyeOff, Mail, Lock, Shield, BookOpen, Trophy, GraduationCap, Languages } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../ui/error-toast';

export const LoginPage: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showErrorToast("Please enter both email and password");
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        showSuccessToast("Login successful!");
        navigate('/dashboard');
      } else {
        showErrorToast("Invalid email or password");
      }
    } catch (err) {
      showErrorToast("An error occurred during login. Please try again.");
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, title: t('about.feature1.title'), desc: t('about.feature1.desc') },
    { icon: Trophy, title: t('about.feature4.title'), desc: t('about.feature4.desc') },
    { icon: GraduationCap, title: t('about.feature3.title'), desc: t('about.feature3.desc') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bangladesh Flag Colors Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Features */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain hover:scale-105 transition-transform" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{t('hero.title')}</h1>
                <p className="text-green-100 text-sm">{t('hero.subtitle')}</p>
              </div>
            </div>
            <p className="text-xl text-white/90 max-w-lg">
              {t('hero.description')}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-green-400 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { number: "50,000+", label: t('hero.students') },
              { number: "500+", label: t('hero.schools') },
              { number: "৳5L+", label: t('hero.prizes') }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
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
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('auth.email')}</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder={t('auth.email')}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('auth.password')}</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder={t('auth.password')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('common.loading')}
                    </div>
                  ) : (
                    t('auth.sign_in')
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">{t('auth.new_to_platform')}</span>
                  </div>
                </div>
                
                <Link 
                  to="/signup" 
                  className="inline-block w-full py-3 px-4 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  {t('auth.create_account')}
                </Link>
              </div>


            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};