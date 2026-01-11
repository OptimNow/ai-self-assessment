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
      {/* Semantic Navigation Header */}
      <header role="banner">
        <nav className="border-b border-white/5 bg-brand-charcoal/90 backdrop-blur-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
               {/* Left side - App Title */}
               <button
                 className="cursor-pointer font-headline text-brand-darkGrey hover:text-white transition-colors text-sm tracking-wide uppercase"
                 onClick={() => setAppState(AppState.LANDING)}
                 aria-label="Return to home page"
               >
                 AI Cost Readiness Assessment
               </button>

              {/* Right side - Logo */}
              <button className="cursor-pointer" onClick={() => setAppState(AppState.LANDING)} aria-label="OptimNow Cloud home">
                 <Logo />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content - Semantic HTML for LLM Searchability */}
      <main className="flex-grow flex flex-col" role="main" aria-label="AI Cost Readiness Assessment Application">
        {appState === AppState.LANDING && (
          <article className="flex-grow flex items-center justify-center p-6 relative overflow-hidden" itemScope itemType="https://schema.org/WebApplication">

             {/* Subtle background gradients */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-chartreuse/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]"></div>
             </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-brand-darkGrey font-mono text-xs mb-10" role="note" aria-label="Application Category">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-chartreuse animate-pulse" aria-hidden="true"></span>
                <span itemProp="applicationCategory">FinOps Maturity for AI Workloads</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-headline font-medium tracking-tight text-white mb-8 leading-tight" itemProp="name">
                AI Cost Readiness<br />
                <span className="text-brand-darkGrey">Assessment</span>
              </h1>

              <p className="text-xl md:text-2xl text-brand-darkGrey mb-12 max-w-2xl mx-auto leading-relaxed font-light" itemProp="description">
                Understand how well your organization can measure, allocate, and govern AI-driven cloud costs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                 <button
                  onClick={startAssessment}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-lightGrey text-brand-charcoal hover:bg-white font-headline font-semibold rounded-lg transition-all duration-200"
                  aria-label="Start AI Cost Readiness Assessment"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>

              {error && (
                <div className="mt-8 p-4 bg-red-900/10 border border-red-500/20 rounded-lg text-red-200 text-sm font-mono" role="alert" aria-live="assertive">
                  {error}
                </div>
              )}

              {/* Key Assessment Dimensions - Semantic Structure */}
              <section className="mt-20 pt-10 border-t border-white/5" aria-label="Assessment Focus Areas">
                <h2 className="sr-only">Assessment Covers Four Key Areas</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-brand-darkGrey text-sm font-mono">
                  <article className="flex flex-col gap-2" itemScope itemType="https://schema.org/Thing">
                      <span className="text-brand-chartreuse" aria-label="Focus Area 1">01</span>
                      <h3 className="font-semibold" itemProp="name">VISIBILITY</h3>
                      <meta itemProp="description" content="Real-time AI cost visibility, monitoring, and tracking capabilities" />
                  </article>
                  <article className="flex flex-col gap-2" itemScope itemType="https://schema.org/Thing">
                      <span className="text-brand-chartreuse" aria-label="Focus Area 2">02</span>
                      <h3 className="font-semibold" itemProp="name">ALLOCATION</h3>
                      <meta itemProp="description" content="Cost allocation, tagging, and attribution to specific features and users" />
                  </article>
                  <article className="flex flex-col gap-2" itemScope itemType="https://schema.org/Thing">
                      <span className="text-brand-chartreuse" aria-label="Focus Area 3">03</span>
                      <h3 className="font-semibold" itemProp="name">ECONOMICS</h3>
                      <meta itemProp="description" content="Unit economics, cost optimization, and forecasting capabilities" />
                  </article>
                  <article className="flex flex-col gap-2" itemScope itemType="https://schema.org/Thing">
                      <span className="text-brand-chartreuse" aria-label="Focus Area 4">04</span>
                      <h3 className="font-semibold" itemProp="name">VALUE</h3>
                      <meta itemProp="description" content="ROI measurement and business value assessment of AI investments" />
                  </article>
                </div>
              </section>
            </div>
          </article>
        )}

        {appState === AppState.ASSESSMENT && (
          <Assessment onComplete={handleAssessmentComplete} />
        )}

        {appState === AppState.ANALYZING && (
          <section className="flex-grow flex flex-col items-center justify-center p-6 text-center" role="status" aria-live="polite" aria-label="Analyzing Assessment Results">
            <div className="relative mb-8" aria-hidden="true">
              <Loader2 className="w-12 h-12 text-brand-chartreuse animate-spin" />
            </div>
            <h2 className="text-3xl font-headline font-medium text-white mb-3">Analyzing Readiness</h2>
            <p className="text-brand-darkGrey max-w-md font-light">
              Generating your personalized AI cost readiness report using AI-powered analysis...
            </p>
          </section>
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