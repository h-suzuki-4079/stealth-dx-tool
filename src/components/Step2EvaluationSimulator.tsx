'use client';

import React, { useState } from 'react';
import { 
  Droplets, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  MessageCircle,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

type Mode = 'current' | 'result';

export const Step2EvaluationSimulator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('current');

  // 現状の給与規定モード
  const currentMode = {
    personA: {
      name: 'Aさん（汗かきタイプ）',
      icon: Droplets,
      workHours: 10,
      overtimeHours: 2,
      sales: 1000000,
      baseSalary: 200000,
      overtimePay: 50000,
      totalSalary: 250000,
      comment: '残業代で稼ぐぞ！',
      color: 'red',
    },
    personB: {
      name: 'Bさん（スマートタイプ）',
      icon: Sparkles,
      workHours: 5,
      overtimeHours: 0,
      sales: 1000000,
      baseSalary: 200000,
      overtimePay: 0,
      totalSalary: 200000,
      comment: '工夫して早く帰ると給料が減る...バカらしいから明日からゆっくりやろう',
      color: 'blue',
    },
  };

  // 成果配分ルールモード
  const resultMode = {
    personA: {
      name: 'Aさん（汗かきタイプ）',
      icon: Droplets,
      workHours: 10,
      overtimeHours: 2,
      sales: 1000000,
      baseSalary: 200000,
      productivityBonus: 0,
      totalSalary: 200000,
      comment: 'ヤバい、私もツール覚えなきゃ',
      color: 'gray',
      evaluation: '効率化の指導対象',
    },
    personB: {
      name: 'Bさん（スマートタイプ）',
      icon: Sparkles,
      workHours: 5,
      overtimeHours: 0,
      sales: 1000000,
      baseSalary: 200000,
      productivityBonus: 80000,
      totalSalary: 280000,
      comment: 'もっと効率化してボーナス増やすぞ！',
      color: 'green',
      evaluation: '最高評価！',
    },
  };

  const data = mode === 'current' ? currentMode : resultMode;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        頑張る人が損をする？ 給与と評価の矛盾チェック
      </h2>

      {/* モード切り替えタブ */}
      <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-200 mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('current')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ${
              mode === 'current'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6" />
              <span>[A] 現状の給与規定</span>
            </div>
            <div className="text-sm mt-1 opacity-90">時間給・年功評価（一般的）</div>
          </button>
          <button
            onClick={() => setMode('result')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ${
              mode === 'result'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>[B] 成果配分ルール</span>
            </div>
            <div className="text-sm mt-1 opacity-90">成果給・利益還元（推奨）</div>
          </button>
        </div>
      </div>

      {/* 2人の社員の比較カード */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Aさん */}
        <div className={`bg-white rounded-2xl p-6 shadow-lg border-4 transition-all duration-300 ${
          mode === 'current' 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 bg-gray-50'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-full ${
              mode === 'current' ? 'bg-red-200' : 'bg-gray-200'
            }`}>
              {React.createElement(data.personA.icon, {
                className: `w-12 h-12 ${
                  mode === 'current' ? 'text-red-700' : 'text-gray-600'
                }`
              })}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{data.personA.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  労働時間: {data.personA.workHours}時間
                  {data.personA.overtimeHours > 0 && (
                    <span className="text-red-600 font-semibold">
                      （残業{data.personA.overtimeHours}時間）
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-white rounded-lg border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">成果（売上）</div>
            <div className="text-2xl font-bold text-gray-900">
              ¥{data.personA.sales.toLocaleString()}
            </div>
          </div>

          <div className={`mb-4 p-6 rounded-lg border-4 ${
            mode === 'current'
              ? 'bg-red-100 border-red-500'
              : 'bg-gray-100 border-gray-400'
          }`}>
            <div className="text-sm text-gray-600 mb-2">給与（手取り）</div>
            <div className={`text-5xl font-bold mb-2 ${
              mode === 'current' ? 'text-red-600' : 'text-gray-700'
            }`}>
              ¥{data.personA.totalSalary.toLocaleString()}
            </div>
            {mode === 'current' ? (
              <div className="text-sm text-gray-700 space-y-1">
                <div>基本給: ¥{data.personA.baseSalary.toLocaleString()}</div>
                <div className="text-red-600 font-semibold">
                  残業代: +¥{data.personA.overtimePay.toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-700">
                <div>基本給: ¥{data.personA.baseSalary.toLocaleString()}</div>
                <div className="text-gray-600 mt-2 font-semibold">
                  {data.personA.evaluation}
                </div>
              </div>
            )}
          </div>

          {/* 吹き出し */}
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300 relative">
            <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-300 transform rotate-45"></div>
            <div className="flex items-start gap-2">
              <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-700 italic">
                「{data.personA.comment}」
              </p>
            </div>
          </div>
        </div>

        {/* Bさん */}
        <div className={`bg-white rounded-2xl p-6 shadow-lg border-4 transition-all duration-300 ${
          mode === 'current' 
            ? 'border-blue-300 bg-blue-50' 
            : 'border-green-500 bg-green-50'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-full ${
              mode === 'current' ? 'bg-blue-200' : 'bg-green-200'
            }`}>
              {React.createElement(data.personB.icon, {
                className: `w-12 h-12 ${
                  mode === 'current' ? 'text-blue-700' : 'text-green-700'
                }`
              })}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{data.personB.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  労働時間: {data.personB.workHours}時間
                  {data.personB.overtimeHours === 0 && (
                    <span className="text-green-600 font-semibold">（残業なし）</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-white rounded-lg border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">成果（売上）</div>
            <div className="text-2xl font-bold text-gray-900">
              ¥{data.personB.sales.toLocaleString()}
            </div>
          </div>

          <div className={`mb-4 p-6 rounded-lg border-4 ${
            mode === 'current'
              ? 'bg-blue-100 border-blue-400'
              : 'bg-green-100 border-green-500'
          }`}>
            <div className="text-sm text-gray-600 mb-2">給与（手取り）</div>
            <div className={`text-5xl font-bold mb-2 ${
              mode === 'current' ? 'text-blue-600' : 'text-green-600'
            }`}>
              ¥{data.personB.totalSalary.toLocaleString()}
            </div>
            {mode === 'current' ? (
              <div className="text-sm text-gray-700">
                <div>基本給: ¥{data.personB.baseSalary.toLocaleString()}</div>
                <div className="text-blue-600 mt-2 font-semibold">残業代なし...</div>
              </div>
            ) : (
              <div className="text-sm text-gray-700 space-y-1">
                <div>基本給: ¥{data.personB.baseSalary.toLocaleString()}</div>
                <div className="text-green-600 font-semibold">
                  生産性手当: +¥{data.personB.productivityBonus.toLocaleString()}
                </div>
                <div className="text-green-700 font-bold text-lg mt-2">
                  {data.personB.evaluation}
                </div>
              </div>
            )}
          </div>

          {/* 吹き出し */}
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300 relative">
            <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-300 transform rotate-45"></div>
            <div className="flex items-start gap-2">
              <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-700 italic">
                「{data.personB.comment}」
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* まとめメッセージ */}
      <div className={`rounded-2xl p-8 shadow-lg border-4 transition-all duration-300 ${
        mode === 'current'
          ? 'bg-red-50 border-red-300'
          : 'bg-green-50 border-green-300'
      }`}>
        <div className="flex items-start gap-4">
          {mode === 'current' ? (
            <TrendingDown className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
          ) : (
            <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
          )}
          <div>
            <h3 className={`text-2xl font-bold mb-3 ${
              mode === 'current' ? 'text-red-900' : 'text-green-900'
            }`}>
              {mode === 'current' ? '現状の問題点' : '解決策'}
            </h3>
            <p className={`text-xl leading-relaxed ${
              mode === 'current' ? 'text-red-800' : 'text-green-800'
            }`}>
              {mode === 'current' 
                ? '同じ成果を出しているのに、ダラダラ残業する人の方が給料が高くなる矛盾。これでは効率化を進めるインセンティブが働きません。'
                : '「時間をかけた人」を評価する限り、会社から無駄作業はなくなりません。浮いたコストを還元する「仕組み」に変えるだけで、社員は自ら動き出します。'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
