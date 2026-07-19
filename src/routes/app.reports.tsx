import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { reports } from "@/lib/demo-data";
import { Download, Eye, FileText, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [type, setType] = useState("Weekly");

  const generate = () => {
    toast.promise(new Promise((r) => setTimeout(r, 900)), {
      loading: `Generating ${type.toLowerCase()} report…`,
      success: `${type} report ready`,
      error: "Failed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Reports
          </h1>
          <p className="text-sm text-muted-foreground">Generate and export weekly, monthly, and annual reports.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-1.5 h-4 w-4" />Generate report</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Generate report</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter><Button onClick={generate}>Generate</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.id} className="p-5 card-hover">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-2">{r.period}</Badge>
                <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{r.date} · {r.size}</p>
              </div>
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreview(r.title)}><Eye className="mr-1.5 h-3.5 w-3.5" />Preview</Button>
              <Button size="sm" onClick={() => toast.success(`${r.title} exported (demo)`)}><Download className="mr-1.5 h-3.5 w-3.5" />Export PDF</Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{preview}</DialogTitle></DialogHeader>
          <div className="rounded-lg border bg-muted/30 p-6 font-sans text-sm leading-relaxed">
            <h2 className="font-display text-xl font-semibold">SEON Energy Report</h2>
            <p className="mt-1 text-xs text-muted-foreground">Prototype preview — sample data</p>
            <hr className="my-4" />
            <p><strong>Executive summary.</strong> Portfolio consumption decreased 6.4% vs the previous period,
              driven primarily by HVAC optimizations in Buildings A & B and 14 accepted AI recommendations.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Total consumption: <strong>30,021 kWh</strong></li>
              <li>Estimated CO₂ avoided: <strong>1.82 t</strong></li>
              <li>Peak alerts resolved: <strong>7</strong></li>
              <li>ESG score improvement: <strong>+3.1 pts</strong></li>
            </ul>
            <p className="mt-3">Recommended next actions include extending pre-cooling schedules and consolidating
              idle workstations across Building B.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => { toast.success("Exported (demo)"); setPreview(null); }}>
              <Download className="mr-1.5 h-4 w-4" />Export PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
