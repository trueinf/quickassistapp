import React from 'react';
import { TrendingUp, TrendingDown, Users, Clock, CheckCircle2, AlertCircle, BarChart3, Calendar, Download, RefreshCw, Filter, ChevronDown } from 'lucide-react';
type TimeRange = '24h' | '7d' | '30d' | '90d';
type MetricCardProps = {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  suffix?: string;
};
const MetricCard = ({
  title,
  value,
  change,
  icon,
  trend,
  suffix
}: MetricCardProps) => <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{Math.abs(change)}%</span>
      </div>
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">
      {value}{suffix && <span className="text-lg text-gray-600 ml-1">{suffix}</span>}
    </p>
  </div>;
type ChartBarProps = {
  label: string;
  value: number;
  maxValue: number;
  color: string;
};
const ChartBar = ({
  label,
  value,
  maxValue,
  color
}: ChartBarProps) => {
  const percentage = value / maxValue * 100;
  return <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-900 font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div className={`h-3 rounded-full ${color}`} style={{
        width: `${percentage}%`
      }} />
      </div>
    </div>;
};
type CategoryBreakdownProps = {
  category: string;
  count: number;
  percentage: number;
  trend: number;
  color: string;
};
const CategoryBreakdown = ({
  category,
  count,
  percentage,
  trend,
  color
}: CategoryBreakdownProps) => <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3 flex-1">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-sm font-medium text-gray-900">{category}</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{count} tickets</span>
      <div className="w-24 bg-gray-100 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{
        width: `${percentage}%`
      }} />
      </div>
      <span className={`text-xs font-medium w-12 text-right ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend >= 0 ? '+' : ''}{trend}%
      </span>
    </div>
  </div>;

// @component: Analytics
export const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');
  const [selectedMetric, setSelectedMetric] = React.useState<'resolution' | 'volume' | 'satisfaction'>('resolution');
  const timeRangeOptions: {
    value: TimeRange;
    label: string;
  }[] = [{
    value: '24h',
    label: 'Last 24 Hours'
  }, {
    value: '7d',
    label: 'Last 7 Days'
  }, {
    value: '30d',
    label: 'Last 30 Days'
  }, {
    value: '90d',
    label: 'Last 90 Days'
  }];

  // Sample data - would be fetched from API
  const volumeData = [{
    day: 'Mon',
    value: 124
  }, {
    day: 'Tue',
    value: 138
  }, {
    day: 'Wed',
    value: 156
  }, {
    day: 'Thu',
    value: 142
  }, {
    day: 'Fri',
    value: 168
  }, {
    day: 'Sat',
    value: 89
  }, {
    day: 'Sun',
    value: 76
  }];
  const maxVolume = Math.max(...volumeData.map(d => d.value));
  const categoryData = [{
    category: 'Invoice Errors',
    count: 342,
    percentage: 28,
    trend: 12,
    color: 'bg-red-500'
  }, {
    category: 'Bank Sync',
    count: 298,
    percentage: 24,
    trend: -5,
    color: 'bg-orange-500'
  }, {
    category: 'Payroll',
    count: 267,
    percentage: 22,
    trend: 8,
    color: 'bg-blue-500'
  }, {
    category: 'Printing',
    count: 156,
    percentage: 13,
    trend: -2,
    color: 'bg-purple-500'
  }, {
    category: 'Payments',
    count: 98,
    percentage: 8,
    trend: 3,
    color: 'bg-green-500'
  }, {
    category: 'Other',
    count: 62,
    percentage: 5,
    trend: -1,
    color: 'bg-gray-500'
  }];
  const aiPerformanceData = [{
    metric: 'Auto-Resolved (Tier-1)',
    value: 42,
    target: 50
  }, {
    metric: 'Correct Classification',
    value: 89,
    target: 85
  }, {
    metric: 'Suggested Actions Used',
    value: 67,
    target: 70
  }, {
    metric: 'Customer Satisfaction',
    value: 4.6,
    target: 4.5
  }];

  // @return
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Comprehensive insights into support performance and AI effectiveness</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select value={timeRange} onChange={e => setTimeRange(e.target.value as TimeRange)} className="appearance-none px-4 py-2 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                {timeRangeOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Tickets" value={1223} change={12} trend="up" icon={<Users className="w-5 h-5 text-blue-600" />} />
          <MetricCard title="AI Resolution Rate" value={42} change={8} trend="up" suffix="%" icon={<CheckCircle2 className="w-5 h-5 text-green-600" />} />
          <MetricCard title="Avg Resolution Time" value="18m" change={15} trend="down" icon={<Clock className="w-5 h-5 text-orange-600" />} />
          <MetricCard title="Customer Satisfaction" value={4.6} change={4} trend="up" suffix="/5" icon={<BarChart3 className="w-5 h-5 text-purple-600" />} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Ticket Volume Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Ticket Volume Trend</h2>
              <p className="text-sm text-gray-600 mt-1">Daily ticket volume over the selected period</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedMetric('volume')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedMetric === 'volume' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>
                Volume
              </button>
              <button onClick={() => setSelectedMetric('resolution')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedMetric === 'resolution' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>
                Resolution
              </button>
              <button onClick={() => setSelectedMetric('satisfaction')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedMetric === 'satisfaction' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>
                Satisfaction
              </button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-4">
            {volumeData.map((data, index) => <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-12">{data.day}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500" style={{
                width: `${data.value / maxVolume * 100}%`
              }}>
                    <span className="text-xs font-bold text-white">{data.value}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Issue Category Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Issue Categories</h2>
                <p className="text-sm text-gray-600 mt-1">Breakdown by ticket type</p>
              </div>
              <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              {categoryData.map((data, index) => <CategoryBreakdown key={index} {...data} />)}
            </div>
          </div>

          {/* AI Performance Metrics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">AI Performance</h2>
                <p className="text-sm text-gray-600 mt-1">Key AI effectiveness indicators</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600 font-medium">Active</span>
              </div>
            </div>
            <div className="space-y-6">
              {aiPerformanceData.map((data, index) => <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        {data.value}{typeof data.value === 'number' && data.value <= 5 ? '' : '%'}
                      </span>
                      <span className="text-xs text-gray-500">
                        / {data.target}{typeof data.target === 'number' && data.target <= 5 ? '' : '%'}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${data.value >= data.target ? 'bg-green-500' : 'bg-blue-500'}`} style={{
                  width: `${Math.min(data.value / data.target * 100, 100)}%`
                }} />
                    {/* Target indicator */}
                    <div className="absolute top-0 h-2 w-0.5 bg-gray-400" style={{
                  left: '100%'
                }} />
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        {/* Resolution Time Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Resolution Time Distribution</h2>
              <p className="text-sm text-gray-600 mt-1">Time taken to resolve tickets across categories</p>
            </div>
          </div>
          <div className="space-y-4">
            <ChartBar label="< 5 minutes" value={287} maxValue={350} color="bg-green-500" />
            <ChartBar label="5-15 minutes" value={342} maxValue={350} color="bg-blue-500" />
            <ChartBar label="15-30 minutes" value={298} maxValue={350} color="bg-orange-500" />
            <ChartBar label="30-60 minutes" value={156} maxValue={350} color="bg-red-500" />
            <ChartBar label="> 60 minutes" value={140} maxValue={350} color="bg-purple-500" />
          </div>
        </div>

        {/* Top Performing Solutions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Top Performing AI Solutions</h2>
              <p className="text-sm text-gray-700">Most effective automated resolutions this week</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded-full">KB-2847</span>
                <span className="text-lg font-bold text-green-600">94%</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Invoice Error 6150 Fix</h3>
              <p className="text-xs text-gray-600">287 successful resolutions</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded-full">KB-1923</span>
                <span className="text-lg font-bold text-green-600">91%</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Bank Feed Re-auth</h3>
              <p className="text-xs text-gray-600">234 successful resolutions</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded-full">KB-3421</span>
                <span className="text-lg font-bold text-green-600">88%</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Payroll Tax Update</h3>
              <p className="text-xs text-gray-600">189 successful resolutions</p>
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-bold text-gray-900">Attention Needed</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Printing Issues Increasing</h3>
                <p className="text-xs text-gray-700 mb-2">23% increase in print-related tickets over last week</p>
                <button className="text-xs font-medium text-orange-700 hover:text-orange-800">
                  Investigate →
                </button>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Resolution Time Above Target</h3>
                <p className="text-xs text-gray-700 mb-2">Bank sync issues taking 12m longer than average</p>
                <button className="text-xs font-medium text-red-700 hover:text-red-800">
                  View Details →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-gray-900">Positive Trends</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">AI Accuracy Improving</h3>
                <p className="text-xs text-gray-700 mb-2">Classification accuracy up 8% this week</p>
                <button className="text-xs font-medium text-green-700 hover:text-green-800">
                  Learn More →
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Customer Satisfaction High</h3>
                <p className="text-xs text-gray-700 mb-2">4.6/5 average rating, 4% above target</p>
                <button className="text-xs font-medium text-blue-700 hover:text-blue-800">
                  View Feedback →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};