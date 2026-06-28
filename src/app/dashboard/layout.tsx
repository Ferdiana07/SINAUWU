import { Sidebar } from "@/components/sidebar";
import { TopHeader } from "@/components/top-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Fixed on the left, hidden on mobile */}
      <Sidebar />

      {/* Main Content - Offset by sidebar width on desktop */}
      <main className="lg:pl-64">
        <div className="min-h-screen p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
