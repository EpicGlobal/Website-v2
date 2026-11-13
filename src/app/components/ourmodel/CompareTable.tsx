/**
 * Our Model: the "Competitive landscape" comparison. Same look as the Home table (green check / red X with a word),
 * one table for every screen size (it scrolls sideways on phones), so crawlers read it once.
 */
import { MarkTable } from '@/app/components/home/SkimSections';

const MODELS = ['Epic', 'Marketplace accelerator', 'Marketplace agency', 'Agency + fulfillment', 'Wholesale distributor'];
const ROWS: Array<[string, boolean[]]> = [
  ['Buys inventory upfront', [true, true, false, false, true]],
  ['Sells on their own account', [true, true, false, false, true]],
  ['No fees or commissions', [true, false, false, false, false]],
  ['Advertising management', [true, true, true, true, false]],
  ['Fulfillment and warehousing', [true, true, false, true, true]],
  ['Brand protection', [true, false, true, false, false]],
  ['Global operations', [true, true, false, false, true]],
];

export function CompareTable() {
  return (
    <MarkTable
      columns={MODELS}
      rows={ROWS.map(([q, values]) => ({ q, cells: values.map((ok) => ({ ok, text: ok ? 'Yes' : 'No' })) }))}
    />
  );
}
