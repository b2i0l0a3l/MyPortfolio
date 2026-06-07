"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  pdfUrl: string | null;
}

interface CertificateListProps {
  certificates: Certificate[];
  onEdit: (certificate: Certificate) => void;
  onDelete: (id: string) => void;
}

export default function CertificateList({
  certificates,
  onEdit,
  onDelete,
}: CertificateListProps) {
  if (certificates.length === 0) {
    return (
      <div className="text-center py-10 text-xs font-mono text-muted-foreground border border-dashed border-border rounded-xl">
        No certificates found. Add your first certificate!
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/20 backdrop-blur-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Title</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Issuer</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Date</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Attachments</TableHead>
            <TableHead className="text-right font-mono text-xs uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.id} className="hover:bg-muted/10">
              <TableCell className="font-semibold text-sm">{cert.title}</TableCell>
              <TableCell className="text-xs">{cert.issuer}</TableCell>
              <TableCell className="font-mono text-xs">{formatDate(cert.date)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {cert.image && (
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline inline-flex items-center gap-0.5"
                    >
                      Image <ExternalLink className="size-3" />
                    </a>
                  )}
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline inline-flex items-center gap-0.5"
                    >
                      PDF <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(cert)}
                    className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                    title="Edit certificate"
                  >
                    <Edit className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this certificate?")) {
                        onDelete(cert.id);
                      }
                    }}
                    className="size-8 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                    title="Delete certificate"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
