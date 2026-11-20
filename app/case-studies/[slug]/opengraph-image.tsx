/**
 * Link-preview card for each published case study (LinkedIn, Slack, iMessage, X), also its image for Google.
 * Made once at build time with Next's built-in image generator, so it adds nothing to page load.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { publishedCaseStudies } from '@/app/data/caseStudies';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';
export const alt = 'Epic Global Inc. case study';

export function generateStaticParams() {
  return publishedCaseStudies.map((study) => ({ slug: study.slug }));
}

async function dataUrl(file: string) {
  const bytes = await readFile(path.join(process.cwd(), 'src/assets/og', file));
  return `data:image/png;base64,${bytes.toString('base64')}`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = publishedCaseStudies.find((s) => s.slug === slug);
  const title = study?.title ?? 'Case Studies';
  const category = study?.brand ?? '';
  const [mark, wordmark] = await Promise.all([dataUrl('epic-mark.png'), dataUrl('epic-wordmark.png')]);
  const titleSize = title.length > 60 ? 54 : title.length > 36 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0B1020 0%, #13203A 60%, #0F2A2E 100%)',
          color: '#FFFFFF',
          padding: '56px 72px 0 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={mark} width={59} height={80} />
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={wordmark} width={220} height={44} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#BBD959' }}>CASE STUDY</div>
          <div style={{ display: 'flex', fontSize: titleSize, lineHeight: 1.12, maxWidth: 1040 }}>{title}</div>
          {category ? <div style={{ display: 'flex', fontSize: 28, color: '#A9B4C8' }}>{category}</div> : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 24, color: '#A9B4C8', paddingBottom: 22 }}>
            epicglobalinc.com
          </div>
          <div style={{ display: 'flex', height: 12, margin: '0 -72px', background: 'linear-gradient(90deg, #F68932, #BBD959, #0068B4)' }} />
        </div>
      </div>
    ),
    size,
  );
}
