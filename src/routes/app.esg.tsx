import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { esg, monthlyUsage } from "@/lib/demo-data";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Leaf, TreeDeciduous, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/esg")({
  component: EsgPage,
});

function EsgPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" /> ESG Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">Environmental, Social & Governance performance across your portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScoreCard label="Environmental" value={esg.environmental} />
        <ScoreCard label="Energy Efficiency" value={esg.energy} />
        <ScoreCard label="Social Impact" value={esg.social} />
        <ScoreCard label="Governance" value={esg.governance} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">CO₂ Emissions</p>
              <h3 className="font-display text-lg font-semibold">Monthly carbon estimation</h3>
            </div>
            <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />−{esg.improvement}% MoM</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyUsage}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="co2" stroke="var(--emerald)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Impact</p>
          <h3 className="font-display text-lg font-semibold">Your green footprint</h3>
          <div className="mt-5 space-y-4">
            <ImpactRow icon={<Leaf className="h-4 w-4" />} label="CO₂ saved YTD" value={`${esg.carbonSaved} t`} />
            <ImpactRow icon={<TreeDeciduous className="h-4 w-4" />} label="Equivalent trees" value={`${esg.trees}`} />
            <ImpactRow icon={<TrendingUp className="h-4 w-4" />} label="Green improvement" value={`+${esg.improvement}%`} />
          </div>
          <div className="mt-6">
            <p className="text-xs text-muted-foreground">Annual green target</p>
            <Progress value={68} className="mt-2 h-2" />
            <p className="mt-1 text-xs text-muted-foreground">68% of 20 t CO₂ target</p>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display text-lg font-semibold">Recommendations</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {[
            "Enable HVAC pre-cooling during off-peak hours to cut peak-load CO₂ by ~8%.",
            "Switch corridor lights to occupancy-based dimming.",
            "Consolidate idle workstations to power-saving profile.",
            "Add solar shading to Building C south-facing façade.",
          ].map((r, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg border p-3 text-sm">
              <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-primary" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  const data = [{ name: label, value, fill: "var(--emerald)" }];
  return (
    <Card className="p-4 card-hover">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-20 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-display text-3xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">/ 100</p>
        </div>
      </div>
    </Card>
  );
}

function ImpactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">{icon}</span>
        {label}
      </div>
      <span className="font-display text-lg font-semibold">{value}</span>
    </div>
  );
}
