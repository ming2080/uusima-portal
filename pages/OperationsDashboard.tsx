import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Users, 
  Server, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Building2,
  MonitorPlay,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Briefcase,
  Layers,
  Zap,
  CheckCircle2,
  BarChart3,
  Coins,
  Moon,
  Sun,
  Trophy,
  Calendar,
  Cloud
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Line
} from "recharts";

const formatChineseUnit = (num: number) => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2).replace(/\.00$/, '') + '亿';
  } else if (num >= 10000000) {
    return (num / 10000000).toFixed(2).replace(/\.00$/, '') + '千万';
  } else if (num >= 10000) {
    return (num / 10000).toFixed(2).replace(/\.00$/, '') + '万';
  }
  return num.toLocaleString();
};

const salesDataMap: Record<string, any[]> = {
  week: [
    { period: "第1周", onlinePlatform: 30, privatePlatform: 5, onlineCourse: 200, privateCourse: 20 },
    { period: "第2周", onlinePlatform: 35, privatePlatform: 8, onlineCourse: 220, privateCourse: 25 },
    { period: "第3周", onlinePlatform: 40, privatePlatform: 10, onlineCourse: 250, privateCourse: 30 },
    { period: "第4周", onlinePlatform: 45, privatePlatform: 12, onlineCourse: 280, privateCourse: 35 },
  ],
  month: [
    { period: "1月", onlinePlatform: 120, privatePlatform: 30, onlineCourse: 800, privateCourse: 100 },
    { period: "2月", onlinePlatform: 150, privatePlatform: 40, onlineCourse: 950, privateCourse: 120 },
    { period: "3月", onlinePlatform: 180, privatePlatform: 35, onlineCourse: 1100, privateCourse: 150 },
    { period: "4月", onlinePlatform: 220, privatePlatform: 50, onlineCourse: 1300, privateCourse: 180 },
    { period: "5月", onlinePlatform: 280, privatePlatform: 65, onlineCourse: 1600, privateCourse: 220 },
    { period: "6月", onlinePlatform: 300, privatePlatform: 100, onlineCourse: 2750, privateCourse: 430 },
  ],
  quarter: [
    { period: "Q1", onlinePlatform: 450, privatePlatform: 105, onlineCourse: 2850, privateCourse: 370 },
    { period: "Q2", onlinePlatform: 800, privatePlatform: 215, onlineCourse: 5650, privateCourse: 830 },
    { period: "Q3", onlinePlatform: 950, privatePlatform: 280, onlineCourse: 6800, privateCourse: 1100 },
    { period: "Q4", onlinePlatform: 1200, privatePlatform: 350, onlineCourse: 8500, privateCourse: 1500 },
  ],
  year: [
    { period: "2021", onlinePlatform: 800, privatePlatform: 150, onlineCourse: 5000, privateCourse: 600 },
    { period: "2022", onlinePlatform: 1500, privatePlatform: 300, onlineCourse: 10000, privateCourse: 1200 },
    { period: "2023", onlinePlatform: 3400, privatePlatform: 950, onlineCourse: 23800, privateCourse: 3800 },
  ],
  custom: [
    { period: "自定义区间", onlinePlatform: 500, privatePlatform: 120, onlineCourse: 3000, privateCourse: 400 },
  ]
};

const regionLeaderboard = [
  { region: "华东战区", sales: 8500000, customers: 1200 },
  { region: "华南战区", sales: 6200000, customers: 950 },
  { region: "华北战区", sales: 5800000, customers: 880 },
  { region: "华中战区", sales: 4500000, customers: 650 },
  { region: "西南战区", sales: 3200000, customers: 480 },
  { region: "西北战区", sales: 2100000, customers: 320 },
  { region: "东北战区", sales: 1800000, customers: 280 },
  { region: "海外战区", sales: 900000, customers: 150 },
];

const DarkThemeStyles = () => (
  <style>{`
    .dark-theme {
      background-color: #0B0F19 !important;
      color: #F8FAFC !important;
    }
    .dark-theme .bg-slate-50 { background-color: #0B0F19 !important; }
    .dark-theme .bg-white { background-color: #131B2F !important; border-color: #1E293B !important; }
    .dark-theme .text-slate-900 { color: #F8FAFC !important; }
    .dark-theme .text-slate-800 { color: #F1F5F9 !important; }
    .dark-theme .text-slate-700 { color: #E2E8F0 !important; }
    .dark-theme .text-slate-600 { color: #CBD5E1 !important; }
    .dark-theme .text-slate-500 { color: #94A3B8 !important; }
    .dark-theme .text-slate-400 { color: #64748B !important; }
    .dark-theme .border-slate-200 { border-color: #1E293B !important; }
    .dark-theme .border-slate-100 { border-color: #0F172A !important; }
    .dark-theme .bg-slate-100 { background-color: #1E293B !important; }
    .dark-theme .bg-slate-200 { background-color: #334155 !important; }
    .dark-theme .shadow-sm { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important; }
    .dark-theme .hover\\:shadow-md:hover { box-shadow: 0 8px 30px rgba(0, 255, 255, 0.1) !important; }

    /* Neon Accents */
    .dark-theme .bg-blue-600 { background-color: #00f0ff !important; color: #000 !important; box-shadow: 0 0 15px rgba(0, 240, 255, 0.5) !important; }
    .dark-theme .text-blue-600 { color: #00f0ff !important; }
    .dark-theme .bg-blue-100 { background-color: rgba(0, 240, 255, 0.15) !important; }
    .dark-theme .text-blue-700 { color: #00f0ff !important; }
    .dark-theme .bg-blue-50 { background-color: rgba(0, 240, 255, 0.05) !important; }

    .dark-theme .bg-emerald-50 { background-color: rgba(57, 255, 20, 0.1) !important; }
    .dark-theme .bg-emerald-500 { background-color: #39ff14 !important; }
    .dark-theme .text-emerald-600 { color: #39ff14 !important; }
    .dark-theme .text-emerald-700 { color: #39ff14 !important; }
    .dark-theme .border-emerald-100 { border-color: rgba(57, 255, 20, 0.2) !important; }

    .dark-theme .bg-purple-50 { background-color: rgba(188, 19, 254, 0.1) !important; }
    .dark-theme .text-purple-600 { color: #bc13fe !important; }

    .dark-theme .bg-orange-50 { background-color: rgba(255, 113, 0, 0.1) !important; }
    .dark-theme .text-orange-600 { color: #ff7100 !important; }
    .dark-theme .text-orange-700 { color: #ff7100 !important; }
    .dark-theme .border-orange-100 { border-color: rgba(255, 113, 0, 0.2) !important; }

    .dark-theme .bg-indigo-50 { background-color: rgba(111, 0, 255, 0.1) !important; }
    .dark-theme .text-indigo-600 { color: #6f00ff !important; }
    .dark-theme .text-indigo-900 { color: #6f00ff !important; }

    .dark-theme .bg-cyan-50 { background-color: rgba(0, 255, 255, 0.1) !important; }
    .dark-theme .bg-cyan-100 { background-color: rgba(0, 255, 255, 0.15) !important; }
    .dark-theme .text-cyan-700 { color: #00ffff !important; }
    .dark-theme .text-cyan-900 { color: #00ffff !important; }
    
    .dark-theme .bg-amber-100 { background-color: rgba(255, 211, 0, 0.15) !important; }
    .dark-theme .text-amber-600 { color: #ffd300 !important; }
    .dark-theme .text-amber-700 { color: #ffd300 !important; }
    .dark-theme .border-amber-400\\/50 { border-color: rgba(255, 211, 0, 0.5) !important; }
    
    .dark-theme .bg-rose-50 { background-color: rgba(255, 0, 127, 0.1) !important; }
    .dark-theme .text-rose-600 { color: #ff007f !important; }
    
    /* Specific overrides for gradients and special cards */
    .dark-theme .from-cyan-500 { --tw-gradient-from: #00f0ff !important; }
    .dark-theme .to-blue-600 { --tw-gradient-to: #6f00ff !important; }
    .dark-theme .shadow-cyan-500\\/20 { box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3) !important; }
    .dark-theme .shadow-amber-500\\/10 { box-shadow: 0 10px 30px rgba(255, 211, 0, 0.2) !important; }
    
    /* Recharts overrides */
    .dark-theme .recharts-cartesian-grid-horizontal line,
    .dark-theme .recharts-cartesian-grid-vertical line {
      stroke: #1E293B !important;
    }
    .dark-theme .recharts-text {
      fill: #64748B !important;
    }
    .dark-theme .recharts-tooltip-wrapper .recharts-default-tooltip {
      background-color: #131B2F !important;
      border-color: #1E293B !important;
      color: #F8FAFC !important;
    }
    .dark-theme .recharts-bar-rectangle path[fill="#3B82F6"] { fill: #00f0ff !important; }
    .dark-theme .recharts-bar-rectangle path[fill="#93C5FD"] { fill: #0088ff !important; }
    .dark-theme .recharts-line path[stroke="#10B981"] { stroke: #39ff14 !important; }
    .dark-theme .recharts-line path[stroke="#F59E0B"] { stroke: #ff7100 !important; }
    .dark-theme .recharts-dot[fill="#10B981"] { fill: #39ff14 !important; stroke: #131B2F !important; }
    .dark-theme .recharts-dot[fill="#F59E0B"] { fill: #ff7100 !important; stroke: #131B2F !important; }
  `}</style>
);

const SpatialThemeStyles = () => (
  <style>{`
    .spatial-theme {
      background-color: #070B19 !important;
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(16, 185, 129, 0.08), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(167, 139, 250, 0.08), transparent 25%) !important;
      color: #F8FAFC !important;
    }
    .spatial-theme .bg-slate-50 { background-color: transparent !important; }
    
    /* Floating Cards with Depth */
    .spatial-theme .bg-white { 
      background: rgba(15, 23, 42, 0.4) !important; 
      backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important; 
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
      transform: translateZ(0);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .spatial-theme .bg-white:hover {
      transform: translateY(-5px) translateZ(0);
      box-shadow: 0 30px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    }

    /* Text Colors */
    .spatial-theme .text-slate-900 { color: #F8FAFC !important; }
    .spatial-theme .text-slate-800 { color: #F1F5F9 !important; }
    .spatial-theme .text-slate-700 { color: #E2E8F0 !important; }
    .spatial-theme .text-slate-600 { color: #CBD5E1 !important; }
    .spatial-theme .text-slate-500 { color: #94A3B8 !important; }
    .spatial-theme .text-slate-400 { color: #64748B !important; }
    
    /* Borders */
    .spatial-theme .border-slate-200 { border-color: rgba(255, 255, 255, 0.05) !important; }
    .spatial-theme .border-slate-100 { border-color: rgba(255, 255, 255, 0.03) !important; }
    
    /* Backgrounds */
    .spatial-theme .bg-slate-100 { background-color: rgba(255, 255, 255, 0.05) !important; }
    .spatial-theme .bg-slate-200 { background-color: rgba(255, 255, 255, 0.1) !important; }

    /* Emerald & Soft Purple Accents */
    .spatial-theme .bg-blue-600 { background: linear-gradient(135deg, #10B981, #059669) !important; color: #fff !important; box-shadow: 0 0 20px rgba(16, 185, 129, 0.4) !important; border: none !important; }
    .spatial-theme .text-blue-600 { color: #10B981 !important; }
    .spatial-theme .bg-blue-100, .spatial-theme .bg-blue-50 { background-color: rgba(16, 185, 129, 0.1) !important; }
    .spatial-theme .text-blue-700 { color: #10B981 !important; }

    .spatial-theme .bg-emerald-50 { background-color: rgba(167, 139, 250, 0.1) !important; }
    .spatial-theme .text-emerald-600, .spatial-theme .text-emerald-700 { color: #A78BFA !important; }
    .spatial-theme .border-emerald-100 { border-color: rgba(167, 139, 250, 0.2) !important; }

    .spatial-theme .bg-purple-50 { background-color: rgba(16, 185, 129, 0.1) !important; }
    .spatial-theme .text-purple-600, .spatial-theme .text-purple-700 { color: #10B981 !important; }
    .spatial-theme .border-purple-100 { border-color: rgba(16, 185, 129, 0.2) !important; }

    .spatial-theme .bg-orange-50 { background-color: rgba(244, 114, 182, 0.1) !important; }
    .spatial-theme .text-orange-600, .spatial-theme .text-orange-700 { color: #F472B6 !important; }
    .spatial-theme .border-orange-100 { border-color: rgba(244, 114, 182, 0.2) !important; }

    .spatial-theme .bg-cyan-50, .spatial-theme .bg-cyan-100 { background-color: rgba(56, 189, 248, 0.1) !important; }
    .spatial-theme .text-cyan-700, .spatial-theme .text-cyan-900 { color: #38BDF8 !important; }

    /* Special Gradients for Spatial Theme */
    .spatial-theme .from-cyan-500 { --tw-gradient-from: #10B981 !important; }
    .spatial-theme .to-blue-600 { --tw-gradient-to: #059669 !important; }
    .spatial-theme .shadow-cyan-500\\/20 { box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3) !important; }

    /* Recharts Overrides */
    .spatial-theme .recharts-cartesian-grid-horizontal line,
    .spatial-theme .recharts-cartesian-grid-vertical line { stroke: rgba(255,255,255,0.05) !important; }
    .spatial-theme .recharts-text { fill: #94A3B8 !important; }
    .spatial-theme .recharts-tooltip-wrapper .recharts-default-tooltip {
      background-color: rgba(15, 23, 42, 0.8) !important;
      backdrop-filter: blur(12px) !important;
      border-color: rgba(255,255,255,0.1) !important;
      color: #F8FAFC !important;
    }
    .spatial-theme .recharts-bar-rectangle path[fill="#3B82F6"] { fill: #10B981 !important; }
    .spatial-theme .recharts-bar-rectangle path[fill="#93C5FD"] { fill: #A78BFA !important; }
    .spatial-theme .recharts-line path[stroke="#10B981"] { stroke: #34D399 !important; }
    .spatial-theme .recharts-line path[stroke="#F59E0B"] { stroke: #C084FC !important; }
  `}</style>
);

const OperationsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<'light' | 'dark' | 'spatial'>('light');
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year' | 'custom'>('month');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('spatial');
    else setTheme('light');
  };

  // 模拟数据
  const businessData = {
    schoolSales: { total: 1570, online: 1250, private: 320 },
    schoolSalesGrowth: "+15.2%",
    courseSalesTotal: { total: 9700, online: 8500, private: 1200 },
    courseSalesGrowth: "+28.4%",
    huaweiCloud: { totalUsage: 1250000, monthUsage: 150000, balance: 350000 },
    huaweiCloudTrend: "+5.4%",
    aliCloud: { totalUsage: 2800000, monthUsage: 320000, balance: 850000 },
    aliCloudTrend: "+8.1%",
    renewalRate: "92.4%",
    newContracts: 45,
    platformSales: { online: 1250, private: 320 },
    courseSales: { online: 8500, private: 1200 },
    serverSales: 450,
    tokenSales: 2500000000,
    cac: 12500,
  };

  const opsData = {
    activeSchools: 856,
    totalUsers: 1200000,
    dau: 125000,
    mau: 450000,
    concurrentUsers: 12450, // 在线指标
    offlineServers: 3, // 离线预警
    aiInvocations: 8500000,
    avgSessionTime: "45分钟",
    labCompletion: "88.5%",
    gpuUtilization: "76%",
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 pb-12 ${theme === 'dark' ? 'dark-theme' : ''} ${theme === 'spatial' ? 'spatial-theme' : ''}`}>
      {theme === 'dark' && <DarkThemeStyles />}
      {theme === 'spatial' && <SpatialThemeStyles />}
      {/* 顶部导航栏 */}
      <header className="px-8 py-5 flex justify-between items-center bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-wide">UUSIMA 运营决策大屏</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">EXECUTIVE OPERATIONS DASHBOARD</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right font-mono">
            <div className="text-blue-600 text-lg font-bold tracking-wider">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {currentTime.toLocaleDateString('zh-CN')}
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="切换主题风格 (Light / Dark / Spatial)"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : theme === 'dark' ? <Layers className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => navigate('/big-screen-dashboard')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm shadow-blue-500/20 transition-all"
          >
            大屏模式
          </button>

          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 shadow-sm transition-all"
          >
            返回平台
          </button>
        </div>
      </header>

      <main className="p-8 max-w-[1920px] mx-auto space-y-10">
        
        {/* ================= 区域 1: 经营数据 (Business Metrics) ================= */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">经营数据 <span className="text-sm font-normal text-slate-500 ml-2">Business Performance</span></h2>
            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
          </div>

          <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(160px,auto)]">
            
            {/* 核心指标 1: 平台销售学校数量 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {businessData.schoolSalesGrowth}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-bold mb-1">平台销售学校数量</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
                  {businessData.schoolSales.total} 
                  <span className="text-sm text-slate-400 font-normal ml-1">所</span>
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-blue-600/80">在线: <span className="text-slate-700">{businessData.schoolSales.online}</span></span>
                  <span className="text-indigo-600/80">私有化: <span className="text-slate-700">{businessData.schoolSales.private}</span></span>
                </div>
              </div>
            </div>

            {/* 核心指标 2: 平台课程销售总量 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {businessData.courseSalesGrowth}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-bold mb-1">平台课程销售总量</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
                  {businessData.courseSalesTotal.total} 
                  <span className="text-sm text-slate-400 font-normal ml-1">套</span>
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-emerald-600/80">在线: <span className="text-slate-700">{businessData.courseSalesTotal.online}</span></span>
                  <span className="text-teal-600/80">私有化: <span className="text-slate-700">{businessData.courseSalesTotal.private}</span></span>
                </div>
              </div>
            </div>

            {/* 核心指标 3: 华为云账户总用量 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2.5 bg-purple-50 rounded-xl">
                  <Cloud className="w-5 h-5 text-purple-600" />
                </div>
                <span className="flex items-center text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {businessData.huaweiCloudTrend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-bold mb-1">华为云账户总用量</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
                  ¥{formatChineseUnit(businessData.huaweiCloud.totalUsage)}
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-purple-600/80">本月: <span className="text-slate-700">¥{formatChineseUnit(businessData.huaweiCloud.monthUsage)}</span></span>
                  <span className="text-blue-600/80">余额: <span className="text-slate-700">¥{formatChineseUnit(businessData.huaweiCloud.balance)}</span></span>
                </div>
              </div>
            </div>

            {/* 核心指标 4: 阿里云账户总用量 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2.5 bg-orange-50 rounded-xl">
                  <Cloud className="w-5 h-5 text-orange-600" />
                </div>
                <span className="flex items-center text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {businessData.aliCloudTrend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-bold mb-1">阿里云账户总用量</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
                  ¥{formatChineseUnit(businessData.aliCloud.totalUsage)}
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-orange-600/80">本月: <span className="text-slate-700">¥{formatChineseUnit(businessData.aliCloud.monthUsage)}</span></span>
                  <span className="text-amber-600/80">余额: <span className="text-slate-700">¥{formatChineseUnit(businessData.aliCloud.balance)}</span></span>
                </div>
              </div>
            </div>

            {/* 平台与课程销售分析图表 (跨 8 列, 占 2 行) */}
            <div className="col-span-12 lg:col-span-8 row-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">平台与课程销售分析</h3>
                  <p className="text-sm text-slate-500 mt-1">在线版本与私有化部署的销售趋势</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    {[
                      { id: 'week', label: '周' },
                      { id: 'month', label: '月' },
                      { id: 'quarter', label: '季' },
                      { id: 'year', label: '年' },
                      { id: 'custom', label: '自定义' },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setTimeFilter(filter.id as any)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          timeFilter === filter.id
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  {timeFilter === 'custom' && (
                    <div className="flex items-center text-xs text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 bg-white">
                      选择日期 <Calendar className="w-3 h-3 ml-2" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-grow w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={salesDataMap[timeFilter].map(d => ({...d}))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#F1F5F9' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                    <Bar yAxisId="left" dataKey="onlinePlatform" name="在线平台 (正式用户)" stackId="a" fill="#3B82F6" radius={[0, 0, 4, 4]} barSize={30} />
                    <Bar yAxisId="left" dataKey="privatePlatform" name="私有化平台 (授权客户)" stackId="a" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="onlineCourse" name="在线课程授权" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} />
                    <Line yAxisId="right" type="monotone" dataKey="privateCourse" name="私有化课程授权" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 基础设施与 AI 消耗 (跨 4 列, 占 2 行) */}
            <div className="col-span-12 lg:col-span-4 row-span-2 flex flex-col gap-6">
              {/* 服务器销量 */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Server className="w-40 h-40 text-slate-900" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Server className="w-4 h-4 text-slate-600" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-500">私有化服务器销量</h3>
                  </div>
                  <div className="flex items-end gap-2 mt-3">
                    <span className="text-3xl font-bold text-slate-900 font-mono">{businessData.serverSales}</span>
                    <span className="text-slate-400 mb-1 text-xs font-medium">台</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-800 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">年度目标完成率 <span className="text-blue-600 font-bold">65%</span></p>
                </div>
              </div>

              {/* Token 消耗 */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Cpu className="w-40 h-40 text-indigo-900" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Cpu className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-500">AI Token 消耗总量</h3>
                  </div>
                  <div className="flex items-end gap-2 mt-3">
                    <span className="text-3xl font-bold text-slate-900 font-mono">{formatChineseUnit(businessData.tokenSales)}</span>
                    <span className="text-slate-400 mb-1 text-xs font-medium">Tokens</span>
                  </div>
                  <p className="text-[10px] text-indigo-600/70 mt-3 bg-indigo-50/50 inline-block px-2 py-0.5 rounded border border-indigo-100/50 font-medium">包含所有学校套餐内消耗</p>
                </div>
              </div>
            </div>

            {/* 全国战区销售量排行榜 (跨 6 列) */}
            <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">全国战区销售量排行榜</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[...regionLeaderboard].sort((a, b) => b.sales - a.sales).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-600' :
                        idx === 1 ? 'bg-slate-100 text-slate-600' :
                        idx === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{item.region}</span>
                    </div>
                    <div className="flex items-center gap-4 w-1/2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${idx < 3 ? 'bg-orange-400' : 'bg-slate-300'}`} 
                          style={{ width: `${(item.sales / regionLeaderboard[0].sales) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 font-mono w-20 text-right">¥{formatChineseUnit(item.sales)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 全国战区客户量排行榜 (跨 6 列) */}
            <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">全国战区客户量排行榜</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[...regionLeaderboard].sort((a, b) => b.customers - a.customers).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-600' :
                        idx === 1 ? 'bg-slate-100 text-slate-600' :
                        idx === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{item.region}</span>
                    </div>
                    <div className="flex items-center gap-4 w-1/2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${idx < 3 ? 'bg-blue-400' : 'bg-slate-300'}`} 
                          style={{ width: `${(item.customers / regionLeaderboard[0].customers) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 font-mono w-16 text-right">{item.customers} <span className="text-[10px] font-normal text-slate-400">家</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= 区域 2: 平台运营数据 (Platform Operations) ================= */}
        <section>
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Layers className="w-5 h-5 text-cyan-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">平台运营数据 <span className="text-sm font-normal text-slate-500 ml-2">Platform Operations</span></h2>
            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
          </div>

          <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(160px,auto)]">
            
            {/* 实时并发 (跨 3 列) - 核心高亮 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 shadow-lg shadow-cyan-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <MonitorPlay className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center text-xs font-bold text-cyan-900 bg-white px-2.5 py-1 rounded-full shadow-sm animate-pulse">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-1.5"></span>
                  LIVE
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm text-cyan-50 font-medium mb-1">实时并发在线人数</p>
                <h2 className="text-3xl font-bold text-white tracking-tight font-mono">{opsData.concurrentUsers.toLocaleString()}</h2>
              </div>
            </div>

            {/* 离线预警 (跨 3 列) - 核心高亮 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border-2 border-amber-400/50 rounded-3xl p-6 shadow-lg shadow-amber-500/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <span className="flex items-center text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                  需要关注
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm text-slate-600 font-medium mb-1">离线/异常服务器预警</p>
                <h2 className="text-3xl font-bold text-amber-600 tracking-tight font-mono">{opsData.offlineServers} <span className="text-lg text-amber-600/60 font-normal font-sans">台</span></h2>
              </div>
            </div>

            {/* 活跃学校 (跨 3 列) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-slate-100 rounded-2xl">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm text-slate-500 font-medium mb-1">在网学校总数</p>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-mono">{opsData.activeSchools} <span className="text-lg text-slate-500 font-normal font-sans">所</span></h2>
              </div>
            </div>

            {/* 累计用户 (跨 3 列) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-slate-100 rounded-2xl">
                  <Users className="w-6 h-6 text-slate-600" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm text-slate-500 font-medium mb-1">累计注册用户</p>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-mono">{formatChineseUnit(opsData.totalUsers)}</h2>
              </div>
            </div>

            {/* 用户活跃度详情 (跨 4 列) */}
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">用户活跃度 (DAU/MAU)</h3>
              </div>
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">日活跃用户 (DAU)</p>
                    <h4 className="text-2xl font-bold text-slate-900 font-mono tracking-tight">{formatChineseUnit(opsData.dau)}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">月活跃用户 (MAU)</p>
                    <h4 className="text-2xl font-bold text-slate-900 font-mono tracking-tight">{formatChineseUnit(opsData.mau)}</h4>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: '27%' }}></div>
                  <div className="h-full bg-slate-200" style={{ width: '73%' }}></div>
                </div>
                <p className="text-xs text-slate-500 text-center">DAU / MAU 占比: 27.7% (健康)</p>
              </div>
            </div>

            {/* 实训与 AI 质量 (跨 4 列) */}
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">实训与 AI 交互质量</h3>
              </div>
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="text-slate-600">AI 助手累计调用</span>
                  <span className="text-xl font-bold text-slate-900 font-mono tracking-tight">{formatChineseUnit(opsData.aiInvocations)} <span className="text-sm font-normal text-slate-500 font-sans">次</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="text-slate-600">实训任务完成率</span>
                  <span className="text-xl font-bold text-emerald-600 font-mono tracking-tight">{opsData.labCompletion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">平均单次实训时长</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-xl font-bold text-slate-900 font-mono tracking-tight">{opsData.avgSessionTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 资源利用率 (跨 4 列) */}
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <Server className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">平台资源利用率</h3>
              </div>
              <div className="space-y-8 flex-grow flex flex-col justify-center">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">GPU 算力集群利用率</span>
                    <span className="text-slate-900 font-bold font-mono tracking-tight">{opsData.gpuUtilization}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-rose-500 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">存储空间使用率</span>
                    <span className="text-slate-900 font-bold font-mono tracking-tight">42%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default OperationsDashboard;
