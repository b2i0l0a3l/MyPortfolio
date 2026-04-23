"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_DATA } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Send, Mail, ArrowUpRight } from "lucide-react";


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
    <div className="py-24 md:py-32 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle number="03" title="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {CONTACT_DATA.headline}
              <span className="text-accent">.</span>
            </h2>

            <p className="text-secondary text-base md:text-lg leading-relaxed mb-10">
              {CONTACT_DATA.description}
            </p>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="inline-flex items-center gap-3 text-accent hover:text-accent-hover transition-colors group mb-12"
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
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-accent border border-white/10 hover:border-accent/30 rounded-full transition-all duration-300"
                >
                  {social.name}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="group">
              <label
                htmlFor="contact-name"
                className="block text-xs uppercase tracking-[0.2em] text-secondary mb-3 group-focus-within:text-accent transition-colors"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/10 focus:border-accent py-3 text-primary text-base outline-none transition-colors duration-300 placeholder:text-secondary/30"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="group">
              <label
                htmlFor="contact-email"
                className="block text-xs uppercase tracking-[0.2em] text-secondary mb-3 group-focus-within:text-accent transition-colors"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/10 focus:border-accent py-3 text-primary text-base outline-none transition-colors duration-300 placeholder:text-secondary/30"
                placeholder="your@email.com"
              />
            </div>

            {/* Message */}
            <div className="group">
              <label
                htmlFor="contact-message"
                className="block text-xs uppercase tracking-[0.2em] text-secondary mb-3 group-focus-within:text-accent transition-colors"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/10 focus:border-accent py-3 text-primary text-base outline-none transition-colors duration-300 resize-none placeholder:text-secondary/30"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              {submitted ? (
                <p className="text-accent font-medium animate-fade-in-up">
                  ✓ Message sent successfully!
                </p>
              ) : (
                <Button type="submit" size="lg">
                  Send Message
                  <Send size={16} />
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Footer CTA */}
        <div className="mt-24 md:mt-32 pt-12 border-t border-white/5 text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
            READY TO BUILD SOMETHING
            <br />
            <span className="text-accent">ICONIC</span>?
          </h3>
          <Button href="#hero" variant="outline" size="lg">
            Back to Top
          </Button>
          <p className="text-secondary/40 text-xs mt-10 tracking-wider">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
