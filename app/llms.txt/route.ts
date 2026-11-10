import { llmsText } from '@/app/data/llmsText';

/** /llms.txt: a short guide to Epic for AI assistants. Edit content/llms.txt; scheduled articles appear on their day. */
export const dynamic = 'force-static';
// Rebuilt hourly so scheduled articles are listed on their publish day.
export const revalidate = 3600;

export function GET() {
  return new Response(llmsText(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
