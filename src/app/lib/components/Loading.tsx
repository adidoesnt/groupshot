"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center min-h-screen bg-background"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-text-primary font-mono">Loading...</h1>
          <p className="text-sm text-text-primary font-sans">
            Please wait while we prepare your experience.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
