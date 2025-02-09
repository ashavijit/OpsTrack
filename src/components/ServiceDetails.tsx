import React from 'react';
import { ServiceChart } from './ServiceChart';
import type { ServerStatus, MetricData } from '../types';

interface ServiceDetailsProps {
  service: ServerStatus;
  metrics: {
    latency: MetricData[];
    errorRate: MetricData[];
    connections: MetricData[];
  };
  isDarkMode: boolean;
}

export function ServiceDetails({ service, metrics, isDarkMode }: ServiceDetailsProps) {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className="text-2xl font-bold mb-6">{service.name} Details</h2>
      <div className="space-y-8">
        <ServiceChart
          data={metrics.latency}
          title={service.name}
          threshold={service.threshold.latency}
          metric="Latency (ms)"
          isDarkMode={isDarkMode}
        />
        <ServiceChart
          data={metrics.errorRate}
          title={service.name}
          threshold={service.threshold.errorRate}
          metric="Error Rate (%)"
          isDarkMode={isDarkMode}
        />
        <ServiceChart
          data={metrics.connections}
          title={service.name}
          threshold={service.threshold.connections}
          metric="Connections"
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}