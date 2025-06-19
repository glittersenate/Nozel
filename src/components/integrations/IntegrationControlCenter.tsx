import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Activity,
  BarChart3,
  Zap,
  Link,
  Unlink,
  Play,
  Pause,
  MoreVertical,
  ExternalLink,
  Download,
  Upload,
  Clock,
  Users,
  Database,
  Shield,
  Wifi,
  WifiOff
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'hr' | 'payroll' | 'communication' | 'analytics' | 'security';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: Date;
  syncFrequency: string;
  dataPoints: number;
  errorCount: number;
  uptime: number;
  icon: string;
  color: string;
  features: string[];
  metrics: {
    recordsSynced: number;
    lastSyncDuration: number;
    errorRate: number;
    dataVolume: string;
  };
}

interface SyncLog {
  id: string;
  integrationId: string;
  timestamp: Date;
  status: 'success' | 'error' | 'warning';
  message: string;
  recordsProcessed: number;
  duration: number;
}

export const IntegrationControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const integrations: Integration[] = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and HR notifications',
      category: 'communication',
      status: 'connected',
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      syncFrequency: 'Real-time',
      dataPoints: 1247,
      errorCount: 0,
      uptime: 99.8,
      icon: '💬',
      color: 'green',
      features: ['Notifications', 'Employee Directory', 'Leave Requests'],
      metrics: {
        recordsSynced: 1247,
        lastSyncDuration: 2.3,
        errorRate: 0.1,
        dataVolume: '2.4 MB'
      }
    },
    {
      id: 'workday',
      name: 'Workday',
      description: 'Enterprise HR and payroll system',
      category: 'hr',
      status: 'syncing',
      lastSync: new Date(Date.now() - 15 * 60 * 1000),
      syncFrequency: 'Every 4 hours',
      dataPoints: 5632,
      errorCount: 2,
      uptime: 97.5,
      icon: '🏢',
      color: 'blue',
      features: ['Employee Data', 'Payroll', 'Benefits', 'Time Tracking'],
      metrics: {
        recordsSynced: 5632,
        lastSyncDuration: 45.2,
        errorRate: 0.3,
        dataVolume: '15.7 MB'
      }
    },
    {
      id: 'tableau',
      name: 'Tableau',
      description: 'Advanced analytics and reporting',
      category: 'analytics',
      status: 'connected',
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      syncFrequency: 'Daily',
      dataPoints: 892,
      errorCount: 0,
      uptime: 99.9,
      icon: '📊',
      color: 'purple',
      features: ['Dashboards', 'Reports', 'Data Visualization'],
      metrics: {
        recordsSynced: 892,
        lastSyncDuration: 12.8,
        errorRate: 0.0,
        dataVolume: '8.3 MB'
      }
    },
    {
      id: 'okta',
      name: 'Okta',
      description: 'Identity and access management',
      category: 'security',
      status: 'error',
      lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000),
      syncFrequency: 'Every hour',
      dataPoints: 234,
      errorCount: 5,
      uptime: 94.2,
      icon: '🔐',
      color: 'red',
      features: ['SSO', 'User Provisioning', 'Access Control'],
      metrics: {
        recordsSynced: 234,
        lastSyncDuration: 8.1,
        errorRate: 2.1,
        dataVolume: '1.2 MB'
      }
    }
  ];

  const syncLogs: SyncLog[] = [
    {
      id: '1',
      integrationId: 'slack',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'success',
      message: 'Successfully synced employee directory',
      recordsProcessed: 247,
      duration: 2.3
    },
    {
      id: '2',
      integrationId: 'workday',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'success',
      message: 'Payroll data synchronized',
      recordsProcessed: 1205,
      duration: 45.2
    },
    {
      id: '3',
      integrationId: 'okta',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'error',
      message: 'Authentication failed - API key expired',
      recordsProcessed: 0,
      duration: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'syncing': return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'disconnected': return <WifiOff className="w-5 h-5 text-gray-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'syncing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'error': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'disconnected': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hr': return <Users className="w-4 h-4" />;
      case 'payroll': return <Database className="w-4 h-4" />;
      case 'communication': return <Activity className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;
  const totalDataPoints = integrations.reduce((sum, i) => sum + i.dataPoints, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Integration Control Center</h1>
          <p className="text-slate-400">
            {connectedCount} connected • {errorCount} errors • {totalDataPoints.toLocaleString()} data points
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-500/30 text-blue-300">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Link className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800/50 border-slate-700/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/20">
            Overview
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-blue-600/20">
            Integrations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600/20">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-blue-600/20">
            Sync Logs
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Connected', value: connectedCount, icon: CheckCircle, color: 'green' },
              { title: 'Syncing', value: integrations.filter(i => i.status === 'syncing').length, icon: RefreshCw, color: 'blue' },
              { title: 'Errors', value: errorCount, icon: XCircle, color: 'red' },
              { title: 'Data Points', value: totalDataPoints.toLocaleString(), icon: Database, color: 'purple' }
            ].map((stat, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bg-slate-800/50 border-slate-700/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <CardTitle className="text-white">{integration.name}</CardTitle>
                        <p className="text-slate-400 text-sm">{integration.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Last Sync:</span>
                      <div className="text-white">{formatTimestamp(integration.lastSync)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Frequency:</span>
                      <div className="text-white">{integration.syncFrequency}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Data Points:</span>
                      <div className="text-white">{integration.dataPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Uptime:</span>
                      <div className="text-white">{integration.uptime}%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Health Score</span>
                      <span className="text-white">{integration.uptime}%</span>
                    </div>
                    <Progress value={integration.uptime} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(integration.category)}
                      <span className="text-slate-400 text-sm capitalize">{integration.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="space-y-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{integration.name}</h3>
                        <p className="text-slate-400">{integration.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-4 h-4" />
                            Last sync: {formatTimestamp(integration.lastSync)}
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Database className="w-4 h-4" />
                            {integration.dataPoints.toLocaleString()} records
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Wifi className="w-4 h-4" />
                            {integration.uptime}% uptime
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusIcon(integration.status)}
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="border-slate-600">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={integration.status === 'connected' ? 'border-red-500/30 text-red-300' : 'border-green-500/30 text-green-300'}
                        >
                          {integration.status === 'connected' ? (
                            <>
                              <Unlink className="w-4 h-4 mr-2" />
                              Disconnect
                            </>
                          ) : (
                            <>
                              <Link className="w-4 h-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Records Synced</div>
                      <div className="text-white text-lg font-bold">{integration.metrics.recordsSynced.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Last Sync Duration</div>
                      <div className="text-white text-lg font-bold">{integration.metrics.lastSyncDuration}s</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Error Rate</div>
                      <div className="text-white text-lg font-bold">{integration.metrics.errorRate}%</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="text-slate-400 text-sm">Data Volume</div>
                      <div className="text-white text-lg font-bold">{integration.metrics.dataVolume}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-slate-400 text-sm mb-2">Features</div>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-4">Integration Analytics</h3>
            <p className="text-slate-400">Detailed analytics and performance metrics would be displayed here.</p>
          </div>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Sync Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {syncLogs.map((log) => {
                  const integration = integrations.find(i => i.id === log.integrationId);
                  return (
                    <div key={log.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg">
                      <div className="text-xl">{integration?.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{integration?.name}</span>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">{log.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>{formatTimestamp(log.timestamp)}</span>
                          <span>{log.recordsProcessed} records</span>
                          <span>{log.duration}s duration</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};