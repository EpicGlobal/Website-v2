import { SignIn } from '@/app/pages/SignIn';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to your Epic Global account to access gated downloads and account features.',
  path: '/sign-in',
  keywords: ['sign in', 'account login', 'epic global'],
});

type SignInPageProps = {
  searchParams: Promise<{
    reset?: string;
    confirmed?: string;
    code?: string;
    token_hash?: string;
    type?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <SignIn
      resetSuccess={params.reset === 'success'}
      confirmedSuccess={params.confirmed === 'success'}
      code={params.code}
      tokenHash={params.token_hash}
      type={params.type}
    />
  );
}
