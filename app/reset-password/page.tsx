import { ResetPassword } from '@/app/pages/ResetPassword';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Reset Password',
  description: 'Update the password for your Epic Global account using the secure reset link sent to your email.',
  path: '/reset-password',
  keywords: ['reset password', 'account recovery', 'epic global login'],
});

type ResetPasswordPageProps = {
  searchParams: Promise<{
    code?: string;
    token_hash?: string;
    type?: string;
  }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <ResetPassword
      code={params.code}
      tokenHash={params.token_hash}
      type={params.type}
    />
  );
}
