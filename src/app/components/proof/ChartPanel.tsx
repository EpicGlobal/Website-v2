'use client';

import dynamic from 'next/dynamic';
import type { ChangeChart, CompareChart } from '@/app/data/caseStudies';
import { RULE } from '@/app/components/story/tokens';

// recharts loads after the page (it never rendered server-side); the panel keeps its height so nothing jumps.
const CaseStudyChart = dynamic(() => import('./CaseStudyChart'), { ssr: false });

export function ChartPanel({ chart }: { chart: ChangeChart | CompareChart }) {
  return (
    <figure data-story="rise" className={`mt-6 rounded-xl border ${RULE} bg-white p-4 sm:p-5`}>
      <figcaption className="mb-3 text-sm font-semibold text-slate-800">{chart.title}</figcaption>
      <div style={{ minHeight: chart.kind === 'change' ? 300 : 260 }}>
        <CaseStudyChart chart={chart} />
      </div>
      <p className="mt-2 text-xs text-slate-600">{chart.caption}</p>
    </figure>
  );
}
