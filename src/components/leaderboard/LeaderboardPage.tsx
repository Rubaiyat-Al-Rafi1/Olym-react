import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Trophy, Medal, Award, Crown, Filter, Search } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'overall', name: 'Overall' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'ai-ml', name: 'AI & ML' },
    { id: 'database', name: 'Database' }
  ];

  const leaderboardData = [
    {
      rank: 1,
      name: 'Alex Johnson',
      university: 'MIT',
      totalScore: 2450,
      examsCompleted: 12,
      averageScore: 94.2,
      avatar: 'AJ',
      badges: ['🏆', '💯', '🔥']
    },
    {
      rank: 2,
      name: 'Sarah Chen',
      university: 'Stanford',
      totalScore: 2380,
      examsCompleted: 11,
      averageScore: 92.8,
      avatar: 'SC',
      badges: ['🥈', '💯', '⭐']
    },
    {
      rank: 3,
      name: 'Michael Rodriguez',
      university: 'Berkeley',
      totalScore: 2320,
      examsCompleted: 10,
      averageScore: 91.5,
      avatar: 'MR',
      badges: ['🥉', '🔥', '⭐']
    },
    {
      rank: 4,
      name: 'Emily Davis',
      university: 'Harvard',
      totalScore: 2280,
      examsCompleted: 11,
      averageScore: 89.7,
      avatar: 'ED',
      badges: ['💯', '⭐']
    },
    {
      rank: 5,
      name: 'David Kim',
      university: 'CMU',
      totalScore: 2250,
      examsCompleted: 9,
      averageScore: 88.9,
      avatar: 'DK',
      badges: ['🔥', '⭐']
    },
    {
      rank: 6,
      name: 'Lisa Wang',
      university: 'Caltech',
      totalScore: 2200,
      examsCompleted: 10,
      averageScore: 87.3,
      avatar: 'LW',
      badges: ['⭐']
    },
    {
      rank: 7,
      name: 'James Wilson',
      university: 'Princeton',
      totalScore: 2180,
      examsCompleted: 8,
      averageScore: 86.8,
      avatar: 'JW',
      badges: ['⭐']
    },
    {
      rank: 8,
      name: 'Anna Thompson',
      university: 'Yale',
      totalScore: 2150,
      examsCompleted: 9,
      averageScore: 85.4,
      avatar: 'AT',
      badges: ['⭐']
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const filteredData = leaderboardData.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Leaderboard</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#7886c7] text-[#7886c7]">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <Card>
        <CardContent className="p-8">
          <div className="flex justify-center items-end gap-8 mb-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                {leaderboardData[1].avatar}
              </div>
              <div className="bg-gray-100 rounded-lg p-4 h-24 flex flex-col justify-center">
                <Medal className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                <p className="font-bold text-gray-700">{leaderboardData[1].name}</p>
                <p className="text-sm text-gray-600">{leaderboardData[1].totalScore} pts</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 relative">
                {leaderboardData[0].avatar}
                <Crown className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-yellow-600" />
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 h-32 flex flex-col justify-center">
                <Trophy className="h-10 w-10 text-yellow-600 mx-auto mb-2" />
                <p className="font-bold text-yellow-800">{leaderboardData[0].name}</p>
                <p className="text-sm text-yellow-700">{leaderboardData[0].totalScore} pts</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                {leaderboardData[2].avatar}
              </div>
              <div className="bg-amber-100 rounded-lg p-4 h-24 flex flex-col justify-center">
                <Award className="h-8 w-8 text-amber-600 mx-auto mb-1" />
                <p className="font-bold text-amber-700">{leaderboardData[2].name}</p>
                <p className="text-sm text-amber-600">{leaderboardData[2].totalScore} pts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-[#7886c7] hover:bg-[#666a93]" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7] w-64"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredData.map((participant) => (
              <div
                key={participant.rank}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${getRankBg(participant.rank)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(participant.rank)}
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    participant.rank === 1 ? 'bg-yellow-500' :
                    participant.rank === 2 ? 'bg-gray-400' :
                    participant.rank === 3 ? 'bg-amber-600' :
                    'bg-[#7886c7]'
                  }`}>
                    {participant.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{participant.name}</h3>
                    <p className="text-sm text-gray-600">{participant.university}</p>
                    <div className="flex gap-1 mt-1">
                      {participant.badges.map((badge, index) => (
                        <span key={index} className="text-sm">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 text-right">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{participant.totalScore}</p>
                    <p className="text-xs text-gray-600">Total Points</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{participant.averageScore}%</p>
                    <p className="text-xs text-gray-600">Avg Score</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{participant.examsCompleted}</p>
                    <p className="text-xs text-gray-600">Exams</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#7886c7]/10 rounded-lg p-4 border border-[#7886c7]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7886c7] rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">John Doe (You)</h3>
                  <p className="text-sm text-gray-600">Tech University</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-right">
                <div>
                  <p className="font-bold text-lg text-gray-900">#15</p>
                  <p className="text-xs text-gray-600">Current Rank</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-900">1,240</p>
                  <p className="text-xs text-gray-600">Total Points</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">87%</p>
                  <p className="text-xs text-gray-600">Avg Score</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};