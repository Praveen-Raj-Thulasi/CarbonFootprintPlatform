import { Navigation } from "@/components/app/Navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F7]">
      <Navigation />
      <main className="flex-1 w-full pt-32 pb-20 px-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
