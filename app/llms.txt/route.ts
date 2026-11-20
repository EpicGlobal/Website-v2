import { llmsText } from '@/app/data/llmsText';

/** /llms.txt: a short guide to Epic for AI assistants. Edit content/llms.txt; scheduled articles appear on their day. */
// Made on each request, so scheduled articles are listed at midnight Utah time on their publish day.
export const dynamic = 'force-dynamic';

export function GET() {
  return new Response(llmsText(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
