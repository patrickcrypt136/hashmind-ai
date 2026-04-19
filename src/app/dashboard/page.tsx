import Sidebar from "@/components/layout/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import RewardChart from "@/components/dashboard/RewardChart";
import ROIChart from "@/components/dashboard/ROIChart";
import MinerPortfolio from "@/components/dashboard/MinerPortfolio";
import Recommendations from "@/components/dashboard/Recommendations";
import StrategyScore from "@/components/ui/StrategyScore";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back. Here's your mining performance overview.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsCards />
        </div>
        {/* Strategy Score */}
        <div className="mb-6">
        <StrategyScore score={87} />
        </div>
        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <RewardChart />
          <ROIChart />
        </div>

        {/* Bottom section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <MinerPortfolio />
          <Recommendations />
        </div>
      </main>
    </div>
  );
}