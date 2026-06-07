"use client";


interface LazySectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function LazySection({
  children,
  id,
  className = "",
}: LazySectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}
