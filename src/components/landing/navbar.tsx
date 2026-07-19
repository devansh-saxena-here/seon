import { Link } from "@tanstack/react-router";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const nav = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "AI Assistant", href: "#ai" },
  { label: "ESG", href: "#esg" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-elegant">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">SEON</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </Button>
            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/app" className="hidden md:block">
              <Button size="sm" className="rounded-full">Launch app</Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden"
            >
              {nav.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                  {n.label}
                </a>
              ))}
              <Link to="/login" className="rounded-md px-3 py-2 text-sm hover:bg-accent">Sign in</Link>
              <Link to="/app" className="rounded-md px-3 py-2 text-sm text-primary">Launch app →</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
