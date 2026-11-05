/**
 * Our Model: the "Competitive landscape" comparison, on the story kit tokens. One pop moment: the Epic column.
 * Phones get one card per capability (same rows); wider screens get the table. All text is server-rendered.
 */
import { ACCENT, BODY, HEAD, MUTED, RULE } from '@/app/components/story/tokens';

const MODELS = ['Epic', 'Marketplace accelerator', 'Marketplace agency', 'Agency + fulfillment', 'Wholesale distributor'];
const ROWS: Array<[string, boolean[]]> = [
  ['Buys inventory upfront', [true, true, false, false, true]],
  ['Sells on their own account', [true, true, false, false, true]],
  ['"No fees / no commissions"', [true, false, false, false, false]],
  ['Advertising management', [true, true, true, true, false]],
  ['Fulfillment / warehousing', [true, true, false, true, true]],
  ['Brand protection', [true, false, true, false, false]],
  ['Global operations', [true, true, false, false, true]],
];

/** Epic's column: a soft tint so the eye lands there first. */
const EPIC_CELL = 'bg-[var(--pop)]/10 orange:bg-white/60';

function Answer({ yes, epic }: { yes: boolean; epic?: boolean }) {
  if (epic) return <span className={`font-semibold ${ACCENT}`}>{yes ? 'Yes' : 'No'}</span>;
  return yes ? <span className={`font-semibold ${HEAD}`}>Yes</span> : <span className={MUTED}>No</span>;
}

export function CompareTable() {
  return (
    <>
      <div className="md:hidden space-y-3">
        {ROWS.map(([label, values]) => (
          <div key={label} className={`rounded-xl border p-4 ${RULE}`}>
            <p className={`font-semibold mb-2 ${HEAD}`}>{label}</p>
            <ul className="grid grid-cols-1 gap-1 text-sm">
              {MODELS.map((model, i) => (
                <li key={model} className="flex justify-between gap-3">
                  <span className={i === 0 ? `font-semibold ${HEAD}` : BODY}>{model}</span>
                  <Answer yes={values[i]} epic={i === 0} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse min-w-[720px] text-sm">
          <thead>
            <tr className={`border-b ${RULE}`}>
              <th scope="col" className={`text-left py-4 px-3 font-semibold ${MUTED}`}>
                Capability / Model
              </th>
              {MODELS.map((model, i) => (
                <th
                  key={model}
                  scope="col"
                  className={`text-center py-4 px-3 font-semibold ${i === 0 ? `${HEAD} ${EPIC_CELL} rounded-t-xl text-base` : MUTED}`}
                >
                  {model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, values], r) => (
              <tr key={label} className={r < ROWS.length - 1 ? `border-b ${RULE}` : ''}>
                <th scope="row" className={`text-left py-4 px-3 font-semibold ${HEAD}`}>
                  {label}
                </th>
                {values.map((yes, i) => (
                  <td
                    key={MODELS[i]}
                    className={`py-4 px-3 text-center ${i === 0 ? `${EPIC_CELL} ${r === ROWS.length - 1 ? 'rounded-b-xl' : ''}` : ''}`}
                  >
                    <Answer yes={yes} epic={i === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
