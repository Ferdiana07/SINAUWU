import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Palette,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <TopHeader
        title="Pengaturan"
        description="Kelola preferensi dan pengaturan akunmu"
      />

      {/* Settings Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Section */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Akun</CardTitle>
                <CardDescription>Pengaturan profil dan akun</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingItem
              title="Profil"
              description="Nama, email, dan informasi akun"
              icon={User}
              badge="Coming Soon"
              badgeVariant="secondary"
            />
            <SettingItem
              title="Keamanan"
              description="Password dan autentikasi"
              icon={Shield}
              badge="Coming Soon"
              badgeVariant="secondary"
            />
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Tampilan</CardTitle>
                <CardDescription>Kustomisasi tampilan aplikasi</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingItem
              title="Tema"
              description="Light, Dark, atau mengikuti sistem"
              icon={Sun}
              badge="Tersedia"
              badgeVariant="default"
            >
              <div className="flex gap-2 mt-2">
                <ThemeButton icon={Sun} label="Light" active />
                <ThemeButton icon={Moon} label="Dark" />
                <ThemeButton icon={Monitor} label="Auto" />
              </div>
            </SettingItem>
            <SettingItem
              title="Bahasa"
              description="Pilih bahasa antarmuka"
              icon={Info}
              badge="Indonesia"
              badgeVariant="default"
            />
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifikasi</CardTitle>
                <CardDescription>Pengaturan notifikasi dan email</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingItem
              title="Notifikasi Email"
              description="Terima email tentang aktivitas"
              icon={Bell}
              badge="Coming Soon"
              badgeVariant="secondary"
            />
            <SettingItem
              title="Pengingat Belajar"
              description="Pengingat jadwal belajar"
              icon={Bell}
              badge="Coming Soon"
              badgeVariant="secondary"
            />
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Bantuan</CardTitle>
                <CardDescription>Dokumentasi dan support</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingItem
              title="Panduan Penggunaan"
              description="Cara menggunakan SINAUWU"
              icon={HelpCircle}
              href="#"
            />
            <SettingItem
              title="FAQ"
              description="Pertanyaan yang sering ditanyakan"
              icon={HelpCircle}
              href="#"
            />
            <SettingItem
              title="Hubungi Kami"
              description="Kirim feedback atau laporan bug"
              icon={Info}
              href="#"
            />
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-xl font-bold">SINAUWU</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            AI Learning Assistant for Students
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Version 1.0.0 • Built with Next.js
          </p>
          <div className="mt-4 flex gap-2">
            <Badge variant="outline">Next.js 16</Badge>
            <Badge variant="outline">React 19</Badge>
            <Badge variant="outline">Prisma</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface SettingItemProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  href?: string;
  children?: React.ReactNode;
}

function SettingItem({
  title,
  description,
  icon: Icon,
  badge,
  badgeVariant = "secondary",
  href,
  children,
}: SettingItemProps) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-colors hover:bg-muted/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{title}</h4>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {children}
      </div>
      {href ? (
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      ) : (
        <span className="text-xs text-muted-foreground">Segera hadir</span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

function ThemeButton({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex flex-1 flex-col items-center gap-1 rounded-xl border p-3 text-xs transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}