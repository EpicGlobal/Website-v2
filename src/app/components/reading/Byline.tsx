import { UserCheck } from 'lucide-react';
import type { ArticleReview } from '@/app/data/knowledgeArticles';

/**
 * Who stands behind a page (Google: "Is it obvious who wrote the content?"). Shows the writer, and a reviewer only
 * when the review is recorded (an approved article's front matter: reviewedBy, reviewerRole, reviewedOn and a link
 * to the approval). Nobody is ever shown as a reviewer by default. The matching schema is reviewedPage() and
 * articleAuthor() in StructuredData.tsx.
 */
export function Byline({
  author,
  writer,
  review,
  className = '',
}: {
  /** The writer's name from the front matter; without it the line says "Written by the Epic team". */
  author?: string;
  /** Override the whole first half, e.g. "Prepared by the Epic team" on case studies. */
  writer?: string;
  review?: ArticleReview;
  className?: string;
}) {
  const reviewedText = review
    ? new Date(`${review.on}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    : '';
  return (
    <p className={`flex items-center gap-2 ${className}`}>
      <UserCheck className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>
        {writer ?? (author ? `Written by ${author}` : 'Written by the Epic team')}
        {review ? (
          <>
            {' · Reviewed by '}
            <span className="font-semibold">{review.by}</span>
            {review.role ? `, ${review.role}` : ''}
            {', '}
            <time dateTime={review.on}>{reviewedText}</time>
          </>
        ) : null}
      </span>
    </p>
  );
}
