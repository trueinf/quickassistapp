import React from 'react';
import { FileText, Download, Calendar, TrendingUp, TrendingDown, Users, Clock, Target, Filter, Search, ChevronDown, ChevronRight, BarChart3, PieChart, Activity, AlertCircle, CheckCircle2, FileBarChart } from 'lucide-react';
type ReportCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated: string;
  frequency: string;
  status: 'ready' | 'generating' | 'scheduled';
  onGenerate: () => void;
  onDownload: () => void;
};
const ReportCard = ({
  title,
  description,
  icon,
  lastGenerated,
  frequency,
  status,
  onGenerate,
  onDownload
}: ReportCardProps) => {
  const statusConfig = {
    ready: {
      label: 'Ready',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    generating: {
      label: 'Generating',
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    scheduled: {
      label: 'Scheduled',
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50'
    }
  };
  const statusInfo = statusConfig[status];
  return <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${statusInfo.color} rounded-full ${status === 'generating' ? 'animate-pulse' : ''}`} />
          <span className={`text-xs font-medium ${statusInfo.textColor} ${statusInfo.bgColor} px-2 py-1 rounded-full`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Last Generated</span>
          <span className="font-medium text-gray-900">{lastGenerated}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Frequency</span>
          <span className="font-medium text-gray-900">{frequency}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onGenerate} disabled={status === 'generating'} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Activity className="w-4 h-4" />
          Generate
        </button>
        <button onClick={onDownload} disabled={status !== 'ready'} className="p-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>;
};
type MetricCardProps = {
  label: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
};
const MetricCard = ({
  label,
  value,
  change,
  changeType,
  icon
}: MetricCardProps) => {
  const changeConfig = {
    positive: {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: TrendingUp
    },
    negative: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: TrendingDown
    },
    neutral: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: Activity
    }
  };
  const config = changeConfig[changeType];
  const ChangeIcon = config.icon;
  return <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 ${config.bgColor} px-2 py-1 rounded-full`}>
          <ChangeIcon className={`w-3 h-3 ${config.color}`} />
          <span className={`text-xs font-medium ${config.color}`}>{change}</span>
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{label}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>;
};
type DataTableRow = {
  category: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
};
const DataTable = ({
  data
}: {
  data: DataTableRow[];
}) => {
  return <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-4">Category</th>
            <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Count</th>
            <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Percentage</th>
            <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-gray-900">{row.category}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-bold text-gray-900">{row.count}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-20 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{
                  width: `${row.percentage}%`
                }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-10">{row.percentage}%</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  {row.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {row.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                  {row.trend === 'stable' && <Activity className="w-4 h-4 text-gray-400" />}
                  <span className={`text-xs font-medium ${row.trend === 'up' ? 'text-green-600' : row.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {row.change}
                  </span>
                </div>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
};

// @component: Reports
export const Reports = () => {
  const [dateRange, setDateRange] = React.useState('last-7-days');
  const [reportType, setReportType] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleGenerateReport = (reportName: string) => {
    console.log(`Generating report: ${reportName}`);
  };
  const handleDownloadReport = (reportName: string) => {
    console.log(`Downloading report: ${reportName}`);
  };
  const issueData: DataTableRow[] = [{
    category: 'Invoice Errors',
    count: 156,
    percentage: 28,
    trend: 'up',
    change: '+12%'
  }, {
    category: 'Bank Sync Issues',
    count: 134,
    percentage: 24,
    trend: 'down',
    change: '-8%'
  }, {
    category: 'Payroll Problems',
    count: 98,
    percentage: 18,
    trend: 'up',
    change: '+5%'
  }, {
    category: 'Report Generation',
    count: 87,
    percentage: 16,
    trend: 'stable',
    change: '0%'
  }, {
    category: 'User Access',
    count: 78,
    percentage: 14,
    trend: 'down',
    change: '-3%'
  }];
  const agentData: DataTableRow[] = [{
    category: 'Sarah Johnson',
    count: 47,
    percentage: 32,
    trend: 'up',
    change: '+8%'
  }, {
    category: 'Mike Chen',
    count: 42,
    percentage: 28,
    trend: 'up',
    change: '+5%'
  }, {
    category: 'Emma Davis',
    count: 38,
    percentage: 26,
    trend: 'stable',
    change: '0%'
  }, {
    category: 'James Wilson',
    count: 21,
    percentage: 14,
    trend: 'down',
    change: '-4%'
  }];

  // @return
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileBarChart className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Generate insights and export data for analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search reports..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
          </div>
          <div className="flex gap-3">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <select value={reportType} onChange={e => setReportType(e.target.value)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">All Reports</option>
              <option value="performance">Performance</option>
              <option value="issues">Issues</option>
              <option value="agents">Agents</option>
              <option value="ai">AI Analytics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Key Metrics */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Total Tickets" value="1,247" change="+12%" changeType="positive" icon={<FileText className="w-5 h-5 text-blue-600" />} />
            <MetricCard label="Avg Resolution Time" value="18m" change="-5m" changeType="positive" icon={<Clock className="w-5 h-5 text-green-600" />} />
            <MetricCard label="AI Resolution Rate" value="42%" change="+8%" changeType="positive" icon={<Target className="w-5 h-5 text-purple-600" />} />
            <MetricCard label="Customer Satisfaction" value="4.7" change="+0.2" changeType="positive" icon={<Users className="w-5 h-5 text-orange-600" />} />
          </div>
        </div>

        {/* Report Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Report Templates</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Create Custom
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard title="Daily Performance" description="Comprehensive overview of daily ticket metrics and agent performance" icon={<BarChart3 className="w-6 h-6 text-blue-600" />} lastGenerated="2 hours ago" frequency="Daily" status="ready" onGenerate={() => handleGenerateReport('Daily Performance')} onDownload={() => handleDownloadReport('Daily Performance')} />
            <ReportCard title="Issue Analysis" description="Detailed breakdown of issue categories, patterns, and trends" icon={<AlertCircle className="w-6 h-6 text-orange-600" />} lastGenerated="5 hours ago" frequency="Daily" status="ready" onGenerate={() => handleGenerateReport('Issue Analysis')} onDownload={() => handleDownloadReport('Issue Analysis')} />
            <ReportCard title="AI Insights" description="AI model performance, accuracy metrics, and automation stats" icon={<Activity className="w-6 h-6 text-purple-600" />} lastGenerated="1 hour ago" frequency="Daily" status="ready" onGenerate={() => handleGenerateReport('AI Insights')} onDownload={() => handleDownloadReport('AI Insights')} />
            <ReportCard title="Agent Performance" description="Individual agent metrics, resolution rates, and efficiency" icon={<Users className="w-6 h-6 text-green-600" />} lastGenerated="3 hours ago" frequency="Weekly" status="ready" onGenerate={() => handleGenerateReport('Agent Performance')} onDownload={() => handleDownloadReport('Agent Performance')} />
            <ReportCard title="Customer Trends" description="Customer behavior patterns, satisfaction scores, and feedback" icon={<TrendingUp className="w-6 h-6 text-blue-600" />} lastGenerated="Generating..." frequency="Weekly" status="generating" onGenerate={() => handleGenerateReport('Customer Trends')} onDownload={() => handleDownloadReport('Customer Trends')} />
            <ReportCard title="Executive Summary" description="High-level overview for stakeholders with key business metrics" icon={<PieChart className="w-6 h-6 text-indigo-600" />} lastGenerated="Yesterday" frequency="Weekly" status="scheduled" onGenerate={() => handleGenerateReport('Executive Summary')} onDownload={() => handleDownloadReport('Executive Summary')} />
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Issues */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Top Issues (Last 7 Days)</h2>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View Details
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <DataTable data={issueData} />
          </div>

          {/* Agent Performance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Agent Resolved Tickets</h2>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View Details
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <DataTable data={agentData} />
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Scheduled Reports</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <Calendar className="w-4 h-4" />
              Manage Schedule
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Daily Performance Report</h3>
                  <p className="text-xs text-gray-600">Sends every day at 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded-full">Active</span>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Edit</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Weekly Executive Summary</h3>
                  <p className="text-xs text-gray-600">Sends every Monday at 8:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded-full">Active</span>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Edit</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Monthly AI Analytics</h3>
                  <p className="text-xs text-gray-600">Sends first day of month at 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-700 font-medium bg-gray-100 px-2 py-1 rounded-full">Paused</span>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Edit</button>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Export Data</h2>
              <p className="text-sm text-gray-700">Download reports in multiple formats for external analysis</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="text-xs font-medium text-gray-900">PDF</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="text-xs font-medium text-gray-900">Excel</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="text-xs font-medium text-gray-900">CSV</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="text-xs font-medium text-gray-900">JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
};