'use client';

/**
 * Case study charts (recharts). Loaded after the page by next/dynamic, so the charting library stays out of the first
 * load; every number in a chart is also in the page text or a table. Charts sit on a white panel in every theme.
 * - change: one bar per product, green when it moved the good way, red when not.
 * - compare: two bars per item (before vs after), with the value on each bar.
 */
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChangeChart, CompareChart } from '@/app/data/caseStudies';

const GOOD = '#15803d';
const BAD = '#b91c1c';
const BEFORE = '#64748b';
const legend = (value: string) => <span className="text-slate-700">{value}</span>;
const pct = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`;
const usd = (v: number) => `$${v.toFixed(2)}`;

export default function CaseStudyChart({ chart }: { chart: ChangeChart | CompareChart }) {
  if (chart.kind === 'change') {
    const data = chart.items.map((item) => ({ ...item, good: chart.better === 'down' ? item.value < 0 : item.value > 0 }));
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 8, bottom: 12, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} label={{ value: 'Product', position: 'insideBottom', offset: -8, fontSize: 12 }} />
          <YAxis tickFormatter={(v: number) => `${v}%`} width={48} tick={{ fontSize: 12 }} />
          <ReferenceLine y={0} stroke="#334155" />
          <Tooltip formatter={(v) => pct(Number(v))} labelFormatter={(l) => `Product ${l}`} />
          <Bar dataKey="value" name="Change" radius={[3, 3, 3, 3]}>
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.good ? GOOD : BAD} />
            ))}
            {data.length <= 12 && <LabelList dataKey="value" position="top" formatter={(v: unknown) => pct(Number(v))} fontSize={11} />}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
  const data = chart.items.map((item) => ({ label: item.label, a: item.values[0], b: item.values[1] }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 64, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickFormatter={(v: number) => `$${v}`} tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="label" width={130} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => usd(Number(v))} />
        <Legend formatter={legend} />
        <Bar dataKey="a" name={chart.series[0]} fill={BEFORE}>
          <LabelList dataKey="a" position="right" formatter={(v: unknown) => usd(Number(v))} fontSize={11} />
        </Bar>
        <Bar dataKey="b" name={chart.series[1]} fill={GOOD}>
          <LabelList dataKey="b" position="right" formatter={(v: unknown) => usd(Number(v))} fontSize={11} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
