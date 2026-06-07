"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  pdfUrl: string | null;
}

interface CertificateFormProps {
  initialData?: Certificate | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CertificateForm({
  initialData,
  onSuccess,
  onCancel,
}: CertificateFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    image: "",
    pdfUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        issuer: initialData.issuer || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
        image: initialData.image || "",
        pdfUrl: initialData.pdfUrl || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      image: formData.image || null,
      pdfUrl: formData.pdfUrl || null,
    };

    try {
      const url = initialData ? `/api/certificates/${initialData.id}` : "/api/certificates";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert("Failed to save certificate");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="cert-title">Certificate Title</Label>
        <Input
          id="cert-title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Next.js Developer Course"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cert-issuer">Issuer / Organization</Label>
        <Input
          id="cert-issuer"
          required
          value={formData.issuer}
          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
          placeholder="e.g. Udemy, Coursera, freeCodeCamp"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cert-date">Date Issued</Label>
        <Input
          id="cert-date"
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Certificate Image / PDF (Upload via Uploadthing)</Label>
        <div className="grid grid-cols-1 gap-3">
          <Input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Enter image URL directly"
          />
          <Input
            type="url"
            value={formData.pdfUrl}
            onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
            placeholder="Enter PDF/Link URL directly"
          />
          <div className="text-center text-xs text-muted-foreground font-mono">
            Or upload files:
          </div>
          <UploadDropzone
            endpoint="certificateFile"
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                const url = res[0].serverData?.url || res[0].ufsUrl || res[0].url;
                if (url.endsWith(".pdf")) {
                  setFormData((prev) => ({ ...prev, pdfUrl: url }));
                } else {
                  setFormData((prev) => ({ ...prev, image: url }));
                }
                alert("Upload complete!");
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed: ${error.message}`);
            }}
            className="ut-label:text-xs ut-button:bg-accent ut-button:text-accent-foreground ut-allowed-content:text-[10px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-end pt-4 border-t border-border/60">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent-hover text-accent-foreground"
        >
          {loading ? "Saving..." : initialData ? "Update Certificate" : "Add Certificate"}
        </Button>
      </div>
    </form>
  );
}
