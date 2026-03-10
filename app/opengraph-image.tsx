import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Epic Global Inc.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at top left, rgba(34,211,238,0.28), transparent 34%), linear-gradient(135deg, #04111d 0%, #062033 55%, #0c3a4e 100%)',
          color: '#f8fafc',
          fontFamily: 'Arial, sans-serif',
          padding: '56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '28px',
            padding: '48px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '72px',
                height: '72px',
                borderRadius: '18px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)',
                color: '#04111d',
                fontSize: '42px',
                fontWeight: 800,
              }}
            >
              E
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '20px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#67e8f9' }}>
                Epic Global Inc.
              </div>
              <div style={{ fontSize: '22px', color: '#cbd5e1' }}>Zero-Risk Global Commerce Operator</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                fontSize: '68px',
                lineHeight: 1.03,
                fontWeight: 800,
                letterSpacing: '-0.04em',
              }}
            >
              We buy inventory. We operate marketplaces. We fund the scale-up.
            </div>
            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.35,
                color: '#cbd5e1',
              }}
            >
              Epic purchases inventory upfront, runs end-to-end execution, and covers advertising, fees, and fulfillment.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '18px',
              alignItems: 'center',
              color: '#a5f3fc',
              fontSize: '22px',
            }}
          >
            <div style={{ display: 'flex' }}>Purchase</div>
            <div style={{ display: 'flex', color: '#67e8f9' }}>Expand</div>
            <div style={{ display: 'flex', color: '#6ee7b7' }}>Cover</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
