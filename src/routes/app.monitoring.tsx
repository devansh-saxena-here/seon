import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { buildings, devices, rooms } from "@/lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/monitoring")({
  component: Monitoring,
});

function Monitoring() {
  const [query, setQuery] = useState("");
  const [building, setBuilding] = useState("all");

  const filteredRooms = useMemo(() =>
    rooms.filter(r =>
      (building === "all" || r.building.toLowerCase().includes(building)) &&
      (r.name.toLowerCase().includes(query.toLowerCase()) || r.building.toLowerCase().includes(query.toLowerCase()))
    ), [query, building]);

  const filteredDevices = useMemo(() =>
    devices.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.room.toLowerCase().includes(query.toLowerCase()) || d.type.toLowerCase().includes(query.toLowerCase())),
    [query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Energy Monitoring</h1>
        <p className="text-sm text-muted-foreground">Real-time consumption across your buildings, rooms, and devices.</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search rooms or devices…" className="pl-9" />
        </div>
        <Select value={building} onValueChange={setBuilding}>
          <SelectTrigger className="w-full md:w-56"><SelectValue placeholder="Building" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All buildings</SelectItem>
            <SelectItem value="a">Building A — HQ</SelectItem>
            <SelectItem value="b">Building B — R&D</SelectItem>
            <SelectItem value="c">Building C — Ops</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="buildings">
        <TabsList>
          <TabsTrigger value="buildings">Buildings</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="buildings" className="mt-4 grid gap-4 md:grid-cols-3">
          {buildings.map(b => (
            <Card key={b.id} className="p-5 card-hover">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{b.name}</h3>
                <Badge variant={b.status === "High Load" ? "destructive" : "secondary"}>{b.status}</Badge>
              </div>
              <p className="mt-2 font-display text-3xl font-semibold">{b.usage}<span className="text-sm font-normal text-muted-foreground"> kWh today</span></p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Rooms: <span className="text-foreground">{b.rooms}</span></div>
                <div>Devices: <span className="text-foreground">{b.devices}</span></div>
              </div>
              <Progress value={Math.min(100, (b.usage / 300) * 100)} className="mt-4 h-1.5" />
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rooms" className="mt-4">
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Building</th>
                  <th className="px-4 py-3">Devices</th>
                  <th className="px-4 py-3">Usage</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRooms.map(r => (
                  <tr key={r.id} className="hover:bg-accent/40">
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.building}</td>
                    <td className="px-4 py-3">{r.devices}</td>
                    <td className="px-4 py-3">{r.usage} kWh</td>
                    <td className="px-4 py-3">
                      <Badge variant={r.status === "Critical" ? "destructive" : r.status === "Idle" ? "outline" : "secondary"}>{r.status}</Badge>
                    </td>
                  </tr>
                ))}
                {filteredRooms.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No rooms match.</td></tr>}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="mt-4">
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Usage</th>
                  <th className="px-4 py-3">Power</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDevices.map(d => (
                  <tr key={d.id} className="hover:bg-accent/40">
                    <td className="px-4 py-3 font-medium">{d.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.room}</td>
                    <td className="px-4 py-3">{d.usage} kWh</td>
                    <td className="px-4 py-3">
                      <Switch defaultChecked={d.on} onCheckedChange={(v) => toast.success(`${d.name} turned ${v ? "on" : "off"}`)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
