import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/shared/Layout';
import { PageLayout } from './components/shared/PageLayout';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

// Auth Components
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';

// Participant Components
import { ResultsPage } from './components/participant/ResultsPage';
import { ExamsListPage } from './components/participant/ExamsListPage';

// Exam Components
import { ExamPanel } from './components/exam/ExamPanel';
import { ExamDetailsPage } from './components/exam/ExamDetailsPage';

// Shared Components
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';

// Admin Components
import { ReviewRegistrations } from './components/admin/ReviewRegistrations';
import { ManageUsers } from './components/admin/ManageUsers';
import { ManageExams } from './components/admin/ManageExams';
import { AdminAnalytics } from './components/admin/AdminAnalytics';

// Moderator Components
import { LiveExamMonitor } from './components/moderator/LiveExamMonitor';
import { QuestionManagement } from './components/moderator/QuestionManagement';
import { ResultManagement } from './components/moderator/ResultManagement';
import { ParticipantAnalysis } from './components/moderator/ParticipantAnalysis';

// Landing Page
import { LandingPage } from './screens/LandingPage/LandingPage';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PageLayout><LandingPage /></PageLayout>} />
            <Route path="/login" element={<PageLayout><LoginPage /></PageLayout>} />
            <Route path="/signup" element={<PageLayout><SignupPage /></PageLayout>} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                {(user) => (
                  <Layout>
                    <DashboardRouter />
                  </Layout>
                )}
              </ProtectedRoute>
            } />

            {/* Participant Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  {({ user }) => (
                    <div className="container mx-auto px-4 py-8">
                      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium">{user?.name || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user?.email || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{user?.phone || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Academic Information</h2>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-500">Institution</p>
                                <p className="font-medium">{user?.institution || user?.university || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium">{user?.role || 'Not available'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Joined</p>
                                <p className="font-medium">{user?.registrationDate || new Date().toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                          <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            onClick={() => alert('Edit profile functionality will be implemented in the next phase!')}
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/results" element={
              <ProtectedRoute allowedRoles={["participant"]}>
                <Layout>
                  <ResultsPage />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/exams" element={
              <ProtectedRoute allowedRoles={["participant"]}>
                <Layout>
                  <ExamsListPage />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/exam/:examId/details" element={
              <ProtectedRoute allowedRoles={["participant"]}>
                <Layout>
                  <ExamDetailsPage />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/exam/:examId/panel" element={
              <ProtectedRoute allowedRoles={["participant"]}>
                <Layout>
                  <ExamPanel />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Layout>
                  <LeaderboardPage />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <ManageUsers />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/admin/exams" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <ManageExams />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/admin/registrations" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <ReviewRegistrations />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/admin/analytics" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <AdminAnalytics />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Moderator Routes */}
            <Route path="/moderator/live-exams" element={
              <ProtectedRoute allowedRoles={["moderator"]}>
                <Layout>
                  <LiveExamMonitor />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/moderator/questions" element={
              <ProtectedRoute allowedRoles={["moderator"]}>
                <Layout>
                  <QuestionManagement />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/moderator/results" element={
              <ProtectedRoute allowedRoles={["moderator"]}>
                <Layout>
                  <ResultManagement />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/moderator/analysis" element={
              <ProtectedRoute allowedRoles={["moderator"]}>
                <Layout>
                  <ParticipantAnalysis />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

// Dashboard Router Component
const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  // Import dashboard components directly
  const AdminDashboard = require('./components/admin/AdminDashboard').default;
  const ModeratorDashboard = require('./components/moderator/ModeratorDashboard').default;
  const ParticipantDashboard = require('./components/participant/ParticipantDashboard').default;

  return (
    <div className="w-full">
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'moderator' && <ModeratorDashboard />}
      {(user?.role === 'participant' || !user?.role) && <ParticipantDashboard />}
    </div>
  );
};

export default App;