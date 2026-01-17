import React from 'react';

interface MessageAlertProps {
  type: 'success' | 'error';
  text: string;
}

export function MessageAlert({ type, text }: MessageAlertProps) {
  return (
    <div className={`mb-6 p-4 rounded-xl ${
      type === 'success' 
        ? 'bg-green-50 border border-green-200 text-green-800'
        : 'bg-red-50 border border-red-200 text-red-800'
    }`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{type === 'success' ? '✅' : '❌'}</span>
        <span className="font-medium">{text}</span>
      </div>
    </div>
  );
}
