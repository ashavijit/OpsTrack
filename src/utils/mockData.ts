import type { MetricData } from '../types'

export function generateMetrics() {
  const now = Math.floor(Date.now() / 1000)
  const data: {
    latency: MetricData[]
    errorRate: MetricData[]
    connections: MetricData[]
  } = {
    latency: [],
    errorRate: [],
    connections: [],
  }

  // Generate 100 data points for each metric
  for (let i = 0; i < 10000; i++) {
    const time = now - (100 - i) * 60 // One point per minute

    data.latency.push({
      time,
      value: Math.random() * 500 + 100, // 100-600ms
    })

    data.errorRate.push({
      time,
      value: Math.random() * 5, // 0-5%
    })

    data.connections.push({
      time,
      value: Math.floor(Math.random() * 2000 + 500), // 500-2500 connections
    })
  }

  return data
}
