import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — SEON" },
      { name: "description", content: "Sign in or create a SEON account to access your smart energy dashboard." },
    ],
  }),
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const signUpSchema = signInSchema.extend({
  displayName: z.string().trim().min(1, "Name is required").max(80),
});

function LoginPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // If already signed in, bounce to /app
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav({ to: "/app" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) nav({ to: "/app" });
    });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse({ displayName, email, password: pw });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/app`,
            data: { display_name: parsed.data.displayName },
          },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Account created — you're in!");
      } else {
        const parsed = signInSchema.safeParse({ email, password: pw });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Welcome back");
      }
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Google sign-in failed");
        return;
      }
      if (result.redirected) return;
      toast.success("Signed in with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-radial-hero">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass w-full max-w-md rounded-2xl border p-8 shadow-elegant"
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold">SEON</span>
          </Link>
          <h1 className="mt-6 font-display text-2xl font-semibold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to continue to your workspace."
              : "Start optimizing energy in minutes."}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-1 rounded-lg border bg-muted/40 p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-md py-1.5 transition ${mode === "signin" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md py-1.5 transition ${mode === "signup" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={submit} className="mt-5 space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" required placeholder="Devansh Saxena" className="pl-9" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" required placeholder="you@company.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="pw" type="password" required placeholder="••••••••" minLength={6} className="pl-9" value={pw} onChange={(e) => setPw(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (mode === "signin" ? "Signing in..." : "Creating account...") : (mode === "signin" ? "Sign in" : "Create account")}
            </Button>
            <div className="relative py-2 text-center text-xs text-muted-foreground">
              <span className="bg-transparent px-2">or</span>
              <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={google} disabled={googleLoading}>
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
