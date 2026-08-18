"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { format } from "date-fns";
import { Shield, Activity } from "lucide-react";

interface AuditLogEntry {
  id: string;
  adminEmail: string | null;
  action: string;
  entity: string | null;
  entityId: string | null;
  ip: string | null;
  createdAt: string;
}

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search,
      });
      const res = await fetch(`/api/admin/audit?${params}`);
      const json = await res.json();
      if (json.success) {
        setLogs(json.data);
        setTotal(json.pagination.total);
        setTotalPages(json.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const columns: Column<AuditLogEntry>[] = [
    {
      key: "admin",
      header: "Admin User",
      render: (log) => (
        <span className="font-semibold text-black/85 text-xs">
          {log.adminEmail || "System"}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (log) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/[0.04] text-[#b87333] border border-black/5 font-semibold">
          {log.action}
        </span>
      ),
    },
    {
      key: "entity",
      header: "Target Entity",
      render: (log) => (
        <span className="text-xs text-black/60">
          {log.entity || "N/A"} {log.entityId ? `(#${log.entityId.substring(0, 8)})` : ""}
        </span>
      ),
    },
    {
      key: "ip",
      header: "IP Address",
      render: (log) => <span className="text-xs text-black/40 font-mono">{log.ip || "N/A"}</span>,
    },
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-xs text-black/40">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' HH:mm:ss")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight flex items-center gap-2">
            <Shield size={24} className="text-[#b87333]" /> Audit Trail Log
          </h1>
          <p className="text-sm text-black/40 mt-1">
            Immutable log of all administrative actions, logins, and system changes for compliance and security.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <SearchBar
          value={search}
          onSearch={(q) => { setSearch(q); setPage(1); }}
          placeholder="Search by email, action, or entity..."
          className="w-full sm:w-96"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={logs}
        keyExtractor={(l) => l.id}
        loading={loading}
        emptyMessage="No audit log entries recorded"
        emptyIcon={<Activity size={40} className="mb-3 text-black/15" />}
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
    </div>
  );
}
