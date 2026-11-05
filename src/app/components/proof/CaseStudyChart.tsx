'use client';

/**
 * The Case Studies charts (recharts). Loaded after the page by next/dynamic (see CaseStudies.tsx), so the charting
 * library stays out of the first load; the numbers behind every chart are also in the page text and tables.
 * Charts sit on a white panel in every theme, so legend text is always dark.
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const legend = (value: string) => <span className="text-slate-700">{value}</span>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CaseStudyChart({ title, data }: { title: string; data: any[] }) {
  if (title === 'Fulfillment Optimization') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis label={{ value: 'FBA Fees ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend formatter={legend} />
          <Bar dataKey="before" fill="#64748b" name="Before" />
          <Bar dataKey="after" fill="#16a34a" name="After" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  if (title === 'A/B Testing & Image Optimization') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend formatter={legend} />
          <Bar dataKey="control" fill="#64748b" name="Control" />
          <Bar dataKey="variant" name="Variant">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.success ? '#22c55e' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
  if (title === '3P Model Implementation') {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: 'Amount ($)', position: 'bottom' }} />
          <YAxis type="category" dataKey="product" width={150} />
          <Tooltip />
          <Legend formatter={legend} />
          <Bar dataKey="model1P_net" fill="#ef4444" name="1P Net Revenue" />
          <Bar dataKey="model3P_net" fill="#16a34a" name="3P Net Revenue" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return null;
}

