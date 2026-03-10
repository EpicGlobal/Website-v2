import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { HubSpotFormEmbed } from '@/app/components/HubSpotFormEmbed';

interface HubSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HubSpotModal({ isOpen, onClose }: HubSpotModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="relative mx-auto my-4 max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg bg-gray-100 p-1.5 transition-colors hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          aria-label="Close modal"
          type="button"
        >
          <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="p-8 pt-12 sm:p-10 sm:pt-14">
          <HubSpotFormEmbed />
        </div>
      </div>
    </div>,
    document.body
  );
}
