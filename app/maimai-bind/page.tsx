'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
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
  const [isHere, setIsHere] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHere(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!token) {
    return <MissingTokenState />;
  }

  const handleBack = () => {
    setMessage(null);
    setCurrentStep('selection');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#F2F6FC] dark:bg-[#111318] text-[#1F1F1F] dark:text-[#E2E2E6] p-4 font-sans transition-colors duration-700 opacity-0 ${isHere ? 'opacity-100' : ''}`}>

      <div className="bg-white dark:bg-[#1E1F23] rounded-[32px] p-2 max-w-[560px] w-full mx-auto md:shadow-md md:shadow-black/5 dark:md:shadow-black/20 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="p-6 md:p-8">
          <Header />

          {/* 内容区 */}
          <div className="mt-4 min-h-[300px] relative">
            {message && (
              <div className="animate-scale-in origin-top">
                <MessageAlert type={message.type} text={message.text} />
              </div>
            )}

            {/* 选择步骤 */}
            {currentStep === 'selection' && (
              <div className="animate-fade-in-up">
                <MethodSelector onSelect={setCurrentStep} />
              </div>
            )}

            {/* 水鱼绑定 */}
            {currentStep === 'diving-fish' && (
              <div className="animate-fade-in-right">
                <DivingFishForm
                  token={token}
                  onSuccess={(syname) => setMessage({ type: 'success', text: `绑定成功！玩家名：${syname}` })}
                  onError={(errorMsg) => setMessage({ type: 'error', text: errorMsg })}
                  onStartSubmit={() => setMessage(null)}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* 落雪绑定 */}
            {currentStep === 'lxns' && (
              <div className="animate-fade-in-right">
                <LxnsSection
                  token={token}
                  onError={(errorMsg) => setMessage({ type: 'error', text: errorMsg })}
                  onBack={handleBack}
                />
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default function MaimaiBindPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F2F6FC] dark:bg-[#111318]">
        <div className="text-[#444746] dark:text-[#C4C7C5] text-lg font-medium animate-pulse">加载中...</div>
      </div>
    }>
      <BindPageContent />
    </Suspense>
  );
}
