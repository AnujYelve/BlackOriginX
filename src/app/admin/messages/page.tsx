"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/Modal";
import { formatDistanceToNow } from "date-fns";
import { Mail, Archive, Trash2, Eye, EyeOff } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; action: string }>({ open: false, action: "" });

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search,
        filter,
      });
      const res = await fetch(`/api/admin/messages?${params}`);
      const json = await res.json();
      if (json.success) {
        setMessages(json.data);
        setTotal(json.pagination.total);
        setTotalPages(json.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
    setLoading(false);
  }, [page, pageSize, search, filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) return;
    try {
      await fetch("/api/admin/messages/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, action }),
      });
      setSelectedIds([]);
      setConfirmModal({ open: false, action: "" });
      fetchMessages();
    } catch (error) {
      console.error("Bulk action failed:", error);
    }
  };

  const columns: Column<Message>[] = [
    {
      key: "status",
      header: "",
      className: "w-8",
      render: (msg) => (
        <div className={`w-2 h-2 rounded-full ${msg.isRead ? "bg-black/10" : "bg-[#b87333]"}`} />
      ),
    },
    {
      key: "name",
      header: "Sender",
      render: (msg) => (
        <div>
          <p className={`text-sm ${msg.isRead ? "text-black/60" : "font-semibold text-black/80"}`}>{msg.name}</p>
          <p className="text-[11px] text-black/35">{msg.email}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (msg) => <span className="text-xs text-black/50 capitalize">{msg.inquiryType}</span>,
    },
    {
      key: "preview",
      header: "Message",
      render: (msg) => (
        <p className="text-sm text-black/50 truncate max-w-[300px]">{msg.message}</p>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (msg) => (
        <span className="text-xs text-black/40">
          {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
        </span>
      ),
    },
    {
      key: "badges",
      header: "Status",
      render: (msg) => (
        <div className="flex gap-1">
          <StatusBadge variant={msg.isRead ? "read" : "unread"} />
          {msg.isArchived && <StatusBadge variant="archived" />}
        </div>
      ),
    },
  ];

  const filterTabs = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Contact Messages</h1>
          <p className="text-sm text-black/40 mt-1">{total} total messages</p>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-1 bg-black/[0.02] rounded-xl p-1 border border-black/5">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setFilter(tab.key); setPage(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab.key
                  ? "bg-white text-black/80 shadow-sm border border-black/5"
                  : "text-black/40 hover:text-black/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <SearchBar
          value={search}
          onSearch={(q) => { setSearch(q); setPage(1); }}
          placeholder="Search messages..."
          className="w-full sm:w-80"
        />
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 bg-[#b87333]/5 border border-[#b87333]/15 rounded-xl px-4 py-2">
          <span className="text-sm text-[#b87333] font-medium">{selectedIds.length} selected</span>
          <div className="h-4 w-px bg-[#b87333]/20" />
          <button onClick={() => handleBulkAction("markRead")} className="text-xs text-black/50 hover:text-black/70 flex items-center gap-1"><Eye size={12} /> Mark Read</button>
          <button onClick={() => handleBulkAction("markUnread")} className="text-xs text-black/50 hover:text-black/70 flex items-center gap-1"><EyeOff size={12} /> Mark Unread</button>
          <button onClick={() => handleBulkAction("archive")} className="text-xs text-black/50 hover:text-black/70 flex items-center gap-1"><Archive size={12} /> Archive</button>
          <button onClick={() => setConfirmModal({ open: true, action: "delete" })} className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1"><Trash2 size={12} /> Delete</button>
        </div>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={messages}
        keyExtractor={(msg) => msg.id}
        selectedIds={selectedIds}
        onSelectChange={setSelectedIds}
        onRowClick={(msg) => router.push(`/admin/messages/${msg.id}`)}
        loading={loading}
        emptyMessage="No messages found"
        emptyIcon={<Mail size={40} className="mb-3 text-black/15" />}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, action: "" })}
        onConfirm={() => handleBulkAction("delete")}
        title="Delete Messages"
        description={`Are you sure you want to delete ${selectedIds.length} message(s)? They can be restored later.`}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}
