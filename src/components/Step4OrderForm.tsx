'use client';

import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

interface FormData {
  companyName: string;
  name: string;
  email: string;
  concerns: string;
}

const GAS_ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbwgISonFRUrzolEjnBkoRbzvCNbKiYco17Vn8Um7U-r5IDL7ko-N8GHcoddk-aW2I1MAA/exec';

export const Step4OrderForm: React.FC<{
  healthScore?: number;
  healthResult?: string;
}> = ({ healthScore, healthResult }) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    name: '',
    email: '',
    concerns: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // エラーをクリア
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = '会社名を入力してください';
    }
    if (!formData.name.trim()) {
      newErrors.name = '氏名を入力してください';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Google Apps Scriptエンドポイントに送信するデータ形式
      const submissionData = {
        company: formData.companyName,
        name: formData.name,
        email: formData.email,
        message: formData.concerns,
      };

      // Google Apps ScriptのエンドポイントにPOST送信
      const response = await fetch(GAS_ENDPOINT_URL, {
        method: 'POST',
        mode: 'no-cors', // CORSエラーを回避（GASはno-corsで動作）
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // no-corsモードではレスポンスを読めないため、エラーがなければ成功とみなす
      setSubmitSuccess(true);
      setSubmitError(null);
      
      // フォームをリセット
      setFormData({
        companyName: '',
        name: '',
        email: '',
        concerns: '',
      });
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitError('送信に失敗しました。しばらく時間をおいて再度お試しください。');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Step 4: 発注オーダーシート
      </h2>

      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <p className="text-lg text-gray-700 mb-6 text-center">
          診断結果とシミュレーションを踏まえ、解決策（テンプレート集）をお申し込みください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="companyName"
            label="会社名"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
            required
          />

          <Input
            type="text"
            name="name"
            label="氏名"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            type="email"
            name="email"
            label="メールアドレス"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Textarea
            name="concerns"
            label="悩み・ご要望（自由記述）"
            value={formData.concerns}
            onChange={handleChange}
            rows={6}
            placeholder="現在の業務課題や、テンプレートに期待することをご記入ください..."
          />

          {submitSuccess && (
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-600 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-lg font-semibold text-green-900">
                  送信が完了しました。担当者よりご連絡いたします。
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-600 mb-4">
              <p className="text-lg font-semibold text-red-900">
                {submitError}
              </p>
            </div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  送信する
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
