"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Shield,
  Moon,
  Sun,
  Monitor,
  LogOut,
  Camera,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Palette,
  Trash2,
  Key,
  Mail,
} from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";
import { cn } from "@/lib/utils";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  hasPassword: boolean;
  createdAt: string;
}

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();

  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUserData();
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setName(data.user.name || "");
        setEmail(data.user.email);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Password tidak cocok" });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setMessage({ type: "error", text: "Password minimal 6 karakter" });
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, newPassword: newPassword || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Gagal menyimpan" });
        return;
      }

      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
      setNewPassword("");
      setConfirmPassword("");
      await updateSession();
      fetchUserData();
    } catch {
      setMessage({ type: "error", text: "Terjadi kesalahan" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getProviderBadge = () => {
    if (!session?.user?.provider || session.user.provider === "credentials") {
      return user?.hasPassword ? (
        <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0">
          <Mail className="w-3 h-3 mr-1" />
          Email Account
        </Badge>
      ) : (
        <Badge variant="outline" className="border-violet-300 text-violet-600">
          <AlertCircle className="w-3 h-3 mr-1" />
          No Password
        </Badge>
      );
    }
    return (
      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
        </svg>
        Google Account
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-lg animate-pulse" />
            <Loader2 className="relative h-10 w-10 animate-spin text-violet-600" />
          </div>
          <p className="text-muted-foreground text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola profil dan preferensi akunmu
        </p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl p-4 glass-card animate-fade-in",
            message.type === "success"
              ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-800/50"
              : "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200/50 dark:border-red-800/50"
          )}
        >
          {message.type === "success" ? (
            <CheckCircle2 className={cn("h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400")} />
          ) : (
            <AlertCircle className={cn("h-5 w-5 shrink-0 text-red-600 dark:text-red-400")} />
          )}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Settings - Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="overflow-hidden glass-card">
            {/* Cover gradient */}
            <div className="h-24 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            </div>

            <CardHeader className="relative pb-0">
              <div className="absolute -top-12 flex gap-4">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-2xl border-4 border-background bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl overflow-hidden">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      name?.charAt(0)?.toUpperCase() || "U"
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardHeader className="pt-4">
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-xl">Profil</CardTitle>
                {getProviderBadge()}
              </div>
              <CardDescription>
                Kelola informasi akunmu
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nama</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama kamu"
                    className="h-11 glass-card border-border/50 focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="h-11 glass-card border-border/50 focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                <div className="border-t border-border/50 pt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                      <Key className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">Ubah Password</h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-medium">Password Baru</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={user?.hasPassword ? "Minimal 6 karakter" : "Buat password baru"}
                        className="h-11 glass-card border-border/50 focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi password"
                        className="h-11 glass-card border-border/50 focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                      />
                    </div>
                  </div>
                  {!user?.hasPassword && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Anda login dengan Google. Buat password untuk login tanpa Google.
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="h-11 px-6 font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Simpan Perubahan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                Tampilan
              </CardTitle>
              <CardDescription>Pilih tema yang kamu suka</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <ThemeButton
                  icon={Sun}
                  label="Light"
                  active={theme === "light"}
                  onClick={() => handleThemeChange("light")}
                />
                <ThemeButton
                  icon={Moon}
                  label="Dark"
                  active={theme === "dark"}
                  onClick={() => handleThemeChange("dark")}
                />
                <ThemeButton
                  icon={Monitor}
                  label="Auto"
                  active={theme === "system"}
                  onClick={() => handleThemeChange("system")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                Info Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm p-3 rounded-xl bg-muted/50">
                <span className="text-muted-foreground">Bergabung</span>
                <span className="font-medium">
                  {user?.createdAt && new Date(user.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm p-3 rounded-xl bg-muted/50">
                <span className="text-muted-foreground">Provider</span>
                <span className="font-medium">
                  {session?.user?.provider === "google" ? "Google" : "Email"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-900/50 glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
                  <Trash2 className="h-4 w-4 text-white" />
                </div>
                Zona Berbahaya
              </CardTitle>
              <CardDescription className="text-red-600/70 dark:text-red-400/70">
                Aksi di bawah tidak dapat dibatalkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700 transition-all"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Keluar dari Akun
              </Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200/50 dark:border-violet-800/50 glass-card">
            <CardContent className="pt-6 text-center">
              <div className="flex h-14 w-14 mx-auto mb-4 items-center justify-center">
                <LogoIcon className="h-12 w-12" />
              </div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                SINAUWU
              </h3>
              <p className="text-xs text-muted-foreground mt-1">AI Learning Assistant</p>
              <p className="text-xs text-muted-foreground/70 mt-3">Version 1.0.0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ThemeButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-xs font-medium transition-all duration-300",
        active
          ? "border-violet-500 bg-gradient-to-br from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 shadow-lg shadow-violet-500/20 scale-105"
          : "border-border/50 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-muted/50"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground")} />
      <span>{label}</span>
    </button>
  );
}
