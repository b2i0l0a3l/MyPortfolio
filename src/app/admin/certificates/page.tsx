"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CertificateForm from "@/components/admin/CertificateForm";
import CertificateList from "@/components/admin/CertificateList";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  pdfUrl: string | null;
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete certificate");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCert(certificate);
    setIsOpen(true);
  };

  const handleClose = () => {
    setEditingCert(null);
    setIsOpen(false);
  };

  const handleSuccess = () => {
    fetchCertificates();
    handleClose();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Certificates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Display your credentials dynamically on the main page.
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-accent hover:bg-accent-hover text-accent-foreground gap-2 text-sm"
        >
          <Plus className="size-4" />
          Add Certificate
        </Button>
      </div>

      {loading ? (
        <div className="h-64 w-full bg-card/20 border border-border animate-pulse rounded-xl" />
      ) : (
        <CertificateList
          certificates={certificates}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Dialog for form */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-lg bg-background/95 border-border backdrop-blur-lg overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingCert ? "Edit Certificate" : "Add Certificate"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {editingCert ? "Update details of the selected certificate." : "Create a new certificate listing."}
            </DialogDescription>
          </DialogHeader>
          <CertificateForm
            initialData={editingCert}
            onSuccess={handleSuccess}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
