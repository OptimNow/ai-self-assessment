import React, { useState } from 'react';
import { DIMENSIONS, OPTIONS } from '../constants';
import { UserResponse } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface AssessmentProps {
  onComplete: (responses: UserResponse[]) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const currentDimension = DIMENSIONS[currentIndex];

  const handleSelect = (score: number) => {
    const newResponses = [...responses];
    const existingIndex = newResponses.findIndex(r => r.dimensionId === currentDimension.id);
    
    if (existingIndex >= 0) {
      newResponses[existingIndex] = { dimensionId: currentDimension.id, score };
    } else {
      newResponses.push({ dimensionId: currentDimension.id, score });
    }
    
    setResponses(newResponses);

    setTimeout(() => {
      if (currentIndex < DIMENSIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(newResponses);
      }
    }, 250);
  };

  const progress = ((currentIndex) / DIMENSIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 flex flex-col justify-center h-full min-h-[60vh]">
      
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4 font-mono text-xs text-brand-darkGrey uppercase tracking-wider">
          <span>{currentDimension.category}</span>
          <span>{currentIndex + 1} / {DIMENSIONS.length}</span>
        </div>
        <div className="h-[2px] w-full bg-white/10">
          <div 
            className="h-full bg-brand-chartreuse transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / DIMENSIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-headline font-medium text-white mb-6">
          {currentDimension.label}
        </h2>
        <p className="text-xl text-brand-darkGrey mb-12 font-light leading-relaxed">
          {currentDimension.question}
        </p>

        <div className="grid gap-4">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="group flex items-start p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-chartreuse/50 transition-all duration-200 text-left focus:outline-none"
            >
              <div className="flex-shrink-0 mr-6 mt-1">
                {responses.find(r => r.dimensionId === currentDimension.id)?.score === option.value ? (
                   <div className="w-5 h-5 rounded-full border-[5px] border-brand-chartreuse bg-brand-charcoal"></div>
                ) : (
                   <div className="w-5 h-5 rounded-full border border-brand-darkGrey group-hover:border-brand-chartreuse transition-colors"></div>
                )}
              </div>
              <div>
                <div className="font-headline font-medium text-white group-hover:text-brand-chartreuse transition-colors mb-1">
                  {option.label}
                </div>
                <div className="text-sm text-brand-darkGrey font-light">
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="text-brand-darkGrey hover:text-white disabled:opacity-20 disabled:cursor-not-allowed text-sm font-mono uppercase tracking-wider transition-colors"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};
