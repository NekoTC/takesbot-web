import React from 'react';

interface MessageAlertProps {
  type: 'success' | 'error';
  text: string;
}

export function MessageAlert({ type, text }: MessageAlertProps) {
  return (
    <div className={`mb-6 p-4 rounded-[12px] flex items-center gap-3 ${
      type === 'success' 
        ? 'bg-[#E6F4EA] text-[#0D652D]' 
        : 'bg-[#FCE8E6] text-[#C5221F]'
    }`}>
      <div className="shrink-0">
        {type === 'success' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
