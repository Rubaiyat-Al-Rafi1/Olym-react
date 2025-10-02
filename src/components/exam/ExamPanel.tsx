import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Clock, AlertCircle, CheckCircle, Flag } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  selectedAnswer?: number;
  flagged?: boolean;
}

export const ExamPanel: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the primary purpose of a firewall in network security?',
      options: [
        'To encrypt data transmission',
        'To filter network traffic based on security rules',
        'To store user passwords',
        'To backup network configurations'
      ]
    },
    {
      id: '2',
      question: 'Which of the following is NOT a type of SQL injection attack?',
      options: [
        'Union-based SQL injection',
        'Boolean-based blind SQL injection',
        'Time-based blind SQL injection',
        'Buffer overflow injection'
      ]
    },
    {
      id: '3',
      question: 'What does HTTPS stand for?',
      options: [
        'HyperText Transfer Protocol Secure',
        'HyperText Transport Protocol Secure',
        'HyperText Transmission Protocol Secure',
        'HyperText Transfer Protocol System'
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-submit exam when time runs out
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmitExam = () => {
    // Handle exam submission
    console.log('Submitting exam with answers:', answers);
    alert('Exam submitted successfully!');
  };

  const getQuestionStatus = (questionId: string) => {
    if (answers[questionId] !== undefined) return 'answered';
    if (flaggedQuestions.has(questionId)) return 'flagged';
    return 'unanswered';
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedQuestions.size;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#666a93]">Cybersecurity Challenge</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span className={`font-mono text-lg font-bold ${timeRemaining < 600 ? 'text-red-500' : 'text-gray-700'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button onClick={handleSubmitExam} className="bg-green-600 hover:bg-green-700">
                Submit Exam
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFlagQuestion(questions[currentQuestion].id)}
                    className={flaggedQuestions.has(questions[currentQuestion].id) ? 'bg-yellow-100' : ''}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(questions[currentQuestion].id) ? 'Unflag' : 'Flag'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-lg font-medium text-gray-900">
                    {questions[currentQuestion].question}
                  </div>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          answers[questions[currentQuestion].id] === index
                            ? 'border-[#7886c7] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${questions[currentQuestion].id}`}
                          value={index}
                          checked={answers[questions[currentQuestion].id] === index}
                          onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                          className="mr-3"
                        />
                        <span className="text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                      disabled={currentQuestion === questions.length - 1}
                      className="bg-[#7886c7] hover:bg-[#666a93]"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Panel */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Answered</span>
                    <span className="font-semibold text-green-600">{answeredCount}/{questions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Flagged</span>
                    <span className="font-semibold text-yellow-600">{flaggedCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#7886c7] h-2 rounded-full transition-all"
                      style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => {
                    const status = getQuestionStatus(question.id);
                    return (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-10 h-10 rounded-lg border-2 font-medium text-sm transition-colors ${
                          currentQuestion === index
                            ? 'border-[#7886c7] bg-[#7886c7] text-white'
                            : status === 'answered'
                            ? 'border-green-500 bg-green-100 text-green-700'
                            : status === 'flagged'
                            ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded"></div>
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                    <span>Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Select one answer per question</p>
                  <p>• Use the flag feature to mark questions for review</p>
                  <p>• You can navigate between questions freely</p>
                  <p>• Submit before time runs out</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};