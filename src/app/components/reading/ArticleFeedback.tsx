'use client';

/**
 * "Was this article helpful?" at the end of each article. A click thanks the reader and, only if they accepted
 * analytics cookies, sends a Google Analytics event: article_feedback { article: <slug>, helpful: 'yes' | 'no' }.
 * In GA4: Reports > Engagement > Events > article_feedback (register "article" and "helpful" as custom
 * dimensions once to see them per article). The answer is remembered in this browser so it isn't asked twice.
 */
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { BODY, HEAD, RULE } from '@/app/components/story/tokens';
import { SURFACE } from '@/app/components/reading/reading';

const BUTTON = `px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${RULE} ${HEAD} hover:bg-white/10 orange:hover:bg-[#101828]/5 light:hover:bg-gray-100 leaf:hover:bg-white/50 water:hover:bg-white/50 soft-dark:hover:bg-white/50`;
const key = (slug: string) => `epic-article-feedback:${slug}`;

export function ArticleFeedback({ slug }: { slug: string }) {
  const { trackEvent } = useAnalytics();
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key(slug));
      if (saved === 'yes' || saved === 'no') setAnswer(saved);
    } catch {}
  }, [slug]);

  const choose = (helpful: 'yes' | 'no') => {
    setAnswer(helpful);
    trackEvent('article_feedback', { article: slug, helpful });
    try {
      localStorage.setItem(key(slug), helpful);
    } catch {}
  };

  return (
    <div className={`mt-10 p-6 ${SURFACE}`}>
      <p className={`text-lg font-semibold mb-4 ${HEAD}`}>Was this article helpful?</p>
      <div aria-live="polite">
        {answer ? (
          <p className={`flex items-center gap-2 ${BODY}`}>
            <Check className="w-5 h-5 flex-shrink-0 text-[var(--pop)] orange:text-orange-800" aria-hidden="true" />
            {answer === 'yes' ? 'Thanks for letting us know.' : "Thanks. We'll use that to improve this article."}
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button type="button" className={BUTTON} onClick={() => choose('yes')}>
              Yes, helpful
            </button>
            <button type="button" className={BUTTON} onClick={() => choose('no')}>
              No, needs improvement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
