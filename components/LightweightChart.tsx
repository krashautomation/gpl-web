'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ColorType } from 'lightweight-charts';
import { Chart, AreaSeries, TimeScale, TimeScaleFitContentTrigger } from 'lightweight-charts-react-components';

type LightweightChartProps = {
  data: { time: string; value: number }[];
};

const areaSeriesOptions = {
  lineColor: '#eab308', // yellow-500
  topColor: 'rgba(234, 179, 8, 0.4)',
  bottomColor: 'rgba(234, 179, 8, 0)',
};

const LightweightChart = ({ data }: LightweightChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries.length > 0) {
        setWidth(entries[0].contentRect.width);
      }
    });
    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current);
    }
    return () => {
      if (chartContainerRef.current) {
        observer.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  if (!data || data.length === 0) {
    return <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>No data available</div>;
  }

  return (
    <div ref={chartContainerRef} style={{ height: '300px', width: '100%' }}>
      {width > 0 && (
        <Chart
          options={{
            width,
            height: 300,
            layout: {
              background: { type: ColorType.Solid, color: '#18181b' },
              textColor: '#a1a1aa',
            },
            grid: {
              vertLines: { color: '#27272a' },
              horzLines: { color: '#27272a' },
            },
            rightPriceScale: { borderColor: '#404040' },
            timeScale: { borderColor: '#404040' },
          }}
        >
          <AreaSeries data={data} {...areaSeriesOptions} />
          <TimeScale>
            <TimeScaleFitContentTrigger deps={[data]} />
          </TimeScale>
        </Chart>
      )}
    </div>
  );
};

export default LightweightChart;
