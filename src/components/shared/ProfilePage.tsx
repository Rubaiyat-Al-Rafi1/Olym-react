import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from '../ui/use-toast';
import { User, Mail, Phone, MapPin, Briefcase, School, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    institution: '',
    grade: '',
    birthdate: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        institution: user.institution || '',
        grade: user.grade || '',
        birthdate: user.birthdate || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would call an API to update the user data
    // For now, we'll just update the local state
    if (updateUser) {
      updateUser({
        ...user,
        ...formData
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View and update your personal information
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className="pl-10"
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <div className="relative">
                        <School className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="institution" 
                          name="institution" 
                          value={formData.institution} 
                          onChange={handleChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade/Class</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="grade" 
                          name="grade" 
                          value={formData.grade} 
                          onChange={handleChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="birthdate" 
                          name="birthdate" 
                          type="date" 
                          value={formData.birthdate} 
                          onChange={handleChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      name="bio" 
                      value={formData.bio} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        {user.name || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {user.phone || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {user.address || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Institution</p>
                      <p className="font-medium flex items-center gap-2">
                        <School className="h-4 w-4 text-gray-400" />
                        {user.institution || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Grade/Class</p>
                      <p className="font-medium flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        {user.grade || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {user.birthdate || 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  {user.bio && (
                    <div className="space-y-1 mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="font-medium">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-end gap-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <p className="text-sm text-gray-500">
                    Update your password to keep your account secure
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <p className="text-sm text-gray-500">
                    Manage how you receive notifications
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="absolute h-4 w-4 rounded-full bg-white transform translate-x-1"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Exam Reminders</p>
                      <p className="text-sm text-gray-500">Get reminded about upcoming exams</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                      <span className="absolute h-4 w-4 rounded-full bg-white transform translate-x-6"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Result Notifications</p>
                      <p className="text-sm text-gray-500">Get notified when results are published</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                      <span className="absolute h-4 w-4 rounded-full bg-white transform translate-x-6"></span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;