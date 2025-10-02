import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { User, Mail, Phone, GraduationCap, Calendar, Edit3, Save, X } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    university: user?.university || ''
  });

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      university: user?.university || ''
    });
    setIsEditing(false);
  };

  const achievements = [
    { title: 'First Exam Completed', date: '2025-01-15', icon: '🎯' },
    { title: 'Top 10 Finisher', date: '2025-02-20', icon: '🏆' },
    { title: 'Perfect Score', date: '2025-02-28', icon: '💯' }
  ];

  const examHistory = [
    { exam: 'Web Development Sprint', date: '2025-02-28', score: 85, rank: 12 },
    { exam: 'Database Design Challenge', date: '2025-02-20', score: 92, rank: 5 },
    { exam: 'Algorithm Challenge', date: '2025-02-10', score: 78, rank: 25 },
    { exam: 'System Design Contest', date: '2025-01-30', score: 88, rank: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-[#7886c7] hover:bg-[#666a93]">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-[#7886c7] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    University
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.university || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </label>
                  <p className="text-gray-900">
                    {user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    user?.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Exams Taken</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Best Rank</span>
                  <span className="font-semibold">#3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Points</span>
                  <span className="font-semibold">1,240</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Exam History */}
      <Card>
        <CardHeader>
          <CardTitle>Exam History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Exam</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Score</th>
                  <th className="text-left py-2">Rank</th>
                </tr>
              </thead>
              <tbody>
                {examHistory.map((exam, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{exam.exam}</td>
                    <td className="py-2">{exam.date}</td>
                    <td className="py-2">{exam.score}%</td>
                    <td className="py-2">#{exam.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};