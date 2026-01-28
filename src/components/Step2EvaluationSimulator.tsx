'use client';

import React, { useState } from 'react';
import { Slider } from './ui/Slider';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

type Mode = 'showa' | 'reiwa';

export const Step2EvaluationSimulator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('reiwa');
  const [challengeCount, setChallengeCount] = useState(5);

  // 昭和モード（減点主義）の計算
  const calculateShowaMode = () => {
    // 失敗コストが高く、挑戦回数が増えるほど評価と利益が下がる
    const failureCost = challengeCount * 15000; // 1回あたりの失敗コスト
    const baseScore = 100;
    const penalty = challengeCount * 5; // 挑戦回数が増えるほど減点
    const evaluationScore = Math.max(0, baseScore - penalty);
    
    const baseProfit = 1000000;
    const companyProfit = Math.max(0, baseProfit - failureCost);
    
    return {
      evaluationScore,
      companyProfit,
      successReward: 0,
      failureCost: -failureCost,
      message: '失敗コストが高いため、社員は「何もしない」ことが最適解になります。',
    };
  };

  // 令和モード（加点主義）の計算
  const calculateReiwaMode = () => {
    // AI活用により失敗コストが無視でき、挑戦回数が増えるほど評価と利益が上がる
    const successRate = Math.min(0.3, 0.05 + challengeCount * 0.01); // 挑戦回数が増えるほど成功率が上がる
    const successReward = challengeCount * successRate * 100000; // 成功報酬
    const failureCost = challengeCount * 1000; // AI活用により失敗コストは低い
    const evaluationScore = Math.round(challengeCount * 2.5);
    const companyProfit = Math.round(successReward - failureCost);
    
    return {
      evaluationScore,
      companyProfit,
      successReward: Math.round(successReward),
      failureCost: -failureCost,
      message: 'AIなら失敗はタダ。数多く試行錯誤した者が「正解」を見つけます。',
    };
  };

  const result = mode === 'showa' ? calculateShowaMode() : calculateReiwaMode();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Step 2: 評価制度シミュレーター
      </h2>

      {/* モード切り替えタブ */}
      <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-200 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('showa')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ${
              mode === 'showa'
                ? 'bg-gray-700 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6" />
              <span>昭和・労働集約モデル（減点主義）</span>
            </div>
          </button>
          <button
            onClick={() => setMode('reiwa')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ${
              mode === 'reiwa'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span>令和・AI活用モデル（加点主義）</span>
            </div>
          </button>
        </div>
      </div>

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
          <div
            className={`rounded-xl p-6 border-2 transition-all duration-300 ${
              mode === 'showa'
                ? 'bg-gray-50 border-gray-300'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              {mode === 'showa' ? (
                <TrendingDown className="w-8 h-8 text-gray-700" />
              ) : (
                <TrendingUp className="w-8 h-8 text-blue-900" />
              )}
              <h3
                className={`text-xl font-semibold ${
                  mode === 'showa' ? 'text-gray-700' : 'text-blue-900'
                }`}
              >
                評価スコア
              </h3>
            </div>
            <p
              className={`text-5xl font-bold ${
                mode === 'showa' ? 'text-gray-700' : 'text-blue-900'
              }`}
            >
              {result.evaluationScore}点
            </p>
            {mode === 'showa' && (
              <p className="text-sm text-gray-600 mt-2">
                「またミスしやがって！」と減点される
              </p>
            )}
          </div>

          <div
            className={`rounded-xl p-6 border-2 transition-all duration-300 ${
              mode === 'showa'
                ? 'bg-gray-50 border-gray-300'
                : 'bg-green-50 border-green-200'
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-3 ${
                mode === 'showa' ? 'text-gray-700' : 'text-green-900'
              }`}
            >
              会社の利益
            </h3>
            <p
              className={`text-5xl font-bold ${
                mode === 'showa' ? 'text-gray-700' : 'text-green-900'
              }`}
            >
              ¥{result.companyProfit.toLocaleString()}
            </p>
            {mode === 'showa' && (
              <p className="text-sm text-gray-600 mt-2">
                残業代などのコスト増で利益が減少
              </p>
            )}
          </div>
        </div>

        {/* スコアの内訳 */}
        <div
          className={`rounded-xl p-6 border-2 mb-6 transition-all duration-300 ${
            mode === 'showa'
              ? 'bg-gray-50 border-gray-300'
              : 'bg-yellow-50 border-yellow-300'
          }`}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-3">スコアの内訳</h4>
          <div className="space-y-2">
            {mode === 'reiwa' && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">成功報酬:</span>
                <span className="text-green-600 font-bold text-xl">
                  +¥{result.successReward.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">失敗コスト:</span>
              <span className="text-red-600 font-bold text-xl">
                ¥{result.failureCost.toLocaleString()}
              </span>
            </div>
            {mode === 'showa' && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">減点ペナルティ:</span>
                <span className="text-red-600 font-bold text-xl">
                  -{challengeCount * 5}点
                </span>
              </div>
            )}
          </div>
        </div>

        {/* メッセージ */}
        <div
          className={`rounded-xl p-6 border-2 transition-all duration-300 ${
            mode === 'showa'
              ? 'bg-red-50 border-red-300'
              : 'bg-blue-50 border-blue-300'
          }`}
        >
          <p
            className={`text-xl font-semibold text-center ${
              mode === 'showa' ? 'text-red-900' : 'text-blue-900'
            }`}
          >
            💡 {result.message}
          </p>
        </div>
      </div>

      {/* グラフ表示 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          評価スコアの推移
        </h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 21 }, (_, i) => {
            let height: number;
            if (mode === 'showa') {
              // 昭和モード：右肩下がり
              const baseScore = 100;
              const penalty = i * 5;
              const score = Math.max(0, baseScore - penalty);
              height = (score / 100) * 100;
            } else {
              // 令和モード：右肩上がり
              height = (i * 2.5) / 50 * 100;
            }
            const isActive = i <= challengeCount;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-300 ${
                  isActive
                    ? mode === 'showa'
                      ? 'bg-gray-600'
                      : 'bg-blue-900'
                    : 'bg-gray-200'
                }`}
                style={{ height: `${Math.max(height, 5)}%` }}
                title={
                  mode === 'showa'
                    ? `${i}回: ${Math.max(0, 100 - i * 5)}点`
                    : `${i}回: ${Math.round(i * 2.5)}点`
                }
              />
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          {mode === 'showa'
            ? '挑戦回数が増えるほど評価スコアが下がります'
            : '挑戦回数に応じて評価スコアが上がります'}
        </div>
      </div>
    </div>
  );
};
