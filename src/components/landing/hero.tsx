import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Activity, Leaf } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-hero">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Gemini-powered energy intelligence</span>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            The operating system for
            <br className="hidden md:block" />
            <span className="text-gradient-brand"> smart energy.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            SEON unifies real-time monitoring, AI recommendations, and ESG reporting into one calm,
            elegant workspace — so your buildings run leaner every hour.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app">
              <Button size="lg" className="rounded-full">
                Open dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="rounded-full">Explore features</Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="glass rounded-2xl p-2 shadow-elegant">
            <div className="rounded-xl bg-background/60 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Live overview</p>
                  <h3 className="font-display text-lg font-semibold">Today's consumption</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Streaming
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <PreviewMetric icon={<Activity className="h-4 w-4" />} label="Total kWh" value="4,218" delta="-6.4%" />
                <PreviewMetric icon={<Leaf className="h-4 w-4" />} label="CO₂ avoided" value="1.82 t" delta="+12.1%" positive />
                <PreviewMetric icon={<Sparkles className="h-4 w-4" />} label="AI optimizations" value="14" delta="active" positive />
              </div>
              <div className="mt-5 grid grid-cols-7 items-end gap-2 h-32">
                {[42, 58, 76, 61, 88, 96, 54].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                    className="rounded-md bg-gradient-to-t from-primary/40 to-primary"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewMetric({ icon, label, value, delta, positive }: { icon: React.ReactNode; label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <div className="rounded-lg border bg-card/50 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}<span>{label}</span>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="font-display text-2xl font-semibold">{value}</span>
        <span className={`text-xs ${positive ? "text-primary" : "text-muted-foreground"}`}>{delta}</span>
      </div>
    </div>
  );
}
