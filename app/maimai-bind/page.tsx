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
    <div className={`min-h-screen flex items-center justify-center bg-[#F2F6FC] text-[#1F1F1F] p-4 font-sans transition-opacity duration-700 ${isHere ? 'opacity-100' : 'opacity-0'}`}>
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.2, 0.0, 0, 1.0) forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.3s cubic-bezier(0.2, 0.0, 0, 1.0) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.2, 0.0, 0, 1.0) forwards;
        }
        .stagger-1 { animation-delay: 50ms; }
        .stagger-2 { animation-delay: 100ms; }
        .stagger-3 { animation-delay: 150ms; }
      `}</style>

      <div className="bg-white rounded-[32px] p-2 max-w-[560px] w-full mx-auto md:shadow-md md:shadow-black/5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-lg hover:shadow-black/5">
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-lg font-medium animate-pulse">加载中...</div>
      </div>
    }>
      <BindPageContent />
    </Suspense>
  );
}
