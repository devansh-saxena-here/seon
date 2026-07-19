import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCountUp } from "@/hooks/use-count-up";
import { alerts, aiSuggestions, activity, buildings, distribution, hourlyToday, weeklyUsage } from "@/lib/demo-data";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Activity, AlertTriangle, ArrowUpRight, Bot, Building2, Leaf, Zap, PlayCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const COLORS = ["var(--emerald)", "var(--sky)", "var(--indigo)", "oklch(0.72 0.15 90)", "oklch(0.65 0.2 30)"];

function Dashboard() {
  const today = useCountUp(4218);
  const week = useCountUp(30021);
  const month = useCountUp(128420);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good afternoon, Devansh</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Here's your energy overview</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/app/reports"><Button variant="outline" size="sm">Generate report</Button></Link>
          <Link to="/app/assistant"><Button size="sm"><Bot className="mr-1.5 h-4 w-4" />Ask SEON</Button></Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={<Activity className="h-4 w-4" />} label="Today" value={`${today.toFixed(0)} kWh`} delta="−6.4%" positive />
        <Kpi icon={<Zap className="h-4 w-4" />} label="This week" value={`${week.toFixed(0)} kWh`} delta="−3.1%" positive />
        <Kpi icon={<Leaf className="h-4 w-4" />} label="This month" value={`${month.toFixed(0)} kWh`} delta="+1.8%" />
        <Kpi icon={<Building2 className="h-4 w-4" />} label="Buildings · Devices" value="3 · 129" delta="Live" positive />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Consumption trend */}
        <Card className="lg:col-span-2 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Today</p>
              <h3 className="font-display text-lg font-semibold">Hourly consumption</h3>
            </div>
            <Badge variant="outline" className="gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />Live</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyToday}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--emerald)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--emerald)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" interval={3} />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="kwh" stroke="var(--emerald)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution */}
        <Card className="p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Distribution</p>
          <h3 className="font-display text-lg font-semibold">By category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                  {distribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Weekly */}
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Week</p>
              <h3 className="font-display text-lg font-semibold">Usage vs target</h3>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyUsage}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="target" fill="var(--muted)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="kwh" fill="var(--sky)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Alerts</h3>
            <Badge variant="secondary">{alerts.length}</Badge>
          </div>
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li key={a.id} className="flex items-start gap-3 rounded-lg border p-3">
                <span className={`mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-md ${
                  a.level === "high" ? "bg-destructive/10 text-destructive" :
                  a.level === "medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                  "bg-primary/10 text-primary"
                }`}><AlertTriangle className="h-3.5 w-3.5" /></span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{a.desc}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Buildings */}
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Buildings</h3>
            <Link to="/app/monitoring" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {buildings.map((b) => (
              <motion.div key={b.id} whileHover={{ y: -2 }} className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{b.name}</p>
                  <Badge variant={b.status === "High Load" ? "destructive" : "secondary"} className="text-[10px]">{b.status}</Badge>
                </div>
                <p className="mt-2 font-display text-2xl font-semibold">{b.usage} <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{b.rooms} rooms · {b.devices} devices</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
                <Progress value={Math.min(100, (b.usage / 300) * 100)} className="mt-3 h-1.5" />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* AI Suggestions */}
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI insights</h3>
          </div>
          <ul className="space-y-2">
            {aiSuggestions.map((s, i) => (
              <li key={i} className="rounded-lg border p-3 card-hover">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.impact}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{s.tag}</Badge>
                </div>
                <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs"><PlayCircle className="mr-1 h-3 w-3" />Apply</Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Activity */}
      <Card className="p-5">
        <h3 className="mb-3 font-display text-lg font-semibold">Recent activity</h3>
        <ul className="divide-y">
          {activity.map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{a.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px]">{a.tag}</Badge>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Kpi({ icon, label, value, delta, positive }: { icon: React.ReactNode; label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-hover rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/10 text-primary">{icon}</span>
        {label}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="font-display text-2xl font-semibold">{value}</span>
        <span className={`text-xs ${positive ? "text-primary" : "text-muted-foreground"}`}>{delta}</span>
      </div>
    </motion.div>
  );
}
