'use client';

import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { StructuredData, getFAQPageSchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { BODY, H1, H2, HEAD, INNER, LEAD, PAGE_BG, POP_BUTTON, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import { MEASURE } from '@/app/components/reading/reading';
import { siteConfig } from '@/site/site-config';
import { FAQS } from '@/app/data/faqs';

const SECTION = 'px-4 sm:px-6 lg:px-8';

export function FAQ() {
  const faqs = FAQS;


  return (
    <div className={PAGE_BG}>
      <StructuredData data={getFAQPageSchema(faqs, `${siteConfig.url}/faq`)} />
      {/* Hero Section */}
      <section className={`pt-32 pb-10 ${SECTION}`}>
        <div className={INNER}>
          <h1 className={`${H1} mb-5`}>Frequently Asked Questions</h1>
          <p className={`${LEAD} max-w-3xl`}>Common questions about how we operate and what makes us different.</p>
        </div>
      </section>

      {/* FAQ list: a calm document of questions. Every answer is in the HTML (force-mounted);
          any number can be open at once. */}
      <section className={`pb-16 ${SECTION}`}>
        <div className={INNER}>
          <h2 className="sr-only">Wholesale trade partner FAQ</h2>
          <Accordion type="multiple" className={`border-t ${RULE}`}>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className={`border-b last:border-b ${RULE}`}>
                <AccordionTrigger
                  className={`py-6 text-lg sm:text-xl font-semibold leading-snug hover:no-underline underline-offset-4 decoration-1 focus-visible:ring-0 focus-visible:underline [&:hover>span]:underline ${HEAD} [&>svg]:size-5 [&>svg]:translate-y-1 [&>svg]:text-[var(--pop)] orange:[&>svg]:text-orange-800`}
                >
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent forceMount className={`${MEASURE} text-base sm:text-[1.0625rem] leading-relaxed pb-6 ${BODY}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className={`pt-4 pb-24 ${SECTION}`}>
        <div className={INNER}>
          <h2 className={`${H2} mb-4`}>Still have questions?</h2>
          <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${BODY}`}>
            Let&apos;s talk through your specific situation and see if our operating model is a fit. Or email <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-2 font-medium">{siteConfig.contactEmail}</a>.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton variant="primary" size="lg" location="FAQ Page - Still Have Questions CTA" />
            {/* With booking switched off, "See How It Works" is the page's one main action. */}
            <Link href="/our-model" className={`${siteConfig.bookACallEnabled ? QUIET_BUTTON : POP_BUTTON} self-start sm:self-auto`}>
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
