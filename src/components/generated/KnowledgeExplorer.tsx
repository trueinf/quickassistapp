import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Network, X, RefreshCw, Info, ZoomIn, ZoomOut } from 'lucide-react';

type NodeType = 'Feature' | 'Issue' | 'Resolution' | 'Doc';

interface GraphNode {
  id: string;
  type: NodeType;
  label?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label: 'has_issue' | 'resolves_with' | 'documented_in';
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
    Feature: 'bg-blue-100 text-blue-800 border-blue-200',
    Issue: 'bg-red-100 text-red-800 border-red-200',
    Resolution: 'bg-green-100 text-green-800 border-green-200',
    Doc: 'bg-amber-100 text-amber-800 border-amber-200'
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{node.label || node.id}</h3>
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
                const linkLabels: Record<string, string> = {
                  'has_issue': 'Has Issue',
                  'resolves_with': 'Resolves With',
                  'documented_in': 'Documented In'
                };
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
                        {linkLabels[link.label] || link.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {connectedNode.label || connectedNode.id}
                    </p>
                    {connectedNode.description && (
                      <p className="text-xs text-gray-600 mt-1" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
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

// @component: KnowledgeExplorer
export const KnowledgeExplorer = () => {
  const [selectedNode, setSelectedNode] = React.useState<GraphNode | null>(null);
  const graphRef = React.useRef<any>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 1200, height: 600 });

  const graphData: GraphData = {
    nodes: [
      { id: 'Banking Centre', type: 'Feature', label: 'Banking Centre', description: 'QuickBooks banking and bank feed management feature' },
      { id: 'GST Centre', type: 'Feature', label: 'GST Centre', description: 'GST (Goods and Services Tax) management and reporting' },
      { id: 'Payroll', type: 'Feature', label: 'Payroll', description: 'Payroll processing and employee management' },
      { id: 'Quotes & Invoices', type: 'Feature', label: 'Quotes & Invoices', description: 'Invoice creation and quote management' },
      { id: 'Error 6150', type: 'Issue', label: 'Error 6150', description: 'Invoice sending failure error after QuickBooks Desktop update' },
      { id: 'Bank feed not syncing', type: 'Issue', label: 'Bank feed not syncing', description: 'Bank feed synchronization failure' },
      { id: 'Incorrect GST setup', type: 'Issue', label: 'Incorrect GST setup', description: 'GST configuration or calculation errors' },
      { id: 'Payroll not calculating', type: 'Issue', label: 'Payroll not calculating', description: 'Payroll calculation failures or incorrect amounts' },
      { id: 'Run Rebuild Tool', type: 'Resolution', label: 'Run Rebuild Tool', description: 'Use QuickBooks rebuild utility to fix data integrity issues' },
      { id: 'Reconnect Bank Feed', type: 'Resolution', label: 'Reconnect Bank Feed', description: 'Disconnect and reconnect bank feed connection' },
      { id: 'Edit GST Settings', type: 'Resolution', label: 'Edit GST Settings', description: 'Review and update GST configuration settings' },
      { id: 'Verify Payroll Mapping', type: 'Resolution', label: 'Verify Payroll Mapping', description: 'Check payroll item mappings and tax settings' },
      { id: 'User Manual p.25', type: 'Doc', label: 'User Manual p.25', description: 'Documentation for rebuild tool procedures' },
      { id: 'User Manual p.50–54', type: 'Doc', label: 'User Manual p.50–54', description: 'Bank feed setup and troubleshooting guide' },
      { id: 'User Manual p.23', type: 'Doc', label: 'User Manual p.23', description: 'GST setup and configuration instructions' },
      { id: 'User Manual p.87', type: 'Doc', label: 'User Manual p.87', description: 'Payroll mapping and verification procedures' }
    ],
    links: [
      { source: 'Banking Centre', target: 'Bank feed not syncing', label: 'has_issue' },
      { source: 'GST Centre', target: 'Incorrect GST setup', label: 'has_issue' },
      { source: 'Payroll', target: 'Payroll not calculating', label: 'has_issue' },
      { source: 'Quotes & Invoices', target: 'Error 6150', label: 'has_issue' },
      { source: 'Error 6150', target: 'Run Rebuild Tool', label: 'resolves_with' },
      { source: 'Bank feed not syncing', target: 'Reconnect Bank Feed', label: 'resolves_with' },
      { source: 'Incorrect GST setup', target: 'Edit GST Settings', label: 'resolves_with' },
      { source: 'Payroll not calculating', target: 'Verify Payroll Mapping', label: 'resolves_with' },
      { source: 'Run Rebuild Tool', target: 'User Manual p.25', label: 'documented_in' },
      { source: 'Reconnect Bank Feed', target: 'User Manual p.50–54', label: 'documented_in' },
      { source: 'Edit GST Settings', target: 'User Manual p.23', label: 'documented_in' },
      { source: 'Verify Payroll Mapping', target: 'User Manual p.87', label: 'documented_in' }
    ]
  };

  const getNodeColor = (type: NodeType): string => {
    switch (type) {
      case 'Feature': return '#1D4ED8';
      case 'Issue': return '#DC2626';
      case 'Resolution': return '#16A34A';
      case 'Doc': return '#D97706';
      default: return '#6B7280';
    }
  };

  const getLinkColor = (link: GraphLink): string => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const sourceNode = graphData.nodes.find(n => n.id === sourceId);
    if (sourceNode) {
      return getNodeColor(sourceNode.type);
    }
    return '#9CA3AF';
  };

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const panelWidth = selectedNode ? 448 : 0; // max-w-lg = 32rem = 512px, but accounting for padding
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
            <div className="p-3 bg-blue-100 rounded-xl">
              <Network className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Explorer</h1>
              <p className="text-sm text-gray-600 mt-1">Interactive visualization of QuickBooks knowledge relationships</p>
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
              <div className="w-4 h-4 rounded-full bg-blue-600" />
              <span className="text-gray-700">Feature</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600" />
              <span className="text-gray-700">Issue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600" />
              <span className="text-gray-700">Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-600" />
              <span className="text-gray-700">Documentation</span>
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
              // Increase node sizes to create more spacing
              switch (node.type) {
                case 'Feature': return 12;
                case 'Issue': return 10;
                case 'Resolution': return 8;
                case 'Doc': return 7;
                default: return 8;
              }
            }}
            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const graphNode = node as GraphNode;
              const label = graphNode.label || graphNode.id;
              const minFontSize = 8;
              const maxFontSize = 14;
              const fontSize = Math.max(minFontSize, Math.min(maxFontSize, 12 / Math.sqrt(globalScale)));
              ctx.font = `${fontSize}px Sans-Serif`;
              
              const isSelected = selectedNode && selectedNode.id === graphNode.id;
              const color = getNodeColor(graphNode.type);
              // Match node radius to nodeVal for consistency
              const nodeRadius = graphNode.type === 'Feature' ? 12 : graphNode.type === 'Issue' ? 10 : graphNode.type === 'Resolution' ? 8 : 7;
              
              // Draw outer ring for selected node
              if (isSelected) {
                ctx.strokeStyle = '#3B82F6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius + 4, 0, 2 * Math.PI, false);
                ctx.stroke();
              }
              
              // Draw node
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
              ctx.fill();
              
              // Calculate text width for better positioning
              ctx.font = isSelected ? `bold ${fontSize}px Sans-Serif` : `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              // Increase vertical spacing to prevent label overlap
              const labelSpacing = nodeRadius + fontSize + 8;
              const labelY = node.y + labelSpacing;
              
              // Draw text background for better readability and to prevent overlap
              const padding = 6;
              const textHeight = fontSize * 1.2;
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
              ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
              ctx.lineWidth = 1;
              // Draw rounded rectangle background
              const bgX = node.x - textWidth / 2 - padding;
              const bgY = labelY - textHeight / 2 - padding / 2;
              const bgWidth = textWidth + padding * 2;
              const bgHeight = textHeight + padding;
              const cornerRadius = 4;
              
              ctx.beginPath();
              ctx.moveTo(bgX + cornerRadius, bgY);
              ctx.lineTo(bgX + bgWidth - cornerRadius, bgY);
              ctx.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + cornerRadius);
              ctx.lineTo(bgX + bgWidth, bgY + bgHeight - cornerRadius);
              ctx.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - cornerRadius, bgY + bgHeight);
              ctx.lineTo(bgX + cornerRadius, bgY + bgHeight);
              ctx.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - cornerRadius);
              ctx.lineTo(bgX, bgY + cornerRadius);
              ctx.quadraticCurveTo(bgX, bgY, bgX + cornerRadius, bgY);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
              
              // Draw text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = isSelected ? '#1E40AF' : '#374151';
              ctx.fillText(label, node.x, labelY);
            }}
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={0.9}
            linkColor={(link: any) => getLinkColor(link as GraphLink)}
            linkWidth={2}
            linkLabel={(link: any) => (link as GraphLink).label}
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
      </div>
    </div>
  );
};

