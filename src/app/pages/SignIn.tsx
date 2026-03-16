'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';
import { ArrowLeft, Loader2, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { supabase } from '@/utils/supabase/client';

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
          <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-gray-900 water:to-gray-700 bg-clip-text text-transparent">
            Sign In
          </h1>
          <p className="text-center text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-8">
            Sign in with your email and password to continue.
          </p>

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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  href="/case-studies"
                  className="text-sm text-sky-700 hover:text-sky-800 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
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
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 soft-dark:from-lime-600 soft-dark:to-lime-700 soft-dark:hover:from-lime-700 soft-dark:hover:to-lime-800 orange:from-orange-600 orange:to-orange-700 orange:hover:from-orange-700 orange:hover:to-orange-800 leaf:from-sky-600 leaf:to-sky-700 leaf:hover:from-sky-700 leaf:hover:to-sky-800 water:from-emerald-600 water:to-emerald-700 water:hover:from-emerald-700 water:hover:to-emerald-800 text-white font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
