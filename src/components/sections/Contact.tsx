"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_DATA } from "@/lib/data";
import { Send, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${CONTACT_DATA.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-accent font-mono text-sm tracking-widest opacity-70">
            03
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
              {CONTACT_DATA.headline}
              <span className="text-accent">.</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
              {CONTACT_DATA.description}
            </p>

            {/* Email link */}
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="inline-flex items-center gap-3 text-accent hover:text-accent/80 transition-colors group mb-12"
            >
              <Mail size={18} />
              <span className="text-base md:text-lg font-medium border-b border-accent/30 group-hover:border-accent transition-colors">
                {CONTACT_DATA.email}
              </span>
            </a>

            <div className="flex flex-wrap gap-3">
              {CONTACT_DATA.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-accent border border-border hover:border-accent/30 rounded-full transition-all duration-300 bg-card/40"
                >
                  {social.name}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-background/50 border-border focus:border-accent focus-visible:ring-accent/20 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-background/50 border-border focus:border-accent focus-visible:ring-accent/20 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="bg-background/50 border-border focus:border-accent focus-visible:ring-accent/20 rounded-lg resize-none"
                  />
                </div>

                <div className="pt-2">
                  {submitted ? (
                    <p className="text-accent font-medium animate-fade-in-up">
                      ✓ Message draft opened in your mail app!
                    </p>
                  ) : (
                    <Button type="submit" className="w-full rounded-full bg-accent hover:bg-accent-hover text-accent-foreground gap-2">
                      Send Message
                      <Send size={14} />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-24 md:mt-32 pt-12 border-t border-border text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
            READY TO BUILD SOMETHING
            <br />
            <span className="text-accent">ICONIC</span>?
          </h3>
          <Button
            variant="outline"
            className="rounded-full border-border hover:bg-accent hover:text-accent-foreground"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
          <p className="text-muted-foreground/40 text-xs mt-10 tracking-wider">
            © {new Date().getFullYear()} Bilal El Amraoui. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
