import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Search, Filter, CreditCard as Edit, Trash2, UserPlus, Eye, Ban, CircleCheck as CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useCrud } from '../../hooks/useCrud';
import { User } from '../../types';
import { Dialog } from '../ui/dialog';
import { showErrorToast, showSuccessToast } from '../ui/error-toast';

export const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Modal form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('participant');
  const [newUniversity, setNewUniversity] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Replace hardcoded users with CRUD hook
  const { state, fetchAll, remove, create: createUser } = useCrud<User>('/users');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const users = state.data;
  const loading = state.loading;
  const roles = ['all', 'participant', 'moderator', 'ambassador', 'admin'];
  const statuses = ['all', 'active', 'inactive', 'suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditUser = (userId: string) => {
    console.log('Editing user:', userId);
  };

  const handleDeleteUser = (userId: string) => {
    remove(userId);
  };

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId);
  };

  const handleActivateUser = (userId: string) => {
    console.log('Activating user:', userId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'ambassador':
        return 'bg-yellow-100 text-yellow-800';
      case 'participant':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ name: newName, email: newEmail, role: newRole, university: newUniversity, status: 'active' } as Partial<User>);
      showSuccessToast('User created successfully');
      setShowAddForm(false);
      setNewName('');
      setNewEmail('');
      setNewRole('participant');
      setNewUniversity('');
    } catch (error) {
      console.error(error);
      showErrorToast('Failed to create user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Manage Users</h1>
        <Dialog.Root open={showAddForm} onOpenChange={setShowAddForm}>
          <Dialog.Trigger asChild>
            <Button className="bg-[#7886c7] hover:bg-[#666a93]">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </Dialog.Trigger>
          <Dialog.Content className="sm:max-w-md">
            <Dialog.Header>
              <Dialog.Title>Add New User</Dialog.Title>
              <Dialog.Description>
                Fill in the details below to add a new user.
              </Dialog.Description>
            </Dialog.Header>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                >
                  {roles.filter(r=>r!=='all').map(role => (
                    <option key={role} value={role}>{role.charAt(0).toUpperCase()+role.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">University</label>
                <input
                  type="text"
                  value={newUniversity}
                  onChange={(e) => setNewUniversity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
                />
              </div>
              <Dialog.Footer className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={()=>setShowAddForm(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>Save</Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'participant').length}
              </p>
              <p className="text-sm text-gray-600">Participants</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.role === 'moderator').length}
              </p>
              <p className="text-sm text-gray-600">Moderators</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'ambassador').length}
              </p>
              <p className="text-sm text-gray-600">Ambassadors</p>
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
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7] w-full"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">University</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Performance</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#7886c7] rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-900">{user.university}</p>
                      <p className="text-xs text-gray-600">{user.phone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.role === 'participant' ? (
                        <div>
                          <p className="text-sm font-medium">{user.examsCompleted} exams</p>
                          <p className="text-xs text-gray-600">{user.averageScore}% avg</p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => console.log('View user:', user.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500"
                            onClick={() => handleSuspendUser(user.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-500"
                            onClick={() => handleActivateUser(user.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
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