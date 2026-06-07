'use client'; // Error boundaries must be Client Components

/**
 * Error boundary — handles runtime errors gracefully with premium visuals.
 * Features: animated icon, gradient text, and retry button.
 * Uses `unstable_retry` as per Next.js 16 docs.
 */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      {/* Animated floating icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/10 to-orange-500/10 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
      >
        <AlertTriangle className="h-10 w-10 text-red-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-2xl font-bold text-transparent"
      >
        Something went wrong
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500"
      >
        We couldn&apos;t load your dashboard data. This might be a temporary
        connection issue with our database.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => unstable_retry()}
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-800/80 px-5 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.12] hover:bg-zinc-700/80 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </motion.button>

      {error.digest && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 font-mono text-[10px] text-zinc-600"
        >
          Error ID: {error.digest}
        </motion.p>
      )}
    </div>
  );
}
