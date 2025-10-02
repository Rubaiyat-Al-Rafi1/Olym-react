import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Eye, Pause, Play, AlertTriangle, Users, Clock, Activity, RefreshCw } from 'lucide-react';
import { useCrud } from '../../hooks/useCrud';
import { Exam, LiveExamData, User } from '../../types';

export const LiveExamMonitor: React.FC = () => {
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Use useCrud hook for exams and live exam data
  const { 
    state: { data: exams, loading: examsLoading, error: examsError },
    fetchAll: fetchExams 
  } = useCrud<Exam>('/exams');
  
  const { 
    state: { data: liveExamData, loading: liveDataLoading, error: liveDataError },
    fetchAll: fetchLiveData 
  } = useCrud<LiveExamData>('/live-exams');
  
  const { 
    state: { data: users, loading: usersLoading, error: usersError },
    fetchAll: fetchUsers 
  } = useCrud<User>('/users');

  // Fetch data on component mount
  useEffect(() => {
    fetchExams();
    fetchLiveData();
    fetchUsers();
    
    // Set up auto-refresh if enabled
    let intervalId: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchExams();
        fetchLiveData();
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchExams, fetchLiveData, fetchUsers, autoRefresh, refreshInterval]);

  // Filter only live exams
  const liveExams = exams.filter(exam => exam.status === 'live');
  
  // Get participant activity from live exam data
  const participantActivity = liveExamData.length > 0 
    ? liveExamData[0]?.participants || []
    : [];

  // System alerts from live exam data
  const systemAlerts = liveExamData.length > 0 
    ? liveExamData[0]?.systemAlerts || []
    : [];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        console.log('Refreshing live data...');
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const handlePauseExam = (examId: string) => {
    console.log('Pausing exam:', examId);
  };

  const handleResumeExam = (examId: string) => {
    console.log('Resuming exam:', examId);
  };

  const handleEndExam = (examId: string) => {
    console.log('Ending exam:', examId);
  };

  const handleViewParticipant = (participantId: string) => {
    console.log('Viewing participant:', participantId);
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Live Exam Monitor</h1>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Auto-refresh:</label>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              disabled={!autoRefresh}
            >
              <option value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={30}>30s</option>
              <option value={60}>1m</option>
            </select>
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Now
          </Button>
        </div>
      </div>

      {/* Live Exams Overview */}
      <div className="space-y-4">
        {liveExams.map((exam) => (
          <Card key={exam.id} className={`border-2 ${
            exam.status === 'live' ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'
          }`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  {exam.status === 'live' ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                  {exam.title}
                </CardTitle>
                <div className="flex gap-2">
                  {exam.status === 'live' && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handlePauseExam(exam.id)}>
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-500" onClick={() => handleEndExam(exam.id)}>
                        End Exam
                      </Button>
                    </>
                  )}
                  {exam.status === 'upcoming' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleResumeExam(exam.id)}>
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {exam.status === 'live' ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{exam.totalParticipants}</p>
                    <p className="text-xs text-gray-600">Total Registered</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{exam.activeParticipants}</p>
                    <p className="text-xs text-gray-600">Currently Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{exam.completedParticipants}</p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{exam.flaggedParticipants}</p>
                    <p className="text-xs text-gray-600">Flagged</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{exam.duration - exam.timeElapsed}m</p>
                    <p className="text-xs text-gray-600">Time Remaining</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">Exam scheduled to start at {exam.startTime}</p>
                  <p className="text-sm text-gray-500">{exam.totalParticipants} participants registered</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Participant Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Participant Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {participantActivity.map((participant) => (
                <div key={participant.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                  participant.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      participant.flagged ? 'bg-red-500' : 'bg-[#7886c7]'
                    }`}>
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{participant.name}</p>
                      <p className="text-sm text-gray-600">Progress: {participant.progress}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{participant.timeSpent}m</p>
                    <p className="text-xs text-gray-500">{participant.lastActivity}</p>
                    <Button size="sm" variant="outline" className="mt-1" onClick={() => handleViewParticipant(participant.id)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <span className="text-xs">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Server Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Memory</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Network Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bandwidth</span>
                  <span className="text-sm font-medium">234 Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Latency</span>
                  <span className="text-sm font-medium">12ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Packet Loss</span>
                  <span className="text-sm font-medium text-green-600">0%</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Database Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Connections</span>
                  <span className="text-sm font-medium">156/500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Query Time</span>
                  <span className="text-sm font-medium">2.3ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};