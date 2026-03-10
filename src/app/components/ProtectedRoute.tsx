import { useAuth } from '@/app/contexts/AuthContext';
import { BookOpen, Lock, Loader2, Mail } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '@/app/components/AuthModal';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, signInWithGoogle } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 soft-dark:text-lime-700 orange:text-orange-700 leaf:text-sky-700 water:text-emerald-700" />
          <p className="text-gray-300 soft-dark:text-gray-700 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white px-4">
        {/* Auth Modal */}
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] dark:from-white/10 dark:to-white/[0.02] soft-dark:from-white/80 soft-dark:to-white/70 light:from-white light:to-gray-50 orange:from-white/80 orange:to-white/70 leaf:from-white/80 leaf:to-white/70 water:from-white/80 water:to-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/20 soft-dark:border-white/30 light:border-gray-200 orange:border-white/30 leaf:border-white/30 water:border-white/30 shadow-2xl">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 soft-dark:from-lime-500/20 soft-dark:to-lime-600/10 orange:from-orange-500/20 orange:to-orange-600/10 leaf:from-sky-500/20 leaf:to-sky-600/10 water:from-emerald-500/20 water:to-emerald-600/10 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-sky-700 water:text-emerald-700" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 soft-dark:from-lime-600 soft-dark:to-lime-700 orange:from-orange-600 orange:to-orange-700 leaf:from-sky-600 leaf:to-sky-700 water:from-emerald-600 water:to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-3 text-center bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-gray-900 water:to-gray-700 bg-clip-text text-transparent">
              Knowledge Base Access
            </h1>

            {/* Subtitle */}
            <p className="text-center text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-8">
              Sign in with your Google account to access operator-grade playbooks, checklists, and marketplace intelligence.
            </p>

            {/* Google Sign In Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg shadow-lg transition-all hover:shadow-xl active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20 soft-dark:border-gray-300 orange:border-gray-300 leaf:border-gray-300 water:border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-white/10 to-white/[0.02] soft-dark:from-white/80 orange:from-white/80 leaf:from-white/80 water:from-white/80 text-gray-400 soft-dark:text-gray-600 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600">
                  or
                </span>
              </div>
            </div>

            {/* Email Sign In Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 soft-dark:from-lime-600 soft-dark:to-lime-700 soft-dark:hover:from-lime-700 soft-dark:hover:to-lime-800 orange:from-orange-600 orange:to-orange-700 orange:hover:from-orange-700 orange:hover:to-orange-800 leaf:from-sky-600 leaf:to-sky-700 leaf:hover:from-sky-700 leaf:hover:to-sky-800 water:from-emerald-600 water:to-emerald-700 water:hover:from-emerald-700 water:hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg transition-all hover:shadow-xl active:scale-95"
              >
                <Mail className="w-5 h-5" />
                Sign in with Email
              </button>
            </div>

            {/* Info Text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600">
                Your information is used only for authentication and access control.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600">
                We do not store or share your personal data.
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-sm text-cyan-400 hover:text-cyan-300 soft-dark:text-lime-700 soft-dark:hover:text-lime-800 light:text-cyan-600 light:hover:text-cyan-700 orange:text-orange-700 orange:hover:text-orange-600 leaf:text-sky-700 leaf:hover:text-sky-600 water:text-emerald-700 water:hover:text-emerald-600 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

