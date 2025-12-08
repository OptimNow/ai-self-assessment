import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { UserResponse } from '../types';
import { DIMENSIONS } from '../constants';

interface RadialChartProps {
  data: UserResponse[];
}

export const RadialChart: React.FC<RadialChartProps> = ({ data }) => {
  const chartData = DIMENSIONS.map(dim => {
    const response = data.find(r => r.dimensionId === dim.id);
    return {
      subject: dim.label,
      A: response ? response.score : 0,
      fullMark: 10,
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#4B5563" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#C1C1C1', fontSize: 11, fontFamily: 'Space Mono' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Readiness Score"
            dataKey="A"
            stroke="#ACE849"
            strokeWidth={2}
            fill="#ACE849"
            fillOpacity={0.2}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#2C2C2C', borderColor: '#444444', color: '#F4F4F4', borderRadius: '8px' }}
            itemStyle={{ color: '#ACE849', fontFamily: 'Manrope' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
