"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/Modal";
import { formatDistanceToNow } from "date-fns";
import { Users, Download, Trash2, CheckCircle2 } from "lucide-react";

interface Meeting {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  investmentType: string | null;
  investmentSize: string | null;
  status: "PENDING" | "SCHEDULED" | "COMPLETED" | "REJECTED";
  isContacted: boolean;
  createdAt: string;
}

export default function AdminMeetingsPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search,
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      const res = await fetch(`/api/admin/meetings?${params}`);
      const json = await res.json();
      if (json.success) {
        setMeetings(json.data);
        setTotal(json.pagination.total);
        setTotalPages(json.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    }
    setLoading(false);
  }, [page, pageSize, search, statusFilter]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const handleExportCSV = () => {
    window.open("/api/admin/meetings/export", "_blank");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/meetings/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      fetchMeetings();
    } catch (error) {
      console.error("Failed to delete meeting:", error);
    }
  };

  const columns: Column<Meeting>[] = [
    {
      key: "investor",
      header: "Investor",
      render: (m) => (
        <div>
          <p className="font-semibold text-black/85">{m.name}</p>
          <p className="text-[11px] text-black/35">{m.company || "Individual Investor"}</p>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (m) => (
        <div>
          <p className="text-xs text-black/70">{m.email}</p>
          <p className="text-[11px] text-black/35">{m.phone || m.country || "N/A"}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type & Size",
      render: (m) => (
        <div>
          <p className="text-xs font-medium text-black/70">{m.investmentType || "General"}</p>
          <p className="text-[11px] text-black/35">{m.investmentSize || "N/A"}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <div className="flex items-center gap-1.5">
          <StatusBadge variant={m.status.toLowerCase() as "pending" | "scheduled" | "completed" | "rejected"} />
          {m.isContacted && (
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <CheckCircle2 size={10} /> Contacted
            </span>
          )}
        </div>
      ),
    },
    {
      key: "date",
      header: "Requested",
      render: (m) => (
        <span className="text-xs text-black/40">
          {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (m) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setDeleteId(m.id)}
            className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Investor Meetings</h1>
          <p className="text-sm text-black/40 mt-1">{total} meeting requests total</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 text-black/70 hover:text-black hover:border-black/20 text-sm font-semibold transition-all bg-white shadow-sm"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-1 bg-black/[0.02] rounded-xl p-1 border border-black/5 overflow-x-auto">
          {[
            { key: "", label: "All" },
            { key: "PENDING", label: "Pending" },
            { key: "SCHEDULED", label: "Scheduled" },
            { key: "COMPLETED", label: "Completed" },
            { key: "REJECTED", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setStatusFilter(tab.key); setPage(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                statusFilter === tab.key
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
          placeholder="Search meetings..."
          className="w-full sm:w-80"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={meetings}
        keyExtractor={(m) => m.id}
        onRowClick={(m) => router.push(`/admin/meetings/${m.id}`)}
        loading={loading}
        emptyMessage="No meeting requests found"
        emptyIcon={<Users size={40} className="mb-3 text-black/15" />}
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

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Meeting Request"
        description="Are you sure you want to delete this investor meeting request? It can be restored later."
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}
