
import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 m-4 text-center transform transition-transform duration-300 scale-100 animate-fade-in-up">
                {children}
            </div>
        </div>
    );
};

export default Modal;
