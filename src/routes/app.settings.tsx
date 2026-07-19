import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground">Manage your profile, appearance, and AI preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card className="max-w-2xl p-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" defaultValue="Sana Naderi" />
              <Field label="Email" defaultValue="sana@seon.app" />
              <Field label="Role" defaultValue="Sustainability Lead" />
              <div className="space-y-1.5">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card className="max-w-2xl p-6 space-y-4">
            <div className="space-y-1.5">
              <Label>Theme</Label>
              <div className="flex gap-2">
                {(["light", "dark"] as const).map(t => (
                  <button key={t} onClick={() => setTheme(t)}
                    className={`rounded-lg border px-4 py-2 text-sm capitalize ${theme === t ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Preference saved locally.</p>
            </div>
            <Row label="Reduce motion" desc="Minimize non-essential animations." />
            <Row label="Compact density" desc="Reduce spacing across dashboards." />
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="max-w-2xl p-6 space-y-4">
            <Row label="Peak alerts" desc="Email me when a building exceeds 90% of daily quota." defaultChecked />
            <Row label="Weekly digest" desc="Summary of consumption and AI insights each Monday." defaultChecked />
            <Row label="ESG milestones" desc="Notify when scores change by ±5 points." />
            <Row label="Product updates" desc="Occasional emails about new features." />
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <Card className="max-w-2xl p-6 space-y-4">
            <Row label="Enable AI recommendations" desc="Let SEON generate optimization suggestions." defaultChecked />
            <Row label="Auto-apply low-risk actions" desc="Automatically apply savings estimated below 3%." />
            <div className="space-y-1.5">
              <Label>Assistant tone</Label>
              <Select defaultValue="professional">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}

function Row({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} onCheckedChange={(v) => toast.success(`${label}: ${v ? "on" : "off"}`)} />
    </div>
  );
}
