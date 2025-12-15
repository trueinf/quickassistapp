import React from 'react';
import { AlertCircle, TrendingUp, Users, Clock, AlertTriangle, CheckCircle2, BarChart3, Home, FileText, Menu, X, Settings, BookOpen, AlertOctagon, Network, Search } from 'lucide-react';
import { TriageCenter } from './TriageCenter';
import { Analytics } from './Analytics';
import { AITools } from './AITools';
import { Reports } from './Reports';
import { DocsAndSOPs } from './DocsAndSOPs';
import { KnowledgeExplorer } from './KnowledgeExplorer';
import { Escalations } from './Escalations';
type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
};
const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendUp
}: StatCardProps) => <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        {icon}
      </div>
      {trend && <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>;
type IssueCardProps = {
  title: string;
  count: number;
  color: string;
  percentage?: number;
};
const IssueCard = ({
  title,
  count,
  color,
  percentage
}: IssueCardProps) => <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <h4 className="text-gray-900 font-semibold text-base leading-tight flex-1">{title}</h4>
      <span className={`px-3 py-1 rounded-full text-sm font-bold ${color}`}>
        {count}
      </span>
    </div>
    {percentage && <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <div className={`h-2 rounded-full ${color.includes('red') ? 'bg-red-500' : color.includes('orange') ? 'bg-orange-500' : 'bg-blue-500'}`} style={{
        width: `${percentage}%`
      }} />
        </div>
        <span className="text-xs text-gray-600 font-medium">{percentage}%</span>
      </div>}
  </div>;

// @component: QuickAssistDashboard
export const QuickAssistDashboard = () => {
  const [activeMenu, setActiveMenu] = React.useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const menuItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home
  }, {
    id: 'triage',
    label: 'Triage Center',
    icon: AlertCircle
  }, {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3
  }, {
    id: 'ai-tools',
    label: 'AI Tools',
    icon: TrendingUp
  }, {
    id: 'reports',
    label: 'Reports',
    icon: FileText
  }, {
    id: 'docs-sops',
    label: 'Docs and SOPs',
    icon: BookOpen
  }, {
    id: 'escalations',
    label: 'Escalations',
    icon: AlertOctagon
  }, {
    id: 'knowledge-graph',
    label: 'Knowledge Graph',
    icon: Network
  }, {
    id: 'knowledge-explorer',
    label: 'Knowledge Explorer',
    icon: Search
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }] as any[];

  // @return
  return <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">QuickAssist</h2>
            <button className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map(item => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => {
                setActiveMenu(item.id);
                setSidebarOpen(false);
              }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeMenu === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>;
            })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-medium text-blue-900 mb-1">AI Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-blue-700">Active & Learning</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">QuickAssist Dashboard</h1>
                  <p className="text-sm text-gray-600 mt-1">AI-Powered QuickBooks Support System</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Report
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  View All Tickets
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {activeMenu === 'triage' ? <TriageCenter /> : activeMenu === 'analytics' ? <Analytics /> : activeMenu === 'ai-tools' ? <AITools /> : activeMenu === 'reports' ? <Reports /> : activeMenu === 'docs-sops' ? <DocsAndSOPs /> : activeMenu === 'knowledge-explorer' ? <KnowledgeExplorer /> : activeMenu === 'escalations' ? <Escalations /> : <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Tickets Today" value={124} icon={<Users className="w-5 h-5 text-blue-600" />} trend="+12%" trendUp={true} />
                <StatCard title="AI Resolved (Tier-1)" value="42%" icon={<CheckCircle2 className="w-5 h-5 text-green-600" />} trend="+8%" trendUp={true} />
                <StatCard title="Avg Resolution Time" value="18m" icon={<Clock className="w-5 h-5 text-orange-600" />} trend="-5m" trendUp={true} />
                <StatCard title="Active Patterns" value={3} icon={<BarChart3 className="w-5 h-5 text-purple-600" />} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Top Recurring Issues</h2>
                    <span className="text-sm text-gray-500">Last 24 hours</span>
                  </div>
                  <div className="space-y-4">
                    <IssueCard title="Error 6150: Invoice failed to send" count={34} color="bg-red-100 text-red-800" percentage={27} />
                    <IssueCard title="Bank feed not syncing with account" count={28} color="bg-orange-100 text-orange-800" percentage={23} />
                    <IssueCard title="Payroll tax calculation mismatch" count={21} color="bg-blue-100 text-blue-800" percentage={17} />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Pattern Alert</h3>
                      <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">High Priority</span>
                    </div>
                  </div>
                  <p className="text-gray-800 font-medium mb-4">
                    Spike in 'Error 6150' from QBD 2023 users after vR15 update
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Affected Users:</span>
                      <span className="font-bold text-gray-900">87</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">First Detected:</span>
                      <span className="font-medium text-gray-900">2h ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Trend:</span>
                      <span className="font-medium text-red-600">↑ Increasing</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                    View Pattern Details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">AI Resolution Efficiency</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Tier-1 with AI</span>
                        <span className="text-sm font-bold text-green-600">42%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{
                      width: '42%'
                    }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Escalated to Tier-2</span>
                        <span className="text-sm font-bold text-orange-600">31%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-orange-500 h-3 rounded-full" style={{
                      width: '31%'
                    }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Pending Customer</span>
                        <span className="text-sm font-bold text-blue-600">27%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{
                      width: '27%'
                    }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Triage Center</div>
                        <div className="text-xs text-gray-500">23 tickets awaiting classification</div>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">Similar Cases</div>
                        <div className="text-xs text-gray-500">Search knowledge graph</div>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">AI Agent Toolkit</div>
                        <div className="text-xs text-gray-500">Access resolution workflows</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </>}
        </main>
      </div>
    </div>;
};