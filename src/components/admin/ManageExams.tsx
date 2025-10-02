import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, CreditCard as Edit, Trash2, Eye, Search, Filter, Calendar, Clock, Users, Award } from 'lucide-react';
import { useCrud } from '../../hooks/useCrud';
import { useLanguage } from '../../contexts/LanguageContext';
import { Exam } from '../../types';

export const ManageExams: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  const {
    state: { data: exams, loading, error },
    create: createItem,
    update: updateItem,
    remove: deleteItem,
    fetchAll,
  } = useCrud<Exam>('/exams');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'General Knowledge', 'Computer Science'];
  const statuses = ['all', 'draft', 'published', 'active', 'completed'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || exam.category === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleCreateExam = async (examData: Partial<Exam>) => {
    try {
      await createItem(examData);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to create exam:', error);
    }
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setShowAddForm(true);
  };

  const handleUpdateExam = async (examData: Partial<Exam>) => {
    if (!editingExam) return;
    try {
      await updateItem(editingExam.id, examData);
      setShowAddForm(false);
      setEditingExam(null);
    } catch (error) {
      console.error('Failed to update exam:', error);
    }
  };

  const handleDeleteExam = async (examId: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteItem(examId);
      } catch (error) {
        console.error('Failed to delete exam:', error);
      }
    }
  };

  const handlePublishExam = async (examId: string) => {
    try {
      await updateItem(examId, { status: 'published' });
    } catch (error) {
      console.error('Failed to publish exam:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7886c7]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Manage Exams</h1>
        <Button onClick={() => {
          setEditingExam(null);
          setShowAddForm(true);
        }} className="bg-[#7886c7] hover:bg-[#666a93]">
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{exams.length}</p>
              <p className="text-sm text-gray-600">Total Exams</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {exams.filter(e => e.status === 'live').length}
              </p>
              <p className="text-sm text-gray-600">Live</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {exams.filter(e => e.status === 'upcoming').length}
              </p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {exams.filter(e => e.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
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
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Exam Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingExam ? 'Edit Exam' : 'Create New Exam'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const examData = Object.fromEntries(formData.entries());
              if (editingExam) {
                handleUpdateExam(examData);
              } else {
                handleCreateExam(examData);
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingExam?.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    placeholder="Enter exam title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select name="category" defaultValue={editingExam?.category} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]" required>
                    {subjects.slice(1).map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingExam?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                  rows={3}
                  placeholder="Enter exam description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    defaultValue={editingExam?.duration}
                    min="30"
                    max="300"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    placeholder="120"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                  <input
                    type="number"
                    name="totalQuestions"
                    defaultValue={editingExam?.totalQuestions}
                    min="10"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    placeholder="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Score</label>
                  <input
                    type="number"
                    name="maxScore"
                    defaultValue={editingExam?.maxScore}
                    min="10"
                    max="200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    placeholder="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select name="status" defaultValue={editingExam?.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]" required>
                    {statuses.slice(1).map(status => (
                      <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    defaultValue={editingExam?.startTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    defaultValue={editingExam?.endTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-[#7886c7] hover:bg-[#666a93]">
                  {editingExam ? 'Update Exam' : 'Create Exam'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowAddForm(false);
                  setEditingExam(null);
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="border-2 border-gray-200 hover:border-[#7886c7] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
                  <p className="text-gray-600 mb-3">{exam.description}</p>
                  <div className="flex gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {exam.subject}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {exam.class}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{exam.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{exam.totalQuestions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{exam.participants} participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{exam.startDate}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Created on {new Date(exam.endTime).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditExam(exam)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {exam.status === 'draft' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handlePublishExam(exam.id)}>
                      Publish
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500" onClick={() => handleDeleteExam(exam.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
          <p className="text-gray-600">Create your first exam to get started.</p>
          <Button onClick={() => setShowAddForm(true)} className="mt-4 bg-[#7886c7] hover:bg-[#666a93]">
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        </div>
      )}
    </div>
  );
};