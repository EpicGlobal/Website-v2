import type { Metadata } from 'next';
import { ThankYouRedirect } from './ThankYouRedirect';

export const metadata: Metadata = {
  title: 'Thank You | Epic Global Inc.',
  description: 'Your Epic Global strategy call has been booked.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="4;url=/" />
      <ThankYouRedirect />
    </>
  );
}
