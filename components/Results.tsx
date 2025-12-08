import React from 'react';
import { UserResponse, AnalysisReport } from '../types';
import { RadialChart } from './RadialChart';
import { Download, RefreshCw, AlertCircle, Check, ArrowUpRight } from 'lucide-react';

interface ResultsProps {
  responses: UserResponse[];
  report: AnalysisReport | null;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ responses, report, onReset }) => {
  const totalScore = responses.reduce((acc, curr) => acc + curr.score, 0);
  const maxScore = responses.length * 10;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Minimal color logic: High score gets branding chartreuse, else white/grey to keep it clean
  const scoreColor = scorePercentage >= 70 ? 'text-brand-chartreuse' : 'text-white';

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-brand-chartreuse uppercase border border-brand-chartreuse px-2 py-0.5 rounded-full">
                Report Ready
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-medium text-white">Your Readiness Profile</h1>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-brand-darkGrey hover:text-white transition-colors text-sm font-mono uppercase tracking-wider"
          >
            <RefreshCw className="w-4 h-4" />
            Retake
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-white text-brand-charcoal hover:bg-brand-lightGrey transition-colors text-sm font-headline font-semibold"
          >
            <Download className="w-4 h-4" />
            Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Stats & Chart */}
        <div className="lg:col-span-5 space-y-8">
           {/* Overall Score Block */}
           <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8">
              <span className="text-brand-darkGrey font-mono text-xs uppercase tracking-wider">Overall Score</span>
              <div className="flex items-baseline gap-2 mt-2 mb-4">
                 <span className={`text-6xl font-headline font-bold ${scoreColor}`}>{scorePercentage}%</span>
                 <span className="text-brand-darkGrey text-lg">/ 100%</span>
              </div>
              <p className="text-white text-lg font-headline font-medium">{report?.overallReadiness}</p>
              
              <div className="mt-6 w-full bg-brand-charcoal border border-white/10 h-3 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-brand-chartreuse transition-all duration-1000" 
                    style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
           </div>

           {/* Chart Block */}
           <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
               <h3 className="text-white font-headline font-medium mb-6">Dimension Breakdown</h3>
               <RadialChart data={responses} />
           </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div className="lg:col-span-7 space-y-12">
            
            {/* Executive Summary */}
            <div className="border-l-2 border-brand-chartreuse pl-6 py-2">
                <h3 className="text-xl font-headline font-semibold text-white mb-3">Executive Summary</h3>
                <p className="text-brand-lightGrey text-lg leading-relaxed font-light">
                    {report?.executiveSummary}
                </p>
            </div>

            {/* Strengths & Gaps Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-mono text-xs text-brand-darkGrey uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                        Key Strengths
                    </h4>
                    <ul className="space-y-4">
                        {report?.keyStrengths.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-brand-chartreuse shrink-0 mt-0.5" />
                                <span className="text-white font-light">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-mono text-xs text-brand-darkGrey uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                        Critical Gaps
                    </h4>
                     <ul className="space-y-4">
                        {report?.criticalGaps.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-brand-darkGrey shrink-0 mt-0.5" />
                                <span className="text-white font-light">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Roadmap */}
            <div>
                 <h3 className="text-xl font-headline font-semibold text-white mb-6 flex items-center gap-3">
                    Strategic Roadmap
                    <ArrowUpRight className="w-5 h-5 text-brand-darkGrey" />
                 </h3>
                 <div className="space-y-4">
                    {report?.roadmap.map((item, idx) => (
                        <div key={idx} className="group bg-white/[0.02] border border-white/5 rounded-lg p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <span className="font-mono text-xs text-brand-chartreuse uppercase bg-brand-chartreuse/10 px-2 py-1 rounded">
                                    {item.phase}
                                </span>
                                <span className="font-mono text-xs text-brand-darkGrey">
                                    Impact: {item.impact}
                                </span>
                            </div>
                            <p className="text-white font-medium font-headline text-lg">
                                {item.action}
                            </p>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
