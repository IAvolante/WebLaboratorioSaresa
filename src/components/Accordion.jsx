import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Accordion({
  title,
  subtitle,
  badge,
  children,
  isOpen,
  onToggle,
}) {
  return (
    <div
      className={`rounded-md border transition-colors duration-200 overflow-hidden ${
        isOpen
          ? 'bg-white border-[#E04323]/60 shadow-sm'
          : 'bg-white border-neutral-200 hover:border-neutral-300'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left px-5 py-4 sm:px-6 flex items-center justify-between gap-4 cursor-pointer"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-semibold text-base sm:text-[17px] text-[#231F20] leading-snug">
              {title}
            </span>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#F7F6F4] text-[#7E1418] border border-neutral-200">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#52525B] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <span
          className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? 'bg-[#E04323] text-white rotate-180'
              : 'bg-[#F7F6F4] text-[#52525B]'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-neutral-100 text-[#52525B] text-sm sm:text-[15px] leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
