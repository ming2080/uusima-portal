import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar
} from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { 
  Clock, 
  ArrowLeft, 
  Activity, 
  Server, 
  Users, 
  Zap, 
  GraduationCap, 
  School, 
  Wrench, 
  BookOpen, 
  Brain, 
  Factory, 
  Database, 
  Layers, 
  Briefcase,
  Cpu,
  MonitorPlay,
  AlertTriangle,
  Building2,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Moon,
  Sun
} from "lucide-react";

// --- Utility Functions ---
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

// --- Mock Data ---
const businessData = {
  schoolSales: { total: 1570, online: 1250, private: 320 },
  courseSalesTotal: { total: 9700, online: 8500, private: 1200 },
  aiCompanionSchools: 5,
  huaweiCloud: { totalUsage: 1250000, monthUsage: 150000, balance: 350000 },
  aliCloud: { totalUsage: 2800000, monthUsage: 320000, balance: 850000 },
};

const opsData = {
  totalUsers: 1258400,
  mau: 458200,
  dau: 124500,
  concurrentUsers: 12450,
  offlineServers: 3,
  onlineServers: 128,
  activeSchools: 856,
  aiInvocations: 12500000,
  labCompletion: "92.5%",
  avgSessionTime: "42min",
  gpuUtilization: "76%",
  cpuUtilization: "45%",
  memoryUsage: "62%",
  storageUsage: "42%",
  videoConcurrency: 1240,
};

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

const provinceLeaderboard = [
  { region: '广东', onlineMonth: 120, onlineYear: 1500, privateMonth: 30, privateYear: 450 },
  { region: '江苏', onlineMonth: 105, onlineYear: 1350, privateMonth: 25, privateYear: 380 },
  { region: '山东', onlineMonth: 95, onlineYear: 1200, privateMonth: 20, privateYear: 320 },
  { region: '浙江', onlineMonth: 85, onlineYear: 1100, privateMonth: 18, privateYear: 290 },
  { region: '河南', onlineMonth: 80, onlineYear: 1050, privateMonth: 15, privateYear: 250 },
  { region: '四川', onlineMonth: 75, onlineYear: 980, privateMonth: 12, privateYear: 210 },
  { region: '湖北', onlineMonth: 70, onlineYear: 920, privateMonth: 10, privateYear: 190 },
  { region: '福建', onlineMonth: 65, onlineYear: 850, privateMonth: 8, privateYear: 160 },
  { region: '湖南', onlineMonth: 60, onlineYear: 800, privateMonth: 7, privateYear: 140 },
  { region: '安徽', onlineMonth: 55, onlineYear: 750, privateMonth: 6, privateYear: 120 },
  { region: '上海', onlineMonth: 50, onlineYear: 700, privateMonth: 5, privateYear: 100 },
  { region: '北京', onlineMonth: 45, onlineYear: 650, privateMonth: 4, privateYear: 80 },
  { region: '河北', onlineMonth: 40, onlineYear: 600, privateMonth: 3, privateYear: 60 },
  { region: '陕西', onlineMonth: 35, onlineYear: 550, privateMonth: 2, privateYear: 50 },
  { region: '江西', onlineMonth: 30, onlineYear: 500, privateMonth: 2, privateYear: 40 },
  { region: '重庆', onlineMonth: 25, onlineYear: 450, privateMonth: 1, privateYear: 30 },
  { region: '辽宁', onlineMonth: 20, onlineYear: 400, privateMonth: 1, privateYear: 25 },
  { region: '云南', onlineMonth: 18, onlineYear: 350, privateMonth: 1, privateYear: 20 },
  { region: '广西', onlineMonth: 15, onlineYear: 300, privateMonth: 0, privateYear: 15 },
  { region: '山西', onlineMonth: 12, onlineYear: 250, privateMonth: 0, privateYear: 10 },
  { region: '内蒙古', onlineMonth: 10, onlineYear: 200, privateMonth: 0, privateYear: 8 },
  { region: '吉林', onlineMonth: 8, onlineYear: 150, privateMonth: 0, privateYear: 6 },
  { region: '黑龙江', onlineMonth: 6, onlineYear: 120, privateMonth: 0, privateYear: 5 },
  { region: '贵州', onlineMonth: 5, onlineYear: 100, privateMonth: 0, privateYear: 4 },
  { region: '新疆', onlineMonth: 4, onlineYear: 80, privateMonth: 0, privateYear: 3 },
  { region: '甘肃', onlineMonth: 3, onlineYear: 60, privateMonth: 0, privateYear: 2 },
  { region: '海南', onlineMonth: 2, onlineYear: 40, privateMonth: 0, privateYear: 1 },
  { region: '宁夏', onlineMonth: 1, onlineYear: 20, privateMonth: 0, privateYear: 0 },
  { region: '青海', onlineMonth: 1, onlineYear: 10, privateMonth: 0, privateYear: 0 },
  { region: '西藏', onlineMonth: 0, onlineYear: 5, privateMonth: 0, privateYear: 0 },
];

const pieData = [
  { name: '在线学校', value: businessData.schoolSales.online },
  { name: '私有化学校', value: businessData.schoolSales.private },
];
const COLORS = ['#22D3EE', '#A78BFA', '#F59E0B', '#10B981', '#F43F5E', '#3B82F6', '#8B5CF6', '#EC4899']; // Extended colors

const activityData = [
  { time: '08:00', value: 4500 },
  { time: '10:00', value: 8200 },
  { time: '12:00', value: 12400 },
  { time: '14:00', value: 10800 },
  { time: '16:00', value: 15600 },
  { time: '18:00', value: 11200 },
  { time: '20:00', value: 7800 },
];

// Map Data
const geoUrl = "https://code.highcharts.com/mapdata/countries/cn/cn-all.topo.json";

const provinceData = [
  { id: "cn-gd", name: "广东", sales: 12000000, customers: 350 },
  { id: "cn-bj", name: "北京", sales: 10500000, customers: 280 },
  { id: "cn-sh", name: "上海", sales: 9800000, customers: 250 },
  { id: "cn-zj", name: "浙江", sales: 8500000, customers: 210 },
  { id: "cn-js", name: "江苏", sales: 7600000, customers: 190 },
  { id: "cn-sc", name: "四川", sales: 5400000, customers: 150 },
  { id: "cn-hb", name: "湖北", sales: 4800000, customers: 130 },
  { id: "cn-sd", name: "山东", sales: 4200000, customers: 120 },
];

const colorScale = scaleLinear<string>()
  .domain([0, 12000000])
  .range(["#1E1B4B", "#8B5CF6"]); // Deep purple to bright purple

// --- Components ---

const CardHeader = ({ title, subtitle, icon: Icon, theme, s }: { title: string, subtitle?: string, icon?: any, theme: string, s: any }) => (
  <div className={`flex items-center justify-between mb-4 border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/10'} pb-3`}>
    <div className="flex items-center gap-3">
      {Icon && <Icon className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : theme === 'neon' ? 'text-cyan-400' : theme === 'spatial' ? 'text-emerald-400' : 'text-violet-400'}`} />}
      <h3 className={`text-base font-bold ${s.text} tracking-wider`}>{title}</h3>
    </div>
    {subtitle && <span className={`text-[10px] ${s.subtext} uppercase tracking-widest ${theme === 'light' ? 'bg-slate-100' : 'bg-white/5'} px-2 py-1 rounded-md`}>{subtitle}</span>}
  </div>
);

const BigScreenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tooltipContent, setTooltipContent] = useState("");
  const [theme, setTheme] = useState<'obsidian' | 'light' | 'neon' | 'spatial'>('light');
  const [activeTab, setActiveTab] = useState<'business' | 'operations'>(
    location.state?.activeTab || 'business'
  );

  const toggleTheme = () => {
    const themes: ('obsidian' | 'light' | 'neon' | 'spatial')[] = ['obsidian', 'light', 'neon', 'spatial'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-900',
          card: 'bg-white border-slate-200 shadow-sm',
          header: 'bg-white border-slate-200',
          accent: 'text-blue-600',
          subtext: 'text-slate-500',
          innerCard: 'bg-slate-100 border-slate-200',
          chartGrid: '#E2E8F0',
          chartText: '#64748B'
        };
      case 'neon':
        return {
          bg: 'bg-[#0B0F19]',
          text: 'text-slate-100',
          card: 'bg-[#131B2F] border-[#1E293B] shadow-[0_0_15px_rgba(0,240,255,0.1)]',
          header: 'bg-[#131B2F] border-[#1E293B]',
          accent: 'text-[#00f0ff]',
          subtext: 'text-slate-400',
          innerCard: 'bg-[#1E293B] border-[#334155]',
          chartGrid: '#1E293B',
          chartText: '#94A3B8'
        };
      case 'spatial':
        return {
          bg: 'bg-[#070B19]',
          text: 'text-slate-100',
          card: 'bg-white/5 backdrop-blur-2xl border-white/5 shadow-2xl',
          header: 'bg-white/5 backdrop-blur-2xl border-white/5',
          accent: 'text-emerald-400',
          subtext: 'text-slate-400',
          innerCard: 'bg-white/5 border-white/10',
          chartGrid: 'rgba(255,255,255,0.05)',
          chartText: '#94A3B8'
        };
      default: // obsidian
        return {
          bg: 'bg-[#0B1121]',
          text: 'text-slate-200',
          card: 'bg-white/5 backdrop-blur-xl border-white/10 shadow-sm',
          header: 'bg-[#0B1121]/80 backdrop-blur-xl border-white/10',
          accent: 'text-violet-400',
          subtext: 'text-slate-400',
          innerCard: 'bg-black/20 border-white/5',
          chartGrid: 'rgba(255,255,255,0.05)',
          chartText: '#94A3B8'
        };
    }
  };

  const s = getThemeStyles();

  const [liveTokenCount, setLiveTokenCount] = useState(1800);
  const [liveSkillAgent, setLiveSkillAgent] = useState(292500); // 450000 * 0.65
  const [liveHardwareAgent, setLiveHardwareAgent] = useState(157500); // 450000 * 0.35
  const [liveConcurrent, setLiveConcurrent] = useState(opsData.concurrentUsers);

  // 实时资源利用率数据
  const [liveCpuUtil, setLiveCpuUtil] = useState(parseInt(opsData.cpuUtilization));
  const [liveMemUsage, setLiveMemUsage] = useState(parseInt(opsData.memoryUsage));
  const [liveClusterUtil, setLiveClusterUtil] = useState(parseInt(opsData.gpuUtilization));
  const [liveStorageUsage, setLiveStorageUsage] = useState(parseInt(opsData.storageUsage));
  const [liveVideoCount, setLiveVideoCount] = useState(opsData.videoConcurrency);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // 模拟 Token 实时跳动 (以百万为单位)
    const tokenTimer = setInterval(() => {
      setLiveTokenCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);

    // 模拟智能体使用次数实时跳动
    const agentTimer = setInterval(() => {
      setLiveSkillAgent(prev => prev + Math.floor(Math.random() * 10) + 3);
      setLiveHardwareAgent(prev => prev + Math.floor(Math.random() * 5) + 2);
    }, 3000);

    // 模拟实时并发人数跳动
    const concurrentTimer = setInterval(() => {
      setLiveConcurrent(prev => prev + Math.floor(Math.random() * 21) - 10);
    }, 2000);

    // 模拟资源利用率实时跳动 (每 2 秒)
    const resourceTimer = setInterval(() => {
      setLiveCpuUtil(prev => Math.min(95, Math.max(10, prev + (Math.floor(Math.random() * 5) - 2))));
      setLiveMemUsage(prev => Math.min(95, Math.max(10, prev + (Math.floor(Math.random() * 3) - 1))));
      setLiveClusterUtil(prev => Math.min(95, Math.max(10, prev + (Math.floor(Math.random() * 7) - 3))));
      setLiveStorageUsage(prev => Math.min(100, prev + (Math.random() > 0.8 ? 0.1 : 0))); // 存储增长较慢
      setLiveVideoCount(prev => Math.max(100, prev + (Math.floor(Math.random() * 21) - 10)));
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(tokenTimer);
      clearInterval(agentTimer);
      clearInterval(concurrentTimer);
      clearInterval(resourceTimer);
    };
  }, []);

  return (
    <div className={`min-h-screen ${s.bg} ${s.text} font-sans overflow-hidden flex flex-col relative selection:bg-violet-500/30 transition-colors duration-500`}>
      {/* 装饰背景 */}
      {theme === 'obsidian' && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-[20%] right-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-900/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      )}

      {theme === 'neon' && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
      )}

      {theme === 'spatial' && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[10%] left-[10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
      )}

      {/* Header */}
      <header className={`relative z-10 flex items-center justify-between px-8 py-5 ${s.header} transition-colors duration-500`}>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/operations-dashboard')} className={`p-2.5 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'} rounded-xl transition-colors`}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <h1 className={`text-3xl font-black tracking-widest ${
              theme === 'light' 
                ? 'text-slate-900' 
                : theme === 'neon'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
                : theme === 'spatial'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400'
            }`}>
              UUSIMA 运营决策大屏
            </h1>
          </div>
          
          {/* Tab Switcher */}
          <div className={`flex ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'} p-1 rounded-2xl border ml-8`}>
            <button
              onClick={() => navigate('/platform-operations-dashboard')}
              className={`px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all ${
                theme === 'light'
                  ? 'text-slate-500 hover:text-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              平台运营
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all ${
                activeTab === 'operations' 
                  ? theme === 'light'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : theme === 'neon'
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : theme === 'spatial'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20' 
                  : theme === 'light'
                  ? 'text-slate-500 hover:text-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              平台运维
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all ${
                activeTab === 'business' 
                  ? theme === 'light'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : theme === 'neon'
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : theme === 'spatial'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20' 
                  : theme === 'light'
                  ? 'text-slate-500 hover:text-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              运营情况
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${
              theme === 'light' 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
            title="切换主题风格"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : theme === 'neon' ? <Zap className="w-5 h-5" /> : theme === 'spatial' ? <Layers className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-600 bg-slate-100 border-slate-200' : 'text-violet-200 bg-white/5 border-white/10'} font-medium px-5 py-2 rounded-xl border backdrop-blur-md`}>
            <Clock className={`w-4 h-4 ${theme === 'light' ? 'text-blue-500' : s.accent}`} />
            <span className="text-sm tracking-wider font-din">
              {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })} {' '}
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="flex-1 p-6 relative z-10 h-[calc(100vh-88px)]">
        {activeTab === 'business' ? (
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Column: 3 Cards */}
            <div className="col-span-3 flex flex-col gap-6 h-full">
              {/* Card 1: 平台销售学校 */}
              <div className={`${s.card} rounded-3xl p-6 flex-1 flex flex-col relative overflow-hidden group transition-all`}>
                {theme === 'obsidian' && <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>}
                <CardHeader title="平台销售学校" subtitle="SCHOOLS" icon={Building2} theme={theme} s={s} />
                <div className="flex-1 flex flex-col justify-center items-center relative z-10">
                  <div className={`text-6xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400'} mb-2 font-din tracking-tight`}>
                    {businessData.schoolSales.total}
                  </div>
                  <div className={`text-sm ${s.subtext} font-medium mb-8 tracking-widest`}>总销售学校 (所)</div>
                  <div className={`flex w-full justify-around ${s.innerCard} rounded-2xl p-4 border`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-cyan-400'} font-din tracking-tight`}>{businessData.schoolSales.online}</div>
                      <div className={`text-xs ${s.subtext} mt-1`}>在线版</div>
                    </div>
                    <div className={`w-px h-12 ${theme === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}></div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-violet-400'} font-din tracking-tight`}>{businessData.schoolSales.private}</div>
                      <div className={`text-xs ${s.subtext} mt-1`}>私有化</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: 智能体使用情况 */}
              <div className={`${s.card} rounded-3xl p-6 flex-1 flex flex-col group transition-all relative overflow-hidden`}>
                <CardHeader title="智能体使用情况" subtitle="AGENTS" icon={Zap} theme={theme} s={s} />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className={`text-[10px] ${s.subtext}`}>AI 技能助手智能体</div>
                      <div className="flex items-baseline gap-1">
                        <div className={`text-xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-cyan-400'} font-din tracking-tight`}>
                          <RollingNumber value={liveSkillAgent} />
                        </div>
                        <span className={`text-[10px] ${s.subtext}`}>次</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={`text-[10px] ${s.subtext}`}>硬件智能体</div>
                      <div className="flex items-baseline gap-1">
                        <div className={`text-xl font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-purple-400'} font-din tracking-tight`}>
                          <RollingNumber value={liveHardwareAgent} />
                        </div>
                        <span className={`text-[10px] ${s.subtext}`}>次</span>
                      </div>
                    </div>
                  </div>

                  <div className={`flex justify-between text-[10px] ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-blue-500' : 'bg-cyan-400'} animate-pulse`}></span>实时调用</span>
                    <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>总计: {(liveSkillAgent + liveHardwareAgent).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Card: AI Token 消耗 */}
              <div className={`${s.card} rounded-3xl p-6 flex-1 flex flex-col group transition-all relative overflow-hidden`}>
                <div className={`absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity`}>
                  <Cpu className={`w-40 h-40 ${theme === 'light' ? 'text-blue-900' : 'text-cyan-400'}`} />
                </div>
                <CardHeader title="AI Token 消耗" subtitle="CONSUMPTION" icon={Cpu} theme={theme} s={s} />
                <div className="flex-1 flex flex-col justify-center items-center relative z-10">
                  <div className={`text-5xl font-black ${theme === 'light' ? 'text-blue-600' : 'text-cyan-400'} tracking-tight mb-2`}>
                    <RollingNumber value={liveTokenCount} />
                  </div>
                  <div className={`text-sm ${s.subtext} font-medium tracking-widest`}>百万 Tokens</div>
                  <div className={`mt-6 ${s.innerCard} px-4 py-2 rounded-xl border text-xs ${theme === 'light' ? 'text-blue-600' : 'text-violet-400'} font-din animate-pulse`}>
                    实时消耗中...
                  </div>
                </div>
              </div>

              {/* Card 2: 平台销售占比 */}
              <div className={`${s.card} rounded-3xl p-4 flex-1 flex flex-col group transition-all`}>
                <CardHeader title="销售形态占比" subtitle="RATIO" icon={PieChart as any} theme={theme} s={s} />
                <div className="flex-1 w-full h-full min-h-[100px] relative mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                        <Pie
                          data={pieData.map(d => ({...d}))}
                          cx="50%"
                          cy="50%"
                          innerRadius="60%"
                          outerRadius="85%"
                          paddingAngle={2}
                          dataKey="value"
                          stroke={theme === 'light' ? '#fff' : '#131B2F'}
                          strokeWidth={2}
                          cornerRadius={6}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={theme === 'light' ? (index === 0 ? '#06B6D4' : '#8B5CF6') : (index === 0 ? '#00E5FF' : '#B388FF')} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                          itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                        />
                      </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
                    <span className={`text-xs ${s.subtext} mb-0.5`}>总计</span>
                    <span className={`text-2xl font-black ${s.text} font-din tracking-tight`}>{businessData.schoolSales.total}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-[#06B6D4]' : 'bg-[#00E5FF]'}`}></div>
                      <span className={`text-[10px] ${theme === 'light' ? 'text-slate-600' : 'text-[#00E5FF]'}`}>在线学校</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-[#8B5CF6]' : 'bg-[#B388FF]'}`}></div>
                      <span className={`text-[10px] ${theme === 'light' ? 'text-slate-600' : 'text-[#B388FF]'}`}>私有化学校</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: KPI Cards & Operational Data */}
            <div className="col-span-6 flex flex-col gap-6 h-full">
              {/* Top KPI Cards - Bento Style */}
              <div className="grid grid-cols-4 gap-4">
                <div className={`${s.card} rounded-3xl p-5 relative overflow-hidden group transition-all`}>
                  <div className={`text-xs font-medium ${s.subtext} mb-2 tracking-wider`}>课程销售总量</div>
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>{businessData.courseSalesTotal.total}</div>
                  <div className={`flex justify-between text-[10px] ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                    <span className={theme === 'light' ? 'text-blue-600' : 'text-cyan-400'}>在线: {businessData.courseSalesTotal.online}</span>
                    <span className={theme === 'light' ? 'text-indigo-600' : 'text-violet-400'}>私有: {businessData.courseSalesTotal.private}</span>
                  </div>
                </div>
                <div className={`${s.card} rounded-3xl p-5 relative overflow-hidden group transition-all`}>
                  <div className={`text-xs font-medium ${s.subtext} mb-2 tracking-wider`}>AI 学伴实施校</div>
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>
                    <RollingNumber value={businessData.aiCompanionSchools} />
                  </div>
                  <div className={`flex justify-between text-[10px] ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                    <span className={theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}>单位: 所</span>
                    <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>实施中</span>
                  </div>
                </div>
                <div className={`${s.card} rounded-3xl p-5 relative overflow-hidden group transition-all`}>
                  <div className={`text-xs font-medium ${s.subtext} mb-2 tracking-wider`}>华为云总用量</div>
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>¥{formatChineseUnit(businessData.huaweiCloud.totalUsage)}</div>
                  <div className={`flex justify-between text-[10px] ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                    <span>月: {formatChineseUnit(businessData.huaweiCloud.monthUsage)}</span>
                    <span className="text-emerald-400">余: {formatChineseUnit(businessData.huaweiCloud.balance)}</span>
                  </div>
                </div>
                <div className={`${s.card} rounded-3xl p-5 relative overflow-hidden group transition-all`}>
                  <div className={`text-xs font-medium ${s.subtext} mb-2 tracking-wider`}>阿里云总用量</div>
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>¥{formatChineseUnit(businessData.aliCloud.totalUsage)}</div>
                  <div className={`flex justify-between text-[10px] ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                    <span>月: {formatChineseUnit(businessData.aliCloud.monthUsage)}</span>
                    <span className="text-emerald-400">余: {formatChineseUnit(businessData.aliCloud.balance)}</span>
                  </div>
                </div>
              </div>

              {/* Operational Data Sections */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                {/* 专业分类 */}
                <div className={`${s.card} rounded-3xl p-4 flex flex-col group transition-all relative overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${theme === 'light' ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-bl-full -z-10`}></div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-1.5 h-5 ${theme === 'light' ? 'bg-emerald-600' : 'bg-emerald-500'} rounded-full`}></div>
                    <h2 className={`text-base font-bold ${s.text} tracking-widest`}>专业分类</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* 在线版本 */}
                    <div className={`${s.innerCard} rounded-xl p-3 border flex flex-col relative overflow-hidden`}>
                      <h4 className={`text-xs font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'} mb-2 text-center flex items-center justify-center gap-2`}>
                        <span className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'}`}></span>
                        在线版本销量占比
                      </h4>
                      <div className="flex-1 min-h-[150px] relative">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className={`w-16 h-16 ${theme === 'light' ? 'bg-emerald-50' : 'bg-emerald-900/30'} rounded-full blur-xl opacity-60`}></div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <defs>
                              <filter id="glow-big-1" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity={theme === 'light' ? "0.15" : "0.4"} floodColor={theme === 'light' ? "#000" : "#34d399"} />
                              </filter>
                            </defs>
                            <Pie
                              data={[{ value: 1 }]}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              fill={theme === 'light' ? "#f8fafc" : "#1e293b"}
                              dataKey="value"
                              isAnimationActive={false}
                              stroke="none"
                            />
                            <Pie
                              data={majorData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={4}
                              cornerRadius={6}
                              dataKey="online"
                              stroke="none"
                              filter="url(#glow-big-1)"
                            >
                              {majorData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip formatter={(value) => formatChineseUnit(value as number)} contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f8fafc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', color: theme === 'light' ? '#64748b' : '#94a3b8' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    {/* 私有化版本 */}
                    <div className={`${s.innerCard} rounded-xl p-3 border flex flex-col relative overflow-hidden`}>
                      <h4 className={`text-xs font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'} mb-2 text-center flex items-center justify-center gap-2`}>
                        <span className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]'}`}></span>
                        私有化版本销量占比
                      </h4>
                      <div className="flex-1 min-h-[150px] relative">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className={`w-16 h-16 ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'} rounded-full blur-xl opacity-60`}></div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <defs>
                              <filter id="glow-big-2" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity={theme === 'light' ? "0.15" : "0.4"} floodColor={theme === 'light' ? "#000" : "#60a5fa"} />
                              </filter>
                            </defs>
                            <Pie
                              data={[{ value: 1 }]}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              fill={theme === 'light' ? "#f8fafc" : "#1e293b"}
                              dataKey="value"
                              isAnimationActive={false}
                              stroke="none"
                            />
                            <Pie
                              data={majorData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={4}
                              cornerRadius={6}
                              dataKey="offline"
                              stroke="none"
                              filter="url(#glow-big-2)"
                            >
                              {majorData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip formatter={(value) => formatChineseUnit(value as number)} contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f8fafc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', color: theme === 'light' ? '#64748b' : '#94a3b8' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 客户线分类 */}
                <div className={`${s.card} rounded-3xl p-4 flex flex-col group transition-all relative overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${theme === 'light' ? 'bg-indigo-500/5' : 'bg-indigo-500/10'} rounded-bl-full -z-10`}></div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-1.5 h-5 ${theme === 'light' ? 'bg-indigo-600' : 'bg-indigo-500'} rounded-full`}></div>
                    <h2 className={`text-base font-bold ${s.text} tracking-widest`}>客户线分类</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* 在线版本 */}
                    <div className={`${s.innerCard} rounded-xl p-3 border flex flex-col relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'light' ? 'from-indigo-50/50' : 'from-indigo-900/20'} to-transparent pointer-events-none`}></div>
                      <h4 className={`text-xs font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'} mb-2 text-center flex items-center justify-center gap-2`}>
                        <span className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]'}`}></span>
                        在线版本销量占比
                      </h4>
                      <div className="flex-1 min-h-[150px] relative">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className={`w-16 h-16 ${theme === 'light' ? 'bg-indigo-50' : 'bg-indigo-900/30'} rounded-full blur-xl opacity-60`}></div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <defs>
                              <filter id="glow-pie-big-indigo" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity={theme === 'light' ? "0.15" : "0.4"} floodColor={theme === 'light' ? "#000" : "#818cf8"} />
                              </filter>
                            </defs>
                            <Pie
                              data={[{ value: 1 }]}
                              cx="50%"
                              cy="50%"
                              innerRadius={0}
                              outerRadius={60}
                              fill={theme === 'light' ? "#f8fafc" : "#1e293b"}
                              dataKey="value"
                              isAnimationActive={false}
                              stroke="none"
                            />
                            <Pie
                              data={customerLineData}
                              cx="50%"
                              cy="50%"
                              innerRadius={0}
                              outerRadius={60}
                              paddingAngle={2}
                              dataKey="online"
                              stroke="none"
                              filter="url(#glow-pie-big-indigo)"
                            >
                              {customerLineData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                              formatter={(value) => formatChineseUnit(value as number)}
                              contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f8fafc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                            />
                            <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', color: theme === 'light' ? '#64748b' : '#94a3b8' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    {/* 私有化版本 */}
                    <div className={`${s.innerCard} rounded-xl p-3 border flex flex-col relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'light' ? 'from-cyan-50/50' : 'from-cyan-900/20'} to-transparent pointer-events-none`}></div>
                      <h4 className={`text-xs font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'} mb-2 text-center flex items-center justify-center gap-2`}>
                        <span className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`}></span>
                        私有化版本销量占比
                      </h4>
                      <div className="flex-1 min-h-[150px] relative">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className={`w-16 h-16 ${theme === 'light' ? 'bg-cyan-50' : 'bg-cyan-900/30'} rounded-full blur-xl opacity-60`}></div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <defs>
                              <filter id="glow-pie-big-cyan" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity={theme === 'light' ? "0.15" : "0.4"} floodColor={theme === 'light' ? "#000" : "#22d3ee"} />
                              </filter>
                            </defs>
                            <Pie
                              data={[{ value: 1 }]}
                              cx="50%"
                              cy="50%"
                              innerRadius={0}
                              outerRadius={60}
                              fill={theme === 'light' ? "#f8fafc" : "#1e293b"}
                              dataKey="value"
                              isAnimationActive={false}
                              stroke="none"
                            />
                            <Pie
                              data={customerLineData}
                              cx="50%"
                              cy="50%"
                              innerRadius={0}
                              outerRadius={60}
                              paddingAngle={2}
                              dataKey="offline"
                              stroke="none"
                              filter="url(#glow-pie-big-cyan)"
                            >
                              {customerLineData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                              formatter={(value) => formatChineseUnit(value as number)}
                              contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f8fafc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                            />
                            <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', color: theme === 'light' ? '#64748b' : '#94a3b8' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Activity & Ranking */}
            <div className="col-span-3 flex flex-col gap-6 h-full">
              {/* Card 1: 用户活跃度 */}
              <div className={`${s.card} rounded-3xl p-6 group transition-all`}>
                <CardHeader title="用户活跃度" subtitle="ACTIVITY" icon={Activity} theme={theme} s={s} />
                <div className="w-full h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme === 'light' ? '#3B82F6' : '#10B981'} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={theme === 'light' ? '#3B82F6' : '#10B981'} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={s.chartGrid} opacity={0.5} />
                        <XAxis dataKey="time" axisLine={{ stroke: s.chartGrid }} tickLine={false} tick={{ fill: s.chartText, fontSize: 10 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: s.chartText, fontSize: 10 }} dx={-10} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                          itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                          cursor={{ stroke: theme === 'light' ? '#94A3B8' : '#475569', strokeWidth: 1, strokeDasharray: '3 3' }}
                        />
                        <Area type="monotone" dataKey="value" stroke={theme === 'light' ? '#2563EB' : '#059669'} fillOpacity={1} fill="url(#colorActivity)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: theme === 'light' ? '#2563EB' : '#059669' }} />
                      </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className={`${s.innerCard} p-3 rounded-xl border`}>
                    <div className={`text-[10px] ${s.subtext} mb-1`}>日活 (DAU)</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-blue-600' : 'text-emerald-400'} font-din`}>12.4k</div>
                  </div>
                  <div className={`${s.innerCard} p-3 rounded-xl border`}>
                    <div className={`text-[10px] ${s.subtext} mb-1`}>月活 (MAU)</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-blue-400'} font-din`}>85.2k</div>
                  </div>
                </div>
              </div>

              {/* Card 2: 战区销售排行榜 (改为全国各省排行) */}
              <div className={`${s.card} rounded-3xl p-6 group transition-all flex flex-col`}>
                <CardHeader title="全国各省销售排行" subtitle="PROVINCIAL RANKING" icon={Server} theme={theme} s={s} />
                <div className="overflow-hidden relative mt-4">
                  <div className="flex flex-col">
                    {/* Table Header */}
                    <div className={`grid grid-cols-5 gap-2 text-xs font-bold pb-3 mb-2 border-b ${theme === 'light' ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'}`}>
                      <div className="col-span-1 pl-2">省份</div>
                      <div className="col-span-1 text-right">在线(本月)</div>
                      <div className="col-span-1 text-right">在线(累计)</div>
                      <div className="col-span-1 text-right">私有(本月)</div>
                      <div className="col-span-1 text-right">私有(累计)</div>
                    </div>
                    {/* Table Body */}
                    <div className="overflow-y-auto h-[400px] pr-2 custom-scrollbar space-y-1">
                      {provinceLeaderboard.map((item, index) => (
                        <div key={index} className={`grid grid-cols-5 gap-2 text-sm py-3 px-2 rounded-xl border border-transparent hover:${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/5'} transition-colors items-center`}>
                          <div className={`col-span-1 font-bold flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${index < 3 ? (theme === 'light' ? 'bg-cyan-100 text-cyan-600' : 'bg-[#00E5FF]/20 text-[#00E5FF]') : (theme === 'light' ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-slate-400')}`}>
                              {index + 1}
                            </span>
                            {item.region}
                          </div>
                          <div className={`col-span-1 text-right font-din font-medium ${theme === 'light' ? 'text-cyan-600' : 'text-[#00E5FF]'}`}>{item.onlineMonth}</div>
                          <div className={`col-span-1 text-right font-din font-medium ${theme === 'light' ? 'text-cyan-700' : 'text-[#00E5FF]'}`}>{item.onlineYear}</div>
                          <div className={`col-span-1 text-right font-din font-medium ${theme === 'light' ? 'text-violet-600' : 'text-[#B388FF]'}`}>{item.privateMonth}</div>
                          <div className={`col-span-1 text-right font-din font-medium ${theme === 'light' ? 'text-violet-700' : 'text-[#B388FF]'}`}>{item.privateYear}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Platform Operations View */}
            {/* Left Column: Real-time & Alerts */}
            <div className="col-span-3 flex flex-col gap-6 h-full">
              {/* 实时并发 */}
              <div className={`bg-gradient-to-br ${theme === 'light' ? 'from-blue-500 to-blue-600' : 'from-cyan-600/40 to-blue-700/40'} backdrop-blur-xl border ${theme === 'light' ? 'border-blue-400' : 'border-cyan-500/30'} rounded-3xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 ${theme === 'light' ? 'bg-white/20' : 'bg-white/10'} backdrop-blur-md rounded-2xl border border-white/20`}>
                      <MonitorPlay className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${theme === 'light' ? 'text-white' : 'text-cyan-100'} tracking-widest`}>实时并发在线</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 ${theme === 'light' ? 'bg-white' : 'bg-emerald-400'} rounded-full animate-ping`}></span>
                        <span className={`text-[10px] ${theme === 'light' ? 'text-white/80' : 'text-emerald-400'} font-bold uppercase tracking-tighter`}>LIVE STREAMING</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-7xl font-black text-white font-din tracking-tighter mb-4">
                    <RollingNumber value={liveConcurrent} />
                  </div>
                  <div className={`text-sm ${theme === 'light' ? 'text-white/70' : 'text-cyan-200/60'} font-medium tracking-widest`}>当前在线活跃人数 (人)</div>
                </div>
              </div>

              {/* 离线预警 */}
              <div className={`${s.card} border-amber-500/30 rounded-3xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden group transition-all`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 ${theme === 'light' ? 'bg-amber-100' : 'bg-amber-500/20'} rounded-2xl border border-amber-500/30`}>
                      <AlertTriangle className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold text-amber-500 tracking-widest">异常服务器预警</h3>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-7xl font-black text-amber-500 font-din tracking-tighter">{opsData.offlineServers}</div>
                    <div className="text-2xl font-bold text-amber-500/50">台</div>
                  </div>
                  <div className={`mt-8 flex items-center gap-3 ${theme === 'light' ? 'bg-amber-50' : 'bg-amber-500/10'} border border-amber-500/20 px-4 py-3 rounded-2xl`}>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${theme === 'light' ? 'text-amber-700' : 'text-amber-200'} font-medium`}>检测到节点心跳异常，请及时处理</span>
                  </div>
                </div>
              </div>

              {/* 在网学校 */}
              <div className={`${s.card} rounded-3xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden group transition-all`}>
                <CardHeader title="在网学校总数" subtitle="ACTIVE SCHOOLS" icon={Building2} theme={theme} s={s} />
                <div className="flex items-baseline gap-4 mt-4">
                  <div className={`text-6xl font-black ${s.text} font-din tracking-tighter`}>{opsData.activeSchools}</div>
                  <div className={`text-xl font-bold ${s.subtext}`}>所</div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className={`${s.innerCard} p-3 rounded-xl border`}>
                    <div className={`text-[10px] ${s.subtext} mb-1`}>本月新增</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} font-din`}>+12</div>
                  </div>
                  <div className={`${s.innerCard} p-3 rounded-xl border`}>
                    <div className={`text-[10px] ${s.subtext} mb-1`}>活跃率</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} font-din`}>98.2%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: User Activity & AI Quality */}
            <div className="col-span-6 flex flex-col gap-6 h-full">
              <div className="grid grid-cols-2 gap-6 h-1/2">
                {/* 累计注册用户 */}
                <div className={`${s.card} rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group transition-all`}>
                  <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <Users className={`w-60 h-60 ${s.text}`} />
                  </div>
                  <CardHeader title="累计注册用户" subtitle="TOTAL USERS" icon={Users} theme={theme} s={s} />
                  <div className={`text-6xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500'} font-din tracking-tighter my-4`}>
                    {formatChineseUnit(opsData.totalUsers)}
                  </div>
                  <div className="flex gap-8 mt-4">
                    <div>
                      <div className={`text-xs ${s.subtext} mb-1`}>昨日新增</div>
                      <div className={`text-xl font-bold ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} font-din`}>+1,245</div>
                    </div>
                    <div>
                      <div className={`text-xs ${s.subtext} mb-1`}>环比增长</div>
                      <div className={`text-xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} font-din`}>12.5%</div>
                    </div>
                  </div>
                </div>

                {/* 用户活跃度 */}
                <div className={`${s.card} rounded-3xl p-8 flex flex-col justify-center transition-all`}>
                  <CardHeader title="用户活跃度" subtitle="ACTIVE RATE" icon={Activity} theme={theme} s={s} />
                  <div className="space-y-8 mt-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className={`text-xs ${s.subtext} mb-1`}>日活跃 (DAU)</div>
                        <div className={`text-3xl font-bold ${s.text} font-din`}>{formatChineseUnit(opsData.dau)}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${s.subtext} mb-1`}>月活跃 (MAU)</div>
                        <div className={`text-3xl font-bold ${s.text} font-din`}>{formatChineseUnit(opsData.mau)}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className={s.subtext}>DAU / MAU 占比</span>
                        <span className={`${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} font-bold`}>27.7%</span>
                      </div>
                      <div className={`h-3 w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-full overflow-hidden flex`}>
                        <div className={`h-full ${theme === 'light' ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`} style={{ width: '27.7%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 实训与 AI 质量 */}
              <div className={`flex-1 ${s.card} rounded-3xl p-8 flex flex-col transition-all`}>
                <CardHeader title="实训与 AI 交互质量" subtitle="QUALITY" icon={Zap} theme={theme} s={s} />
                <div className="grid grid-cols-3 gap-8 flex-1 items-center">
                  <div className={`text-center p-6 ${s.innerCard} rounded-3xl border`}>
                    <div className={`w-12 h-12 ${theme === 'light' ? 'bg-purple-100' : 'bg-purple-500/20'} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${theme === 'light' ? 'border-purple-200' : 'border-purple-500/30'}`}>
                      <Brain className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className={`text-xs ${s.subtext} mb-2`}>AI 助手累计调用</div>
                    <div className={`text-2xl font-bold ${s.text} font-din`}>{formatChineseUnit(opsData.aiInvocations)}</div>
                    <div className={`text-[10px] ${s.subtext} mt-1`}>次</div>
                  </div>
                  <div className={`text-center p-6 ${s.innerCard} rounded-3xl border`}>
                    <div className={`w-12 h-12 ${theme === 'light' ? 'bg-emerald-100' : 'bg-emerald-500/20'} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${theme === 'light' ? 'border-emerald-200' : 'border-emerald-500/30'}`}>
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className={`text-xs ${s.subtext} mb-2`}>实训任务完成率</div>
                    <div className={`text-3xl font-bold ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} font-din`}>{opsData.labCompletion}</div>
                  </div>
                  <div className={`text-center p-6 ${s.innerCard} rounded-3xl border`}>
                    <div className={`w-12 h-12 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/20'} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${theme === 'light' ? 'border-blue-200' : 'border-blue-500/30'}`}>
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className={`text-xs ${s.subtext} mb-2`}>平均单次实训时长</div>
                    <div className={`text-2xl font-bold ${s.text} font-din`}>{opsData.avgSessionTime}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Resource Utilization */}
            <div className="col-span-3 flex flex-col gap-6 h-full">
              <div className={`flex-1 ${s.card} rounded-3xl p-8 flex flex-col group transition-all`}>
                <CardHeader title="平台资源利用率" subtitle="RESOURCES" icon={Server} theme={theme} s={s} />
                <div className="flex-1 flex flex-col justify-center gap-6">
                  {/* CPU Utilization */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${theme === 'light' ? 'bg-amber-100' : 'bg-amber-500/20'} rounded-lg border ${theme === 'light' ? 'border-amber-200' : 'border-amber-500/30'}`}>
                          <Cpu className="w-5 h-5 text-amber-500" />
                        </div>
                        <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>CPU 计算单元</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <motion.span 
                          key={liveCpuUtil}
                          initial={{ opacity: 0.5, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-2xl font-bold ${s.text} font-din`}
                        >
                          {liveCpuUtil}
                        </motion.span>
                        <span className={`text-xs font-bold ${s.subtext}`}>%</span>
                      </div>
                    </div>
                    <div className={`h-3 w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-full overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500" 
                        animate={{ width: `${liveCpuUtil}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${theme === 'light' ? 'bg-purple-100' : 'bg-purple-500/20'} rounded-lg border ${theme === 'light' ? 'border-purple-200' : 'border-purple-500/30'}`}>
                          <Layers className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>内存使用率</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <motion.span 
                          key={liveMemUsage}
                          initial={{ opacity: 0.5, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-2xl font-bold ${s.text} font-din`}
                        >
                          {liveMemUsage}
                        </motion.span>
                        <span className={`text-xs font-bold ${s.subtext}`}>%</span>
                      </div>
                    </div>
                    <div className={`h-3 w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-full overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                        animate={{ width: `${liveMemUsage}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* CPU Cluster (Renamed from GPU Cluster) */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${theme === 'light' ? 'bg-rose-100' : 'bg-rose-500/20'} rounded-lg border ${theme === 'light' ? 'border-rose-200' : 'border-rose-500/30'}`}>
                          <Zap className="w-5 h-5 text-rose-500" />
                        </div>
                        <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>CPU 算力集群</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <motion.span 
                          key={liveClusterUtil}
                          initial={{ opacity: 0.5, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-2xl font-bold ${s.text} font-din`}
                        >
                          {liveClusterUtil}
                        </motion.span>
                        <span className={`text-xs font-bold ${s.subtext}`}>%</span>
                      </div>
                    </div>
                    <div className={`h-3 w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-full overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500" 
                        animate={{ width: `${liveClusterUtil}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Storage Usage */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/20'} rounded-lg border ${theme === 'light' ? 'border-blue-200' : 'border-blue-500/30'}`}>
                          <Database className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>存储空间使用</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <motion.span 
                          key={liveStorageUsage}
                          initial={{ opacity: 0.5, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-2xl font-bold ${s.text} font-din`}
                        >
                          {liveStorageUsage.toFixed(1)}
                        </motion.span>
                        <span className={`text-xs font-bold ${s.subtext}`}>%</span>
                      </div>
                    </div>
                    <div className={`h-3 w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-full overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                        animate={{ width: `${liveStorageUsage}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Video Playback Monitoring */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${theme === 'light' ? 'bg-emerald-100' : 'bg-emerald-500/20'} rounded-lg border ${theme === 'light' ? 'border-emerald-200' : 'border-emerald-500/30'}`}>
                          <MonitorPlay className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>视频播放数</span>
                      </div>
                      <motion.span 
                        key={liveVideoCount}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-2xl font-bold ${s.text} font-din`}
                      >
                        {liveVideoCount.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className={`h-3 w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-full overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500" 
                        animate={{ width: '65%' }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={`mt-auto ${s.innerCard} p-6 rounded-3xl border`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className={`text-xs font-bold ${s.subtext}`}>系统运行状态</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-[10px] ${s.subtext} mb-1`}>API 响应</div>
                      <div className={`text-sm font-bold ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} font-din`}>24ms</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-[10px] ${s.subtext} mb-1`}>网络负载</div>
                      <div className={`text-sm font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} font-din`}>中等</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BigScreenDashboard;
