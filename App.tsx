import React, { useState } from 'react';
import { AppState, UserResponse, AnalysisReport } from './types';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { generateReadinessReport } from './services/geminiService';
import { Loader2, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAssessment = () => {
    setAppState(AppState.ASSESSMENT);
    setResponses([]);
    setReport(null);
    setError(null);
  };

  const handleAssessmentComplete = async (finalResponses: UserResponse[]) => {
    setResponses(finalResponses);
    setAppState(AppState.ANALYZING);

    try {
      const generatedReport = await generateReadinessReport(finalResponses);
      setReport(generatedReport);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate report. Please try again.");
      setAppState(AppState.LANDING);
    }
  };

  const Logo = () => (
    <div className="flex items-center gap-1 select-none">
      <div className="text-2xl text-white tracking-tight flex items-baseline">
        <span className="font-headline font-light">Optim</span>
        <span className="font-headline font-normal">Now</span>
      </div>
      <span className="ml-1 px-2 py-0.5 rounded-full bg-brand-chartreuse text-brand-charcoal text-[10px] font-mono font-bold border border-brand-chartreuse relative top-[-6px]">
        Cloud
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-charcoal flex flex-col font-sans text-brand-lightGrey">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-brand-charcoal/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
             {/* Left side - App Title */}
             <div 
               className="cursor-pointer font-headline text-brand-darkGrey hover:text-white transition-colors text-sm tracking-wide uppercase" 
               onClick={() => setAppState(AppState.LANDING)}
             >
               AI Cost Readiness Assessment
             </div>

            {/* Right side - Logo */}
            <div className="cursor-pointer" onClick={() => setAppState(AppState.LANDING)}>
               <Logo />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex flex-col">
        {appState === AppState.LANDING && (
          <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
             
             {/* Subtle background gradients */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-chartreuse/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]"></div>
             </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-brand-darkGrey font-mono text-xs mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-chartreuse animate-pulse"></span>
                FinOps Maturity for AI Workloads
              </div>
              
              <h1 className="text-5xl md:text-7xl font-headline font-medium tracking-tight text-white mb-8 leading-tight">
                AI Cost Readiness<br />
                <span className="text-brand-darkGrey">Assessment</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-brand-darkGrey mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Understand how well your organization can measure, allocate, and govern AI-driven cloud costs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                 <button 
                  onClick={startAssessment}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-lightGrey text-brand-charcoal hover:bg-white font-headline font-semibold rounded-lg transition-all duration-200"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {error && (
                <div className="mt-8 p-4 bg-red-900/10 border border-red-500/20 rounded-lg text-red-200 text-sm font-mono">
                  {error}
                </div>
              )}

              <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-brand-darkGrey text-sm font-mono">
                <div className="flex flex-col gap-2">
                    <span className="text-brand-chartreuse">01</span>
                    VISIBILITY
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-brand-chartreuse">02</span>
                    ALLOCATION
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-brand-chartreuse">03</span>
                    ECONOMICS
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-brand-chartreuse">04</span>
                    VALUE
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === AppState.ASSESSMENT && (
          <Assessment onComplete={handleAssessmentComplete} />
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-8">
              <Loader2 className="w-12 h-12 text-brand-chartreuse animate-spin" />
            </div>
            <h2 className="text-3xl font-headline font-medium text-white mb-3">Analyzing Readiness</h2>
            <p className="text-brand-darkGrey max-w-md font-light">
              Generating your personalized OptimNow report...
            </p>
          </div>
        )}

        {appState === AppState.RESULTS && (
          <Results 
            responses={responses} 
            report={report} 
            onReset={startAssessment} 
          />
        )}
      </main>
    </div>
  );
};

export default App;