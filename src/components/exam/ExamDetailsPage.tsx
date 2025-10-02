import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatBDT } from '../../utils/currency';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, Users, Trophy, BookOpen, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { useCrud } from '../../hooks/useCrud';
import { Exam } from '../../types';

export const ExamDetailsPage: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Use useCrud hook to fetch exam data
  const { 
    state: { data: exams, loading, error },
    fetchAll: fetchExams,
    fetchById: fetchExam
  } = useCrud<Exam>('/exams');

  // Fetch exam data on component mount
  useEffect(() => {
    if (examId) {
      fetchExam(examId);
    }
  }, [examId, fetchExam]);

  // Show loading state
  if (loading) {
    return <div className="p-8 text-center">Loading exam details...</div>;
  }

  // Show error state
  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading exam details. Please try again later.</div>;
  }

  // Find the exam in the data
  const exam = exams.find(e => e.id === examId);

  // If exam not found
  if (!exam) {
    return <div className="p-8 text-center">Exam not found.</div>;
  }

  // Rest of the component remains the same
  const handleRegister = () => {
    // Handle registration logic
    console.log('Registering for exam:', examId);
    alert('Registration successful!');
  };

  const handleStartExam = () => {
    navigate(`/exam/${examId}/panel`);
  };

  const isRegistrationOpen = new Date() < new Date(exam.registrationDeadline);
  const isExamLive = exam.status === 'live';
  const canStartExam = exam.isRegistered && isExamLive;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#666a93] mb-2">{exam.title}</h1>
          <p className="text-gray-600 max-w-3xl">{exam.description}</p>
        </div>
        <div className="flex gap-3">
          {canStartExam ? (
            <Button onClick={handleStartExam} className="bg-green-600 hover:bg-green-700">
              Start Exam
            </Button>
          ) : !exam.isRegistered && isRegistrationOpen ? (
            <Button onClick={handleRegister} className="bg-[#7886c7] hover:bg-[#666a93]">
              Register Now
            </Button>
          ) : exam.isRegistered ? (
            <Button disabled className="bg-gray-500">
              <CheckCircle className="h-4 w-4 mr-2" />
              Registered
            </Button>
          ) : (
            <Button disabled className="bg-gray-500">
              Registration Closed
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-[#7886c7] mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{exam.duration} min</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-[#7886c7] mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Questions</p>
                  <p className="font-semibold">{exam.totalQuestions}</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-[#7886c7] mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Max Score</p>
                  <p className="font-semibold">{exam.maxScore}</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-[#7886c7] mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Registered</p>
                  <p className="font-semibold">{exam.registeredParticipants}/{exam.maxParticipants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topics Covered */}
          <Card>
            <CardHeader>
              <CardTitle>Topics Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {exam.topics.map((topic, index) => (
                  <div key={index} className="bg-[#7886c7]/10 text-[#666a93] px-3 py-2 rounded-lg text-sm font-medium text-center">
                    {topic}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exam.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Rules and Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Rules and Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {exam.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Exam Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#7886c7]" />
                <div>
                  <p className="font-medium">Start Time</p>
                  <p className="text-sm text-gray-600">
                    {new Date(exam.startTime).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#7886c7]" />
                <div>
                  <p className="font-medium">End Time</p>
                  <p className="text-sm text-gray-600">
                    {new Date(exam.endTime).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Registration Deadline</p>
                  <p className="text-sm text-gray-600">
                    {new Date(exam.registrationDeadline).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Info */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{exam.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-medium">{exam.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prize Pool</span>
                <span className="font-medium text-green-600">{exam.prizePool}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium capitalize ${
                  exam.status === 'upcoming' ? 'text-blue-600' :
                  exam.status === 'live' ? 'text-green-600' :
                  'text-gray-600'
                }`}>
                  {exam.status}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Registration Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Registered</span>
                  <span>{exam.registeredParticipants}/{exam.maxParticipants}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#7886c7] h-2 rounded-full"
                    style={{ width: `${(exam.registeredParticipants / exam.maxParticipants) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {exam.maxParticipants - exam.registeredParticipants} spots remaining
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};