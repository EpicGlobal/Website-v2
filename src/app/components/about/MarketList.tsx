/**
 * About, chapter 03: the plain-text list of every country and marketplace under the map (in the server HTML for
 * search and AI crawlers, folded inside a <details>). Region columns read like a directory: each region says its shared
 * marketplace once (Europe: all on Amazon) and only the extras show per country. Brex's pick, Nov 5.
 */
import { HEAD, MUTED } from '@/app/components/story/tokens';

export type Market = { country: string; region: string; marketplaces: string[] };

const REGION_ORDER = ['North America', 'South America', 'APAC', 'Europe'];
const REGION_LABEL: Record<string, string> = { APAC: 'Asia-Pacific' };
const label = (r: string) => REGION_LABEL[r] ?? r;

function byRegion(data: readonly Market[]) {
  const regions = Array.from(new Set(data.map((c) => c.region)));
  regions.sort((a, b) => (REGION_ORDER.indexOf(a) + 99) % 99 - (REGION_ORDER.indexOf(b) + 99) % 99);
  return regions.map((region) => ({ region, countries: data.filter((c) => c.region === region) }));
}

/** The marketplace most countries in a region share (Amazon in Europe), so the list can say it once. */
function common(countries: readonly Market[]) {
  const counts = new Map<string, number>();
  countries.forEach((c) => c.marketplaces.forEach((m) => counts.set(m, (counts.get(m) ?? 0) + 1)));
  const [top] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  return top && top[1] === countries.length && countries.length > 3 ? top[0] : null;
}

const Title = ({ data }: { data: readonly Market[] }) => (
  <h3 className={`mt-8 mb-5 text-lg font-semibold ${HEAD}`}>
    {data.length} countries and {new Set(data.flatMap((c) => c.marketplaces)).size} marketplaces
  </h3>
);

/* Europe spans two columns; its shared marketplace is said once in the column header, so the country list stays clean. */
export function MarketList({ data }: { data: readonly Market[] }) {
  return (
    <div>
      <Title data={data} />
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {byRegion(data).map(({ region, countries }) => {
          const shared = common(countries);
          const wide = countries.length > 10;
          return (
            <div key={region} className={wide ? 'sm:col-span-2' : ''}>
              <div className={`border-t-2 pt-3 mb-4 border-[var(--pop)] orange:border-[#101828]`}>
                <h4 className={`font-semibold ${HEAD}`}>{label(region)}</h4>
                <p className={`text-xs mt-0.5 ${MUTED}`}>
                  {countries.length} {countries.length === 1 ? 'country' : 'countries'}
                  {shared ? `, all on ${shared}` : ''}
                </p>
              </div>
              <ul className={`text-sm space-y-2.5 ${wide ? 'columns-2 gap-x-8 [&>li]:break-inside-avoid' : ''}`}>
                {countries.map((c) => {
                  const extra = shared ? c.marketplaces.filter((m) => m !== shared) : c.marketplaces;
                  return (
                    <li key={c.country} className="leading-snug">
                      <span className={`font-medium ${HEAD}`}>{c.country}</span>
                      {extra.length ? (
                        <span className={`block text-xs mt-0.5 ${MUTED}`}>
                          {shared ? '+ ' : ''}
                          {extra.join(' · ')}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
