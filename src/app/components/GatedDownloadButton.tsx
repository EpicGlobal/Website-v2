'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AuthModal } from '@/app/components/AuthModal';
import { useAuth } from '@/app/contexts/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';

type GatedDownloadButtonProps = {
  href: string;
  fileName: string;
  fileType: string;
  className?: string;
  title?: string;
  children: ReactNode;
};

export function GatedDownloadButton({
  href,
  fileName,
  fileType,
  className = '',
  title,
  children,
}: GatedDownloadButtonProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { trackClick, trackDownload } = useAnalytics();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);

  const openDownload = () => {
    trackDownload(fileName, fileType);
    window.location.assign(href);
  };

  const handleClick = () => {
    trackClick(fileName, 'Gated Download', {
      file_type: fileType,
    });

    if (isAuthenticated) {
      openDownload();
      return;
    }

    setPendingDownload(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!pendingDownload || isLoading || !isAuthenticated) {
      return;
    }

    setPendingDownload(false);
    setIsModalOpen(false);
    openDownload();
  }, [isAuthenticated, isLoading, pendingDownload]);

  return (
    <>
      <button type="button" className={className} onClick={handleClick} title={title}>
        {children}
      </button>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPendingDownload(false);
        }}
        emailOnly
        title="Download Access"
        subtitle="Sign in or create an account with your email to access this download."
      />
    </>
  );
}
