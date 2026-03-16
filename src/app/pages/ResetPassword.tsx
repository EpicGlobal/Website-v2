'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';
import { ArrowLeft, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useAuth } from '@/app/contexts/AuthContext';

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
    <div className="min-h-screen bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 px-4 pt-32 pb-20">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-sky-700 water:text-emerald-700 hover:opacity-80 transition-opacity mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-gradient-to-br from-white/10 to-white/[0.02] dark:from-white/10 dark:to-white/[0.02] soft-dark:from-white/80 soft-dark:to-white/70 light:from-white light:to-gray-50 orange:from-white/80 orange:to-white/70 leaf:from-white/80 leaf:to-white/70 water:from-white/80 water:to-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/20 soft-dark:border-white/30 light:border-gray-200 orange:border-white/30 leaf:border-white/30 water:border-white/30 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 soft-dark:from-lime-500/20 soft-dark:to-lime-600/10 orange:from-orange-500/20 orange:to-orange-600/10 leaf:from-sky-500/20 leaf:to-sky-600/10 water:from-emerald-500/20 water:to-emerald-600/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-sky-700 water:text-emerald-700" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-gray-900 water:to-gray-700 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-center text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-8">
            Set a new password for your Epic Global account.
          </p>

          {isInitializing ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-sky-700 water:text-emerald-700" />
              <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                        className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                        placeholder="Create a new password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                        className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                        placeholder="Repeat your new password"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Must be at least 6 characters.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 soft-dark:from-lime-600 soft-dark:to-lime-700 soft-dark:hover:from-lime-700 soft-dark:hover:to-lime-800 orange:from-orange-600 orange:to-orange-700 orange:hover:from-orange-700 orange:hover:to-orange-800 leaf:from-sky-600 leaf:to-sky-700 leaf:hover:from-sky-700 leaf:hover:to-sky-800 water:from-emerald-600 water:to-emerald-700 water:hover:from-emerald-700 water:hover:to-emerald-800 text-white font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600">
                    Request a fresh password reset email from the sign-in modal and use the newest link you receive.
                  </p>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-sky-600 to-cyan-600 soft-dark:from-lime-600 soft-dark:to-lime-700 orange:from-orange-600 orange:to-orange-700 leaf:from-sky-600 leaf:to-sky-700 water:from-emerald-600 water:to-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all hover:opacity-90"
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
