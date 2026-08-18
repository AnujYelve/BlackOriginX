"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Clock, User, Globe, Monitor, Archive, Trash2, RotateCcw, Eye, EyeOff } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/Modal";

interface MessageDetail {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}

export default function MessageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [msg, setMsg] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/messages/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setMsg(json.data);
          // Auto mark as read
          if (!json.data.isRead) {
            fetch(`/api/admin/messages/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isRead: true }),
            });
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const updateMessage = async (data: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) setMsg(json.data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
      </div>
    );
  }

  if (!msg) {
    return (
      <div className="text-center py-20 text-black/40">Message not found</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl space-y-6"
    >
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/admin/messages")}
          className="flex items-center gap-2 text-sm text-black/50 hover:text-black/70 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Messages
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateMessage({ isRead: !msg.isRead })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-black/8 rounded-lg hover:bg-black/[0.02] transition-all"
          >
            {msg.isRead ? <EyeOff size={14} /> : <Eye size={14} />}
            {msg.isRead ? "Mark Unread" : "Mark Read"}
          </button>
          <button
            onClick={() => updateMessage({ isArchived: !msg.isArchived })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-black/8 rounded-lg hover:bg-black/[0.02] transition-all"
          >
            <Archive size={14} />
            {msg.isArchived ? "Unarchive" : "Archive"}
          </button>
          {msg.isDeleted ? (
            <button
              onClick={() => updateMessage({ isDeleted: false })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-all"
            >
              <RotateCcw size={14} />
              Restore
            </button>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Message Card */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-black/85">{msg.name}</h2>
              <p className="text-sm text-black/40 mt-1">{msg.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge variant={msg.isRead ? "read" : "unread"} />
              {msg.isArchived && <StatusBadge variant="archived" />}
              {msg.isDeleted && <StatusBadge variant="deleted" />}
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/[0.01] border-b border-black/5">
          <div className="flex items-center gap-2 text-xs text-black/40">
            <Mail size={14} />
            <span className="capitalize">{msg.inquiryType}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black/40">
            <Clock size={14} />
            {format(new Date(msg.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </div>
          {msg.ip && (
            <div className="flex items-center gap-2 text-xs text-black/40">
              <Globe size={14} />
              {msg.ip}
            </div>
          )}
          {msg.userAgent && (
            <div className="flex items-center gap-2 text-xs text-black/40 truncate">
              <Monitor size={14} className="flex-shrink-0" />
              <span className="truncate">{msg.userAgent.substring(0, 50)}</span>
            </div>
          )}
        </div>

        {/* Subject */}
        {msg.subject && (
          <div className="px-6 py-3 border-b border-black/5">
            <p className="text-sm font-semibold text-black/70">Subject: {msg.subject}</p>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-sm text-black/70 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
        </div>

        {/* Reply CTA */}
        <div className="px-6 py-4 border-t border-black/5 bg-black/[0.01]">
          <a
            href={`mailto:${msg.email}?subject=Re: ${msg.inquiryType} Inquiry`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold hover:shadow-md transition-all"
          >
            <Mail size={14} />
            Reply via Email
          </a>
        </div>
      </div>

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await updateMessage({ isDeleted: true });
          setConfirmDelete(false);
        }}
        title="Delete Message"
        description="Are you sure you want to delete this message? It can be restored later."
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </motion.div>
  );
}
