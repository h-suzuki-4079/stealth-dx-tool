'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: '売上目標達成には残業か増員が必要？',
    options: [
      { label: 'はい', score: 3 },
      { label: 'いいえ', score: 0 },
    ],
  },
  {
    id: 2,
    text: '3年間採用ゼロでも回る？',
    options: [
      { label: '厳しい', score: 3 },
      { label: 'なんとか', score: 1 },
      { label: '余裕', score: 0 },
    ],
  },
  {
    id: 3,
    text: '評価されるのは？',
    options: [
      { label: '時間かけた人', score: 2 },
      { label: '早く帰った人', score: 0 },
    ],
  },
  {
    id: 4,
    text: '属人化業務は？',
    options: [
      { label: 'かなりある', score: 3 },
      { label: 'ある', score: 1 },
      { label: 'ない', score: 0 },
    ],
  },
  {
    id: 5,
    text: 'AIで無くしたい作業を即答できる？',
    options: [
      { label: 'できない', score: 2 },
      { label: 'だいたい', score: 1 },
      { label: '明確', score: 0 },
    ],
  },
  {
    id: 6,
    text: '過去のツールは文鎮化してる？',
    options: [
      { label: 'ある', score: 2 },
      { label: 'ない', score: 0 },
    ],
  },
];

export const Step1HealthCheck: React.FC<{
  onComplete: (score: number, result: string) => void;
}> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [result, setResult] = useState<'danger' | 'warning' | 'safe'>('safe');

  const handleAnswer = (questionId: number, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (Object.keys(newAnswers).length === questions.length) {
      const score = Object.values(newAnswers).reduce((sum, s) => sum + s, 0);
      setTotalScore(score);
      
      let resultText = '';
      let resultType = '';
      if (score >= 10) {
        resultText = '危険';
        resultType = 'danger';
      } else if (score >= 5) {
        resultText = '要注意';
        resultType = 'warning';
      } else {
        resultText = '健全';
        resultType = 'safe';
      }
      setResult(resultType);
      
      setTimeout(() => {
        setShowResult(true);
        onComplete(score, resultText);
      }, 500);
    }
  };

  const getResultMessage = () => {
    if (result === 'danger') {
      return {
        title: '危険',
        message: '労働負荷が非常に高く、業務改革が急務です。早急な対策が必要です。',
        icon: AlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      };
    } else if (result === 'warning') {
      return {
        title: '要注意',
        message: '一部に課題が見られます。早めの対策で改善できます。',
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
      };
    } else {
      return {
        title: '健全',
        message: '現状は良好です。継続的な改善で更なる成長を目指しましょう。',
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    }
  };

  if (showResult) {
    const resultInfo = getResultMessage();
    const Icon = resultInfo.icon;

    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className={`${resultInfo.bgColor} rounded-2xl p-8 border-4 ${result === 'danger' ? 'border-red-600' : result === 'warning' ? 'border-yellow-600' : 'border-green-600'}`}>
          <div className="flex items-center gap-4 mb-6">
            <Icon className={`w-12 h-12 ${resultInfo.color}`} />
            <h2 className={`text-4xl font-bold ${resultInfo.color}`}>
              診断結果: {resultInfo.title}
            </h2>
          </div>
          <div className="mb-6">
            <p className="text-2xl text-gray-800 mb-4">スコア: {totalScore}点</p>
            <p className="text-xl text-gray-700">{resultInfo.message}</p>
          </div>
          <div className="bg-white rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">解説</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {totalScore >= 10
                ? '労働負荷が非常に高く、従業員の健康や離職リスクが懸念されます。業務の効率化や自動化、適切な人員配置の見直しが急務です。'
                : totalScore >= 5
                ? '一部の業務に負荷がかかっている可能性があります。属人化の解消や業務プロセスの見直しを検討しましょう。'
                : '現状の業務負荷は適切に管理されているようです。継続的な改善で更なる効率化を図りましょう。'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Step 1: 健康診断（隠れ労働負荷チェック）
      </h2>
      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {question.id}. {question.text}
            </h3>
            <div className="flex flex-wrap gap-3">
              {question.options.map((option) => (
                <Button
                  key={option.label}
                  variant={answers[question.id] === option.score ? 'primary' : 'secondary'}
                  size="lg"
                  onClick={() => handleAnswer(question.id, option.score)}
                  className="min-w-[120px]"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p className="text-lg">
          回答済み: {Object.keys(answers).length} / {questions.length}
        </p>
      </div>
    </div>
  );
};
