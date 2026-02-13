'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import LightweightChart from '@/components/LightweightChart';

type ChartData = {
  time: string;
  value: number;
};

type PerformancePeriod = {
  goldReturn: number;
  silverReturn: number;
  difference: number;
};

export default function GoldSilverRatio() {
  const [ratioData, setRatioData] = useState<ChartData[]>([]);
  const [ratioLoading, setRatioLoading] = useState(true);
  const [ratioError, setRatioError] = useState<string | null>(null);
  const [performance, setPerformance] = useState<Record<string, PerformancePeriod> | null>(null);
  const [perfLoading, setPerfLoading] = useState(true);
  const [perfError, setPerfError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatioData = async () => {
      try {
        const [goldRes, silverRes] = await Promise.all([
          fetch('/api/chart?symbol=GC=F&range=12M'),
          fetch('/api/chart?symbol=SI=F&range=12M')
        ]);

        if (!goldRes.ok || !silverRes.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const goldData = await goldRes.json();
        const silverData = await silverRes.json();

        if (!goldData.success || !silverData.success) {
          throw new Error('API returned error');
        }

        // Merge data by date and calculate ratio
        const goldMap = new Map<string, number>(goldData.chartData.map((item: any) => [item.time, item.value]));
        const silverMap = new Map<string, number>(silverData.chartData.map((item: any) => [item.time, item.value]));
        
        const commonDates = Array.from(goldMap.keys()).filter(date => silverMap.has(date));
        
        const calculatedRatio = commonDates.map(date => ({
          time: date,
          value: Number(((goldMap.get(date) || 0) / (silverMap.get(date) || 1)).toFixed(2))
        }));

        setRatioData(calculatedRatio);
      } catch (err: any) {
        setRatioError(err.message || 'Failed to load ratio data');
        console.error(err);
      } finally {
        setRatioLoading(false);
      }
    };

    fetchRatioData();
  }, []);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const [goldRes, silverRes] = await Promise.all([
          fetch('/api/chart?symbol=GC=F&type=performance'),
          fetch('/api/chart?symbol=SI=F&type=performance')
        ]);

        if (!goldRes.ok || !silverRes.ok) {
          throw new Error('Failed to fetch performance data');
        }

        const goldData = await goldRes.json();
        const silverData = await silverRes.json();

        if (!goldData.success || !silverData.success) {
          throw new Error('API returned error');
        }

        // Calculate comparison for each period
        const periods = ['30D', '6M', '1Y', '2Y', '3Y', '5Y', '20Y'];
        const comparison: Record<string, PerformancePeriod> = {};

        periods.forEach(period => {
          const goldPerf = goldData.performance?.[period];
          const silverPerf = silverData.performance?.[period];

          if (goldPerf && silverPerf) {
            comparison[period] = {
              goldReturn: goldPerf.changePercent,
              silverReturn: silverPerf.changePercent,
              difference: Number((silverPerf.changePercent - goldPerf.changePercent).toFixed(2))
            };
          }
        });

        setPerformance(comparison);
      } catch (err: any) {
        setPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setPerfLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  const getPeriodLabel = (period: string) => {
    const labels: Record<string, string> = {
      '30D': '30 Days',
      '6M': '6 Months',
      '1Y': '1 Year',
      '2Y': '2 Years',
      '3Y': '3 Years',
      '5Y': '5 Years',
      '20Y': '20 Years'
    };
    return labels[period] || period;
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-yellow-500">Gold-Silver Ratio</CardTitle>
            <div className="flex items-center gap-2 text-sm text-white">
              <span>12 Month Chart (GC=F / SI=F)</span>
            </div>
          </CardHeader>
          <CardContent>
            {ratioLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {ratioError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{ratioError}</div>}
            {!ratioLoading && !ratioError && <LightweightChart data={ratioData} />}
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-yellow-500">Gold Silver Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {perfLoading && <div className="text-center py-8">Loading performance data...</div>}
              {perfError && <div className="text-center py-8 text-red-500">{perfError}</div>}
              {!perfLoading && !perfError && performance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Period</th>
                      <th className="text-right py-2 text-sm font-semibold">Gold %</th>
                      <th className="text-right py-2 text-sm font-semibold">Silver %</th>
                      <th className="text-right py-2 text-sm font-semibold">Diff</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {Object.entries(performance).map(([period, data], index, arr) => (
                      <tr key={period} className={index < arr.length - 1 ? 'border-b border-neutral-800' : ''}>
                        <td className="py-3">{getPeriodLabel(period)}</td>
                        <td className={`text-right ${data.goldReturn < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {data.goldReturn >= 0 ? '+' : ''}{data.goldReturn.toFixed(2)}%
                        </td>
                        <td className={`text-right ${data.silverReturn < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {data.silverReturn >= 0 ? '+' : ''}{data.silverReturn.toFixed(2)}%
                        </td>
                        <td className={`text-right ${data.difference < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {data.difference >= 0 ? '+' : ''}{data.difference.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p className="text-xs text-neutral-400 text-center mt-4">goldbug.org - {new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })} NY Time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
