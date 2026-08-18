"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  className,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden",
              sizeClasses[size],
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
              <div>
                <h3 className="text-lg font-bold text-black/85">{title}</h3>
                {description && (
                  <p className="text-sm text-black/40 mt-0.5">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/5 flex items-center justify-center text-black/40 hover:text-black/70 hover:bg-black/[0.06] transition-all"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Confirm dialog helper
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmVariant?: "danger" | "primary";
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "primary",
  loading,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-black/60 mb-6">{description}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-black/50 hover:text-black/70 border border-black/8 rounded-xl hover:bg-black/[0.02] transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            "px-4 py-2 text-sm font-semibold rounded-xl transition-all disabled:opacity-50",
            confirmVariant === "danger"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white hover:shadow-md"
          )}
        >
          {loading ? "Processing..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
