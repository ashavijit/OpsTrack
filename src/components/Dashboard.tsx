import React, { useState } from 'react';
import { Activity, Database, Wifi, Server, CpuIcon, MemoryStick as Memory, Network, Container, Globe2 } from 'lucide-react';
import type { ServerStatus, WebServer, KafkaStatus, DockerStatus, Alert } from '../types';
import { ServiceDetails } from './ServiceDetails';
import { generateMetrics } from '../utils/mockData';

interface DashboardProps {
  serverStatuses: ServerStatus[];
  webServers: WebServer[];
  kafkaStatus: KafkaStatus;
  dockerStatus: DockerStatus;
  alerts: Alert[];
  isDarkMode: boolean;
}

export function Dashboard({ serverStatuses, webServers, kafkaStatus, dockerStatus, alerts, isDarkMode }: DashboardProps) {
  const [selectedService, setSelectedService] = useState<ServerStatus | null>(null);

  const getStatusColor = (status: ServerStatus['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
    }
  };

  const getStatusIcon = (name: string, type?: string) => {
    switch (name.toLowerCase()) {
      case 'mongodb': return <Database className="w-6 h-6" />;
      case 'redis': return <Database className="w-6 h-6" />;
      case 'websockets': return <Wifi className="w-6 h-6" />;
      case 'apache kafka': return <Activity className="w-6 h-6" />;
      case 'docker': return <Container className="w-6 h-6" />;
      default:
        if (type === 'nginx' || type === 'apache' || type === 'iis') {
          return <Globe2 className="w-6 h-6" />;
        }
        return <Server className="w-6 h-6" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-space-grotesk font-bold mb-8">OpsTrack Dashboard</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Web Servers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {webServers.map((server) => (
              <div
                key={server.name}
                onClick={() => setSelectedService(server)}
                className={`p-6 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } hover:shadow-xl transition-shadow cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(server.name, server.type)}
                    <div>
                      <h3 className="text-lg font-semibold">{server.name}</h3>
                      <p className="text-sm opacity-70">{server.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Requests/s</span>
                    <span className="font-medium">{server.requestsPerSecond}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Active Workers</span>
                    <span className="font-medium">{server.activeWorkers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Error Rate</span>
                    <span className="font-medium">{server.errorRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Connections</span>
                    <span className="font-medium">{server.connections}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => setSelectedService(kafkaStatus)}
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } hover:shadow-xl transition-shadow cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon('Apache Kafka')}
                <h3 className="text-lg font-semibold">Apache Kafka</h3>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(kafkaStatus.status)}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Topics</span>
                  <span className="font-medium">{kafkaStatus.topics}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Partitions</span>
                  <span className="font-medium">{kafkaStatus.partitions}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Msg/s</span>
                  <span className="font-medium">{kafkaStatus.messageRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Consumer Lag</span>
                  <span className="font-medium">{kafkaStatus.consumerLag}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedService(dockerStatus)}
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } hover:shadow-xl transition-shadow cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon('Docker')}
                <h3 className="text-lg font-semibold">Docker</h3>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(dockerStatus.status)}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Containers</span>
                  <span className="font-medium">{dockerStatus.containers.running}/{dockerStatus.containers.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">CPU Usage</span>
                  <span className="font-medium">{dockerStatus.cpuUsage}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Memory</span>
                  <span className="font-medium">{dockerStatus.memoryUsage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-70">Disk</span>
                  <span className="font-medium">{dockerStatus.diskUsage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Database & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serverStatuses.map((server) => (
              <div
                key={server.name}
                onClick={() => setSelectedService(server)}
                className={`p-6 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } hover:shadow-xl transition-shadow cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(server.name)}
                    <h3 className="text-lg font-semibold">{server.name}</h3>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Uptime</span>
                    <span className="font-medium">{server.uptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Latency</span>
                    <span className="font-medium">{server.latency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Error Rate</span>
                    <span className="font-medium">{server.errorRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Connections</span>
                    <span className="font-medium">{server.connections}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedService && (
          <div className="mt-8">
            <ServiceDetails
              service={selectedService}
              metrics={generateMetrics()}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Alerts</h2>
          <div className={`rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4`}>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center p-3 rounded-lg mb-2 ${
                  alert.type === 'error'
                    ? 'bg-red-100 text-red-800'
                    : alert.type === 'warning'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <span className="mr-2">
                  {alert.type === 'error' ? '🔴' : alert.type === 'warning' ? '⚠️' : '✅'}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm opacity-75">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <button className="p-1 hover:bg-black/10 rounded">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}