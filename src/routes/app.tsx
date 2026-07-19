import { Link, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard, Activity, Bot, Leaf, FileText, Settings as SettingsIcon,
  Moon, Sun, Search, Bell, Zap, Menu, LogOut, User,
} from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const links: Array<{ to: "/app" | "/app/monitoring" | "/app/assistant" | "/app/esg" | "/app/reports" | "/app/settings"; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/monitoring", label: "Monitoring", icon: Activity },
  { to: "/app/assistant", label: "AI Assistant", icon: Bot },
  { to: "/app/esg", label: "ESG", icon: Leaf },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/settings", label: "Settings", icon: SettingsIcon },
];

function AppLayout() {
  const { theme, toggle } = useTheme();
  const [openMobile, setOpenMobile] = useState(false);
  const location = useLocation();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-sidebar md:flex md:flex-col">
        <SidebarInner path={location.pathname} />
      </aside>

      {/* Sidebar - mobile */}
      <AnimatePresence>
        {openMobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/40 md:hidden" onClick={() => setOpenMobile(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar md:hidden">
              <SidebarInner path={location.pathname} onNavigate={() => setOpenMobile(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur">
          <div className="flex h-14 items-center gap-3 px-4 md:px-6">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpenMobile(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search buildings, devices, reports…" className="h-9 pl-9" />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/15 text-primary text-xs">SN</AvatarFallback></Avatar>
                    <span className="hidden text-sm sm:inline">Sana N.</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.navigate({ to: "/app/settings" })}><User className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.navigate({ to: "/app/settings" })}><SettingsIcon className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.navigate({ to: "/" })}><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function SidebarInner({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  return (
    <>
      <Link to="/" className="flex h-14 items-center gap-2 border-b px-5 transition-colors hover:bg-sidebar-accent/60">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Zap className="h-4 w-4" />
        </span>
        <span className="font-display text-lg font-semibold">SEON</span>
      </Link>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => {
          const active = l.exact ? path === l.to : path === l.to || path.startsWith(l.to + "/");
          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span layoutId="side-active" className="absolute left-0 top-1.5 h-6 w-0.5 rounded-full bg-primary" />
              )}
              <l.icon className="h-4 w-4" />
              <span>{l.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs font-medium">Prototype workspace</p>
          <p className="mt-1 text-xs text-muted-foreground">All data is simulated for demonstration.</p>
        </div>
      </div>
    </>
  );
}
