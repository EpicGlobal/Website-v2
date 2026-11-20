'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';
import { ArrowLeft, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useAuth } from '@/app/contexts/AuthContext';
import { ACCENT, INNER, LEAD, MUTED, PAGE_BG, POP_BUTTON } from '@/app/components/story/tokens';
import { CAPTION, LABEL, PANEL, UTIL_H1, UTIL_TOP } from '@/app/components/utility/ui';

type ResetPasswordProps = {
  code?: string;
  tokenHash?: string;
  type?: string;
};

export function ResetPassword({ code, tokenHash, type }: ResetPasswordProps) {
  const router = useRouter();
  const { updatePassword, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeRecovery = async () => {
      try {
        setError(null);

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

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (session) {
          setCanReset(true);
        } else {
          setCanReset(false);
          setError('This password reset link is invalid or has expired. Request a new reset email and try again.');
        }
      } catch (err: any) {
        if (!isMounted) {
          return;
        }

        setCanReset(false);
        setError(err.message || 'Unable to verify this password reset link.');
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    initializeRecovery();

    return () => {
      isMounted = false;
    };
  }, [code, tokenHash, type]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePassword(password);
      await logout();
      router.replace('/sign-in?reset=success');
      return;
    } catch (err: any) {
      setError(err.message || 'Unable to update your password.');
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
            Reset Password
          </h1>
          <p className={`mt-5 max-w-md ${LEAD}`}>
            Set a new password for your Epic Global account.
          </p>
        </div>

        <div className={`${PANEL} p-6 sm:p-8`}>

          {isInitializing ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className={`w-8 h-8 animate-spin ${ACCENT}`} />
              <p className={CAPTION}>
                Verifying your reset link...
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {canReset ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`${LABEL} mb-2`}>
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--pop)] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                        placeholder="Create a new password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`${LABEL} mb-2`}>
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--pop)] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                        placeholder="Repeat your new password"
                      />
                    </div>
                    <p className={`mt-1 text-xs ${MUTED}`}>
                      Must be at least 6 characters.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${POP_BUTTON} w-full active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating password...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className={CAPTION}>
                    Request a fresh password reset email from the sign-in modal and use the newest link you receive.
                  </p>
                  <Link
                    href="/sign-in"
                    className={`${POP_BUTTON} w-full`}
                  >
                    Return to Sign In
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
