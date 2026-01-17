'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Header } from './components/Header';
import { TabSelector } from './components/TabSelector';
import { MessageAlert } from './components/MessageAlert';
import { DivingFishForm } from './components/DivingFishForm';
import { LxnsSection } from './components/LxnsSection';
import { DisabledOfficialAlert } from './components/DisabledOfficialAlert';
import { Footer } from './components/Footer';
import { MissingTokenState } from './components/MissingTokenState';

function BindPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [activeTab, setActiveTab] = useState<'diving-fish' | 'lxns'>('diving-fish');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!token) {
    return <MissingTokenState />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:20px_20px] p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden max-w-2xl w-full">
        <Header />

        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 内容区 */}
        <div className="p-8">
          {message && <MessageAlert type={message.type} text={message.text} />}

          {/* 水鱼绑定 */}
          {activeTab === 'diving-fish' && (
            <DivingFishForm
              token={token}
              onSuccess={(syname) => setMessage({ type: 'success', text: `绑定成功！玩家名：${syname}` })}
              onError={(errorMsg) => setMessage({ type: 'error', text: errorMsg })}
              onStartSubmit={() => setMessage(null)} 
            />
          )}

          {/* 落雪绑定 */}
          {activeTab === 'lxns' && (
            <LxnsSection
              token={token}
              onError={(errorMsg) => setMessage({ type: 'error', text: errorMsg })}
            />
          )}

          {/* 官方绑定 - 已禁用 */}
          <DisabledOfficialAlert />
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
