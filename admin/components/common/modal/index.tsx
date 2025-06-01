"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  children,
  contentClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const closeWithTransition = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/** ⬤ Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeWithTransition}
      />

      {/** ⬤ Sliding Panel */}
      <div
        className={`
          relative
          h-screen
          w-[550px]
          bg-white
          shadow-xl
          overflow-y-scroll
          hide-scrollbar
          transform
          transition-transform
          duration-300
          ${isVisible ? "translate-x-0" : "translate-x-full"}
          ${contentClassName}
        `}
      >
        {/** Header: Title + “X” close button */}
        <div className="flex items-center justify-between px-7 py-6">
          <h2 className="text-2xl font-semibold font-display">{title}</h2>
          <button
            aria-label="Close modal"
            onClick={closeWithTransition}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="px-7 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
