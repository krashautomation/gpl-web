'use client';
import { useEffect, useId, useCallback } from 'react';

declare global {
  interface Window {
    BullionVaultChart: any;
  }
}

let scriptState: 'idle' | 'loading' | 'ready' = 'idle';
const subscribers: (() => void)[] = [];

const loadScript = () => {
  if (scriptState === 'loading' || scriptState === 'ready') {
    return;
  }

  scriptState = 'loading';
  const script = document.createElement('script');
  script.src = 'https://www.bullionvault.com/chart/bullionvaultchart.js?v=1';
  script.async = true;
  script.onload = () => {
    scriptState = 'ready';
    subscribers.forEach((callback) => callback());
  };
  document.head.appendChild(script);
};

type BullionVaultChartProps = {
  bullion: 'gold' | 'silver' | 'platinum' | 'palladium';
  currency?: 'USD' | 'GBP' | 'EUR' | 'JPY';
  timeframe?: '10m' | '1h' | '6h' | '1d' | '1w' | '1m' | '1q' | '1y' | '5y' | '20y';
  chartType?: 'line' | 'hlc';
};

const BullionVaultChart = ({
  bullion,
  currency = 'USD',
  timeframe = '1d',
  chartType = 'line',
}: BullionVaultChartProps) => {
  const id = useId();
  const chartContainerId = `bullionvault-chart-${bullion}-${id}`;

  const initChart = useCallback(() => {
    if (window.BullionVaultChart && document.getElementById(chartContainerId)) {
      const options = {
        bullion,
        currency,
        timeframe,
        chartType,
        containerDefinedSize: true,
        miniChartMode: false,
        displayLatestPriceLine: true,
        switchBullion: false,
        switchCurrency: false,
        switchTimeframe: false,
        switchChartType: false,
        exportButton: false,
      };
      new window.BullionVaultChart(options, chartContainerId);
    }
  }, [bullion, currency, timeframe, chartType, chartContainerId]);

  useEffect(() => {
    if (scriptState === 'ready') {
      initChart();
    } else {
      subscribers.push(initChart);
      loadScript();

      return () => {
        const index = subscribers.indexOf(initChart);
        if (index > -1) {
          subscribers.splice(index, 1);
        }
      };
    }
  }, [initChart]);

  return <div id={chartContainerId} style={{ height: '250px', width: '100%' }}></div>;
};

export default BullionVaultChart;
