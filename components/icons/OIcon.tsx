
import React from 'react';

const OIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
    <svg className={`${className} text-sky-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default OIcon;
