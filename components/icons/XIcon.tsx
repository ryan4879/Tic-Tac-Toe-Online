
import React from 'react';

const XIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
    <svg className={`${className} text-rose-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default XIcon;
