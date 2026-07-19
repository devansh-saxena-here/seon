import { motion } from "motion/react";
import { Activity, Bot, Building2, Leaf, LineChart, ShieldCheck, Zap, Cpu } from "lucide-react";

const features = [
  { icon: Activity, title: "Real-time monitoring", desc: "Second-by-second visibility into every building, floor, and device." },
  { icon: Bot, title: "AI recommendations", desc: "Gemini-powered suggestions turn raw data into savings and clear next steps." },
  { icon: Leaf, title: "ESG intelligence", desc: "Automatic carbon accounting, green scoring, and sustainability narratives." },
  { icon: LineChart, title: "Predictive analytics", desc: "Forecast peak demand, cost spikes, and equipment fatigue before they happen." },
  { icon: ShieldCheck, title: "Enterprise-grade", desc: "Role-based access, audit trails, and SOC-friendly architecture out of the box." },
  { icon: Cpu, title: "Device intelligence", desc: "Categorize AC, lighting, computing, and appliances with anomaly detection." },
];

export function Features() {
  return (
    <section id="features" className="bg-section-sky py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-primary">What SEON does</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">One calm workspace for every kilowatt</h2>
          <p className="mt-3 text-muted-foreground">
            From live telemetry to boardroom-ready ESG reports, SEON removes the busywork so your team can focus on outcomes.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="card-hover rounded-2xl border bg-card p-6"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Connect", desc: "Ingest data from meters, BMS, or CSV — SEON normalizes it instantly." },
  { n: "02", title: "Understand", desc: "Live dashboards and Gemini narratives explain what's happening, why, and where." },
  { n: "03", title: "Optimize", desc: "Approve AI suggestions, automate schedules, and watch consumption drop." },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-section-emerald py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Three steps from telemetry to impact</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border bg-card p-6"
            >
              <span className="font-display text-4xl font-semibold text-primary/30">{s.n}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stack = ["React 19", "TypeScript", "TanStack Start", "Tailwind v4", "Recharts", "Framer Motion", "Google Gemini", "shadcn/ui"];
export function TechStack() {
  return (
    <section className="border-y bg-section-muted py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Built with a modern stack</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {stack.map((s) => (
            <span key={s} className="rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { quote: "SEON gave our facilities team the clarity we'd been trying to build in spreadsheets for years.", name: "Aisha Rahman", role: "Head of Sustainability, Northwind" },
  { quote: "Deployed on Monday, saw a 9% reduction by Friday. The AI recommendations feel like a real analyst.", name: "Marco Silva", role: "Operations Director, Kestrel Group" },
  { quote: "The ESG dashboard alone paid for the platform in a single quarterly report cycle.", name: "Priya Menon", role: "CFO, Orbital Labs" },
];

export function Testimonials() {
  return (
    <section className="bg-section-indigo py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Trusted by teams</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Quiet software. Loud results.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border bg-card p-6"
            >
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <footer className="mt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="glass overflow-hidden rounded-3xl border p-10 text-center shadow-elegant">
          <Zap className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Every kilowatt, accounted for.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Launch the SEON prototype and explore live dashboards, AI insights, and ESG reporting in seconds.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/app" className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Open the dashboard
            </a>
            <a href="/login" className="inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium hover:bg-accent">
              Try demo login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// dummy import to keep Building2 used
void Building2;
