import React from 'react';
import { Bot, Sparkles, Brain, TrendingUp, Search, Zap, MessageSquare, FileText, Target, RefreshCw, Play, Pause, Settings, ChevronRight, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
type AIToolCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'idle' | 'training';
  performance: number;
  usageCount: number;
  color: string;
  onConfigure?: () => void;
};
const AIToolCard = ({
  title,
  description,
  icon,
  status,
  performance,
  usageCount,
  color,
  onConfigure
}: AIToolCardProps) => {
  const statusConfig = {
    active: {
      label: 'Active',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    idle: {
      label: 'Idle',
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50'
    },
    training: {
      label: 'Training',
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    }
  };
  const statusInfo = statusConfig[status];
  return <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${color} rounded-lg`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${statusInfo.color} rounded-full ${status === 'active' ? 'animate-pulse' : ''}`} />
          <span className={`text-xs font-medium ${statusInfo.textColor} ${statusInfo.bgColor} px-2 py-1 rounded-full`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Performance</span>
            <span className="text-xs font-bold text-gray-900">{performance}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className={`h-2 rounded-full ${performance >= 80 ? 'bg-green-500' : performance >= 60 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{
            width: `${performance}%`
          }} />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Usage today</span>
          <span className="font-bold text-gray-900">{usageCount} times</span>
        </div>
      </div>

      <button onClick={onConfigure} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
        <Settings className="w-4 h-4" />
        Configure
      </button>
    </div>;
};
type WorkflowCardProps = {
  name: string;
  description: string;
  steps: number;
  successRate: number;
  lastRun: string;
  isRunning: boolean;
  onToggle: () => void;
};
const WorkflowCard = ({
  name,
  description,
  steps,
  successRate,
  lastRun,
  isRunning,
  onToggle
}: WorkflowCardProps) => <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button onClick={onToggle} className={`p-2 rounded-lg transition-colors ${isRunning ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-4 pt-3 border-t border-gray-100">
      <div>
        <div className="text-xs text-gray-600 mb-1">Steps</div>
        <div className="text-sm font-bold text-gray-900">{steps}</div>
      </div>
      <div>
        <div className="text-xs text-gray-600 mb-1">Success Rate</div>
        <div className="text-sm font-bold text-green-600">{successRate}%</div>
      </div>
      <div>
        <div className="text-xs text-gray-600 mb-1">Last Run</div>
        <div className="text-sm font-bold text-gray-900">{lastRun}</div>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isRunning && <>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-700 font-medium">Running</span>
          </>}
      </div>
      <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
        Edit Workflow
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  </div>;
type ActivityLogItem = {
  action: string;
  tool: string;
  result: 'success' | 'warning' | 'error';
  timestamp: string;
  details: string;
};
const ActivityLogItem = ({
  action,
  tool,
  result,
  timestamp,
  details
}: ActivityLogItem) => {
  const resultConfig = {
    success: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    warning: {
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  };
  const config = resultConfig[result];
  const Icon = config.icon;
  return <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className={`p-1.5 ${config.bgColor} rounded-lg mt-0.5`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-gray-900">{action}</h4>
          <span className="text-xs text-gray-500 whitespace-nowrap">{timestamp}</span>
        </div>
        <p className="text-xs text-gray-600 mb-1">{tool}</p>
        <p className="text-xs text-gray-500">{details}</p>
      </div>
    </div>;
};

// @component: AITools
export const AITools = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [workflows, setWorkflows] = React.useState([{
    id: 1,
    name: 'Auto-Classification',
    description: 'Automatically categorize incoming tickets',
    steps: 5,
    successRate: 94,
    lastRun: '2m ago',
    isRunning: true
  }, {
    id: 2,
    name: 'Pattern Detection',
    description: 'Identify recurring issue patterns',
    steps: 8,
    successRate: 87,
    lastRun: '15m ago',
    isRunning: true
  }, {
    id: 3,
    name: 'Solution Suggestion',
    description: 'Recommend solutions from knowledge base',
    steps: 6,
    successRate: 91,
    lastRun: '5m ago',
    isRunning: true
  }, {
    id: 4,
    name: 'Customer Intent',
    description: 'Analyze and predict customer needs',
    steps: 4,
    successRate: 82,
    lastRun: '1h ago',
    isRunning: false
  }]);
  const activityLogs: ActivityLogItem[] = [{
    action: 'Ticket Auto-Classified',
    tool: 'Classification Engine',
    result: 'success',
    timestamp: '2m ago',
    details: 'Ticket #4523 classified as "Invoice Error" with 96% confidence'
  }, {
    action: 'Pattern Detected',
    tool: 'Pattern Detection',
    result: 'warning',
    timestamp: '8m ago',
    details: 'New pattern identified: Bank sync issues in QBD 2023 R15'
  }, {
    action: 'Solution Recommended',
    tool: 'Knowledge Graph',
    result: 'success',
    timestamp: '12m ago',
    details: 'KB-2847 suggested for Ticket #4521, agent accepted'
  }, {
    action: 'Model Retrained',
    tool: 'Classification Engine',
    result: 'success',
    timestamp: '45m ago',
    details: 'Model updated with 847 new examples, accuracy improved by 2%'
  }, {
    action: 'Workflow Failed',
    tool: 'Auto-Classification',
    result: 'error',
    timestamp: '1h ago',
    details: 'Ticket #4518 failed classification, escalated to manual review'
  }, {
    action: 'Insight Generated',
    tool: 'Analytics Engine',
    result: 'success',
    timestamp: '2h ago',
    details: 'Weekly report generated: 42% AI resolution rate'
  }];
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };
  const toggleWorkflow = (id: number) => {
    setWorkflows(prev => prev.map(w => w.id === id ? {
      ...w,
      isRunning: !w.isRunning
    } : w));
  };

  // @return
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Tools & Workflows</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and monitor AI-powered automation tools</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Sparkles className="w-4 h-4" />
              Train Models
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Active Tools</span>
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">6/8</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Avg Accuracy</span>
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">89%</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Tasks Today</span>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Time Saved</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">18.5h</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* AI Tools Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">AI-Powered Tools</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AIToolCard title="Smart Classification" description="Automatically categorizes tickets using NLP and machine learning" icon={<Brain className="w-6 h-6 text-blue-600" />} status="active" performance={94} usageCount={342} color="bg-blue-50" />
            <AIToolCard title="Pattern Detection" description="Identifies recurring issues and emerging trends in real-time" icon={<TrendingUp className="w-6 h-6 text-purple-600" />} status="active" performance={87} usageCount={156} color="bg-purple-50" />
            <AIToolCard title="Knowledge Graph" description="Finds similar cases and suggests proven solutions" icon={<Search className="w-6 h-6 text-green-600" />} status="active" performance={91} usageCount={289} color="bg-green-50" />
            <AIToolCard title="Sentiment Analysis" description="Detects customer emotions and urgency levels" icon={<MessageSquare className="w-6 h-6 text-orange-600" />} status="training" performance={82} usageCount={198} color="bg-orange-50" />
            <AIToolCard title="Auto-Response" description="Generates personalized responses for common queries" icon={<Sparkles className="w-6 h-6 text-pink-600" />} status="active" performance={88} usageCount={234} color="bg-pink-50" />
            <AIToolCard title="Document Parser" description="Extracts key information from attachments and logs" icon={<FileText className="w-6 h-6 text-indigo-600" />} status="idle" performance={76} usageCount={67} color="bg-indigo-50" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Automated Workflows */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Automated Workflows</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <Zap className="w-4 h-4" />
                Create Workflow
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {workflows.map(workflow => <WorkflowCard key={workflow.id} {...workflow} onToggle={() => toggleWorkflow(workflow.id)} />)}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="space-y-0 max-h-[600px] overflow-y-auto">
              {activityLogs.map((log, index) => <ActivityLogItem key={index} {...log} />)}
            </div>
          </div>
        </div>

        {/* Model Performance Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Model Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Classification Accuracy</span>
                <span className="text-sm font-bold text-gray-900">94%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div className="bg-green-500 h-3 rounded-full" style={{
                width: '94%'
              }} />
              </div>
              <p className="text-xs text-gray-600">Target: 90%</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Pattern Detection</span>
                <span className="text-sm font-bold text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div className="bg-blue-500 h-3 rounded-full" style={{
                width: '87%'
              }} />
              </div>
              <p className="text-xs text-gray-600">Target: 85%</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Solution Match Rate</span>
                <span className="text-sm font-bold text-gray-900">91%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div className="bg-purple-500 h-3 rounded-full" style={{
                width: '91%'
              }} />
              </div>
              <p className="text-xs text-gray-600">Target: 88%</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Response Quality</span>
                <span className="text-sm font-bold text-gray-900">88%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div className="bg-orange-500 h-3 rounded-full" style={{
                width: '88%'
              }} />
              </div>
              <p className="text-xs text-gray-600">Target: 85%</p>
            </div>
          </div>
        </div>

        {/* Training Recommendations */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">AI Training Recommendations</h2>
              <p className="text-sm text-gray-700">Suggested improvements to enhance AI performance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm font-semibold text-gray-900">Low Confidence Cases</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">147 tickets classified with &lt;70% confidence need review</p>
              <button className="text-xs font-medium text-purple-700 hover:text-purple-800 flex items-center gap-1">
                Review Cases
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900">Model Update Available</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">New dataset ready with 2,341 labeled examples</p>
              <button className="text-xs font-medium text-purple-700 hover:text-purple-800 flex items-center gap-1">
                Start Training
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};