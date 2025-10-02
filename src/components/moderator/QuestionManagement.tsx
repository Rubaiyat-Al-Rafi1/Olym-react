import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, CreditCard as Edit, Trash2, Eye, Search, Filter, Upload, Download } from 'lucide-react';
import { useEffect } from 'react';
import { useCrud } from '../../hooks/useCrud';
import { Question } from '../../types';
import { Dialog } from '../ui/dialog';
import { showSuccessToast, showErrorToast } from '../ui/error-toast';

export const QuestionManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch questions using the generic CRUD hook
  const {
    state,
    fetchAll,
    create: createQuestion,
    remove: deleteQuestion,
    update: updateQuestion,
  } = useCrud<Question>("/questions");

  // Load questions when component mounts
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const questions: Question[] = state.data || [];
  const categories = ['all', 'Cybersecurity', 'Database', 'Web Development', 'AI/ML', 'Algorithms'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  // Form states for Add Question modal
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState(categories[1]);
  const [newDifficulty, setNewDifficulty] = useState(difficulties[0]);

  const filteredQuestions = questions.filter(question => {
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddQuestion = () => {
    setShowAddForm(true);
  };

  const handleEditQuestion = (questionId: string) => {
    console.log('Editing question:', questionId);
  };

  const handleDeleteQuestion = (questionId: string) => {
    deleteQuestion(questionId);
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuestion({
        question: newQuestionText,
        category: newCategory,
        difficulty: newDifficulty,
        examId: '',
        options: [],
        correctAnswer: 0,
        points: 1,
        status: 'pending',
      } as any);
      showSuccessToast('Question added successfully');
      setShowAddForm(false);
      setNewQuestionText('');
    } catch (error) {
      console.error(error);
      showErrorToast('Failed to add question');
    }
  };

  const handleApproveQuestion = (questionId: string) => {
    console.log('Approving question:', questionId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
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
        <h1 className="text-3xl font-bold text-[#666a93]">Question Management</h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddQuestion} className="bg-[#7886c7] hover:bg-[#666a93]">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {questions.filter(q => q.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {questions.filter(q => q.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {categories.length - 1}
              </p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7] w-full"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-[#7886c7] hover:bg-[#666a93]" : ""}
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Question Form */}
      // (removed inline card form)
      
      {/* Add Question Modal */}
      {showAddForm && (
        <Dialog.Root open={showAddForm} onOpenChange={setShowAddForm}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add New Question</Dialog.Title>
            </Dialog.Header>
            <form className="space-y-4" onSubmit={handleCreateQuestion}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                  rows={3}
                  placeholder="Enter your question here..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    required
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Dialog.Footer>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#7886c7] hover:bg-[#666a93]">
                  Save
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="border-2 border-gray-200 hover:border-[#7886c7] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.question}</h3>
                  <div className="flex gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                      {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {question.category}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {question.points} points
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {question.options.map((option, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    index === question.correctAnswer 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      {index === question.correctAnswer && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      <span className="text-sm">{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Created by {question.createdBy} on {question.createdAt}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditQuestion(question.id)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {question.status === 'pending' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveQuestion(question.id)}>
                      Approve
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500" onClick={() => handleDeleteQuestion(question.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-600">Create your first question to get started.</p>
          <Button onClick={handleAddQuestion} className="mt-4 bg-[#7886c7] hover:bg-[#666a93]">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      )}
    </div>
  );
};