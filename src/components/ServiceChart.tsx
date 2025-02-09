import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
import { toast } from 'sonner';
import type { MetricData } from '../types';

interface ServiceChartProps {
  data: MetricData[];
  title: string;
  threshold: number;
  metric: string;
  isDarkMode: boolean;
}

export function ServiceChart({ data, title, threshold, metric, isDarkMode }: ServiceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { color: isDarkMode ? '#1f2937' : '#ffffff' },
        textColor: isDarkMode ? '#e5e7eb' : '#374151',
      },
      grid: {
        vertLines: { color: isDarkMode ? '#374151' : '#e5e7eb' },
        horzLines: { color: isDarkMode ? '#374151' : '#e5e7eb' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);
    
    seriesRef.current = chartRef.current.addAreaSeries({
      lineColor: '#2563eb',
      topColor: '#3b82f6',
      bottomColor: 'rgba(59, 130, 246, 0.1)',
    });

    seriesRef.current.setData(data);

    // Add threshold line
    const thresholdSeries = chartRef.current.addLineSeries({
      color: '#ef4444',
      lineWidth: 2,
      lineStyle: 1,
    });

    thresholdSeries.setData(data.map(d => ({
      time: d.time,
      value: threshold
    })));

    // Check if latest value exceeds threshold
    const latestValue = data[data.length - 1]?.value;
    if (latestValue > threshold) {
      toast.error(`${title} ${metric} exceeded threshold: ${latestValue} (Threshold: ${threshold})`);
    }

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data, threshold, isDarkMode]);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">{title} - {metric}</h3>
      <div ref={chartContainerRef} />
    </div>
  );
}