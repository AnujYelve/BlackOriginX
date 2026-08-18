"use client";

import { useState, useEffect } from "react";
import { FormField, adminInputClassName } from "@/components/admin/FormField";
import { MediaSelector } from "@/components/admin/MediaSelector";
import { Save, UserCircle, KeyRound, CheckCircle2 } from "lucide-react";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    avatarUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setForm((prev) => ({
            ...prev,
            name: json.data.name || "",
            email: json.data.email || "",
            role: json.data.role || "",
            avatarUrl: json.data.avatarUrl || "",
          }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          avatarUrl: form.avatarUrl,
          ...(form.newPassword ? { currentPassword: form.currentPassword, newPassword: form.newPassword } : {}),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(json.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black/85 tracking-tight flex items-center gap-2">
          <UserCircle size={24} className="text-[#b87333]" /> Admin Profile
        </h1>
        <p className="text-sm text-black/40 mt-1">
          Update your display name, avatar, and security credentials.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm border border-green-200 flex items-center gap-2">
          <CheckCircle2 size={16} /> Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
          {error}
        </div>
      )}

      {/* Profile Details Card */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-black/85">Account Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Email Address" helpText="Primary login email (read-only)">
            <input
              type="email"
              disabled
              value={form.email}
              className={`${adminInputClassName} bg-black/[0.02] cursor-not-allowed text-black/50`}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Role">
            <input
              type="text"
              disabled
              value={form.role}
              className={`${adminInputClassName} bg-black/[0.02] cursor-not-allowed text-black/50`}
            />
          </FormField>
          <FormField label="Avatar Image URL">
            <MediaSelector
              value={form.avatarUrl}
              onChange={(url) => setForm({ ...form, avatarUrl: url })}
            />
          </FormField>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
          <KeyRound size={18} className="text-[#b87333]" /> Change Password
        </h3>
        <p className="text-xs text-black/40">Leave blank if you do not want to change your password.</p>

        <FormField label="Current Password">
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            placeholder="••••••••"
            className={adminInputClassName}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="New Password">
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              placeholder="••••••••"
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Confirm New Password">
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className={adminInputClassName}
            />
          </FormField>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving Changes..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
