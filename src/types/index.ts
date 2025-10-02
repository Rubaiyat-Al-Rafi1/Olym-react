export interface User {
  id: string;
  email: string;
  name: string;
  role: 'participant' | 'admin' | 'moderator' | 'ambassador';
  avatar?: string;
  university?: string;
  phone?: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'live' | 'completed';
  category: string;
  maxScore: number;
}

export interface Question {
  id: string;
  examId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  category: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdBy?: string;
  createdAt?: string;
}

export interface Result {
  id: string;
  userId: string;
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  submittedAt: string;
  rank?: number;
}

export interface Registration {
  id: string;
  userId: string;
  examId: string;
  registeredAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
}

export interface LiveExamData {
  examId: string;
  totalParticipants: number;
  activeParticipants: number;
  completedParticipants: number;
  averageScore: number;
  timeRemaining: number;
}