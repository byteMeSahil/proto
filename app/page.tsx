import StatsRow from "@/components/dashboard/StatsRow";
import AIChatBot from "@/components/dashboard/AIChatBot";
import PopularSchemes from "@/components/dashboard/PopularSchemes";
import FinancialOverview from "@/components/dashboard/FinancialOverview";
import Announcements from "@/components/dashboard/Announcements";
import QuickActions from "@/components/dashboard/QuickActions";
import GrievanceQueue from "@/components/dashboard/GrievanceQueue";
import DevelopmentProjects from "@/components/dashboard/DevelopmentProjects";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-black text-text-primary">Welcome, Sarpanch!</h1>
        <p className="text-text-muted text-sm mt-0.5">Your daily Kriya command center.</p>
      </div>

      {/* Stats Row */}
      <StatsRow />

      {/* Middle row: Chat + Schemes + Financial */}
      <div className="grid grid-cols-12 gap-6">
        {/* AI Chat Bot — 4 cols */}
        <div className="col-span-4" style={{ height: 420 }}>
          <AIChatBot />
        </div>

        {/* Popular Schemes — 4 cols */}
        <div className="col-span-4">
          <PopularSchemes />
        </div>

        {/* Right column: Financial + Announcements — 4 cols */}
        <div className="col-span-4 flex flex-col gap-6">
          <FinancialOverview />
        </div>
      </div>

      {/* Third row: Announcements + Quick Actions + Grievance Queue */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <Announcements />
        </div>
        <div className="col-span-4">
          <QuickActions />
        </div>
        <div className="col-span-4">
          <GrievanceQueue />
        </div>
      </div>

      {/* Development Projects */}
      <DevelopmentProjects />
    </div>
  );
}
