import { prisma } from "@/lib/prisma";
import type { AuditAction } from "@/types";

interface AuditLogParams {
  adminId?: string | null;
  adminEmail?: string | null;
  action: AuditAction;
  entity?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
  ip?: string | null;
}

/**
 * Creates an audit log entry. Fire-and-forget — errors are logged but don't propagate.
 * Called from API routes after any admin write operation.
 */
export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: params.adminId ?? null,
        adminEmail: params.adminEmail ?? null,
        action: params.action,
        entity: params.entity ?? null,
        entityId: params.entityId ?? null,
        metadata: params.metadata ? (params.metadata as any) : undefined,
        ip: params.ip ?? null,
      },
    });
  } catch (error) {
    console.error("[AuditLog] Failed to write audit log:", error);
  }
}
