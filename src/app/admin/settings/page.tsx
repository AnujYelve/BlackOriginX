"use client";

import { useState, useEffect } from "react";
import { FormField, adminInputClassName, adminTextareaClassName } from "@/components/admin/FormField";
import { MediaSelector } from "@/components/admin/MediaSelector";
import { Save, Building, Mail, Share2, Globe, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    tagline: "",
    companyDescription: "",
    logoUrl: "",
    faviconUrl: "",
    websiteUrl: "",
    primaryEmail: "",
    supportEmail: "",
    phoneNumber: "",
    address: "",
    googleMapsEmbedUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    youtubeUrl: "",
    footerCopyright: "",
    footerDescription: "",
    seoDefaultTitle: "",
    seoDefaultDescription: "",
    seoDefaultKeywords: "",
    openGraphImage: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const d = json.data;
          setForm({
            companyName: d.companyName || "",
            tagline: d.tagline || "",
            companyDescription: d.companyDescription || "",
            logoUrl: d.logoUrl || "",
            faviconUrl: d.faviconUrl || "",
            websiteUrl: d.websiteUrl || "",
            primaryEmail: d.primaryEmail || "",
            supportEmail: d.supportEmail || "",
            phoneNumber: d.phoneNumber || "",
            address: d.address || "",
            googleMapsEmbedUrl: d.googleMapsEmbedUrl || "",
            linkedinUrl: d.linkedinUrl || "",
            instagramUrl: d.instagramUrl || "",
            twitterUrl: d.twitterUrl || "",
            facebookUrl: d.facebookUrl || "",
            youtubeUrl: d.youtubeUrl || "",
            footerCopyright: d.footerCopyright || "",
            footerDescription: d.footerDescription || "",
            seoDefaultTitle: d.seoDefaultTitle || "",
            seoDefaultDescription: d.seoDefaultDescription || "",
            seoDefaultKeywords: d.seoDefaultKeywords || "",
            openGraphImage: d.openGraphImage || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
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
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-12">
      {/* Subnav links for Homepage CMS and Page SEO */}
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Site Settings</h1>
          <p className="text-sm text-black/40 mt-1">Configure global company information, contact details, social links, and defaults.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/settings/homepage"
            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-black/10 text-black/70 hover:bg-black/[0.02]"
          >
            Homepage CMS
          </Link>
          <Link
            href="/admin/settings/seo"
            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-black/10 text-black/70 hover:bg-black/[0.02]"
          >
            Page SEO
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm border border-green-200 flex items-center gap-2">
          <CheckCircle2 size={16} /> Site settings updated successfully!
        </div>
      )}

      {/* Fieldset 1: Company Profile */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
          <Building size={18} className="text-[#b87333]" /> Company Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Company Name">
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
          <FormField label="Tagline">
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
        </div>

        <FormField label="Company Description">
          <textarea
            rows={3}
            value={form.companyDescription}
            onChange={(e) => setForm({ ...form, companyDescription: e.target.value })}
            className={adminTextareaClassName}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Logo URL">
            <MediaSelector
              value={form.logoUrl}
              onChange={(url) => setForm({ ...form, logoUrl: url })}
            />
          </FormField>
          <FormField label="Website URL">
            <input
              type="url"
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              placeholder="https://blackoriginx.com"
              className={adminInputClassName}
            />
          </FormField>
        </div>
      </div>

      {/* Fieldset 2: Contact Details */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
          <Mail size={18} className="text-[#b87333]" /> Contact & Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Primary Contact Email">
            <input
              type="email"
              value={form.primaryEmail}
              onChange={(e) => setForm({ ...form, primaryEmail: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
          <FormField label="Support Email">
            <input
              type="email"
              value={form.supportEmail}
              onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Phone Number">
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
          <FormField label="Address / HQ">
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
        </div>

        <FormField label="Google Maps Embed URL">
          <textarea
            rows={2}
            value={form.googleMapsEmbedUrl}
            onChange={(e) => setForm({ ...form, googleMapsEmbedUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?..."
            className={adminTextareaClassName}
          />
        </FormField>
      </div>

      {/* Fieldset 3: Social Links */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
          <Share2 size={18} className="text-[#b87333]" /> Social Media Profiles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="LinkedIn URL">
            <input
              type="url"
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
          <FormField label="Instagram URL">
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
          <FormField label="Twitter / X URL">
            <input
              type="url"
              value={form.twitterUrl}
              onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
          <FormField label="YouTube URL">
            <input
              type="url"
              value={form.youtubeUrl}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              className={adminInputClassName}
            />
          </FormField>
        </div>
      </div>

      {/* Fieldset 4: Footer */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
          <Globe size={18} className="text-[#b87333]" /> Footer Content & SEO Defaults
        </h3>

        <FormField label="Footer Copyright Text">
          <input
            type="text"
            value={form.footerCopyright}
            onChange={(e) => setForm({ ...form, footerCopyright: e.target.value })}
            className={adminInputClassName}
          />
        </FormField>

        <FormField label="SEO Default Title">
          <input
            type="text"
            value={form.seoDefaultTitle}
            onChange={(e) => setForm({ ...form, seoDefaultTitle: e.target.value })}
            className={adminInputClassName}
          />
        </FormField>

        <FormField label="SEO Default Description">
          <textarea
            rows={2}
            value={form.seoDefaultDescription}
            onChange={(e) => setForm({ ...form, seoDefaultDescription: e.target.value })}
            className={adminTextareaClassName}
          />
        </FormField>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving Changes..." : "Save All Settings"}
        </button>
      </div>
    </form>
  );
}
