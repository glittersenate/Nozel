
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const StatesMonitoredCard = () => {
  const states = [
    { name: 'California', code: 'CA', status: 'active', color: 'bg-blue-500' },
    { name: 'Texas', code: 'TX', status: 'active', color: 'bg-green-500' },
    { name: 'New York', code: 'NY', status: 'active', color: 'bg-purple-500' },
    { name: 'Florida', code: 'FL', status: 'active', color: 'bg-orange-500' },
    { name: 'Illinois', code: 'IL', status: 'active', color: 'bg-cyan-500' },
    { name: 'Pennsylvania', code: 'PA', status: 'active', color: 'bg-pink-500' },
    { name: 'Ohio', code: 'OH', status: 'pending', color: 'bg-gray-500' },
    { name: 'Georgia', code: 'GA', status: 'pending', color: 'bg-gray-500' },
    { name: 'North Carolina', code: 'NC', status: 'active', color: 'bg-indigo-500' },
    { name: 'Michigan', code: 'MI', status: 'active', color: 'bg-teal-500' },
    { name: 'New Jersey', code: 'NJ', status: 'active', color: 'bg-red-500' },
    { name: 'Virginia', code: 'VA', status: 'active', color: 'bg-yellow-500' }
  ];

  const activeStates = states.filter(state => state.status === 'active');
  const pendingStates = states.filter(state => state.status === 'pending');

  return (
    <Card className="glass-dark border-blue-500/20 mb-8">
      <CardHeader>
        <CardTitle className="text-white font-heading flex items-center gap-3">
          <MapPin className="w-6 h-6 text-green-400" />
          States Monitored ({states.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-blue-200 font-medium mb-3">Active Monitoring ({activeStates.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {activeStates.map((state) => (
              <div key={state.code} className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className={`w-3 h-3 rounded-full ${state.color}`} />
                <div>
                  <span className="text-white font-medium text-sm">{state.code}</span>
                  <p className="text-blue-300/70 text-xs">{state.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {pendingStates.length > 0 && (
          <div>
            <h4 className="text-blue-200 font-medium mb-3">Pending Setup ({pendingStates.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pendingStates.map((state) => (
                <div key={state.code} className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-lg opacity-60">
                  <div className={`w-3 h-3 rounded-full ${state.color}`} />
                  <div>
                    <span className="text-white font-medium text-sm">{state.code}</span>
                    <p className="text-blue-300/70 text-xs">{state.name}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto text-xs">Pending</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
