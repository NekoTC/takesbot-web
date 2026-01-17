import React from 'react';

interface MessageAlertProps {
  type: 'success' | 'error';
  text: string;
}

export function MessageAlert({ type, text }: MessageAlertProps) {
  return (
    <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
      type === 'success' 
        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
        : 'bg-rose-50 border-rose-100 text-rose-800'
    }`}>
      <div className={`mt-0.5 p-1 rounded-full ${type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
        {type === 'success' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <span className="font-medium text-sm leading-6">{text}</span>
    </div>
  );
}
