import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Network, X, RefreshCw, Info, ZoomIn, ZoomOut } from 'lucide-react';

type NodeType = 'Product' | 'Feature' | 'Issue' | 'Resolution' | 'Doc' | 'Role' | 'DataObject' | 'Report';

interface GraphNode {
  id: string;
  type: NodeType;
  name?: string;
  label?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relation?: string;
  label?: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

type NodeDetailProps = {
  node: GraphNode | null;
  graphData: GraphData;
  onClose: () => void;
};

const NodeDetailPanel = ({ node, graphData, onClose }: NodeDetailProps) => {
  if (!node) return null;

  const getConnectedNodes = (nodeId: string) => {
    const connected: Array<{ node: GraphNode; link: GraphLink }> = [];
    graphData.links.forEach(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      
      if (sourceId === nodeId) {
        const targetNode = graphData.nodes.find(n => n.id === targetId);
        if (targetNode) connected.push({ node: targetNode, link });
      } else if (targetId === nodeId) {
        const sourceNode = graphData.nodes.find(n => n.id === sourceId);
        if (sourceNode) connected.push({ node: sourceNode, link });
      }
    });
    return connected;
  };

  const connectedNodes = getConnectedNodes(node.id);
  const typeColors = {
    Product: 'bg-purple-100 text-purple-800 border-purple-200',
    Feature: 'bg-blue-100 text-blue-800 border-blue-200',
    Issue: 'bg-red-100 text-red-800 border-red-200',
    Resolution: 'bg-green-100 text-green-800 border-green-200',
    Doc: 'bg-amber-100 text-amber-800 border-amber-200',
    Role: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DataObject: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Report: 'bg-pink-100 text-pink-800 border-pink-200'
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-200">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Node Details</h2>
            <p className="text-xs text-gray-500 mt-1">Click outside or close to return to graph</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${typeColors[node.type]}`}>
              {node.type}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{node.name || node.label || node.id}</h3>
          {node.description && (
            <p className="text-gray-700 leading-relaxed">{node.description}</p>
          )}
        </div>

        {connectedNodes.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Connected Nodes ({connectedNodes.length})
            </h4>
            <div className="space-y-2">
              {connectedNodes.map(({ node: connectedNode, link }, index) => {
                const linkLabel = link.relation || link.label || 'Connected';
                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                        typeColors[connectedNode.type]
                      }`}>
                        {connectedNode.type}
                      </span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {link.relation || link.label || 'Connected'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {connectedNode.name || connectedNode.label || connectedNode.id}
                    </p>
                    {connectedNode.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                        {connectedNode.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {node.metadata && Object.keys(node.metadata).length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(node.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// @component: KnowledgeGraph
export const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = React.useState<GraphNode | null>(null);
  const graphRef = React.useRef<any>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 1200, height: 600 });

  const graphData: GraphData = {
    nodes: [
      { id: 'QBO_Advanced', type: 'Product', name: 'QuickBooks Online Advanced', label: 'QuickBooks Online Advanced', description: 'Advanced version of QuickBooks Online with enhanced features for SMB users' },
      { id: 'Reclassify_Transactions', type: 'Feature', name: 'Reclassify Transactions', label: 'Reclassify Transactions', description: 'Ability to reclassify transactions for better accounting accuracy' },
      { id: 'Tasks', type: 'Feature', name: 'Tasks', label: 'Tasks', description: 'Task management and tracking feature' },
      { id: 'Workflows', type: 'Feature', name: 'Workflows', label: 'Workflows', description: 'Automated workflow creation and management' },
      { id: 'Employee_Expense_Claims', type: 'Feature', name: 'Employee Expense Claims', label: 'Employee Expense Claims', description: 'Employee expense claim submission and approval system' },
      { id: 'Performance_Centre', type: 'Feature', name: 'Performance Centre', label: 'Performance Centre', description: 'Business performance analytics and reporting center' },
      { id: 'Custom_Fields', type: 'Feature', name: 'Custom Fields', label: 'Custom Fields', description: 'Custom field creation and management' },
      { id: 'Custom_Reports', type: 'Feature', name: 'Custom Reports', label: 'Custom Reports', description: 'Custom report builder and generator' },
      { id: 'Revenue_Recognition', type: 'Feature', name: 'Revenue Recognition', label: 'Revenue Recognition', description: 'Advanced revenue recognition and accounting features' },
      { id: 'Backup_Restore', type: 'Feature', name: 'Backup & Restore', label: 'Backup & Restore', description: 'Data backup and restore functionality' },
      { id: 'Custom_Roles', type: 'Feature', name: 'Custom Roles', label: 'Custom Roles', description: 'Custom user role configuration and permissions' },
      { id: 'Admin_User', type: 'Role', name: 'Admin User', label: 'Admin User', description: 'Administrator user role with full access' },
      { id: 'Employee_User', type: 'Role', name: 'Employee User', label: 'Employee User', description: 'Employee user role with limited access' },
      { id: 'Invoice', type: 'DataObject', name: 'Invoice', label: 'Invoice', description: 'Invoice data object' },
      { id: 'Expense', type: 'DataObject', name: 'Expense', label: 'Expense', description: 'Expense data object' },
      { id: 'Task', type: 'DataObject', name: 'Task', label: 'Task', description: 'Task data object' },
      { id: 'Workflow_Template', type: 'DataObject', name: 'Workflow Template', label: 'Workflow Template', description: 'Workflow template data object' },
      { id: 'Custom_Report', type: 'Report', name: 'Custom Report', label: 'Custom Report', description: 'Custom report output' }
    ],
    links: [
      { source: 'QBO_Advanced', target: 'Reclassify_Transactions', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Tasks', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Workflows', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Employee_Expense_Claims', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Performance_Centre', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Custom_Fields', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Custom_Reports', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Revenue_Recognition', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Backup_Restore', relation: 'HAS_FEATURE' },
      { source: 'QBO_Advanced', target: 'Custom_Roles', relation: 'HAS_FEATURE' },
      { source: 'Workflows', target: 'Task', relation: 'CREATES' },
      { source: 'Tasks', target: 'Workflow_Template', relation: 'USES' },
      { source: 'Employee_Expense_Claims', target: 'Expense', relation: 'CREATES' },
      { source: 'Employee_User', target: 'Expense', relation: 'CREATES' },
      { source: 'Admin_User', target: 'Expense', relation: 'REVIEWS' },
      { source: 'Revenue_Recognition', target: 'Invoice', relation: 'USES' },
      { source: 'Custom_Reports', target: 'Custom_Report', relation: 'CREATES' },
      { source: 'Custom_Roles', target: 'Admin_User', relation: 'CONFIGURES' },
      { source: 'Custom_Roles', target: 'Employee_User', relation: 'CONFIGURES' }
    ]
  };

  const getNodeColor = (type: NodeType): string => {
    switch (type) {
      case 'Product': return '#9333EA';
      case 'Feature': return '#1D4ED8';
      case 'Issue': return '#DC2626';
      case 'Resolution': return '#16A34A';
      case 'Doc': return '#D97706';
      case 'Role': return '#4F46E5';
      case 'DataObject': return '#0891B2';
      case 'Report': return '#DB2777';
      default: return '#6B7280';
    }
  };

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const panelWidth = selectedNode ? 448 : 0;
        setDimensions({
          width: rect.width - 32 - panelWidth,
          height: Math.max(600, rect.height - 200)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [selectedNode]);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const handleResetView = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  };

  const handleZoomIn = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom * 1.2);
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom * 0.8);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedNode && (
        <NodeDetailPanel
          node={selectedNode}
          graphData={graphData}
          onClose={() => setSelectedNode(null)}
        />
      )}

      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Network className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Graph</h1>
              <p className="text-sm text-gray-600 mt-1">QuickBooks Online Advanced knowledge relationships</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset View
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Legend</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600" />
              <span className="text-gray-700">Product</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600" />
              <span className="text-gray-700">Feature</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-600" />
              <span className="text-gray-700">Role</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-cyan-600" />
              <span className="text-gray-700">Data Object</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-600" />
              <span className="text-gray-700">Report</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${selectedNode ? 'pr-4 sm:pr-6 lg:pr-[28rem]' : ''}`}>
        <div
          ref={containerRef}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeAutoColorBy="type"
            nodeVal={(node: GraphNode) => {
              switch (node.type) {
                case 'Product': return 16;
                case 'Feature': return 12;
                case 'Issue': return 10;
                case 'Resolution': return 8;
                case 'Doc': return 7;
                case 'Role': return 10;
                case 'DataObject': return 9;
                case 'Report': return 8;
                default: return 8;
              }
            }}
            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const graphNode = node as GraphNode;
              const label = graphNode.name || graphNode.label || graphNode.id;
              const minFontSize = 8;
              const maxFontSize = 14;
              const fontSize = Math.max(minFontSize, Math.min(maxFontSize, 12 / Math.sqrt(globalScale)));
              ctx.font = `${fontSize}px Sans-Serif`;
              
              const isSelected = selectedNode && selectedNode.id === graphNode.id;
              const color = getNodeColor(graphNode.type);
              const nodeRadius = graphNode.type === 'Product' ? 16 : graphNode.type === 'Feature' ? 12 : graphNode.type === 'Issue' ? 10 : graphNode.type === 'Resolution' ? 8 : graphNode.type === 'Role' ? 10 : graphNode.type === 'DataObject' ? 9 : graphNode.type === 'Report' ? 8 : 7;
              
              if (isSelected) {
                ctx.strokeStyle = '#3B82F6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius + 4, 0, 2 * Math.PI, false);
                ctx.stroke();
              }

              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
              ctx.fill();

              ctx.font = isSelected ? `bold ${fontSize}px Sans-Serif` : `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const labelY = node.y + nodeRadius + fontSize + 8;

              const padding = 4;
              const textHeight = fontSize;
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
              ctx.fillRect(
                node.x - textWidth / 2 - padding,
                labelY - textHeight / 2 - padding / 2,
                textWidth + padding * 2,
                textHeight + padding
              );

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = isSelected ? '#1E40AF' : '#374151';
              ctx.fillText(label, node.x, labelY);
            }}
            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={0.9}
            linkLabel={(link: any) => (link as GraphLink).relation || (link as GraphLink).label || ''}
            onNodeClick={(node: any) => handleNodeClick(node as GraphNode)}
            onBackgroundClick={() => setSelectedNode(null)}
            onNodeHover={(node: any) => {
              if (containerRef.current) {
                containerRef.current.style.cursor = node ? 'pointer' : 'default';
              }
            }}
            width={dimensions.width}
            height={dimensions.height}
            cooldownTicks={150}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            onEngineStop={() => {
              if (graphRef.current) {
                graphRef.current.zoomToFit(400);
              }
            }}
          />
        </div>

        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">QuickBooks Online Advanced User Manual</h3>
          <div className="w-full rounded-lg overflow-hidden border border-gray-300">
            <iframe
              src="https://digitalasset.intuit.com/render/content/dam/intuit/sbseg/en_au/quickbooks-online/web/content/QuickBooks_Advanced_SMB_User_Manual-Jan24.pdf"
              width="100%"
              height="800px"
              style={{ border: 'none' }}
              title="QuickBooks Online Advanced User Manual"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

