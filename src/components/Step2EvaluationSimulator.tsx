'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from './ui/Slider';
import { TrendingUp } from 'lucide-react';

export const Step2EvaluationSimulator: React.FC = () => {
  const [challengeCount, setChallengeCount] = useState(5);
  
  // 評価スコアと利益の計算
  const evaluationScore = Math.round(challengeCount * 2.5);
  const companyProfit = Math.round(challengeCount * 50000);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Step 2: 加点式・評価シミュレーター
      </h2>
      
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 mb-6">
        <div className="mb-8">
          <Slider
            value={challengeCount}
            onChange={setChallengeCount}
            min={0}
            max={20}
            step={1}
            label="社員の挑戦回数（失敗含む）"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-blue-900" />
              <h3 className="text-xl font-semibold text-blue-900">評価スコア</h3>
            </div>
            <p className="text-5xl font-bold text-blue-900">{evaluationScore}点</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-semibold text-green-900 mb-3">会社の利益</h3>
            <p className="text-5xl font-bold text-green-900">
              ¥{companyProfit.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300">
          <p className="text-xl font-semibold text-gray-900 text-center">
            💡 失敗を恐れずに「数」を打つことが、利益につながります
          </p>
        </div>
      </div>

      {/* グラフ表示 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">評価スコアの推移</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 21 }, (_, i) => {
            const height = (i * 2.5) / 50 * 100;
            const isActive = i <= challengeCount;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-300 ${
                  isActive ? 'bg-blue-900' : 'bg-gray-200'
                }`}
                style={{ height: `${Math.max(height, 5)}%` }}
                title={`${i}回: ${Math.round(i * 2.5)}点`}
              />
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          挑戦回数に応じて評価スコアが上がります
        </div>
      </div>
    </div>
  );
};
