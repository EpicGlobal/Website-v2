import { notFound } from 'next/navigation';
import { CaseStudyDetail } from '@/app/pages/CaseStudyDetail';
import { getCaseStudy, publishedCaseStudies } from '@/app/data/caseStudies';
import { createPageMetadata } from '@/site/site-config';

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

// Only published studies get a page; drafts and studies in review return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return createPageMetadata({ title: 'Case Study Not Found', description: 'This case study could not be found.', path: `/case-studies/${slug}`, noindex: true });
  }
  return createPageMetadata({
    title: study.seoTitle,
    description: study.seoDescription,
    path: `/case-studies/${study.slug}`,
    type: 'article',
    articleDate: study.updated ?? study.published,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyDetail study={study} />;
}
