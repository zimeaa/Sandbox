import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/Service/postService';
import { setMessage } from '../redux/Slicers/postSlice';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import TitleCard from '../Components/Cards/TitleCard';

const initialNodes = [
  { id: 'validate-input', data: { label: 'Validate Input' }, position: { x: 100, y: 0 }, style: { background: '#eee' } },
  { id: 'process-data', data: { label: 'Process Data' }, position: { x: 100, y: 150 }, style: { background: '#eee' } },
  { id: 'store-results', data: { label: 'Store Results' }, position: { x: 100, y: 300 }, style: { background: '#eee' } },
];

const initialEdges = [
  { id: 'e1', source: 'validate-input', target: 'process-data', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2', source: 'process-data', target: 'store-results', markerEnd: { type: MarkerType.ArrowClosed } },
];

const Dev = () => {
  const dispatch = useDispatch();
  const { loading, data, error, message } = useSelector((state) => state.posts);
  const [showText, setShowText] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [setSseUpdates] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, onEdgesChange] = useEdgesState(initialEdges);

  const handleClick = async () => {
    console.log('Button clicked! Dispatching action...');
    setShowText(true);
    await dispatch(fetchPosts());
    console.log('Data received:', data);
    console.log('Message received:', message);
  };

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3004/stream');

    eventSource.onmessage = (event) => {
      const sseData = JSON.parse(event.data);
      console.log('SSE Update:', sseData);

      // Add the SSE update to the state
      setSseUpdates((prevUpdates) => [...prevUpdates, sseData]);

      // Update node styles based on SSE data
      if (sseData.step) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === sseData.step
              ? {
                  ...node,
                  style: {
                    ...node.style,
                    background: sseData.status === 'started' ? '#ffcc00' : '#90ee90', // Yellow for started, green for completed
                  },
                }
              : node
          )
        );
      }

      // Handle the "done" type specifically
      if (sseData.type === 'done') {
        dispatch(setMessage(sseData.message));
      }
    };

    eventSource.onopen = () => {
      console.log('SSE connection established successfully');
      setIsConnected(true);
      setIsLoading(false);
      dispatch(setMessage('SSE connection established successfully'));
    };

    eventSource.onerror = () => {
      console.error('SSE connection error. Retrying...');
      setIsConnected(false);
      setIsLoading(true);
      dispatch(setMessage('SSE connection error. Retrying...'));
    };

    return () => {
      eventSource.close();
      console.log('SSE connection closed');
    };
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar for TracerFlow */}
      <Box
        sx={{
          width: '300px',
          backgroundColor: '#f4f4f4',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tracer Flow
        </Typography>
        <Box sx={{ height: 'calc(100% - 50px)' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            defaultEdgeOptions={{ type: 'straight', markerEnd: { type: MarkerType.ArrowClosed } }}
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 3 }}>
        <TitleCard
          title="Sandbox WIP"
          description="Tracer with OpenTelemetry and Jaeger"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 5 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            disabled={!isConnected}
          >
            {isConnected ? 'Click Me!' : 'Connecting...'}
          </Button>
        </Box>
        {(loading || isLoading) && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">
              Loading...
            </Typography>
          </Box>
        )}
        {error && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error">
              Error: {error}
            </Typography>
          </Box>
        )}
        {(!loading) && message && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="success">
              {message}
            </Typography>
          </Box>
        )}
        {(!loading) && showText && data.length > 0 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, padding: 2 }}>
              {data.map((item, index) => (
                <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>ID: {item.id}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dev;