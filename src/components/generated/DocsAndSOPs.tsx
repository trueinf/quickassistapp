import React from 'react';
import { BookOpen, Search, FileText, AlertCircle, TrendingUp, CheckCircle2, ExternalLink, Star, Clock, Users, Sparkles, Filter, ChevronDown, ChevronRight, Tag } from 'lucide-react';
type DocType = 'KB' | 'SOP' | 'Community';
type DocConfidence = 'high' | 'medium' | 'low';
type SuggestedDoc = {
  id: string;
  title: string;
  type: DocType;
  confidence: number;
  notes: string;
  resolvedCases: number;
  lastUpdated: string;
  owner?: string;
  citedCount: number;
};
type DocCardProps = {
  doc: SuggestedDoc;
  onView: (doc: SuggestedDoc) => void;
};
const DocCard = ({
  doc,
  onView
}: DocCardProps) => {
  const typeConfig = {
    KB: {
      label: 'KB Article',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: FileText
    },
    SOP: {
      label: 'SOP',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: BookOpen
    },
    Community: {
      label: 'Community',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: Users
    }
  };
  const config = typeConfig[doc.type];
  const Icon = config.icon;
  const getConfidenceLevel = (confidence: number): {
    label: string;
    color: string;
  } => {
    if (confidence >= 90) return {
      label: 'High Relevance',
      color: 'text-green-600'
    };
    if (confidence >= 80) return {
      label: 'Medium Relevance',
      color: 'text-orange-600'
    };
    return {
      label: 'Low Relevance',
      color: 'text-gray-600'
    };
  };
  const confidenceInfo = getConfidenceLevel(doc.confidence);
  return <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div className={`p-1.5 ${config.color.split(' ')[0]} rounded-lg border ${config.color.split(' ')[2]}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${config.color}`}>
            {config.label} #{doc.id}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star className={`w-4 h-4 ${doc.confidence >= 90 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
          <span className={`text-sm font-bold ${confidenceInfo.color}`}>{doc.confidence}%</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{doc.title}</h3>
      
      <p className="text-sm text-gray-600 mb-3">{doc.notes}</p>

      <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span className="font-medium">{doc.resolvedCases} resolved cases</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium">{doc.citedCount} citations</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {doc.owner && <span className="font-medium">By {doc.owner}</span>}
          {doc.owner && <span className="mx-1">•</span>}
          <span>Updated {doc.lastUpdated}</span>
        </div>
        <button onClick={() => onView(doc)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          View
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>;
};
type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};
const FilterButton = ({
  active,
  onClick,
  children
}: FilterButtonProps) => <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>
    {children}
  </button>;

// @component: DocsAndSOPs
export const DocsAndSOPs = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<'all' | DocType>('all');
  const [sortBy, setSortBy] = React.useState<'relevance' | 'recent' | 'popular'>('relevance');
  const suggestedDocs: SuggestedDoc[] = [{
    id: '2124',
    title: 'Fix Error 6150: Company file won\'t open',
    type: 'KB',
    confidence: 95,
    notes: 'Common for QBD v2023+ errors',
    resolvedCases: 34,
    lastUpdated: '2 days ago',
    owner: 'Tech Team',
    citedCount: 287
  }, {
    id: '1123',
    title: 'Rebuild/Verify Company File SOP',
    type: 'SOP',
    confidence: 91,
    notes: 'Internal diagnostic tree with linked scripts',
    resolvedCases: 28,
    lastUpdated: '1 week ago',
    owner: 'Support Lead',
    citedCount: 234
  }, {
    id: 'Forum-4821',
    title: 'Forum: Validate → Rebuild Fix',
    type: 'Community',
    confidence: 87,
    notes: '94 upvotes, shared fix from accountant',
    resolvedCases: 21,
    lastUpdated: '3 days ago',
    citedCount: 156
  }, {
    id: '3847',
    title: 'Bank Feed Authentication Reset Guide',
    type: 'KB',
    confidence: 93,
    notes: 'Step-by-step reconnection process',
    resolvedCases: 42,
    lastUpdated: '5 days ago',
    owner: 'Tech Writer',
    citedCount: 312
  }, {
    id: '2941',
    title: 'Payroll Tax Table Update SOP',
    type: 'SOP',
    confidence: 89,
    notes: 'Quarterly update procedure with validation steps',
    resolvedCases: 18,
    lastUpdated: '1 week ago',
    owner: 'Payroll Team',
    citedCount: 189
  }, {
    id: 'Forum-3612',
    title: 'Community: Invoice Error 6150 Workaround',
    type: 'Community',
    confidence: 84,
    notes: '67 upvotes, verified by multiple users',
    resolvedCases: 15,
    lastUpdated: '4 days ago',
    citedCount: 145
  }];
  const filteredDocs = suggestedDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.notes.toLowerCase().includes(searchQuery.toLowerCase()) || doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });
  const sortedDocs = [...filteredDocs].sort((a, b) => {
    if (sortBy === 'relevance') return b.confidence - a.confidence;
    if (sortBy === 'popular') return b.citedCount - a.citedCount;
    return 0; // recent would need actual date comparison
  });
  const handleViewDoc = (doc: SuggestedDoc) => {
    console.log('Viewing document:', doc);
  };

  // @return
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Docs and SOPs</h1>
              <p className="text-sm text-gray-600 mt-1">AI-powered knowledge base and standard operating procedures</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="relevance">Sort by Relevance</option>
              <option value="popular">Sort by Popularity</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Total Documents</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{suggestedDocs.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">High Confidence</span>
              <Star className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{suggestedDocs.filter(d => d.confidence >= 90).length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Total Citations</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{suggestedDocs.reduce((acc, doc) => acc + doc.citedCount, 0)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Resolved Cases</span>
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{suggestedDocs.reduce((acc, doc) => acc + doc.resolvedCases, 0)}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search + Semantic Match */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Search Knowledge Base</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder='Try: "invoice sending fails after update"' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            LLM + KG auto-ranks best matches and clusters by topic
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <span className="text-sm font-medium text-gray-700 py-2">Filter by Type:</span>
          <FilterButton active={selectedType === 'all'} onClick={() => setSelectedType('all')}>
            All Documents
          </FilterButton>
          <FilterButton active={selectedType === 'KB'} onClick={() => setSelectedType('KB')}>
            KB Articles
          </FilterButton>
          <FilterButton active={selectedType === 'SOP'} onClick={() => setSelectedType('SOP')}>
            SOPs
          </FilterButton>
          <FilterButton active={selectedType === 'Community'} onClick={() => setSelectedType('Community')}>
            Community Posts
          </FilterButton>
        </div>

        {/* AI-Synthesized Insight */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">AI-Synthesized Insight</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                This issue typically arises from a corrupted .QBW file. Most resolved cases ran a file rebuild using the internal tool. 
                Community reports align with SOP #1123. Consider verifying file integrity before escalation. The pattern shows 
                higher occurrence in QuickBooks Desktop 2023 R15 and later versions, particularly after recent updates.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-700">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Generated from top 3 sources • 95% confidence match</span>
          </div>
        </div>

        {/* Suggested Docs Panel */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Suggested Documents</h2>
            <span className="text-sm text-gray-500">
              Showing {sortedDocs.length} of {suggestedDocs.length} documents
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocs.map(doc => <DocCard key={doc.id} doc={doc} onView={handleViewDoc} />)}
          </div>
        </div>

        {/* Trust & Source Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Trust & Source Breakdown</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">KB Article #2124</h3>
                  <p className="text-sm text-gray-600">Fix Error 6150: Company file won't open</p>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                  Highly Trusted
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Successful Resolutions</p>
                  <p className="text-lg font-bold text-gray-900">287</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Success Rate</p>
                  <p className="text-lg font-bold text-green-600">94%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Owner: <span className="font-medium text-gray-900">Tech Team</span></span>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View Usage History
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">SOP #1123</h3>
                  <p className="text-sm text-gray-600">Rebuild/Verify Company File SOP</p>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                  Highly Trusted
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Successful Resolutions</p>
                  <p className="text-lg font-bold text-gray-900">234</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Success Rate</p>
                  <p className="text-lg font-bold text-green-600">91%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Owner: <span className="font-medium text-gray-900">Support Lead</span></span>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View Usage History
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Community Post #Forum-4821</h3>
                  <p className="text-sm text-gray-600">Forum: Validate → Rebuild Fix</p>
                </div>
                <span className="text-xs font-medium text-orange-700 bg-orange-50 px-2 py-1 rounded-full border border-orange-200">
                  Community Verified
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Successful Resolutions</p>
                  <p className="text-lg font-bold text-gray-900">156</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Upvotes</p>
                  <p className="text-lg font-bold text-orange-600">94</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Posted</p>
                  <p className="text-sm font-medium text-gray-900">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Source: <span className="font-medium text-gray-900">Community Forum</span></span>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View Original Post
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Structure Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Document Preview with Matched Lines</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View Full Document
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-yellow-700 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">Section 3.2: Error Code Resolution</p>
                  <p className="text-sm text-gray-700">
                    "When encountering <span className="bg-yellow-200 font-semibold">Error 6150</span>, first verify the company file integrity using the built-in 
                    <span className="bg-yellow-200 font-semibold"> Rebuild utility</span>. This resolves most file corruption issues..."
                  </p>
                  <span className="text-xs text-yellow-700 font-medium mt-2 inline-block">
                    Match: 96% • Line 127-129
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-yellow-700 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">Section 5.1: Post-Update Issues</p>
                  <p className="text-sm text-gray-700">
                    "After <span className="bg-yellow-200 font-semibold">QuickBooks Desktop updates</span>, users may experience temporary file access issues. 
                    Running the <span className="bg-yellow-200 font-semibold">Verify and Rebuild</span> sequence typically resolves these..."
                  </p>
                  <span className="text-xs text-yellow-700 font-medium mt-2 inline-block">
                    Match: 89% • Line 203-205
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};