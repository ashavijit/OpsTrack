import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Toaster } from 'sonner';
import type { ServerStatus, WebServer, KafkaStatus, DockerStatus, Alert } from './types';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import '@fontsource-variable/space-grotesk';

// Mock data - replace with real API calls
const mockWebServers: WebServer[] = [
  {
    name: 'Nginx Server 1',
    type: 'nginx',
    status: 'healthy',
    uptime: 99.99,
    latency: 25,
    errorRate: 0.01,
    connections: 2500,
    requestsPerSecond: 1200,
    activeWorkers: 8,
    threshold: {
      latency: 100,
      errorRate: 0.5,
      connections: 5000
    }
  },
  {
    name: 'Apache Server 1',
    type: 'apache',
    status: 'warning',
    uptime: 99.85,
    latency: 45,
    errorRate: 0.08,
    connections: 1800,
    requestsPerSecond: 800,
    activeWorkers: 12,
    threshold: {
      latency: 100,
      errorRate: 0.5,
      connections: 3000
    }
  },
  {
    name: 'IIS Server 1',
    type: 'iis',
    status: 'healthy',
    uptime: 99.95,
    latency: 35,
    errorRate: 0.02,
    connections: 1500,
    requestsPerSecond: 600,
    activeWorkers: 6,
    threshold: {
      latency: 100,
      errorRate: 0.5,
      connections: 2000
    }
  }
];

const mockKafkaStatus: KafkaStatus = {
  name: 'Apache Kafka',
  status: 'healthy',
  uptime: 99.98,
  latency: 15,
  errorRate: 0.001,
  connections: 500,
  topics: 24,
  partitions: 96,
  messageRate: 15000,
  consumerLag: 50,
  threshold: {
    latency: 50,
    errorRate: 0.1,
    connections: 1000
  }
};

const mockDockerStatus: DockerStatus = {
  name: 'Docker',
  status: 'healthy',
  uptime: 99.99,
  latency: 5,
  errorRate: 0.001,
  connections: 150,
  containers: {
    total: 45,
    running: 38,
    stopped: 7
  },
  cpuUsage: 65,
  memoryUsage: 78,
  diskUsage: 45,
  threshold: {
    latency: 20,
    errorRate: 0.05,
    connections: 300
  }
};

const mockServerStatuses: ServerStatus[] = [
  {
    name: 'MongoDB',
    status: 'healthy',
    uptime: 99.99,
    latency: 45,
    errorRate: 0.01,
    connections: 1250,
    threshold: {
      latency: 200,
      errorRate: 1,
      connections: 2000
    }
  },
  {
    name: 'Redis',
    status: 'warning',
    uptime: 99.85,
    latency: 500,
    errorRate: 0.5,
    connections: 850,
    threshold: {
      latency: 300,
      errorRate: 0.8,
      connections: 1500
    }
  },
  {
    name: 'WebSockets',
    status: 'critical',
    uptime: 95.5,
    latency: 1500,
    errorRate: 5.0,
    connections: 450,
    threshold: {
      latency: 1000,
      errorRate: 2,
      connections: 1000
    }
  }
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Redis Latency Spiked (500ms)',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'error',
    message: 'WebSocket Connection Dropped',
    timestamp: new Date()
  },
  {
    id: '3',
    type: 'success',
    message: 'MongoDB Auto-Recovery Success',
    timestamp: new Date()
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Add real authentication logic here
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-outfit`}>
      <Toaster richColors position="top-right" />
      {!isAuthenticated ? (
        <LoginPage
          onLogin={handleLogin}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <Dashboard
          serverStatuses={mockServerStatuses}
          webServers={mockWebServers}
          kafkaStatus={mockKafkaStatus}
          dockerStatus={mockDockerStatus}
          alerts={mockAlerts}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default App;