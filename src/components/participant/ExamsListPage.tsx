import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatBDT } from '../../utils/currency';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, Users, Trophy, Search, Filter, BookOpen } from 'lucide-react';

export const ExamsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const exams = [
    {
      id: '1',
      title: 'Cybersecurity Challenge',
      description: 'Test your cybersecurity knowledge with ethical hacking, network security, and digital forensics.',
      category: 'Cybersecurity',
      difficulty: 'Intermediate',
      duration: 120,
      totalQuestions: 25,
      startTime: '2025-03-15T10:00:00Z',
      registrationDeadline: '2025-03-14T23:59:59Z',
      status: 'upcoming',
      registeredParticipants: 156,
      maxParticipants: 200,
      prizePool: formatBDT(500000),
      isRegistered: false
    },
    {
      id: '2',
      title: 'AI & Machine Learning Contest',
      description: 'Showcase your AI and ML expertise through practical problem-solving and algorithm development.',
      category: 'AI/ML',
      difficulty: 'Advanced',
      duration: 180,
      totalQuestions: 30,
      startTime: '2025-03-22T09:00:00Z',
      registrationDeadline: '2025-03-21T23:59:59Z',
      status: 'upcoming',
      registeredParticipants: 89,
      maxParticipants: 150,
      prizePool: formatBDT(750000),
      isRegistered: true
    },
    {
      id: '3',
      title: 'Web Development Sprint',
      description: 'Build innovative web applications using modern frameworks and full-stack development skills.',
      category: 'Web Development',
      difficulty: 'Intermediate',
      duration: 150,
      totalQuestions: 20,
      startTime: '2025-03-29T11:00:00Z',
      registrationDeadline: '2025-03-28T23:59:59Z',
      status: 'upcoming',
      registeredParticipants: 67,
      maxParticipants: 120,
      prizePool: formatBDT(400000),
      isRegistered: false
    },
    {
      id: '4',
      title: 'Database Design Challenge',
      description: 'Design efficient database systems and demonstrate your SQL and NoSQL expertise.',
      category: 'Database',
      difficulty: 'Intermediate',
      duration: 90,
      totalQuestions: 15,
      startTime: '2025-02-28T14:00:00Z',
      registrationDeadline: '2025-02-27T23:59:59Z',
      status: 'completed',
      registeredParticipants: 45,
      maxParticipants: 80,
      prizePool: formatBDT(300000),
      isRegistered: true
    }
  ];

  const categories = ['all', 'Cybersecurity', 'AI/ML', 'Web Development', 'Database'];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || exam.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (examId: string) => {
    navigate(`/exam/${examId}/details`);
  };

  const handleRegister = (examId: string) => {
    console.log('Registering for exam:', examId);
    // Handle registration logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Available Exams</h1>
        <Button className="bg-[#7886c7] hover:bg-[#666a93]">
          <BookOpen className="h-4 w-4 mr-2" />
          My Registrations
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7] w-full"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className={filterCategory === category ? "bg-[#7886c7] hover:bg-[#666a93]" : ""}
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="border-2 border-gray-200 hover:border-[#7886c7] transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl text-[#666a93]">{exam.title}</CardTitle>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{exam.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{exam.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  <span>{exam.totalQuestions} questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(exam.startTime).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{exam.registeredParticipants}/{exam.maxParticipants}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Prize Pool</span>
                <span className="font-bold text-green-600">{exam.prizePool}</span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleViewDetails(exam.id)}
                  variant="outline"
                  className="flex-1"
                >
                  View Details
                </Button>
                {exam.status === 'upcoming' && !exam.isRegistered && (
                  <Button
                    onClick={() => handleRegister(exam.id)}
                    className="flex-1 bg-[#7886c7] hover:bg-[#666a93]"
                  >
                    Register
                  </Button>
                )}
                {exam.isRegistered && exam.status === 'upcoming' && (
                  <Button disabled className="flex-1 bg-gray-500">
                    Registered
                  </Button>
                )}
                {exam.status === 'completed' && exam.isRegistered && (
                  <Button
                    onClick={() => navigate('/results')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    View Results
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};