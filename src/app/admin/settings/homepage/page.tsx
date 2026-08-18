"use client";

import { useState, useEffect } from "react";
import { FormField, adminInputClassName, adminTextareaClassName } from "@/components/admin/FormField";
import { Save, Globe, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CmsSection {
  id: string;
  sectionKey: string;
  content: any;
}

export default function HomepageCmsPage() {
  const [sections, setSections] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successKey, setSuccessKey] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings/homepage")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const map: Record<string, any> = {};
          json.data.forEach((item: CmsSection) => {
            map[item.sectionKey] = item.content;
          });
          setSections(map);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSection = async (sectionKey: string) => {
    setSavingKey(sectionKey);
    setSuccessKey(null);

    try {
      const res = await fetch("/api/admin/settings/homepage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey,
          content: sections[sectionKey],
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccessKey(sectionKey);
        setTimeout(() => setSuccessKey(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
    setSavingKey(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
      </div>
    );
  }

  const hero = sections.hero || { headline: "", subheadline: "" };
  const vision = sections.vision || { headline: "", description: "" };
  const mission = sections.mission || { headline: "", description: "" };
  const cta = sections.cta || { headline: "", description: "" };

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 text-xs text-[#b87333] hover:underline font-semibold mb-1"
          >
            <ArrowLeft size={12} /> Back to Site Settings
          </Link>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Homepage CMS Editor</h1>
          <p className="text-sm text-black/40 mt-1">Manage content sections displayed on the main homepage without hardcoded text.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
            <Globe size={18} className="text-[#b87333]" /> Hero Section
          </h3>
          <button
            onClick={() => handleSaveSection("hero")}
            disabled={savingKey === "hero"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-xs font-semibold shadow"
          >
            <Save size={14} /> {savingKey === "hero" ? "Saving..." : "Save Hero"}
          </button>
        </div>

        {successKey === "hero" && (
          <p className="text-xs text-green-600 font-semibold">Hero section updated!</p>
        )}

        <FormField label="Hero Headline">
          <input
            type="text"
            value={hero.headline || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                hero: { ...prev.hero, headline: e.target.value },
              }))
            }
            className={adminInputClassName}
          />
        </FormField>

        <FormField label="Hero Subheadline">
          <textarea
            rows={3}
            value={hero.subheadline || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                hero: { ...prev.hero, subheadline: e.target.value },
              }))
            }
            className={adminTextareaClassName}
          />
        </FormField>
      </div>

      {/* Vision Section */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="text-base font-bold text-black/85">Vision Section</h3>
          <button
            onClick={() => handleSaveSection("vision")}
            disabled={savingKey === "vision"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-xs font-semibold shadow"
          >
            <Save size={14} /> {savingKey === "vision" ? "Saving..." : "Save Vision"}
          </button>
        </div>

        {successKey === "vision" && (
          <p className="text-xs text-green-600 font-semibold">Vision section updated!</p>
        )}

        <FormField label="Vision Headline">
          <input
            type="text"
            value={vision.headline || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                vision: { ...prev.vision, headline: e.target.value },
              }))
            }
            className={adminInputClassName}
          />
        </FormField>

        <FormField label="Vision Statement">
          <textarea
            rows={3}
            value={vision.description || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                vision: { ...prev.vision, description: e.target.value },
              }))
            }
            className={adminTextareaClassName}
          />
        </FormField>
      </div>

      {/* Mission Section */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="text-base font-bold text-black/85">Mission Section</h3>
          <button
            onClick={() => handleSaveSection("mission")}
            disabled={savingKey === "mission"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-xs font-semibold shadow"
          >
            <Save size={14} /> {savingKey === "mission" ? "Saving..." : "Save Mission"}
          </button>
        </div>

        {successKey === "mission" && (
          <p className="text-xs text-green-600 font-semibold">Mission section updated!</p>
        )}

        <FormField label="Mission Headline">
          <input
            type="text"
            value={mission.headline || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                mission: { ...prev.mission, headline: e.target.value },
              }))
            }
            className={adminInputClassName}
          />
        </FormField>

        <FormField label="Mission Statement">
          <textarea
            rows={3}
            value={mission.description || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                mission: { ...prev.mission, description: e.target.value },
              }))
            }
            className={adminTextareaClassName}
          />
        </FormField>
      </div>

      {/* CTA Section */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="text-base font-bold text-black/85">Bottom CTA Section</h3>
          <button
            onClick={() => handleSaveSection("cta")}
            disabled={savingKey === "cta"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-xs font-semibold shadow"
          >
            <Save size={14} /> {savingKey === "cta" ? "Saving..." : "Save CTA"}
          </button>
        </div>

        {successKey === "cta" && (
          <p className="text-xs text-green-600 font-semibold">CTA section updated!</p>
        )}

        <FormField label="CTA Headline">
          <input
            type="text"
            value={cta.headline || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                cta: { ...prev.cta, headline: e.target.value },
              }))
            }
            className={adminInputClassName}
          />
        </FormField>

        <FormField label="CTA Description">
          <textarea
            rows={3}
            value={cta.description || ""}
            onChange={(e) =>
              setSections((prev) => ({
                ...prev,
                cta: { ...prev.cta, description: e.target.value },
              }))
            }
            className={adminTextareaClassName}
          />
        </FormField>
      </div>
    </div>
  );
}
