'use client';

import React, { useState } from 'react';
import { Step1HealthCheck } from '@/components/Step1HealthCheck';
import { Step2EvaluationSimulator } from '@/components/Step2EvaluationSimulator';
import { Step3ROISimulator } from '@/components/Step3ROISimulator';
import { Step4OrderForm } from '@/components/Step4OrderForm';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [healthScore, setHealthScore] = useState<number | undefined>();
  const [healthResult, setHealthResult] = useState<string | undefined>();

  const handleHealthCheckComplete = (score: number, result: string) => {
    setHealthScore(score);
    setHealthResult(result);
  };

  const scrollToStep = (step: number) => {
    setCurrentStep(step);
    const element = document.getElementById(`step-${step}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      scrollToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      scrollToStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-center">
            業務改革・診断Webアプリ
          </h1>
          <p className="text-center mt-2 text-blue-100">
            地方中小企業の経営者のための業務効率化診断ツール
          </p>
        </div>
      </header>

      {/* ステップインジケーター */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => scrollToStep(step)}
                className={`flex-1 mx-2 py-3 px-4 rounded-lg font-semibold text-lg transition-all ${
                  currentStep === step
                    ? 'bg-blue-900 text-white shadow-lg'
                    : currentStep > step
                    ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Step {step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto">
        {/* Step 1 */}
        <section
          id="step-1"
          className="min-h-screen py-12 bg-white"
          onMouseEnter={() => setCurrentStep(1)}
        >
          <Step1HealthCheck onComplete={handleHealthCheckComplete} />
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleNext}
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              次へ <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Step 2 */}
        <section
          id="step-2"
          className="min-h-screen py-12 bg-blue-50"
          onMouseEnter={() => setCurrentStep(2)}
        >
          <Step2EvaluationSimulator />
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handlePrev}
              variant="secondary"
              size="lg"
              className="flex items-center gap-2"
            >
              <ChevronUp className="w-5 h-5" /> 戻る
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              次へ <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Step 3 */}
        <section
          id="step-3"
          className="min-h-screen py-12 bg-white"
          onMouseEnter={() => setCurrentStep(3)}
        >
          <Step3ROISimulator />
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handlePrev}
              variant="secondary"
              size="lg"
              className="flex items-center gap-2"
            >
              <ChevronUp className="w-5 h-5" /> 戻る
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              次へ <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Step 4 */}
        <section
          id="step-4"
          className="min-h-screen py-12 bg-blue-50"
          onMouseEnter={() => setCurrentStep(4)}
        >
          <Step4OrderForm healthScore={healthScore} healthResult={healthResult} />
          <div className="flex justify-center mt-8">
            <Button
              onClick={handlePrev}
              variant="secondary"
              size="lg"
              className="flex items-center gap-2"
            >
              <ChevronUp className="w-5 h-5" /> 戻る
            </Button>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg">
            © 2024 業務改革・診断Webアプリ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
