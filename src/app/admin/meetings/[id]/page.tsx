"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Globe, Calendar, Clock, DollarSign, Building, Trash2, CheckCircle2, User } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/Modal";

interface MeetingDetail {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  investmentType: string | null;
  investmentSize: string | null;
  message: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  status: "PENDING" | "SCHEDULED" | "COMPLETED" | "REJECTED";
  isContacted: boolean;
  createdAt: string;
}

export default function MeetingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/meetings/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setMeeting(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const updateMeeting = async (data: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/meetings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) setMeeting(json.data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
      </div>
    );
  }

  if (!meeting) {
    return <div className="text-center py-20 text-black/40">Meeting request not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl space-y-6"
    >
      {/* Back + Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/admin/meetings")}
          className="flex items-center gap-2 text-sm text-black/50 hover:text-black/70 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Meetings
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => updateMeeting({ isContacted: !meeting.isContacted })}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
              meeting.isContacted
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "border-black/10 text-black/60 hover:bg-black/[0.02]"
            }`}
          >
            <CheckCircle2 size={14} />
            {meeting.isContacted ? "Contacted" : "Mark as Contacted"}
          </button>

          <select
            value={meeting.status}
            onChange={(e) => updateMeeting({ status: e.target.value })}
            className="text-xs font-semibold bg-white border border-black/10 rounded-xl px-3 py-2 text-black/80 focus:outline-none focus:border-[#b87333]/40 cursor-pointer"
          >
            <option value="PENDING">Pending</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button
            onClick={() => setConfirmDelete(true)}
            className="p-2 text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Detail Card */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
        {/* Card Header */}
        <div className="px-6 py-6 border-b border-black/5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-black/85">{meeting.name}</h2>
              <StatusBadge variant={meeting.status.toLowerCase() as "pending" | "scheduled" | "completed" | "rejected"} />
            </div>
            <p className="text-sm font-medium text-[#b87333]">
              {meeting.company || "Individual Investor"}
            </p>
          </div>
          <span className="text-xs text-black/35">
            Submitted {format(new Date(meeting.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border-b border-black/5 bg-black/[0.01]">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-black/35 tracking-wider">Email</span>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80">
              <Mail size={14} className="text-[#b87333]" />
              <a href={`mailto:${meeting.email}`} className="hover:underline">
                {meeting.email}
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-black/35 tracking-wider">Phone</span>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80">
              <Phone size={14} className="text-[#b87333]" />
              {meeting.phone || "N/A"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-black/35 tracking-wider">Country</span>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80">
              <Globe size={14} className="text-[#b87333]" />
              {meeting.country || "N/A"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-black/35 tracking-wider">Investment Type</span>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80">
              <Building size={14} className="text-[#b87333]" />
              {meeting.investmentType || "General"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-black/35 tracking-wider">Investment Size</span>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80">
              <DollarSign size={14} className="text-[#b87333]" />
              {meeting.investmentSize || "N/A"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-black/35 tracking-wider">Preferred Time</span>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80">
              <Calendar size={14} className="text-[#b87333]" />
              {meeting.preferredDate || "Flexible"}{" "}
              {meeting.preferredTime ? `(${meeting.preferredTime})` : ""}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="p-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-3">Investor Message</h4>
          <p className="text-sm text-black/75 leading-relaxed whitespace-pre-wrap font-light">
            {meeting.message || "No additional message provided."}
          </p>
        </div>

        {/* CTA */}
        <div className="px-6 py-4 border-t border-black/5 bg-black/[0.01] flex items-center justify-between">
          <a
            href={`mailto:${meeting.email}?subject=BlackOriginX Investor Relations: Meeting Confirmation`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Mail size={16} />
            Contact Investor
          </a>
        </div>
      </div>

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await fetch(`/api/admin/meetings/${id}`, { method: "DELETE" });
          router.push("/admin/meetings");
        }}
        title="Delete Meeting Request"
        description="Are you sure you want to delete this investor meeting request?"
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </motion.div>
  );
}
