'use client';

import React, { useState, useMemo } from 'react';
import { Input } from './ui/Input';
import { Calculator } from 'lucide-react';

const MONTHLY_TEMPLATE_COST = 50000; // 月額5万円

export const Step3ROISimulator: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState(10);
  const [wasteTimePerDay, setWasteTimePerDay] = useState(30);
  const [hourlyWage, setHourlyWage] = useState(1500);

  const calculations = useMemo(() => {
    // 1人あたりの1日あたりの損失額
    const dailyLossPerPerson = (wasteTimePerDay / 60) * hourlyWage;
    
    // 全従業員の1日あたりの損失額
    const dailyLossTotal = dailyLossPerPerson * employeeCount;
    
    // 年間損失額（営業日250日と仮定）
    const annualLoss = Math.round(dailyLossTotal * 250);
    
    // 月額換算の損失額
    const monthlyLoss = Math.round(annualLoss / 12);
    
    // 元が取れる日数（月額損失額 - 月額テンプレート費用）
    const netMonthlySavings = monthlyLoss - MONTHLY_TEMPLATE_COST;
    const paybackDays = netMonthlySavings > 0 
      ? Math.ceil(MONTHLY_TEMPLATE_COST / (netMonthlySavings / 30))
      : null;

    return {
      dailyLossPerPerson,
      dailyLossTotal,
      annualLoss,
      monthlyLoss,
      paybackDays,
    };
  }, [employeeCount, wasteTimePerDay, hourlyWage]);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Step 3: ROI（投資対効果）シミュレーター
      </h2>

      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-900" />
          <h3 className="text-2xl font-semibold text-gray-900">入力項目</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Input
            type="number"
            label="従業員数"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            min="1"
            placeholder="10"
          />
          <Input
            type="number"
            label="1人あたりの無駄時間（分/日）"
            value={wasteTimePerDay}
            onChange={(e) => setWasteTimePerDay(Number(e.target.value))}
            min="0"
            placeholder="30"
          />
          <Input
            type="number"
            label="平均時給（円）"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            min="0"
            placeholder="1500"
          />
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-8 shadow-lg border-4 border-red-600">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          計算結果
        </h3>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border-2 border-red-300">
            <p className="text-xl font-semibold text-gray-700 mb-2">年間損失額</p>
            <p className="text-5xl font-bold text-red-600">
              ¥{calculations.annualLoss.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-blue-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              当社のテンプレート（月額¥{MONTHLY_TEMPLATE_COST.toLocaleString()}）なら、
            </p>
            {calculations.paybackDays !== null && calculations.paybackDays > 0 ? (
              <p className="text-4xl font-bold text-blue-900">
                約{calculations.paybackDays}日で元が取れます
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-600">
                月額損失額がテンプレート費用を上回っていません
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">1人あたりの1日損失額</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{Math.round(calculations.dailyLossPerPerson).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">全従業員の1日損失額</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{Math.round(calculations.dailyLossTotal).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
