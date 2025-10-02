import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Check, X, Eye, Filter, Search, User, Calendar, GraduationCap } from 'lucide-react';

export const ReviewRegistrations: React.FC = () => {
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const registrations = [
    {
      id: '1',
      user: {
        name: 'John Smith',
        email: 'john.smith@university.edu',
        university: 'Tech University',
        phone: '+1234567890',
        avatar: 'JS'
      },
      exam: {
        title: 'Cybersecurity Challenge',
        date: '2025-03-15'
      },
      registeredAt: '2025-02-28T10:30:00Z',
      status: 'pending',
      documents: ['id_proof.pdf', 'university_certificate.pdf']
    },
    {
      id: '2',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@college.edu',
        university: 'State College',
        phone: '+1234567891',
        avatar: 'SJ'
      },
      exam: {
        title: 'AI & ML Contest',
        date: '2025-03-22'
      },
      registeredAt: '2025-02-27T15:45:00Z',
      status: 'pending',
      documents: ['student_id.pdf']
    },
    {
      id: '3',
      user: {
        name: 'Mike Davis',
        email: 'mike.davis@institute.edu',
        university: 'Tech Institute',
        phone: '+1234567892',
        avatar: 'MD'
      },
      exam: {
        title: 'Web Development Sprint',
        date: '2025-03-29'
      },
      registeredAt: '2025-02-26T09:15:00Z',
      status: 'approved',
      reviewedAt: '2025-02-27T10:00:00Z',
      reviewedBy: 'Admin User'
    }
  ];

  const handleApprove = (registrationId: string) => {
    console.log('Approving registration:', registrationId);
    // Handle approval logic
  };

  const handleReject = (registrationId: string) => {
    console.log('Rejecting registration:', registrationId);
    // Handle rejection logic
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesFilter = filter === 'all' || reg.status === filter;
    const matchesSearch = reg.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Review Registrations</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#7886c7] text-[#7886c7]">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? "bg-[#7886c7] hover:bg-[#666a93]" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7] w-64"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {registrations.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {registrations.filter(r => r.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {registrations.filter(r => r.status === 'rejected').length}
              </p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {registrations.length}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registrations List */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRegistrations.map((registration) => (
              <div key={registration.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#7886c7] rounded-full flex items-center justify-center text-white font-bold">
                      {registration.user.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{registration.user.name}</h3>
                      <p className="text-gray-600">{registration.user.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{registration.user.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Registered: {new Date(registration.registeredAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{registration.user.phone}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Exam Details</h4>
                  <p className="text-gray-700">{registration.exam.title}</p>
                  <p className="text-sm text-gray-600">Date: {registration.exam.date}</p>
                </div>

                {registration.documents && registration.documents.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Submitted Documents</h4>
                    <div className="flex gap-2">
                      {registration.documents.map((doc, index) => (
                        <Button key={index} variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          {doc}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {registration.status === 'approved' && registration.reviewedBy && (
                  <div className="text-sm text-gray-600 mb-4">
                    Approved by {registration.reviewedBy} on {new Date(registration.reviewedAt!).toLocaleDateString()}
                  </div>
                )}

                {registration.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(registration.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(registration.id)}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};