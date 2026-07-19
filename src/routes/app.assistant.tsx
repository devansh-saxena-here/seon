import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, Sparkles, User } from "lucide-react";

export const Route = createFileRoute("/app/assistant")({
  component: Assistant,
});

const suggestions = [
  "How can I reduce electricity consumption?",
  "Explain today's dashboard.",
  "Generate a weekly report summary.",
  "What is ESG and why does it matter?",
  "Why is energy consumption increasing?",
  "Suggest 5 energy-saving ideas.",
];

function Assistant() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (e) => console.error(e),
  });
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    void sendMessage({ text: t });
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-semibold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> SEON Assistant
        </h1>
        <p className="text-sm text-muted-foreground">Ask about your consumption, ESG performance, or how to save more.</p>
      </div>

      <Card className="flex h-[70vh] flex-col overflow-hidden">
        <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="mx-auto max-w-lg text-center py-10">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">How can I help?</h3>
              <p className="text-sm text-muted-foreground">Try one of these prompts:</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => submit(s)}
                    className="rounded-full border bg-card px-3 py-1.5 text-xs hover:bg-accent">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              const isUser = m.role === "user";
              return (
                <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 flex-none">
                    <AvatarFallback className={isUser ? "bg-sky/20 text-sky" : "bg-primary/15 text-primary"}>
                      {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    <pre className="whitespace-pre-wrap break-words font-sans">{text}</pre>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {busy && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" />
              SEON is thinking…
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="border-t bg-background p-3">
          <div className="flex items-end gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
              placeholder="Ask about consumption, ESG, savings…"
              rows={1}
              className="min-h-10 resize-none"
            />
            <Button type="submit" disabled={busy || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
