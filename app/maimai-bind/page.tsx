'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Header } from './components/Header';
import { MethodSelector } from './components/MethodSelector';
import { MessageAlert } from './components/MessageAlert';
import { DivingFishForm } from './components/DivingFishForm';
import { LxnsSection } from './components/LxnsSection';
import { Footer } from './components/Footer';
import { MissingTokenState } from './components/MissingTokenState';

type BindStep = 'selection' | 'diving-fish' | 'lxns';

function BindPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [currentStep, setCurrentStep] = useState<BindStep>('selection');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!token) {
    return <MissingTokenState />;
  }

  const handleBack = () => {
    setMessage(null);
    setCurrentStep('selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:20px_20px] p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden max-w-xl w-full">
        <Header />

        {/* 内容区 */}
        <div className="p-8 min-h-[400px]">
          {message && <MessageAlert type={message.type} text={message.text} />}

          {/* 选择步骤 */}
          {currentStep === 'selection' && (
            <MethodSelector onSelect={setCurrentStep} />
          )}

          {/* 水鱼绑定 */}
          {currentStep === 'diving-fish' && (
            <DivingFishForm
              token={token}
              onSuccess={(syname) => setMessage({ type: 'success', text: `绑定成功！玩家名：${syname}` })}
              onError={(errorMsg) => setMessage({ type: 'error', text: errorMsg })}
              onStartSubmit={() => setMessage(null)}
              onBack={handleBack}
            />
          )}

          {/* 落雪绑定 */}
          {currentStep === 'lxns' && (
            <LxnsSection
              token={token}
              onError={(errorMsg) => setMessage({ type: 'error', text: errorMsg })}
              onBack={handleBack}
            />
          )}

        </div>

        <Footer />
      </div>
    </div>
  );
}

export default function MaimaiBindPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-lg font-medium animate-pulse">加载中...</div>
      </div>
    }>
      <BindPageContent />
    </Suspense>
  );
}
