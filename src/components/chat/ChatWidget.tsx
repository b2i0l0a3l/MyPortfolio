"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm Bilal's AI assistant! Ask me anything about Bilal's experience, skills, projects, or goals. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Append a placeholder message for assistant streaming
    const assistantPlaceholder: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantPlaceholder]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to assistant");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No readable stream");

      let currentResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });
        currentResponse += textChunk;

        // Update last message
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: currentResponse,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please check if the Groq API key is configured properly or try again.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi, I'm Bilal's AI assistant! Ask me anything about Bilal's experience, skills, projects, or goals. How can I help you today?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded chat panel */}
      {isOpen && (
        <Card className="w-[360px] sm:w-[400px] h-[500px] mb-4 flex flex-col shadow-2xl border-border bg-card/95 backdrop-blur-xl animate-fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border/60 bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground shadow-sm">
                <Bot className="size-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold">Bilal's AI Agent</CardTitle>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-muted-foreground font-mono">llama-3.3-70b</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="size-7 rounded-full text-muted-foreground hover:text-foreground"
                title="Clear conversation"
              >
                <RefreshCw className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="size-7 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Message Area */}
          <ScrollArea className="flex-1 min-h-0 p-4" viewportRef={scrollRef}>
            <div className="space-y-4 pr-2">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              {isLoading && messages[messages.length - 1].content === "" && (
                <div className="flex gap-2 items-center text-xs text-muted-foreground font-mono pl-11">
                  <span className="size-1 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1 bg-accent rounded-full animate-bounce" />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer input */}
          <CardFooter className="p-3 border-t border-border/60 bg-muted/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about Bilal..."
                disabled={isLoading}
                className="flex-1 bg-background/50 border-border rounded-full py-1.5 px-4 text-sm focus:border-accent focus-visible:ring-accent/20"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="size-9 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="size-14 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 border-0"
      >
        {isOpen ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </Button>
    </div>
  );
}
