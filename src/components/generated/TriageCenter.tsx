import React from 'react';
import { Search, Filter, Clock, User, AlertCircle, CheckCircle2, XCircle, TrendingUp, ChevronDown, Tag, MessageSquare, Mail, Phone, MessageCircle, RefreshCw, X, FileText, Sparkles, ChevronRight, ExternalLink, ArrowLeft, Send, Edit2 } from 'lucide-react';
type Priority = 'high' | 'medium' | 'low';
type Status = 'new' | 'in-progress' | 'resolved' | 'escalated';
type SourceType = 'email' | 'chat' | 'call';
type Ticket = {
  id: string;
  sourceType: SourceType;
  customer: string;
  customerEmail?: string;
  subject?: string;
  content: string;
  priority: Priority;
  status: Status;
  category: string;
  timeAgo: string;
  receivedAt: string;
  aiSynopsis?: string;
  similarIssues?: Array<{
    id: string;
    title: string;
    type: 'KB' | 'SOP' | 'Community';
    confidence: number;
    resolvedCases: number;
  }>;
  nextBestAction?: {
    title: string;
    steps: string[];
    confidence: number;
    kbReference?: string;
  };
  emailDraft?: {
    subject: string;
    body: string;
    confidence: number;
  };
};
type TicketCardProps = {
  ticket: Ticket;
  onSelectTicket: (ticket: Ticket) => void;
};
const TicketCard = ({
  ticket,
  onSelectTicket
}: TicketCardProps) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  const sourceIcons = {
    email: <Mail className="w-4 h-4" />,
    chat: <MessageCircle className="w-4 h-4" />,
    call: <Phone className="w-4 h-4" />
  };
  const sourceColors = {
    email: 'text-blue-600 bg-blue-50',
    chat: 'text-green-600 bg-green-50',
    call: 'text-purple-600 bg-purple-50'
  };
  const preview = ticket.content.length > 150 ? ticket.content.substring(0, 150) + '...' : ticket.content;
  return <div onClick={() => onSelectTicket(ticket)} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${sourceColors[ticket.sourceType]}`}>
              {sourceIcons[ticket.sourceType]}
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase">{ticket.sourceType}</span>
            {ticket.subject && <span className="text-gray-400">•</span>}
            {ticket.subject && <span className="text-sm font-semibold text-gray-900">{ticket.subject}</span>}
          </div>
          <p className="text-sm text-gray-700 mb-2" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>{preview}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <User className="w-3.5 h-3.5" />
            <span>{ticket.customer}</span>
            {ticket.customerEmail && <span className="text-gray-400">•</span>}
            {ticket.customerEmail && <span>{ticket.customerEmail}</span>}
            <span className="text-gray-400">•</span>
            <span>{ticket.timeAgo}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-bold border ${priorityColors[ticket.priority]}`}>
          {ticket.priority.toUpperCase()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
          {ticket.category}
        </span>
        {ticket.aiSynopsis && <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Analyzed
          </span>}
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

type EmailDraftSectionProps = {
  ticket: Ticket;
};
const EmailDraftSection = ({
  ticket
}: EmailDraftSectionProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedSubject, setEditedSubject] = React.useState(ticket.emailDraft!.subject);
  const [editedBody, setEditedBody] = React.useState(ticket.emailDraft!.body);
  const [isSending, setIsSending] = React.useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      alert(`Email sent successfully to ${ticket.customerEmail}!\n\nSubject: ${editedSubject}`);
      setIsSending(false);
    }, 1000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSubject(ticket.emailDraft!.subject);
    setEditedBody(ticket.emailDraft!.body);
    setIsEditing(false);
  };

  return <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">AI-Generated Email Draft</h3>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {ticket.emailDraft!.confidence}% confidence
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? <button 
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button> : <div className="flex items-center gap-2">
            <button 
              onClick={handleSave}
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>}
          <button 
            onClick={handleSend}
            disabled={isSending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>
          <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
            <span className="text-sm text-gray-900">{ticket.customerEmail}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
          {isEditing ? <input 
            type="text"
            value={editedSubject}
            onChange={e => setEditedSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> : <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
            <span className="text-sm text-gray-900">{editedSubject}</span>
          </div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Body:</label>
          {isEditing ? <textarea 
            value={editedBody}
            onChange={e => setEditedBody(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm"
          /> : <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{editedBody}</pre>
          </div>}
        </div>
      </div>
    </div>;
};

type DetailedViewProps = {
  ticket: Ticket;
  onClose: () => void;
};
const DetailedView = ({
  ticket,
  onClose
}: DetailedViewProps) => {
  const sourceIcons = {
    email: <Mail className="w-5 h-5" />,
    chat: <MessageCircle className="w-5 h-5" />,
    call: <Phone className="w-5 h-5" />
  };
  const sourceColors = {
    email: 'text-blue-600 bg-blue-50',
    chat: 'text-green-600 bg-green-50',
    call: 'text-purple-600 bg-purple-50'
  };
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Triage
              </button>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${sourceColors[ticket.sourceType]}`}>
                  {sourceIcons[ticket.sourceType]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {ticket.subject || `${ticket.sourceType.charAt(0).toUpperCase() + ticket.sourceType.slice(1)} from ${ticket.customer}`}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <span>{ticket.customer}</span>
                    {ticket.customerEmail && <span>•</span>}
                    {ticket.customerEmail && <span>{ticket.customerEmail}</span>}
                    <span>•</span>
                    <span>{ticket.receivedAt}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[ticket.priority]}`}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Original Content</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{ticket.content}</pre>
          </div>
        </div>

        {ticket.aiSynopsis && <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">AI Issue Synopsis</h3>
            </div>
            <p className="text-gray-800 leading-relaxed">{ticket.aiSynopsis}</p>
          </div>}

        {ticket.sourceType === 'email' && ticket.emailDraft && <EmailDraftSection ticket={ticket} />}

        {ticket.similarIssues && ticket.similarIssues.length > 0 && <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-900">Similar Issues</h3>
            </div>
            <div className="space-y-3">
              {ticket.similarIssues.map((issue, index) => <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          issue.type === 'KB' ? 'bg-blue-100 text-blue-800' :
                          issue.type === 'SOP' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.type} #{issue.id}
                        </span>
                        <span className="text-xs font-bold text-gray-600">{issue.confidence}% match</span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{issue.title}</h4>
                      <p className="text-xs text-gray-600">{issue.resolvedCases} resolved cases</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 p-1">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>)}
            </div>
          </div>}

        {ticket.nextBestAction && <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Next Best Action</h3>
              <span className="ml-auto text-sm font-bold text-green-600">{ticket.nextBestAction.confidence}% confidence</span>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">{ticket.nextBestAction.title}</h4>
              <ol className="space-y-2">
                {ticket.nextBestAction.steps.map((step, index) => <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>)}
              </ol>
              {ticket.nextBestAction.kbReference && <div className="mt-4 pt-4 border-t border-green-200">
                  <span className="text-xs text-gray-600">Reference: </span>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                    {ticket.nextBestAction.kbReference}
                    <ExternalLink className="w-3 h-3 inline ml-1" />
                  </button>
                </div>}
            </div>
          </div>}
      </div>
    </div>;
};

// @component: TriageCenter
export const TriageCenter = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSource, setSelectedSource] = React.useState<'all' | SourceType>('all');
  const [selectedFilter, setSelectedFilter] = React.useState<'all' | Status>('all');
  const [selectedPriority, setSelectedPriority] = React.useState<'all' | Priority>('all');
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [tickets, setTickets] = React.useState<Ticket[]>([
    // Email 1
    {
      id: '1',
      sourceType: 'email',
      customer: 'John Smith',
      customerEmail: 'john.smith@example.com',
      subject: 'Error 6150: Invoice failed to send',
      content: `Hi Support Team,

I'm experiencing an issue with QuickBooks Desktop 2023. Every time I try to send an invoice to my customer, I get Error 6150. This started happening after I updated to version R15 last week.

The error message says: "Unable to send invoice. Please try again later."

I've tried:
- Restarting QuickBooks
- Checking my internet connection
- Verifying the customer email address

Nothing seems to work. This is urgent as I need to send invoices to get paid.

Can you please help?

Thanks,
John Smith`,
      priority: 'high',
      status: 'new',
      category: 'Invoice Error',
      timeAgo: '5 min ago',
      receivedAt: '2024-01-15 10:23 AM',
      aiSynopsis: 'Customer experiencing Error 6150 when attempting to send invoices via email in QuickBooks Desktop 2023 R15. Issue began after software update. Standard troubleshooting steps (restart, network check, email verification) have been attempted without resolution. High priority due to payment dependency.',
      similarIssues: [{
        id: '2847',
        title: 'Fix Error 6150: Invoice sending fails after QBD update',
        type: 'KB',
        confidence: 94,
        resolvedCases: 287
      }, {
        id: '1123',
        title: 'Rebuild/Verify Company File SOP',
        type: 'SOP',
        confidence: 87,
        resolvedCases: 234
      }],
      nextBestAction: {
        title: 'Apply Error 6150 Fix from Knowledge Base',
        steps: [
          'Verify company file integrity using File > Utilities > Verify Data',
          'If errors found, run File > Utilities > Rebuild Data',
          'Clear email cache: Edit > Preferences > Send Forms > Clear cache',
          'Re-authenticate email account in Send Forms preferences',
          'Test invoice sending with a test email address'
        ],
        confidence: 92,
        kbReference: 'KB-2847'
      },
      emailDraft: {
        subject: 'Re: Error 6150: Invoice failed to send',
        body: `Hi John,

Thank you for contacting QuickBooks Support. I understand how frustrating it is when you can't send invoices to your customers, especially when it affects your cash flow.

Based on the error you're experiencing (Error 6150) after updating to QuickBooks Desktop 2023 R15, this is a known issue that we can resolve. Here's a step-by-step solution:

1. First, let's verify your company file integrity:
   - Go to File > Utilities > Verify Data
   - If any errors are found, proceed to step 2

2. Rebuild your company file:
   - Go to File > Utilities > Rebuild Data
   - This may take a few minutes depending on your file size

3. Clear your email cache:
   - Go to Edit > Preferences > Send Forms
   - Click on "Clear cache" button

4. Re-authenticate your email account:
   - Still in Send Forms preferences, verify your email account settings
   - Re-enter your email credentials if needed

5. Test the fix:
   - Try sending a test invoice to your own email address first
   - If successful, proceed with sending to your customer

This solution has resolved this issue for 94% of customers with the same problem. If you continue to experience issues after following these steps, please let me know and I'll escalate this to our technical team.

I've also attached a reference guide (KB-2847) that provides additional troubleshooting steps if needed.

Best regards,
[Your Name]
QuickBooks Support Team`,
        confidence: 94
      }
    },
    // Email 2
    {
      id: '2',
      sourceType: 'email',
      customer: 'Emily Rodriguez',
      customerEmail: 'emily.rodriguez@example.com',
      subject: 'QuickBooks Online - Cannot access company file',
      content: `Hello,

I've been trying to access my QuickBooks Online company file for the past hour, but I keep getting an error message that says "Unable to connect to company file. Please try again later."

I've tried:
- Refreshing the page multiple times
- Clearing my browser cache
- Using a different browser (Chrome, Firefox, Edge)
- Checking my internet connection (it's working fine)

I'm on a deadline and need to process payroll today. This is very urgent.

Please help as soon as possible.

Best regards,
Emily Rodriguez`,
      priority: 'high',
      status: 'new',
      category: 'Connection',
      timeAgo: '15 min ago',
      receivedAt: '2024-01-15 10:13 AM',
      aiSynopsis: 'QuickBooks Online connection failure preventing access to company file. Customer has attempted standard browser troubleshooting (refresh, cache clear, different browsers) without success. Internet connection verified. Urgent due to payroll processing deadline. Likely server-side issue or authentication problem.',
      similarIssues: [{
        id: '4521',
        title: 'QBO Connection Issues Troubleshooting',
        type: 'KB',
        confidence: 89,
        resolvedCases: 198
      }],
      nextBestAction: {
        title: 'Troubleshoot QBO Connection',
        steps: [
          'Verify QuickBooks Online service status',
          'Have customer clear browser cookies and cache completely',
          'Try incognito/private browsing mode',
          'Check if customer can access from different network/device',
          'Verify account status and subscription is active',
          'If persists, reset browser permissions for QuickBooks Online'
        ],
        confidence: 87,
        kbReference: 'KB-4521'
      },
      emailDraft: {
        subject: 'Re: QuickBooks Online - Cannot access company file',
        body: `Hi Emily,

I understand how urgent this is, especially with your payroll deadline today. Let's get you back into your QuickBooks Online company file right away.

I've checked our system status, and QuickBooks Online is currently operational. Since you've already tried refreshing and clearing your browser cache, let's try a few additional steps:

1. **Complete browser cache and cookie clearing:**
   - In your browser settings, clear all cookies and cached data for quickbooks.com
   - Close all browser tabs and restart your browser completely

2. **Try incognito/private browsing mode:**
   - Open a new incognito/private window
   - Navigate to qbo.intuit.com and try logging in
   - This helps rule out browser extension conflicts

3. **Verify from a different device/network:**
   - Try accessing from your phone or another computer
   - If possible, try a different internet connection
   - This helps determine if it's a network-specific issue

4. **Check your account status:**
   - Verify your subscription is active and in good standing
   - Ensure your account hasn't been locked for security reasons

If none of these steps work, please let me know immediately and I'll escalate this to our technical team with priority. We can also set up a screen sharing session to troubleshoot in real-time.

I know how critical payroll processing is, so I'll stay on this until we get you back in.

Best regards,
[Your Name]
QuickBooks Support Team`,
        confidence: 91
      }
    },
    // Email 3
    {
      id: '3',
      sourceType: 'email',
      customer: 'Robert Chen',
      customerEmail: 'robert.chen@example.com',
      subject: 'Inventory quantity mismatch in reports',
      content: `Support Team,

I'm seeing a major discrepancy in my inventory reports. The quantity on hand shown in my Inventory Valuation Summary doesn't match what's in my Item List.

For example, Item #12345 shows:
- Item List: 150 units
- Inventory Valuation Summary: 87 units

This is happening with multiple items. I've run the inventory reconciliation, but it didn't fix the issue.

I need accurate inventory counts for my month-end reporting. Can someone help me resolve this?

Thanks,
Robert Chen`,
      priority: 'medium',
      status: 'new',
      category: 'Inventory',
      timeAgo: '28 min ago',
      receivedAt: '2024-01-15 10:00 AM',
      aiSynopsis: 'Inventory quantity discrepancy between Item List and Inventory Valuation Summary. Multiple items affected. Standard reconciliation process did not resolve. Customer requires accurate counts for month-end reporting. May indicate data integrity issue or transaction posting problem.',
      similarIssues: [{
        id: '3892',
        title: 'Inventory Discrepancy Resolution Guide',
        type: 'KB',
        confidence: 91,
        resolvedCases: 156
      }, {
        id: '2234',
        title: 'Inventory Reconciliation SOP',
        type: 'SOP',
        confidence: 85,
        resolvedCases: 142
      }],
      nextBestAction: {
        title: 'Resolve Inventory Discrepancy',
        steps: [
          'Run Inventory Valuation Detail report to identify specific discrepancies',
          'Check for unposted transactions or pending adjustments',
          'Verify all inventory transactions are properly dated',
          'Run Inventory Adjustment report to identify any manual changes',
          'If discrepancy persists, create inventory adjustment to correct quantities',
          'Re-run reports to verify accuracy'
        ],
        confidence: 88,
        kbReference: 'KB-3892'
      },
      emailDraft: {
        subject: 'Re: Inventory quantity mismatch in reports',
        body: `Hi Robert,

Thank you for reaching out about the inventory quantity discrepancies. I understand how important accurate inventory counts are for your month-end reporting.

This type of discrepancy typically occurs when there are unposted transactions, date mismatches, or data integrity issues. Let's resolve this step by step:

1. **Identify the specific discrepancies:**
   - Run Reports > Inventory > Inventory Valuation Detail
   - Compare the quantities shown for each item (like Item #12345)
   - Note which items have discrepancies

2. **Check for unposted transactions:**
   - Go to Lists > Inventory Activities > Inventory Adjustments
   - Look for any pending or unposted adjustments
   - Post any that are pending

3. **Verify transaction dates:**
   - Ensure all inventory transactions are dated within the correct reporting period
   - Check for any transactions dated in the future or incorrectly dated

4. **Review inventory adjustments:**
   - Run Reports > Inventory > Inventory Adjustment Detail
   - Review any manual adjustments that may have caused the discrepancy

5. **Create correcting adjustments if needed:**
   - If discrepancies persist after the above steps, create inventory adjustments to correct the quantities
   - Document the reason for each adjustment

6. **Verify the fix:**
   - Re-run your Inventory Valuation Summary report
   - Compare with the Item List to ensure quantities now match

I've attached our Inventory Discrepancy Resolution Guide (KB-3892) which provides additional detailed steps. If you continue to see discrepancies after following these steps, please let me know and I can help you investigate further.

Best regards,
[Your Name]
QuickBooks Support Team`,
        confidence: 89
      }
    },
    // Chat 1
    {
      id: '4',
      sourceType: 'chat',
      customer: 'Sarah Johnson',
      customerEmail: 'sarah.j@example.com',
      content: `Agent: Hello! How can I help you today?

Customer: Hi, my bank feed stopped syncing with my Chase account. It was working fine yesterday but today it shows "Connection Error" and won't update.

Agent: I understand that's frustrating. Let me help you troubleshoot this. Can you tell me when you last saw it working?

Customer: Yesterday around 3 PM. I tried disconnecting and reconnecting but it didn't help.

Agent: Have you checked if there are any pending authentication requests in your Chase account?

Customer: Yes, I checked and there's nothing there. The connection just seems broken.`,
      priority: 'high',
      status: 'in-progress',
      category: 'Bank Sync',
      timeAgo: '12 min ago',
      receivedAt: '2024-01-15 10:11 AM',
      aiSynopsis: 'Bank feed synchronization failure with Chase account. Connection was functional until yesterday afternoon. Customer has attempted basic reconnection without success. No pending authentication requests visible in bank account. Likely requires re-authentication or connection reset.',
      similarIssues: [{
        id: '3847',
        title: 'Bank Feed Authentication Reset Guide',
        type: 'KB',
        confidence: 91,
        resolvedCases: 312
      }],
      nextBestAction: {
        title: 'Reset Bank Feed Connection',
        steps: [
          'Navigate to Banking > Bank Feeds > Bank Feeds Center',
          'Select the Chase account and click Edit',
          'Choose "Disconnect" to fully remove the connection',
          'Wait 2-3 minutes, then reconnect using "Set Up Bank Feed"',
          'Complete the authentication flow with Chase',
          'Verify sync status after 5-10 minutes'
        ],
        confidence: 89,
        kbReference: 'KB-3847'
      }
    },
    // Chat 2
    {
      id: '5',
      sourceType: 'chat',
      customer: 'Lisa Martinez',
      customerEmail: 'lisa.martinez@example.com',
      content: `Agent: Good morning! What can I help you with?

Customer: Hi, I'm trying to print checks from QuickBooks Desktop, but nothing happens when I click Print. The printer is working fine for other documents.

Agent: Let me help you with that. Are you using the Print Checks window or trying to print from a different screen?

Customer: I'm using the Print Checks window. I select the checks, click Print, but nothing happens. No error message, just nothing.

Agent: Have you verified your printer settings in QuickBooks? Sometimes the check printer settings need to be configured separately.

Customer: I think so, but I'm not sure where to check that. Can you guide me?

Agent: Absolutely. Let's check your printer setup. Go to Edit > Preferences > Print Checks. What do you see there?

Customer: It says "Default Printer" but I'm not sure if that's the right one.`,
      priority: 'medium',
      status: 'in-progress',
      category: 'Printing',
      timeAgo: '35 min ago',
      receivedAt: '2024-01-15 09:45 AM',
      aiSynopsis: 'Check printing failure in QuickBooks Desktop. Print command executes without error but no output. Printer functions correctly for other applications. Customer uncertain about printer configuration in QuickBooks. Likely printer driver or QuickBooks-specific printer settings issue.',
      similarIssues: [{
        id: '3124',
        title: 'Troubleshooting Check Printing Issues',
        type: 'KB',
        confidence: 86,
        resolvedCases: 203
      }],
      nextBestAction: {
        title: 'Fix Check Printing Configuration',
        steps: [
          'Verify printer is set as default in Windows/Mac system settings',
          'In QuickBooks: Edit > Preferences > Print Checks > Select correct printer',
          'Verify check stock settings match physical check format',
          'Test print using File > Print Forms > Checks > Test Print',
          'If test fails, reinstall printer driver',
          'Verify printer is online and has paper/ink'
        ],
        confidence: 84,
        kbReference: 'KB-3124'
      }
    },
    // Chat 3
    {
      id: '6',
      sourceType: 'chat',
      customer: 'David Kim',
      customerEmail: 'david.kim@example.com',
      content: `Agent: Hello, how can I assist you?

Customer: I need help with sales tax. I just added a new product to my inventory, but QuickBooks isn't calculating sales tax for it.

Agent: I can help with that. Is this product taxable?

Customer: Yes, it should be taxable. All my other products have sales tax applied automatically, but this new one doesn't.

Agent: Let me check your item setup. Can you tell me what type of item you created?

Customer: I created it as an Inventory Item. I set it up the same way as my other inventory items.

Agent: When you look at the item, do you see a Tax Code field? What does it say?

Customer: It says "Non" which I think means non-taxable. But I want it to be taxable. How do I change that?`,
      priority: 'low',
      status: 'new',
      category: 'Sales Tax',
      timeAgo: '42 min ago',
      receivedAt: '2024-01-15 09:38 AM',
      aiSynopsis: 'New inventory item not calculating sales tax. Item created with non-taxable tax code despite customer requirement for taxable status. Customer needs guidance on updating tax code setting. Straightforward configuration issue.',
      similarIssues: [{
        id: '2789',
        title: 'Setting Up Sales Tax for Items',
        type: 'KB',
        confidence: 93,
        resolvedCases: 445
      }],
      nextBestAction: {
        title: 'Update Item Tax Code',
        steps: [
          'Open Lists > Item List',
          'Double-click the new inventory item',
          'Locate the Tax Code field',
          'Change from "Non" to appropriate taxable code (e.g., "Tax")',
          'Click OK to save changes',
          'Test by creating a sales transaction with the item'
        ],
        confidence: 95,
        kbReference: 'KB-2789'
      }
    },
    // Call Transcript 1
    {
      id: '7',
      sourceType: 'call',
      customer: 'Mike Davis',
      customerEmail: 'mike.davis@example.com',
      content: `[Call Transcript - Duration: 8m 32s]

Agent: Thank you for calling QuickBooks Support. My name is Agent Sarah. How can I assist you today?

Customer: Hi Sarah. I'm having an issue with my payroll tax calculations. The amounts showing in QuickBooks don't match what I'm seeing on the IRS website for this quarter.

Agent: I can help with that. Can you tell me which tax period you're looking at?

Customer: Q4 2023. The federal withholding is showing $2,450 in QuickBooks, but according to the IRS tables, it should be $2,380. That's a $70 difference.

Agent: That's a significant discrepancy. Have you updated your tax tables recently?

Customer: I think so, but I'm not sure. How do I check that?

Agent: Let me guide you through updating the tax tables. This usually resolves calculation mismatches.

[Customer follows steps to update tax tables]

Customer: Okay, I've updated them. But the numbers still don't match.

Agent: In that case, we may need to verify the employee setup and tax settings. Let me escalate this to our payroll specialist who can review your specific configuration.`,
      priority: 'medium',
      status: 'new',
      category: 'Payroll',
      timeAgo: '18 min ago',
      receivedAt: '2024-01-15 09:57 AM',
      aiSynopsis: 'Payroll tax calculation discrepancy between QuickBooks and IRS tables for Q4 2023. Federal withholding shows $70 difference ($2,450 vs $2,380 expected). Tax tables have been updated but discrepancy persists. Requires verification of employee tax settings and configuration review.',
      similarIssues: [{
        id: '2941',
        title: 'Payroll Tax Table Update SOP',
        type: 'SOP',
        confidence: 88,
        resolvedCases: 189
      }],
      nextBestAction: {
        title: 'Verify Payroll Tax Configuration',
        steps: [
          'Verify tax tables are current: Employees > Payroll Tax > Update Tax Tables',
          'Check employee tax setup: Review each employee\'s tax information',
          'Verify payroll item setup matches current tax rates',
          'Run Payroll Tax Liability report and compare with IRS tables',
          'If discrepancy persists, escalate to Payroll Specialist for configuration review'
        ],
        confidence: 85,
        kbReference: 'SOP-2941'
      }
    },
    // Call Transcript 2
    {
      id: '8',
      sourceType: 'call',
      customer: 'Jennifer White',
      customerEmail: 'jennifer.white@example.com',
      content: `[Call Transcript - Duration: 12m 15s]

Agent: QuickBooks Support, this is Agent Mark. How can I help you?

Customer: Hi Mark. I'm having trouble with my customer payments. When I receive a payment, it's not applying to the correct invoice. It's applying to older invoices instead of the one the customer specified.

Agent: I understand the frustration. Let me help you troubleshoot this. When you receive the payment, are you manually selecting which invoice to apply it to?

Customer: Yes, I am. I select the invoice number, but when I save it, it changes to a different invoice. It's very confusing.

Agent: That's unusual. Let me check a few things. Are you using QuickBooks Desktop or Online?

Customer: Desktop, version 2023.

Agent: And when you're in the Receive Payments window, are you seeing all the invoices listed?

Customer: Yes, I see them all. I click on the one I want, but then it doesn't stay selected.

Agent: This might be a data file issue. Let me have you verify your company file first, then we can look at the payment application settings.`,
      priority: 'medium',
      status: 'in-progress',
      category: 'Payments',
      timeAgo: '1 hour ago',
      receivedAt: '2024-01-15 09:15 AM',
      aiSynopsis: 'Payment application issue where selected invoice changes after saving. Customer manually selects correct invoice but system applies payment to different (older) invoice. Occurs in QuickBooks Desktop 2023. May indicate data integrity issue or payment application preference problem.',
      similarIssues: [{
        id: '3456',
        title: 'Payment Application Issues - Troubleshooting',
        type: 'KB',
        confidence: 82,
        resolvedCases: 167
      }, {
        id: '1123',
        title: 'Rebuild/Verify Company File SOP',
        type: 'SOP',
        confidence: 79,
        resolvedCases: 234
      }],
      nextBestAction: {
        title: 'Fix Payment Application',
        steps: [
          'Run File > Utilities > Verify Data to check for data integrity issues',
          'If errors found, run File > Utilities > Rebuild Data',
          'Check Preferences > Payments > Verify payment application settings',
          'Review customer payment history to identify pattern',
          'Manually correct misapplied payments if needed',
          'Test payment application with new transaction'
        ],
        confidence: 80,
        kbReference: 'KB-3456'
      }
    },
    // Call Transcript 3
    {
      id: '9',
      sourceType: 'call',
      customer: 'Thomas Anderson',
      customerEmail: 'thomas.anderson@example.com',
      content: `[Call Transcript - Duration: 6m 48s]

Agent: QuickBooks Support, Agent Jessica speaking. What can I help you with?

Customer: Hi Jessica. I'm trying to generate my P&L report for last month, but the numbers look completely wrong. The expenses are way too high.

Agent: I can help you investigate that. Can you tell me what period you're running the report for?

Customer: December 2023. I know my expenses weren't that high because I just reviewed all my transactions.

Agent: Let me help you check a few things. Are you running the report as Accrual or Cash basis?

Customer: Accrual basis, which is what I always use.

Agent: And when you look at the individual expense transactions, do they look correct?

Customer: Yes, when I look at them one by one, they're fine. But the report totals are wrong. It's like some expenses are being counted twice or something.

Agent: This could be a report date issue or duplicate transactions. Let me have you check for duplicate transactions first, then we'll verify the report date range.`,
      priority: 'low',
      status: 'new',
      category: 'Reports',
      timeAgo: '1 hour 15 min ago',
      receivedAt: '2024-01-15 09:00 AM',
      aiSynopsis: 'P&L report showing incorrect expense totals for December 2023. Individual transactions appear correct when reviewed separately, but report totals are inflated. Customer suspects double-counting. Accrual basis reporting. May indicate duplicate transactions, date range issue, or report configuration problem.',
      similarIssues: [{
        id: '4123',
        title: 'Troubleshooting Incorrect Report Totals',
        type: 'KB',
        confidence: 84,
        resolvedCases: 178
      }],
      nextBestAction: {
        title: 'Fix P&L Report Discrepancy',
        steps: [
          'Verify report date range: Reports > Company & Financial > Profit & Loss',
          'Check for duplicate transactions: Reports > Accountant & Taxes > Transaction Detail by Account',
          'Review expense accounts for duplicate entries in December',
          'Verify transaction dates are within report period',
          'Check if any transactions are posted to wrong accounts',
          'Regenerate report after corrections'
        ],
        confidence: 82,
        kbReference: 'KB-4123'
      }
    }
  ]);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newTicket: Ticket = {
        id: String(tickets.length + 1),
        sourceType: 'email',
        customer: 'New Customer',
        customerEmail: 'newcustomer@example.com',
        subject: 'New Support Request',
        content: `This is a newly fetched email from the support inbox. The AI will analyze this content and provide insights.`,
        priority: 'medium',
        status: 'new',
        category: 'General',
        timeAgo: 'Just now',
        receivedAt: new Date().toLocaleString(),
        aiSynopsis: 'AI analysis will be generated automatically when this ticket is opened.',
        similarIssues: [],
        nextBestAction: {
          title: 'Review and classify',
          steps: ['Review the content', 'Classify the issue', 'Assign priority'],
          confidence: 0
        }
      };
      setTickets(prev => [newTicket, ...prev]);
      setIsRefreshing(false);
    }, 1500);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ticket.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (ticket.subject && ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSource = selectedSource === 'all' || ticket.sourceType === selectedSource;
    const matchesStatus = selectedFilter === 'all' || ticket.status === selectedFilter;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    return matchesSearch && matchesSource && matchesStatus && matchesPriority;
  });
  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'new').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    highPriority: tickets.filter(t => t.priority === 'high').length
  };

  // @return
  if (selectedTicket) {
    return <DetailedView ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />;
  }

  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Triage Center</h1>
            <p className="text-sm text-gray-600 mt-1">Classify and route support requests from emails, chats, and calls with AI assistance</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 font-medium mb-1">Total Tickets</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-blue-900 font-medium mb-1">New</p>
            <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-xs text-orange-900 font-medium mb-1">In Progress</p>
            <p className="text-2xl font-bold text-orange-700">{stats.inProgress}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-xs text-red-900 font-medium mb-1">High Priority</p>
            <p className="text-2xl font-bold text-red-700">{stats.highPriority}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search content, customers, or categories..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>

        {/* Source Type Filter */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          <span className="text-sm font-medium text-gray-700 py-2">Source:</span>
          <FilterButton active={selectedSource === 'all'} onClick={() => setSelectedSource('all')}>
            All Sources
          </FilterButton>
          <FilterButton active={selectedSource === 'email'} onClick={() => setSelectedSource('email')}>
            <Mail className="w-4 h-4 inline mr-1" />
            Email
          </FilterButton>
          <FilterButton active={selectedSource === 'chat'} onClick={() => setSelectedSource('chat')}>
            <MessageCircle className="w-4 h-4 inline mr-1" />
            Chat
          </FilterButton>
          <FilterButton active={selectedSource === 'call'} onClick={() => setSelectedSource('call')}>
            <Phone className="w-4 h-4 inline mr-1" />
            Call Transcript
          </FilterButton>
        </div>

        {/* Status and Priority Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex gap-2 overflow-x-auto">
            <span className="text-sm font-medium text-gray-700 py-2">Status:</span>
            <FilterButton active={selectedFilter === 'all'} onClick={() => setSelectedFilter('all')}>
              All
            </FilterButton>
            <FilterButton active={selectedFilter === 'new'} onClick={() => setSelectedFilter('new')}>
              New
            </FilterButton>
            <FilterButton active={selectedFilter === 'in-progress'} onClick={() => setSelectedFilter('in-progress')}>
              In Progress
            </FilterButton>
            <FilterButton active={selectedFilter === 'escalated'} onClick={() => setSelectedFilter('escalated')}>
              Escalated
            </FilterButton>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <span className="text-sm font-medium text-gray-700 py-2">Priority:</span>
            <FilterButton active={selectedPriority === 'all'} onClick={() => setSelectedPriority('all')}>
              All
            </FilterButton>
            <FilterButton active={selectedPriority === 'high'} onClick={() => setSelectedPriority('high')}>
              High
            </FilterButton>
            <FilterButton active={selectedPriority === 'medium'} onClick={() => setSelectedPriority('medium')}>
              Medium
            </FilterButton>
            <FilterButton active={selectedPriority === 'low'} onClick={() => setSelectedPriority('low')}>
              Low
            </FilterButton>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {filteredTickets.length === 0 ? <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search or filter criteria, or click Refresh to pull in new emails</p>
          </div> : <div className="space-y-4 max-w-5xl mx-auto">
            {filteredTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} onSelectTicket={setSelectedTicket} />)}
          </div>}
      </div>

      {/* Bottom Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4 shadow-lg z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredTickets.length}</span> of {stats.total} requests
            </span>
            <span className="text-xs text-gray-500">
              {stats.new} new • {stats.highPriority} high priority
            </span>
          </div>
        </div>
      </div>
    </div>;
};