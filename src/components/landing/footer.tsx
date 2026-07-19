import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-section-muted">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-semibold">SEON</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Smart Energy Optimization Network — AI-powered energy intelligence for a sustainable future.
            </p>
          </div>
          <FooterCol title="Product" items={["Dashboard", "Monitoring", "AI Assistant", "ESG"]} />
          <FooterCol title="Company" items={["About", "Careers", "Press", "Contact"]} />
          <FooterCol title="Legal" items={["Privacy", "Terms", "Security", "DPA"]} />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} SEON. All rights reserved.</p>
          <p>
            Developer - <Link to="/app" className="text-foreground underline-offset-2 hover:underline">Devansh Saxena</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
