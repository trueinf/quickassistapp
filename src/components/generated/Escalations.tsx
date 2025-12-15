import React from 'react';
import { AlertOctagon, Edit2, Save, X, User, Clock, FileText, BookOpen, Users, Upload, Send, CheckCircle2, ChevronDown, Tag, Star, TrendingUp, MessageSquare, Phone, Mail, Calendar, History, ThumbsUp, ThumbsDown, ExternalLink, ArrowLeft, Sparkles, Brain } from 'lucide-react';

type Priority = 'low' | 'medium' | 'high' | 'critical';
type EscalationTeam = 'tier-2' | 'backend-support' | 'billing' | 'technical-specialist' | 'product-team';
type ResponseChannel = 'email' | 'call' | 'queue' | 'chat';
type DocType = 'KB' | 'SOP' | 'Community';

interface EscalationDoc {
  id: string;
  title: string;
  type: DocType;
  confidence: number;
  used: boolean;
}

interface TimelineEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details?: string;
}

interface EscalationData {
  id: string;
  customerName: string;
  productVersion: string;
  productLine: 'QBO' | 'QBD';
  reportedIssue: string;
  errorCodes?: string[];
  stepsTaken: string[];
  aiActionLog: string[];
  suggestedNextStep: string;
  probableCause?: string;
  aiSummary?: string;
  aiInsights?: string[];
  agentNotes: string;
  tags: string[];
  priorSimilarEscalations: number;
  priority: Priority;
  rootCauseConfidence: number;
  relatedDocs: EscalationDoc[];
  selectedTeam: EscalationTeam | null;
  attachments: string[];
  escalationOwner: string | null;
  responseChannel: ResponseChannel | null;
  timeline: TimelineEvent[];
  tier2Outcome?: string;
  aiUsefulnessRating?: number;
  escalatedAt: string;
  timeSinceEscalation: string;
}

type EditableSummaryProps = {
  summary: string;
  onSave: (newSummary: string) => void;
};

const EditableSummary = ({ summary, onSave }: EditableSummaryProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedSummary, setEditedSummary] = React.useState(summary);

  const handleSave = () => {
    onSave(editedSummary);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <AlertOctagon className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-900">Escalation Summary</h3>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            AI Generated
          </span>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={editedSummary}
          onChange={(e) => setEditedSummary(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm"
        />
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{summary}</pre>
        </div>
      )}
    </div>
  );
};

type EscalationCardProps = {
  escalation: EscalationData;
  onClick: () => void;
};

const EscalationCard = ({ escalation, onClick }: EscalationCardProps) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold text-gray-900">{escalation.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${priorityColors[escalation.priority]}`}>
              {escalation.priority.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500">{escalation.productLine} {escalation.productVersion}</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">{escalation.customerName}</h3>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {escalation.reportedIssue}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{escalation.timeSinceEscalation}</span>
          </div>
          {escalation.errorCodes && escalation.errorCodes.length > 0 && (
            <div className="flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>{escalation.errorCodes[0]}</span>
            </div>
          )}
          {escalation.selectedTeam && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span className="capitalize">{escalation.selectedTeam.replace('-', ' ')}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {escalation.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {escalation.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{escalation.tags.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
};

type EscalationDetailViewProps = {
  escalation: EscalationData;
  onBack: () => void;
  onUpdate: (updated: EscalationData) => void;
};

const EscalationDetailView = ({ escalation, onBack, onUpdate }: EscalationDetailViewProps) => {
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackOutcome, setFeedbackOutcome] = React.useState('');
  const [feedbackRating, setFeedbackRating] = React.useState<number | undefined>(undefined);

  const handleSummaryUpdate = (newSummary: string) => {
    onUpdate({ ...escalation, suggestedNextStep: newSummary });
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200'
  };

  const teamOptions: Array<{ value: EscalationTeam; label: string }> = [
    { value: 'tier-2', label: 'Tier-2 Support' },
    { value: 'backend-support', label: 'Backend Support' },
    { value: 'billing', label: 'Billing Team' },
    { value: 'technical-specialist', label: 'Technical Specialist' },
    { value: 'product-team', label: 'Product Team' }
  ];

  const channelOptions: Array<{ value: ResponseChannel; label: string; icon: React.ReactNode }> = [
    { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { value: 'call', label: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
    { value: 'queue', label: 'Queue', icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'chat', label: 'Chat', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Escalations
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{escalation.id}</h2>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                  <span>{escalation.customerName}</span>
                  <span>•</span>
                  <span>{escalation.productLine} {escalation.productVersion}</span>
                  <span>•</span>
                  <span>{escalation.timeSinceEscalation}</span>
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[escalation.priority]}`}>
              {escalation.priority.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            {escalation.aiSummary && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">AI Summary</h3>
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    AI Generated
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed">{escalation.aiSummary}</p>
              </div>
            )}

            {/* AI Insights */}
            {escalation.aiInsights && escalation.aiInsights.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {escalation.aiInsights.map((insight, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed">{insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 1. Escalation Summary Panel */}
            <EditableSummary
              summary={`Customer: ${escalation.customerName}
Product: ${escalation.productLine} ${escalation.productVersion}

Reported Issue:
${escalation.reportedIssue}
${escalation.errorCodes ? `Error Codes: ${escalation.errorCodes.join(', ')}` : ''}

Steps Already Taken:
${escalation.stepsTaken.map((step, i) => `${i + 1}. ${step}`).join('\n')}

AI Action Log:
${escalation.aiActionLog.map((action, i) => `• ${action}`).join('\n')}

Suggested Next Step:
${escalation.suggestedNextStep}

${escalation.probableCause ? `Probable Cause: ${escalation.probableCause}` : ''}`}
              onSave={handleSummaryUpdate}
            />

            {/* 3. Linked Knowledge */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Linked Knowledge (Context Assist)</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Related KB articles, SOPs, and community threads used in resolution attempts</p>
              <div className="space-y-3">
                {escalation.relatedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className={`rounded-lg p-4 border ${
                      doc.used
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                          doc.type === 'KB' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          doc.type === 'SOP' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {doc.type} #{doc.id}
                        </span>
                        {doc.used && (
                          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            Used
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-600">{doc.confidence}% confidence</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{doc.title}</h4>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2">
                      View Document
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Routing + Attachments Panel */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Send className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Routing & Attachments</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Escalation Team</label>
                  <select
                    value={escalation.selectedTeam || ''}
                    onChange={(e) => onUpdate({ ...escalation, selectedTeam: e.target.value as EscalationTeam })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select team...</option>
                    {teamOptions.map(team => (
                      <option key={team.value} value={team.value}>{team.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign Escalation Owner</label>
                  <input
                    type="text"
                    value={escalation.escalationOwner || ''}
                    onChange={(e) => onUpdate({ ...escalation, escalationOwner: e.target.value })}
                    placeholder="Enter agent name or ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Response Channel</label>
                  <div className="grid grid-cols-2 gap-2">
                    {channelOptions.map(channel => (
                      <button
                        key={channel.value}
                        onClick={() => onUpdate({ ...escalation, responseChannel: channel.value })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          escalation.responseChannel === channel.value
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {channel.icon}
                        <span className="text-sm font-medium">{channel.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload logs, screenshots, or export files</p>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      Choose Files
                    </button>
                    {escalation.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {escalation.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2">
                            <span className="text-sm text-gray-700">{file}</span>
                            <button className="text-red-600 hover:text-red-700">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  <Send className="w-4 h-4" />
                  Submit Escalation
                </button>
              </div>
            </div>

            {/* 5. Escalation Timeline + Audit Trail */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Escalation Timeline & Audit Trail</h3>
              </div>
              <div className="space-y-4">
                {escalation.timeline.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{event.actor}</span>
                        <span className="text-xs text-gray-500">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{event.action}</p>
                      {event.details && (
                        <p className="text-xs text-gray-600 mt-1">{event.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* 2. Escalation Metadata Sidebar */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Escalation Metadata</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Line</label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium">
                      {escalation.productLine}
                    </span>
                    <span className="text-sm text-gray-700">{escalation.productVersion}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Priority Level</label>
                  <select
                    value={escalation.priority}
                    onChange={(e) => onUpdate({ ...escalation, priority: e.target.value as Priority })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm font-medium ${
                      priorityColors[escalation.priority]
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Root Cause Confidence: {escalation.rootCauseConfidence}%
                  </label>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        escalation.rootCauseConfidence >= 80 ? 'bg-green-500' :
                        escalation.rootCauseConfidence >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${escalation.rootCauseConfidence}%` }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Prior Similar Escalations</label>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <span className="text-2xl font-bold text-gray-900">{escalation.priorSimilarEscalations}</span>
                    <span className="text-sm text-gray-600 ml-2">similar cases</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Agent Notes</label>
                  <textarea
                    value={escalation.agentNotes}
                    onChange={(e) => onUpdate({ ...escalation, agentNotes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Add notes, observations, or additional context..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {escalation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                      >
                        {tag}
                        <button
                          onClick={() => {
                            const newTags = escalation.tags.filter((_, i) => i !== index);
                            onUpdate({ ...escalation, tags: newTags });
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200 hover:bg-blue-100">
                      <Tag className="w-3 h-3" />
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Post-Resolution Feedback Loop */}
            {escalation.tier2Outcome ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-900">Resolution Feedback</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tier-2 Outcome</label>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-gray-700">{escalation.tier2Outcome}</p>
                    </div>
                  </div>
                  {escalation.aiUsefulnessRating !== undefined && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">AI Usefulness Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => onUpdate({ ...escalation, aiUsefulnessRating: rating })}
                            className={`p-2 rounded-lg transition-colors ${
                              escalation.aiUsefulnessRating === rating
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            <Star className={`w-5 h-5 ${escalation.aiUsefulnessRating === rating ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Post-Resolution Feedback</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  After Tier-2 resolves this case, the outcome will be automatically logged and fed back into the knowledge graph for future AI suggestions.
                </p>
                <button
                  onClick={() => setShowFeedback(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Resolved
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Resolution Feedback</h3>
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setFeedbackOutcome('');
                  setFeedbackRating(undefined);
                }}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier-2 Outcome
                </label>
                <textarea
                  value={feedbackOutcome}
                  onChange={(e) => setFeedbackOutcome(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe how Tier-2 resolved this case..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rate AI Usefulness
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFeedbackRating(rating)}
                      className={`p-3 rounded-lg transition-colors ${
                        feedbackRating === rating
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${feedbackRating === rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                  <span className="ml-4 text-sm text-gray-600">
                    {feedbackRating ? `${feedbackRating}/5` : 'Not rated'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    onUpdate({
                      ...escalation,
                      tier2Outcome: feedbackOutcome,
                      aiUsefulnessRating: feedbackRating
                    });
                    setShowFeedback(false);
                    setFeedbackOutcome('');
                    setFeedbackRating(undefined);
                  }}
                  disabled={!feedbackOutcome.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Feedback
                </button>
                <button
                  onClick={() => {
                    setShowFeedback(false);
                    setFeedbackOutcome('');
                    setFeedbackRating(undefined);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// @component: Escalations
export const Escalations = () => {
  const [selectedEscalation, setSelectedEscalation] = React.useState<EscalationData | null>(null);
  const [escalations, setEscalations] = React.useState<EscalationData[]>([
    {
      id: 'ESC-2024-001',
      customerName: 'John Smith',
      productVersion: 'QuickBooks Desktop 2023 R15',
      productLine: 'QBD',
      reportedIssue: 'Error 6150: Invoice sending fails after software update. Customer unable to send invoices to clients, impacting cash flow.',
      errorCodes: ['Error 6150', 'ERR_INV_SEND'],
      stepsTaken: [
        'Verified company file integrity using File > Utilities > Verify Data',
        'Ran File > Utilities > Rebuild Data',
        'Cleared email cache in Send Forms preferences',
        'Re-authenticated email account'
      ],
      aiActionLog: [
        'AI classified issue as Invoice Error with 94% confidence',
        'Suggested KB-2847 as primary resolution (92% match)',
        'Applied automated fix attempt: Clear email cache',
        'Issue persisted after automated steps'
      ],
      suggestedNextStep: 'Escalate to Tier-2 Technical Support for advanced file recovery or email provider configuration review. May require manual intervention or third-party email service verification.',
      probableCause: 'Corrupted email authentication tokens or email provider security policy changes after QuickBooks update. Possible incompatibility with email provider API requirements.',
      aiSummary: 'Customer experiencing Error 6150 when attempting to send invoices via email in QuickBooks Desktop 2023 R15. All standard troubleshooting steps have been attempted including file verification, rebuild, cache clearing, and email re-authentication. Issue persists, indicating potential email provider compatibility problem or advanced file corruption requiring Tier-2 intervention.',
      aiInsights: [
        'Error pattern matches 12 prior escalations with similar symptoms after QBD updates',
        'Email provider API changes may have invalidated existing authentication tokens',
        'File rebuild completed successfully but issue persists, suggesting email-specific configuration problem',
        'Customer urgency (invoice payment deadline) requires expedited resolution'
      ],
      agentNotes: 'Customer is on deadline for invoice payments. High priority. Standard troubleshooting completed without resolution.',
      tags: ['Invoice Error', 'Error 6150', 'QBD 2023', 'Email', 'High Priority'],
      priorSimilarEscalations: 12,
      priority: 'high',
      rootCauseConfidence: 75,
      relatedDocs: [
        { id: '2847', title: 'Fix Error 6150: Invoice sending fails after QBD update', type: 'KB', confidence: 92, used: true },
        { id: '1123', title: 'Rebuild/Verify Company File SOP', type: 'SOP', confidence: 87, used: true },
        { id: '3847', title: 'Bank Feed Authentication Reset Guide', type: 'KB', confidence: 45, used: false }
      ],
      selectedTeam: null,
      attachments: [],
      escalationOwner: null,
      responseChannel: null,
      timeline: [
        { id: '1', timestamp: '2024-01-15 10:23 AM', actor: 'Customer', action: 'Reported issue via email' },
        { id: '2', timestamp: '2024-01-15 10:25 AM', actor: 'AI System', action: 'Auto-classified as Invoice Error' },
        { id: '3', timestamp: '2024-01-15 10:27 AM', actor: 'AI System', action: 'Applied KB-2847 resolution steps' },
        { id: '4', timestamp: '2024-01-15 10:35 AM', actor: 'Agent Sarah', action: 'Verified company file integrity' },
        { id: '5', timestamp: '2024-01-15 10:42 AM', actor: 'Agent Sarah', action: 'Ran rebuild utility' },
        { id: '6', timestamp: '2024-01-15 10:50 AM', actor: 'Agent Sarah', action: 'Cleared email cache and re-authenticated' },
        { id: '7', timestamp: '2024-01-15 11:05 AM', actor: 'Agent Sarah', action: 'Issue persists - Initiating escalation' }
      ],
      tier2Outcome: undefined,
      aiUsefulnessRating: undefined,
      escalatedAt: '2024-01-15 11:05 AM',
      timeSinceEscalation: '2 hours ago'
    },
    {
      id: 'ESC-2024-002',
      customerName: 'Emily Rodriguez',
      productVersion: 'QuickBooks Online',
      productLine: 'QBO',
      reportedIssue: 'Cannot access company file. Connection errors persist across multiple browsers and devices.',
      errorCodes: ['CONN_ERR_502', 'AUTH_FAILED'],
      stepsTaken: [
        'Cleared browser cache and cookies',
        'Tried incognito/private browsing mode',
        'Tested from different network connection',
        'Verified account status and subscription'
      ],
      aiActionLog: [
        'AI identified connection issue with 89% confidence',
        'Suggested KB-4521 for QBO connection troubleshooting',
        'Applied browser cache clearing steps',
        'Issue persists across all tested environments'
      ],
      suggestedNextStep: 'Escalate to Backend Support team to investigate server-side authentication or account lock issues. May require account reset or backend configuration review.',
      probableCause: 'Account authentication token corruption or server-side session management issue. Possible account lock due to security policy or billing status.',
      aiSummary: 'QuickBooks Online access failure affecting all browsers and devices. Customer unable to access company file despite standard troubleshooting. Issue appears to be account or server-side rather than client-side, requiring backend investigation.',
      aiInsights: [
        'Connection failures across multiple browsers and devices indicate server-side issue',
        'Account status verified as active, ruling out billing problems',
        'Authentication errors suggest token or session management problem',
        'Similar pattern seen in 8 prior escalations, typically resolved by backend account reset'
      ],
      agentNotes: 'Customer needs to process payroll today. Urgent. All client-side troubleshooting exhausted.',
      tags: ['Connection Error', 'QBO', 'Authentication', 'Urgent'],
      priorSimilarEscalations: 8,
      priority: 'high',
      rootCauseConfidence: 82,
      relatedDocs: [
        { id: '4521', title: 'QBO Connection Issues Troubleshooting', type: 'KB', confidence: 89, used: true }
      ],
      selectedTeam: 'backend-support',
      attachments: [],
      escalationOwner: 'Backend Team',
      responseChannel: 'email',
      timeline: [
        { id: '1', timestamp: '2024-01-15 10:13 AM', actor: 'Customer', action: 'Reported connection issue' },
        { id: '2', timestamp: '2024-01-15 10:15 AM', actor: 'AI System', action: 'Classified as connection error' },
        { id: '3', timestamp: '2024-01-15 10:20 AM', actor: 'Agent Mark', action: 'Cleared browser cache and tested incognito mode' },
        { id: '4', timestamp: '2024-01-15 10:30 AM', actor: 'Agent Mark', action: 'Tested from different network' },
        { id: '5', timestamp: '2024-01-15 10:45 AM', actor: 'Agent Mark', action: 'Verified account status - active' },
        { id: '6', timestamp: '2024-01-15 11:00 AM', actor: 'Agent Mark', action: 'Escalated to Backend Support' }
      ],
      tier2Outcome: undefined,
      aiUsefulnessRating: undefined,
      escalatedAt: '2024-01-15 11:00 AM',
      timeSinceEscalation: '3 hours ago'
    },
    {
      id: 'ESC-2024-003',
      customerName: 'Robert Chen',
      productVersion: 'QuickBooks Desktop 2024',
      productLine: 'QBD',
      reportedIssue: 'Inventory quantity discrepancies between Item List and reports. Multiple items showing incorrect counts.',
      errorCodes: [],
      stepsTaken: [
        'Ran Inventory Valuation Detail report',
        'Checked for unposted transactions',
        'Verified transaction dates',
        'Ran inventory reconciliation'
      ],
      aiActionLog: [
        'AI identified inventory discrepancy with 91% confidence',
        'Suggested KB-3892 for inventory resolution',
        'Applied reconciliation steps',
        'Discrepancies persist after reconciliation'
      ],
      suggestedNextStep: 'Escalate to Technical Specialist for advanced inventory data integrity review. May require manual inventory adjustments or data repair procedures.',
      probableCause: 'Data integrity issue causing inventory transaction posting errors. Possible corruption in inventory item records or transaction history.',
      aiSummary: 'Inventory quantity mismatches between Item List and reports affecting multiple items. Standard reconciliation process did not resolve discrepancies. Indicates potential data integrity issue requiring technical specialist review for advanced repair procedures.',
      aiInsights: [
        'Multiple items affected suggests systemic data integrity problem rather than isolated transaction error',
        'Reconciliation failure indicates deeper database corruption',
        'Customer requires accurate counts for month-end reporting - time sensitive',
        'Similar issues in 5 prior escalations required manual data repair'
      ],
      agentNotes: 'Month-end reporting deadline approaching. Need accurate inventory counts.',
      tags: ['Inventory', 'Data Integrity', 'QBD 2024', 'Reporting'],
      priorSimilarEscalations: 5,
      priority: 'medium',
      rootCauseConfidence: 68,
      relatedDocs: [
        { id: '3892', title: 'Inventory Discrepancy Resolution Guide', type: 'KB', confidence: 91, used: true },
        { id: '2234', title: 'Inventory Reconciliation SOP', type: 'SOP', confidence: 85, used: true }
      ],
      selectedTeam: 'technical-specialist',
      attachments: [],
      escalationOwner: null,
      responseChannel: null,
      timeline: [
        { id: '1', timestamp: '2024-01-15 10:00 AM', actor: 'Customer', action: 'Reported inventory discrepancy' },
        { id: '2', timestamp: '2024-01-15 10:02 AM', actor: 'AI System', action: 'Classified as inventory issue' },
        { id: '3', timestamp: '2024-01-15 10:10 AM', actor: 'Agent Lisa', action: 'Ran inventory reports and reconciliation' },
        { id: '4', timestamp: '2024-01-15 10:25 AM', actor: 'Agent Lisa', action: 'Verified transaction dates and unposted items' },
        { id: '5', timestamp: '2024-01-15 10:40 AM', actor: 'Agent Lisa', action: 'Reconciliation completed but discrepancies remain' },
        { id: '6', timestamp: '2024-01-15 10:55 AM', actor: 'Agent Lisa', action: 'Escalated to Technical Specialist' }
      ],
      tier2Outcome: undefined,
      aiUsefulnessRating: undefined,
      escalatedAt: '2024-01-15 10:55 AM',
      timeSinceEscalation: '4 hours ago'
    }
  ]);

  const handleUpdateEscalation = (updated: EscalationData) => {
    setEscalations(prev => prev.map(esc => esc.id === updated.id ? updated : esc));
    setSelectedEscalation(updated);
  };

  if (selectedEscalation) {
    return (
      <EscalationDetailView
        escalation={selectedEscalation}
        onBack={() => setSelectedEscalation(null)}
        onUpdate={handleUpdateEscalation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <AlertOctagon className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Escalation Center</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and route unresolved cases to specialized teams</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Total: <span className="font-bold text-gray-900">{escalations.length}</span> escalations
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {escalations.map((escalation) => (
            <EscalationCard
              key={escalation.id}
              escalation={escalation}
              onClick={() => setSelectedEscalation(escalation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
