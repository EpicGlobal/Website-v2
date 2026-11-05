'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';
import { ArrowLeft, Loader2, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { supabase } from '@/utils/supabase/client';
import { ACCENT, INNER, LEAD, PAGE_BG, POP_BUTTON } from '@/app/components/story/tokens';
import { LABEL, PANEL, UTIL_H1, UTIL_TOP } from '@/app/components/utility/ui';

type SignInProps = {
  resetSuccess?: boolean;
  confirmedSuccess?: boolean;
  code?: string;
  tokenHash?: string;
  type?: string;
};

export function SignIn({
  resetSuccess = false,
  confirmedSuccess = false,
  code,
  tokenHash,
  type,
}: SignInProps) {
  const router = useRouter();
  const { signInWithEmail, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(Boolean(code || tokenHash));
  const [verificationSuccess, setVerificationSuccess] = useState(confirmedSuccess);

  useEffect(() => {
    let isMounted = true;

    const finalizeVerification = async () => {
      if (!code && !(tokenHash && type)) {
        setIsVerifyingEmail(false);
        return;
      }

      setError(null);

      try {
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            throw exchangeError;
          }
        } else if (tokenHash && type) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as EmailOtpType,
          });
          if (verifyError) {
            throw verifyError;
          }
        }

        await logout();

        if (!isMounted) {
          return;
        }

        setVerificationSuccess(true);
        router.replace('/sign-in?confirmed=success');
      } catch (err: any) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Unable to verify your email. Please request a new confirmation email.');
      } finally {
        if (isMounted) {
          setIsVerifyingEmail(false);
        }
      }
    };

    finalizeVerification();

    return () => {
      isMounted = false;
    };
  }, [code, logout, router, tokenHash, type]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signInWithEmail(email, password);
      router.replace('/case-studies');
    } catch (err: any) {
      if (err.message?.includes('Email not confirmed') || err.message?.includes('not confirmed')) {
        setError('Your email is not verified yet. Check your inbox and click the verification link before signing in.');
      } else {
        setError(err.message || 'Unable to sign in with that email and password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${PAGE_BG} ${UTIL_TOP}`}>
      <div className={`${INNER} grid gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-start lg:gap-16`}>
        <div className="lg:pt-6">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity mb-8 ${ACCENT}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className={UTIL_H1}>
            Sign In
          </h1>
          <p className={`mt-5 max-w-md ${LEAD}`}>
            Sign in with your email and password to continue.
          </p>
        </div>

        <div className={`${PANEL} p-6 sm:p-8`}>

          {resetSuccess && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
              Your password has been updated. Sign in with your new password.
            </div>
          )}

          {verificationSuccess && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
              Your email has been verified. Sign in with your email and password.
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          {isVerifyingEmail && (
            <div className="mb-4 p-3 bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying your email...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`${LABEL} mb-2`}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--pop)] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={LABEL}>
                  Password
                </label>
                <Link
                  href="/case-studies"
                  className={`text-sm font-medium hover:opacity-80 transition-opacity ${ACCENT}`}
                >
                  Need a reset link?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--pop)] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${POP_BUTTON} w-full active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
