"use client";

import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex w-full gap-3 py-2",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <div className="size-8 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center shrink-0">
          <Bot className="size-4 text-accent" />
        </div>
      )}

      <div
        className={cn(
          "rounded-2xl px-4 py-2 text-sm max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-sm",
          isAssistant
            ? "bg-muted text-foreground border border-border rounded-tl-none"
            : "bg-accent text-accent-foreground rounded-tr-none"
        )}
      >
        {content}
      </div>

      {!isAssistant && (
        <div className="size-8 rounded-full border border-border bg-card flex items-center justify-center shrink-0">
          <User className="size-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
