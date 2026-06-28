import { Sidebar } from "@/components/sidebar";
import { TopHeader } from "@/components/top-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />

      {/* Main Content - Offset by sidebar width */}
      <main className="pl-64">
        <div className="min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
