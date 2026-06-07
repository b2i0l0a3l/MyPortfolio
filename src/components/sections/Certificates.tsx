"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  pdfUrl: string | null;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <section id="certificates" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-20 bg-muted/20 border-y border-border relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-accent font-mono text-sm tracking-widest opacity-70">
            02.5
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Accreditation
          </h2>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-10 sm:mb-16 md:mb-20">
          CERTIFICATIONS<span className="text-accent">.</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border-border animate-pulse h-64" />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No certificates uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer bg-card/50 border-border hover:border-accent/40 hover:-translate-y-1 transition-all duration-350 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted w-full">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/5 to-purple-900/5">
                      <Award className="size-10 text-accent/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-mono uppercase tracking-wider text-white bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                      View Credential
                    </span>
                  </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base line-clamp-1 group-hover:text-accent transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 mt-4 pt-3 border-t border-border/60">
                    <Calendar className="size-3.5 text-accent/70" />
                    <span>{formatDate(cert.date)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog for details/full view */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="max-w-2xl bg-background/95 border-border backdrop-blur-lg">
          {selectedCert && (
            <>
              <DialogTitle className="text-xl font-bold">{selectedCert.title}</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground -mt-2">
                Issued by {selectedCert.issuer} on {formatDate(selectedCert.date)}
              </DialogDescription>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted mt-4">
                {selectedCert.image ? (
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="size-16 text-accent/20" />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                {selectedCert.pdfUrl && (
                  <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs" render={<a href={selectedCert.pdfUrl} target="_blank" rel="noopener noreferrer" />}>
                    <ExternalLink className="size-3.5" />
                    View PDF / Link
                  </Button>
                )}
                <Button size="sm" className="rounded-full text-xs bg-accent hover:bg-accent-hover text-accent-foreground" onClick={() => setSelectedCert(null)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
