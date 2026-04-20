import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
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
  Cloud,
  GraduationCap,
  Wrench,
  School,
  Brain,
  Factory,
  Database
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from "recharts";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#F43F5E', '#84CC16'];

const formatChineseUnit = (num: number) => {
  return num.toLocaleString();
};

const RollingDigit: React.FC<{ char: string }> = ({ char }) => {
  if (!/^\d$/.test(char)) {
    return <span className="inline-block">{char}</span>;
  }
  const num = parseInt(char);
  return (
    <div className="inline-block h-[1em] overflow-hidden relative" style={{ width: '0.65em' }}>
      <motion.div
        animate={{ y: `-${num * 10}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} className="h-[1em] flex items-center justify-center">
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const RollingNumber: React.FC<{ value: number }> = ({ value }) => {
  const digits = value.toLocaleString().split("");
  return (
    <div className="flex items-baseline font-din overflow-hidden">
      {digits.map((d, i) => (
        <RollingDigit key={i} char={d} />
      ))}
    </div>
  );
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
    { period: "2023", onlinePlatform: 3400, privatePlatform: 950, onlineCourse: 23800, privateCourse: 3800 },
    { period: "2024", onlinePlatform: 5200, privatePlatform: 1400, onlineCourse: 38000, privateCourse: 6200 },
    { period: "2025", onlinePlatform: 7800, privatePlatform: 2100, onlineCourse: 58000, privateCourse: 9500 },
    { period: "2026", onlinePlatform: 11500, privatePlatform: 3200, onlineCourse: 85000, privateCourse: 14500 },
  ],
  custom: [
    { period: "自定义区间", onlinePlatform: 500, privatePlatform: 120, onlineCourse: 3000, privateCourse: 400 },
  ]
};

const provinceLeaderboard = [
  { province: "广东省", sales: { online: 5500000, private: 3000000, total: 8500000 }, customers: { online: 800, private: 400, total: 1200 } },
  { province: "江苏省", sales: { online: 4200000, private: 2000000, total: 6200000 }, customers: { online: 650, private: 300, total: 950 } },
  { province: "浙江省", sales: { online: 3800000, private: 2000000, total: 5800000 }, customers: { online: 600, private: 280, total: 880 } },
  { province: "山东省", sales: { online: 3000000, private: 1500000, total: 4500000 }, customers: { online: 450, private: 200, total: 650 } },
  { province: "四川省", sales: { online: 2200000, private: 1000000, total: 3200000 }, customers: { online: 350, private: 130, total: 480 } },
  { province: "河南省", sales: { online: 1500000, private: 600000, total: 2100000 }, customers: { online: 220, private: 100, total: 320 } },
  { province: "湖北省", sales: { online: 1200000, private: 600000, total: 1800000 }, customers: { online: 180, private: 100, total: 280 } },
  { province: "湖南省", sales: { online: 600000, private: 300000, total: 900000 }, customers: { online: 100, private: 50, total: 150 } },
];

const customerLineData = [
  { name: '本科', online: 450, offline: 120, icon: GraduationCap },
  { name: '高职', online: 380, offline: 95, icon: School },
  { name: '技工', online: 220, offline: 45, icon: Wrench },
  { name: '中职', online: 150, offline: 30, icon: BookOpen },
];

const majorData = [
  { name: '物联网', online: 280, offline: 80, icon: Zap },
  { name: '人工智能', online: 420, offline: 150, icon: Brain },
  { name: '工业互联网', online: 210, offline: 60, icon: Factory },
  { name: '大数据', online: 350, offline: 120, icon: Database },
  { name: '其他专业', online: 120, offline: 40, icon: Layers },
];

const popularCourses = [
  { name: "人工智能基础", sales: { online: 15000, private: 5000, total: 20000 } },
  { name: "Python程序设计", sales: { online: 12000, private: 4000, total: 16000 } },
  { name: "物联网导论", sales: { online: 10000, private: 3000, total: 13000 } },
  { name: "大数据分析", sales: { online: 8000, private: 2500, total: 10500 } },
  { name: "机器学习", sales: { online: 6000, private: 2000, total: 8000 } },
  { name: "深度学习", sales: { online: 5000, private: 1500, total: 6500 } },
  { name: "工业互联网", sales: { online: 4000, private: 1000, total: 5000 } },
  { name: "云计算基础", sales: { online: 3000, private: 800, total: 3800 } },
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

// 模拟数据
const businessData = {
  schoolSales: { total: 1570, online: 1250, private: 320 },
  schoolSalesGrowth: "+15.2%",
  courseSalesTotal: { total: 9700, online: 8500, private: 1200 },
  courseSalesGrowth: "+28.4%",
  aiCompanionSchools: 5,
  huaweiCloud: { totalUsage: 1250000, monthUsage: 150000, balance: 350000 },
  huaweiCloudTrend: "+5.4%",
  aliCloud: { totalUsage: 2800000, monthUsage: 320000, balance: 850000 },
  aliCloudTrend: "+8.1%",
  renewalRate: "92.4%",
  newContracts: 45,
  platformSales: { online: 1250, private: 320 },
  courseSales: { online: 8500, private: 1200 },
  serverSales: 450,
  tokenSales: 1800,
  cac: 12500,
};

const OperationsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<'light' | 'dark' | 'spatial'>('light');
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year' | 'custom'>('month');

  const [liveTokenCount, setLiveTokenCount] = useState(businessData.tokenSales);
  const [liveSkillAgent, setLiveSkillAgent] = useState(businessData.serverSales * 650);
  const [liveHardwareAgent, setLiveHardwareAgent] = useState(businessData.serverSales * 350);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // 模拟 Token 实时跳动 (以百万为单位)
    const tokenTimer = setInterval(() => {
      setLiveTokenCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);

    // 模拟智能体调用次数实时跳动
    const agentTimer = setInterval(() => {
      setLiveSkillAgent(prev => prev + Math.floor(Math.random() * 7) + 3);
      setLiveHardwareAgent(prev => prev + Math.floor(Math.random() * 4) + 2);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(tokenTimer);
      clearInterval(agentTimer);
    };
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('spatial');
    else setTheme('light');
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
            <p className="text-xs text-slate-500 font-din mt-0.5">EXECUTIVE OPERATIONS DASHBOARD</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right font-din">
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
            onClick={() => navigate('/platform-operations-dashboard')}
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
        
        {/* ================= 区域 1: 运营数据 (Operations Metrics) ================= */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">运营数据 <span className="text-sm font-normal text-slate-500 ml-2">Operations Performance</span></h2>
            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
          </div>

          <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(160px,auto)]">
            
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* 核心指标 1: 平台销售学校数量 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
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
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-din">
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
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
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
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-din">
                  {businessData.courseSalesTotal.total} 
                  <span className="text-sm text-slate-400 font-normal ml-1">套</span>
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-emerald-600/80">在线: <span className="text-slate-700">{businessData.courseSalesTotal.online}</span></span>
                  <span className="text-teal-600/80">私有化: <span className="text-slate-700">{businessData.courseSalesTotal.private}</span></span>
                </div>
              </div>
            </div>

            {/* 核心指标 3: AI 学伴实施校 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="p-2.5 bg-indigo-50 rounded-xl">
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-bold mb-1">AI 学伴实施校</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-din">
                  {businessData.aiCompanionSchools} 
                  <span className="text-sm text-slate-400 font-normal ml-1">所</span>
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-blue-600/80">状态: <span className="text-slate-700">实施中</span></span>
                </div>
              </div>
            </div>

            {/* 核心指标 4: 华为云账户总用量 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
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
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-din">
                  ¥{formatChineseUnit(businessData.huaweiCloud.totalUsage)}
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-purple-600/80">本月: <span className="text-slate-700">¥{formatChineseUnit(businessData.huaweiCloud.monthUsage)}</span></span>
                  <span className="text-blue-600/80">余额: <span className="text-slate-700">¥{formatChineseUnit(businessData.huaweiCloud.balance)}</span></span>
                </div>
              </div>
            </div>

            {/* 核心指标 5: 阿里云账户总用量 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
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
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-din">
                  ¥{formatChineseUnit(businessData.aliCloud.totalUsage)}
                </h2>
                <div className="text-[11px] mt-2 flex gap-3 font-medium">
                  <span className="text-orange-600/80">本月: <span className="text-slate-700">¥{formatChineseUnit(businessData.aliCloud.monthUsage)}</span></span>
                  <span className="text-amber-600/80">余额: <span className="text-slate-700">¥{formatChineseUnit(businessData.aliCloud.balance)}</span></span>
                </div>
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
                    <RechartsTooltip 
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
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-din">
                      <RollingNumber value={liveTokenCount} />
                    </div>
                    <span className="text-xl font-bold text-slate-900 font-sans mb-0.5 ml-2">百万</span>
                    <span className="text-slate-400 mb-1 text-xs font-medium ml-1">Tokens</span>
                  </div>
                  <p className="text-[10px] text-indigo-600/70 mt-3 bg-indigo-50/50 inline-block px-2 py-0.5 rounded border border-indigo-100/50 font-medium">包含所有学校套餐内消耗</p>
                </div>
              </div>

              {/* 智能体使用情况 */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Brain className="w-40 h-40 text-slate-900" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Brain className="w-4 h-4 text-slate-600" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-500">智能体使用情况</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-400">AI 技能助手智能体</div>
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-slate-900 tracking-tight font-din">
                          <RollingNumber value={liveSkillAgent} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-din">次</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-400">硬件智能体</div>
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-slate-900 tracking-tight font-din">
                          <RollingNumber value={liveHardwareAgent} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-din">次</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">总计调用次数</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-blue-600 font-din">
                          {(liveSkillAgent + liveHardwareAgent).toLocaleString()}
                        </span>
                        <span className="text-[9px] text-slate-400">次</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 专业分类 */}
            <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">专业分类</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 在线版本 */}
                <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-4 border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                  <h4 className="text-sm font-bold text-slate-700 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                    在线版本销量占比
                  </h4>
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full blur-xl opacity-60"></div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
                          </filter>
                        </defs>
                        <Pie
                          data={[{ value: 1 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#f8fafc"
                          dataKey="value"
                          isAnimationActive={false}
                          stroke="none"
                        />
                        <Pie
                          data={majorData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          cornerRadius={6}
                          dataKey="online"
                          stroke="none"
                          filter="url(#glow)"
                        >
                          {majorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value) => formatChineseUnit(value as number)}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* 私有化版本 */}
                <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-4 border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                  <h4 className="text-sm font-bold text-slate-700 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                    私有化版本销量占比
                  </h4>
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-blue-50 rounded-full blur-xl opacity-60"></div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
                          </filter>
                        </defs>
                        <Pie
                          data={[{ value: 1 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#f8fafc"
                          dataKey="value"
                          isAnimationActive={false}
                          stroke="none"
                        />
                        <Pie
                          data={majorData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          cornerRadius={6}
                          dataKey="offline"
                          stroke="none"
                          filter="url(#glow-blue)"
                        >
                          {majorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value) => formatChineseUnit(value as number)}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* 客户线分类 */}
            <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -z-10"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-indigo-50 rounded-lg border border-indigo-100">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">客户线分类</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 在线版本 */}
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent pointer-events-none"></div>
                  <h4 className="text-sm font-bold text-slate-700 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
                    在线版本销量占比
                  </h4>
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-indigo-50 rounded-full blur-xl opacity-60"></div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <filter id="glow-pie-indigo" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
                          </filter>
                        </defs>
                        <Pie
                          data={[{ value: 1 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={80}
                          fill="#f8fafc"
                          dataKey="value"
                          isAnimationActive={false}
                          stroke="none"
                        />
                        <Pie
                          data={customerLineData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="online"
                          stroke="none"
                          filter="url(#glow-pie-indigo)"
                        >
                          {customerLineData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value) => formatChineseUnit(value as number)}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* 私有化版本 */}
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent pointer-events-none"></div>
                  <h4 className="text-sm font-bold text-slate-700 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
                    私有化版本销量占比
                  </h4>
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-cyan-50 rounded-full blur-xl opacity-60"></div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <filter id="glow-pie-cyan" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
                          </filter>
                        </defs>
                        <Pie
                          data={[{ value: 1 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={80}
                          fill="#f8fafc"
                          dataKey="value"
                          isAnimationActive={false}
                          stroke="none"
                        />
                        <Pie
                          data={customerLineData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="offline"
                          stroke="none"
                          filter="url(#glow-pie-cyan)"
                        >
                          {customerLineData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value) => formatChineseUnit(value as number)}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* 全国各省客户量排行 (跨 4 列) */}
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">全国各省客户量排行</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[...provinceLeaderboard].sort((a, b) => b.customers.total - a.customers.total).map((item, idx) => (
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
                      <span className="text-sm font-medium text-slate-700">{item.province}</span>
                    </div>
                    <div className="flex items-center gap-4 w-1/2">
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-blue-600">在线: {item.customers.online}</span>
                          <span className="text-indigo-600">私有: {item.customers.private}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{ width: `${(item.customers.online / provinceLeaderboard[0].customers.total) * 100}%` }}></div>
                          <div className="h-full bg-indigo-500" style={{ width: `${(item.customers.private / provinceLeaderboard[0].customers.total) * 100}%` }}></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-din w-16 text-right">{item.customers.total} <span className="text-[10px] font-normal text-slate-400">家</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 全国各省课程销量排行 (跨 4 列) */}
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">全国各省课程销量排行</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[...provinceLeaderboard].sort((a, b) => b.sales.total - a.sales.total).map((item, idx) => (
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
                      <span className="text-sm font-medium text-slate-700">{item.province}</span>
                    </div>
                    <div className="flex items-center gap-4 w-1/2">
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-blue-600">在线: {formatChineseUnit(item.sales.online)}</span>
                          <span className="text-indigo-600">私有: {formatChineseUnit(item.sales.private)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{ width: `${(item.sales.online / provinceLeaderboard[0].sales.total) * 100}%` }}></div>
                          <div className="h-full bg-indigo-500" style={{ width: `${(item.sales.private / provinceLeaderboard[0].sales.total) * 100}%` }}></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-din w-20 text-right">{formatChineseUnit(item.sales.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 热门课程销量排行 (跨 4 列) */}
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">热门课程销量排行</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[...popularCourses].sort((a, b) => b.sales.total - a.sales.total).map((item, idx) => (
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
                      <span className="text-sm font-medium text-slate-700 truncate w-20" title={item.name}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4 w-1/2">
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-blue-600">在线: {formatChineseUnit(item.sales.online)}</span>
                          <span className="text-indigo-600">私有: {formatChineseUnit(item.sales.private)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{ width: `${(item.sales.online / popularCourses[0].sales.total) * 100}%` }}></div>
                          <div className="h-full bg-indigo-500" style={{ width: `${(item.sales.private / popularCourses[0].sales.total) * 100}%` }}></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-din w-16 text-right">{formatChineseUnit(item.sales.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= 区域 2: 平台运维情况 (Platform Maintenance) ================= */}
        <section>
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Layers className="w-5 h-5 text-cyan-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">平台运维情况 <span className="text-sm font-normal text-slate-500 ml-2">Platform Maintenance</span></h2>
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
                <h2 className="text-3xl font-bold text-white tracking-tight font-din">{opsData.concurrentUsers.toLocaleString()}</h2>
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
                <h2 className="text-3xl font-bold text-amber-600 tracking-tight font-din">{opsData.offlineServers} <span className="text-lg text-amber-600/60 font-normal font-sans">台</span></h2>
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
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-din">{opsData.activeSchools} <span className="text-lg text-slate-500 font-normal font-sans">所</span></h2>
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
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-din">{formatChineseUnit(opsData.totalUsers)}</h2>
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
                    <h4 className="text-2xl font-bold text-slate-900 font-din tracking-tight">{formatChineseUnit(opsData.dau)}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">月活跃用户 (MAU)</p>
                    <h4 className="text-2xl font-bold text-slate-900 font-din tracking-tight">{formatChineseUnit(opsData.mau)}</h4>
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
                  <span className="text-xl font-bold text-slate-900 font-din tracking-tight">{formatChineseUnit(opsData.aiInvocations)} <span className="text-sm font-normal text-slate-500 font-sans">次</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="text-slate-600">实训任务完成率</span>
                  <span className="text-xl font-bold text-emerald-600 font-din tracking-tight">{opsData.labCompletion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">平均单次实训时长</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-xl font-bold text-slate-900 font-din tracking-tight">{opsData.avgSessionTime}</span>
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
                    <span className="text-slate-900 font-bold font-din tracking-tight">{opsData.gpuUtilization}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-rose-500 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">存储空间使用率</span>
                    <span className="text-slate-900 font-bold font-din tracking-tight">42%</span>
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
