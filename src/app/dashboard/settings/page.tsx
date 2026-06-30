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
  Key,
  Mail,
  Check,
} from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Kelola profil dan preferensi akunmu
        </p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`flex items-center gap-3 rounded-lg p-4 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Profile Section */}
      <Card className="border">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Profil</CardTitle>
              <CardDescription>Informasi akunmu</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {user?.image ? (
                  <img src={user.image} alt={name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>
              <button className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-muted transition-colors">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div>
              <p className="font-medium">{name || "User"}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Key className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Ubah Password</Label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={user?.hasPassword ? "Password baru" : "Buat password baru"}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi password"
                  />
                </div>
              </div>
              {!user?.hasPassword && (
                <p className="text-xs text-muted-foreground mt-2">
                  Anda login dengan Google. Buat password untuk login tanpa Google.
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Theme Section */}
      <Card className="border">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Tampilan</CardTitle>
              <CardDescription>Pilih tema yang kamu suka</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex gap-2">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                theme === "light"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              <Sun className="h-4 w-4" />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              <Moon className="h-4 w-4" />
              <span className="text-sm font-medium">Dark</span>
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                theme === "system"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span className="text-sm font-medium">System</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="border">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Info Akun</CardTitle>
              <CardDescription>Detail akunmu</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Bergabung</span>
              <span className="font-medium">
                {user?.createdAt && new Date(user.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Provider</span>
              <Badge variant={session?.user?.provider === "google" ? "default" : "secondary"}>
                {session?.user?.provider === "google" ? "Google" : "Email"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-lg text-red-600 dark:text-red-400">Zona Berbahaya</CardTitle>
              <CardDescription>Aksi di bawah tidak dapat dibatalkan</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800/50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar dari Akun
          </Button>
        </CardContent>
      </Card>

      {/* About */}
      <div className="flex items-center justify-center gap-3 py-4 text-muted-foreground">
        <LogoIcon className="w-5 h-5" />
        <span className="text-sm">SINAUWU v1.0.0</span>
      </div>
    </div>
  );
}
