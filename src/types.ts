export interface ServerStatus {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  latency: number;
  errorRate: number;
  connections: number;
  threshold: {
    latency: number;
    errorRate: number;
    connections: number;
  };
}

export interface WebServer extends ServerStatus {
  type: 'nginx' | 'apache' | 'iis';
  requestsPerSecond: number;
  activeWorkers: number;
}

export interface KafkaStatus extends ServerStatus {
  topics: number;
  partitions: number;
  messageRate: number;
  consumerLag: number;
}

export interface DockerStatus extends ServerStatus {
  containers: {
    total: number;
    running: number;
    stopped: number;
  };
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'success';
  message: string;
  timestamp: Date;
}

export interface User {
  email: string;
  password: string;
}

export interface MetricData {
  time: number;
  value: number;
}