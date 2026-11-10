import Link from 'next/link';
import { UserCheck } from 'lucide-react';
import { ACCENT } from '@/app/components/story/tokens';
import { siteConfig } from '@/site/site-config';

/**
 * Who stands behind a page (Google: "Is it obvious who wrote the content?"). The Epic team writes it and Glen,
 * Founder & CEO, reviews it before it goes live; his name links to his bio. The matching schema is
 * reviewedByFounder in StructuredData.tsx. Keep it true: only use it on pages Glen has reviewed.
 */
export function Byline({ writer = 'Written by the Epic team', className = '' }: { writer?: string; className?: string }) {
  return (
    <p className={`flex items-center gap-2 ${className}`}>
      <UserCheck className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>
        {writer} · Reviewed by{' '}
        <Link href="/about#founder" className={`font-semibold underline-offset-4 decoration-1 hover:underline ${ACCENT}`}>
          {siteConfig.founderName}
        </Link>
        , Founder &amp; CEO
      </span>
    </p>
  );
}
