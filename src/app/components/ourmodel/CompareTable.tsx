/**
 * Our Model, "How Epic's Wholesale Model Compares" (Nov 19): four business models, three signals with a word beside each
 * (green yes, red no, yellow for "varies"), so nothing relies on color and no model
 * is shown as worse than it is. Same component as the homepage table: wide screens get columns, smaller screens stack
 * one card per question, so nothing scrolls sideways.
 */
import { CompareTable as SignalTable, type Ans, type CompareRow } from '@/app/components/home/SkimSections';

const MODELS = [
  { name: 'Epic', sub: 'Wholesale partner' },
  { name: 'Agency', sub: 'Marketplace agency' },
  { name: 'Agency + fulfillment', sub: 'Agency with a 3PL' },
  { name: 'Distributor', sub: 'Traditional distributor' },
];

const Y = (text = 'Yes'): Ans => ({ sig: 'yes', text });
const USUALLY_NO: Ans = { sig: 'no', text: 'No' }; // Nov 19 (Brex): "usually no" shows as a plain red no
const VARIES: Ans = { sig: 'vary', text: 'Varies' };

const ROWS: CompareRow[] = [
  { q: 'Purchases inventory outright', a: [Y(), USUALLY_NO, USUALLY_NO, Y()] },
  { q: 'Operates marketplace sales', a: [Y(), Y('For the brand'), Y('For the brand'), VARIES] },
  { q: 'Funds marketplace advertising', a: [Y(), USUALLY_NO, USUALLY_NO, VARIES] },
  { q: 'Covers selling fees and fulfillment', a: [Y(), USUALLY_NO, VARIES, VARIES] },
  { q: 'Brand retains ownership', a: [Y(), Y(), Y(), Y()] },
  { q: 'Earns through resale margin', a: [Y(), USUALLY_NO, USUALLY_NO, Y()] },
  { q: 'Brand protection operations', a: [Y(), VARIES, VARIES, VARIES] },
  { q: 'International marketplace operations', a: [Y(), VARIES, VARIES, VARIES] },
];

export function CompareTable() {
  return <SignalTable columns={MODELS} rows={ROWS} label="How Epic's wholesale model compares to agencies and distributors" />;
}
