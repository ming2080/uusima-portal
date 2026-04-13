import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  LineChart,
  Line
} from "recharts";
import { 
  Clock, 
  ArrowLeft, 
  Activity, 
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
  TrendingUp,
  BarChart3,
  Moon,
  Sun,
  MonitorPlay,
  MessageSquare,
  PieChart as PieChartIcon,
  Calendar
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
const platformData = {
  concurrency: {
    monthlyMax: 158, // Reduced
  },
  usageDuration: {
    total: 12580, // Reduced
    avgPerUser: 12 
  },
  schools: { 
    total: 15, // Reduced
    online: 12, 
    private: 3 
  },
  usageTypes: [
    { name: '课程', value: 45 },
    { name: '竞赛', value: 25 },
    { name: '培训', value: 20 },
    { name: '试用', value: 10 }
  ],
  annualChanges: [
    { year: '2021', courses: 320, customers: 1200 },
    { year: '2022', courses: 580, customers: 2500 },
    { year: '2023', courses: 890, customers: 4800 },
    { year: '2024', courses: 1250, customers: 8500 },
    { year: '2025', courses: 1800, customers: 12500 }
  ],
  // New Trend Data for the comprehensive chart
  trends: {
    month: [
      { date: '1日', concurrency: 120, accounts: 50, activations: 40, duration: 800 },
      { date: '5日', concurrency: 135, accounts: 120, activations: 90, duration: 1200 },
      { date: '10日', concurrency: 110, accounts: 180, activations: 150, duration: 1500 },
      { date: '15日', concurrency: 158, accounts: 250, activations: 210, duration: 2100 },
      { date: '20日', concurrency: 142, accounts: 310, activations: 260, duration: 2400 },
      { date: '25日', concurrency: 165, accounts: 380, activations: 320, duration: 2800 },
      { date: '30日', concurrency: 180, accounts: 450, activations: 390, duration: 3200 },
    ],
    quarter: [
      { date: '第1周', concurrency: 140, accounts: 200, activations: 150, duration: 5000 },
      { date: '第4周', concurrency: 155, accounts: 450, activations: 380, duration: 12000 },
      { date: '第8周', concurrency: 180, accounts: 800, activations: 700, duration: 21000 },
      { date: '第12周', concurrency: 210, accounts: 1200, activations: 1050, duration: 35000 },
    ],
    year: [
      { date: '1月', concurrency: 120, accounts: 1500, activations: 1200, duration: 45000 },
      { date: '3月', concurrency: 150, accounts: 3200, activations: 2800, duration: 95000 },
      { date: '6月', concurrency: 180, accounts: 5800, activations: 5100, duration: 160000 },
      { date: '9月', concurrency: 220, accounts: 8500, activations: 7600, duration: 240000 },
      { date: '12月', concurrency: 280, accounts: 12500, activations: 11200, duration: 380000 },
    ],
    custom: [
      { date: '2024-01', concurrency: 110, accounts: 1000, activations: 800, duration: 30000 },
      { date: '2024-06', concurrency: 160, accounts: 4000, activations: 3500, duration: 120000 },
      { date: '2024-12', concurrency: 210, accounts: 8000, activations: 7200, duration: 250000 },
      { date: '2025-06', concurrency: 250, accounts: 11000, activations: 9800, duration: 340000 },
    ]
  }
};

const customerData = {
  schoolTypes: {
    currentYear: [
      { name: '本科', value: 120 }, { name: '高职', value: 180 }, { name: '中职', value: 85 }, { name: '技工', value: 45 }
    ],
    cumulative: [
      { name: '本科', value: 450 }, { name: '高职', value: 680 }, { name: '中职', value: 320 }, { name: '技工', value: 150 }
    ]
  },
  accounts: {
    currentYear: { total: 125, active: 85 }, // Reduced
    cumulative: { total: 1258, active: 458 } // Reduced
  },
  usageTrends: [
    { month: '1月', duration: 120000, activeUsers: 45000 },
    { month: '2月', duration: 150000, activeUsers: 52000 },
    { month: '3月', duration: 210000, activeUsers: 78000 },
    { month: '4月', duration: 180000, activeUsers: 65000 },
    { month: '5月', duration: 240000, activeUsers: 82000 },
    { month: '6月', duration: 320000, activeUsers: 115000 }
  ]
};

const productData = {
  coursePopularity: [
    { name: 'Python程序设计', purchase: 720, usage: 15800 },
    { name: '人工智能基础', purchase: 850, usage: 12500 },
    { name: '物联网导论', purchase: 650, usage: 9800 },
    { name: '大数据分析', purchase: 580, usage: 8500 },
    { name: '工业机器人', purchase: 420, usage: 6200 }
  ],
  subjects: [
    { name: '计算机科学', value: 45 },
    { name: '电子信息', value: 25 },
    { name: '自动化', value: 15 },
    { name: '机械工程', value: 10 },
    { name: '其他', value: 5 }
  ]
};

const agentData = {
  questions: {
    monthly: 1250, // Reduced
  },
  learningAnalysis: {
    errors: [
      { type: '语法错误', count: 4500 },
      { type: '逻辑错误', count: 3200 },
      { type: '概念混淆', count: 2800 },
      { type: '计算错误', count: 1500 }
    ],
    scores: [
      { range: '90-100', count: 15 },
      { range: '80-89', count: 35 },
      { range: '70-79', count: 30 },
      { range: '60-69', count: 15 },
      { range: '<60', count: 5 }
    ]
  }
};

const COLORS = ['#22D3EE', '#A78BFA', '#34D399', '#FBBF24', '#F87171'];

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

const PlatformOperationsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<'obsidian' | 'light' | 'neon' | 'spatial'>('obsidian');
  const [timeFilter, setTimeFilter] = useState<'currentYear' | 'cumulative'>('currentYear');
  
  // New states for the comprehensive trend chart
  const [trendMetrics, setTrendMetrics] = useState<string[]>(['concurrency', 'accounts', 'activations', 'duration']);
  const [trendPeriod, setTrendPeriod] = useState<'month' | 'quarter' | 'year' | 'custom'>('month');

  const toggleTrendMetric = (key: string) => {
    setTrendMetrics(prev => 
      prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]
    );
  };

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const metricConfig = {
    concurrency: { label: '并发量', color: COLORS[0] },
    accounts: { label: '账号数', color: COLORS[1] },
    activations: { label: '激活量', color: COLORS[2] },
    duration: { label: '使用时长', color: COLORS[3] },
  };

  return (
    <div className={`min-h-screen ${s.bg} ${s.text} font-sans overflow-hidden flex flex-col transition-colors duration-500`}>
      {/* Header */}
      <header className={`h-20 ${s.header} flex items-center justify-between px-8 relative z-50`}>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/big-screen-dashboard')}
            className={`p-2 rounded-full hover:bg-white/10 transition-colors ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              平台运营数据展示
            </h1>
            <div className={`text-xs ${s.subtext} tracking-widest mt-1 uppercase`}>
              Platform Operations Data Display
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${
                theme === 'light' 
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
          <div className={`flex items-center gap-3 ${s.innerCard} px-4 py-2 rounded-xl border`}>
            <Clock className={`w-4 h-4 ${s.accent}`} />
            <span className="font-din text-sm tracking-wider">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
        <div className="max-w-[1920px] mx-auto space-y-6">
          
          {/* Top Row: Key Metrics (5 Columns) */}
          <div className="grid grid-cols-5 gap-6">
            <div className={`${s.card} rounded-3xl p-6 relative overflow-hidden group transition-all bg-gradient-to-br from-blue-500/10 to-transparent`}>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <Users className={`w-36 h-36 ${theme === 'light' ? 'text-blue-900' : 'text-cyan-400'}`} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-blue-500/20`}>
                    <Users className={`w-4 h-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                  </div>
                  <div className={`text-xs font-medium ${s.subtext} tracking-wider`}>累计账号数</div>
                </div>
                <div className={`text-4xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>
                  <RollingNumber value={customerData.accounts.cumulative.total} />
                </div>
                <div className={`flex justify-between text-xs ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                  <span className={theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}>激活量: {customerData.accounts.cumulative.active.toLocaleString()}</span>
                  <span>本年新增: {customerData.accounts.currentYear.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={`${s.card} rounded-3xl p-6 relative overflow-hidden group transition-all bg-gradient-to-br from-indigo-500/10 to-transparent`}>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <School className={`w-36 h-36 ${theme === 'light' ? 'text-blue-900' : 'text-cyan-400'}`} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-indigo-500/20`}>
                    <School className={`w-4 h-4 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
                  </div>
                  <div className={`text-xs font-medium ${s.subtext} tracking-wider`}>平台合作学校</div>
                </div>
                <div className={`text-4xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>
                  <RollingNumber value={platformData.schools.total} />
                </div>
                <div className={`flex justify-between text-xs ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                  <span className={theme === 'light' ? 'text-blue-600' : 'text-cyan-400'}>在线购买: {platformData.schools.online}</span>
                  <span className={theme === 'light' ? 'text-indigo-600' : 'text-violet-400'}>私有化: {platformData.schools.private}</span>
                </div>
              </div>
            </div>

            <div className={`${s.card} rounded-3xl p-6 relative overflow-hidden group transition-all bg-gradient-to-br from-emerald-500/10 to-transparent`}>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <Activity className={`w-36 h-36 ${theme === 'light' ? 'text-blue-900' : 'text-cyan-400'}`} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-emerald-500/20`}>
                    <Activity className={`w-4 h-4 ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  </div>
                  <div className={`text-xs font-medium ${s.subtext} tracking-wider`}>最高并发 (月)</div>
                </div>
                <div className={`text-4xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>
                  <RollingNumber value={platformData.concurrency.monthlyMax} />
                </div>
                <div className={`flex justify-between text-xs ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                  <span className={theme === 'light' ? 'text-blue-600' : 'text-cyan-400'}>课堂 & 竞赛</span>
                </div>
              </div>
            </div>

            <div className={`${s.card} rounded-3xl p-6 relative overflow-hidden group transition-all bg-gradient-to-br from-amber-500/10 to-transparent`}>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <Clock className={`w-36 h-36 ${theme === 'light' ? 'text-blue-900' : 'text-cyan-400'}`} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-amber-500/20`}>
                    <Clock className={`w-4 h-4 ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`} />
                  </div>
                  <div className={`text-xs font-medium ${s.subtext} tracking-wider`}>累计使用时长</div>
                </div>
                <div className={`text-4xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>
                  <RollingNumber value={platformData.usageDuration.total} />
                </div>
                <div className={`flex justify-between text-xs ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                  <span className={theme === 'light' ? 'text-indigo-600' : 'text-violet-400'}>单位: 小时</span>
                  <span>人均: {platformData.usageDuration.avgPerUser} 分钟</span>
                </div>
              </div>
            </div>

            <div className={`${s.card} rounded-3xl p-6 relative overflow-hidden group transition-all bg-gradient-to-br from-rose-500/10 to-transparent`}>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <Brain className={`w-36 h-36 ${theme === 'light' ? 'text-blue-900' : 'text-cyan-400'}`} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-rose-500/20`}>
                    <Brain className={`w-4 h-4 ${theme === 'light' ? 'text-rose-600' : 'text-rose-400'}`} />
                  </div>
                  <div className={`text-xs font-medium ${s.subtext} tracking-wider`}>智能体月提问数</div>
                </div>
                <div className={`text-4xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'} mb-3 font-din tracking-tight`}>
                  <RollingNumber value={agentData.questions.monthly} />
                </div>
                <div className={`flex justify-between text-xs ${s.subtext} ${s.innerCard} px-3 py-1.5 rounded-lg font-din border`}>
                  <span className={theme === 'light' ? 'text-rose-600' : 'text-rose-400'}>AI 交互</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Comprehensive Trends & Customer Data */}
          <div className="grid grid-cols-12 gap-6">
            {/* 平台运营指标趋势 */}
            <div className={`col-span-8 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <div className="flex justify-between items-center mb-4 border-b pb-3" style={{ borderColor: theme === 'light' ? '#E2E8F0' : 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-3">
                  <Activity className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-cyan-400'}`} />
                  <h3 className={`text-base font-bold ${s.text} tracking-wider`}>平台运营指标趋势</h3>
                </div>
                <div className="flex items-center gap-4">
                  {/* Metric Selector */}
                  <div className="flex gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg">
                    {Object.entries(metricConfig).map(([key, config]) => (
                      <button 
                        key={key} 
                        onClick={() => toggleTrendMetric(key)} 
                        className={`text-[10px] px-3 py-1.5 rounded-md transition-colors ${
                          trendMetrics.includes(key) 
                            ? (theme === 'light' ? 'bg-white text-blue-700 shadow-sm' : 'bg-white/10 text-cyan-400') 
                            : s.subtext + ' hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className={`w-px h-4 ${theme === 'light' ? 'bg-slate-300' : 'bg-white/20'}`}></div>
                  
                  {/* Period Selector */}
                  <div className="flex items-center gap-1">
                    {['month', 'quarter', 'year', 'custom'].map(period => (
                      <button 
                        key={period} 
                        onClick={() => setTrendPeriod(period as any)} 
                        className={`text-[10px] px-2 py-1.5 rounded-md transition-colors ${
                          trendPeriod === period 
                            ? (theme === 'light' ? 'bg-slate-200 text-slate-800' : 'bg-white/10 text-white') 
                            : s.subtext + ' hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        {period === 'month' ? '月' : period === 'quarter' ? '季' : period === 'year' ? '年' : '自定义'}
                      </button>
                    ))}
                    {trendPeriod === 'custom' && (
                      <div className={`ml-2 flex items-center gap-1 text-[10px] ${s.subtext} ${s.innerCard} px-2 py-1 rounded border`}>
                        <Calendar className="w-3 h-3" />
                        <span>2024.01 - 2025.06</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={platformData.trends[trendPeriod]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorConcurrency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metricConfig.concurrency.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={metricConfig.concurrency.color} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAccounts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metricConfig.accounts.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={metricConfig.accounts.color} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActivations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metricConfig.activations.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={metricConfig.activations.color} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metricConfig.duration.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={metricConfig.duration.color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={s.chartGrid} vertical={false} opacity={0.5} />
                    <XAxis dataKey="date" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={{ stroke: s.chartGrid }} dy={10} />
                    <YAxis yAxisId="left" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value} dx={-10} />
                    <YAxis yAxisId="right" orientation="right" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value} dx={10} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                      cursor={{ stroke: theme === 'light' ? '#94A3B8' : '#475569', strokeWidth: 1, strokeDasharray: '3 3' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', color: s.chartText, paddingTop: '20px' }} iconType="circle" iconSize={8} />
                    {trendMetrics.includes('concurrency') && <Area yAxisId="left" type="monotone" dataKey="concurrency" name={metricConfig.concurrency.label} stroke={metricConfig.concurrency.color} strokeWidth={3} fillOpacity={1} fill="url(#colorConcurrency)" dot={{ r: 4, strokeWidth: 2, fill: theme === 'light' ? '#fff' : '#131B2F' }} activeDot={{ r: 6, strokeWidth: 0 }} />}
                    {trendMetrics.includes('accounts') && <Area yAxisId="left" type="monotone" dataKey="accounts" name={metricConfig.accounts.label} stroke={metricConfig.accounts.color} strokeWidth={3} fillOpacity={1} fill="url(#colorAccounts)" dot={{ r: 4, strokeWidth: 2, fill: theme === 'light' ? '#fff' : '#131B2F' }} activeDot={{ r: 6, strokeWidth: 0 }} />}
                    {trendMetrics.includes('activations') && <Area yAxisId="left" type="monotone" dataKey="activations" name={metricConfig.activations.label} stroke={metricConfig.activations.color} strokeWidth={3} fillOpacity={1} fill="url(#colorActivations)" dot={{ r: 4, strokeWidth: 2, fill: theme === 'light' ? '#fff' : '#131B2F' }} activeDot={{ r: 6, strokeWidth: 0 }} />}
                    {trendMetrics.includes('duration') && <Area yAxisId="right" type="monotone" dataKey="duration" name={metricConfig.duration.label} stroke={metricConfig.duration.color} strokeWidth={3} fillOpacity={1} fill="url(#colorDuration)" dot={{ r: 4, strokeWidth: 2, fill: theme === 'light' ? '#fff' : '#131B2F' }} activeDot={{ r: 6, strokeWidth: 0 }} />}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 客户维度 - 学校类型 */}
            <div className={`col-span-4 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <div className="flex justify-between items-center mb-4 border-b pb-3" style={{ borderColor: theme === 'light' ? '#E2E8F0' : 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-3">
                  <School className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-cyan-400'}`} />
                  <h3 className={`text-base font-bold ${s.text} tracking-wider`}>学校类型分布</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setTimeFilter('currentYear')} className={`text-[10px] px-2 py-1 rounded ${timeFilter === 'currentYear' ? (theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-cyan-900/50 text-cyan-400') : s.subtext}`}>本年度</button>
                  <button onClick={() => setTimeFilter('cumulative')} className={`text-[10px] px-2 py-1 rounded ${timeFilter === 'cumulative' ? (theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-cyan-900/50 text-cyan-400') : s.subtext}`}>累计</button>
                </div>
              </div>
              <div className="flex-1 min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={customerData.schoolTypes[timeFilter]}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      stroke={theme === 'light' ? '#fff' : '#131B2F'}
                      strokeWidth={2}
                      cornerRadius={6}
                    >
                      {customerData.schoolTypes[timeFilter].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', color: s.chartText, paddingTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 3: Annual Trends & Usage Ratio */}
          <div className="grid grid-cols-12 gap-6">
            {/* 年度数据 */}
            <div className={`col-span-8 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <CardHeader title="课程与客户使用年度变化" subtitle="ANNUAL TRENDS" icon={BarChart3} theme={theme} s={s} />
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData.annualChanges} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={s.chartGrid} vertical={false} opacity={0.5} />
                    <XAxis dataKey="year" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={{ stroke: s.chartGrid }} dy={10} />
                    <YAxis yAxisId="left" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={-10} />
                    <YAxis yAxisId="right" orientation="right" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={10} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                      cursor={{ fill: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', color: s.chartText, paddingTop: '20px' }} iconType="circle" iconSize={8} />
                    <Bar yAxisId="left" dataKey="courses" name="课程使用量" fill={COLORS[0]} radius={[6, 6, 0, 0]} maxBarSize={30} />
                    <Bar yAxisId="right" dataKey="customers" name="客户使用量" fill={COLORS[1]} radius={[6, 6, 0, 0]} maxBarSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 比例图 */}
            <div className={`col-span-4 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <CardHeader title="平台业务场景占比" subtitle="SCENARIO RATIO" icon={PieChartIcon} theme={theme} s={s} />
              <div className="flex-1 min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={platformData.usageTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke={theme === 'light' ? '#fff' : '#131B2F'}
                      strokeWidth={2}
                      cornerRadius={6}
                    >
                      {platformData.usageTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                      formatter={(value: number) => [`${value}%`, '占比']}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', color: s.chartText, paddingTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Row: Product & Agent Data */}
          <div className="grid grid-cols-12 gap-6">
            {/* 产品维度 - 课程热度 */}
            <div className={`col-span-4 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <CardHeader title="课程购买与使用热度" subtitle="COURSE POPULARITY" icon={BookOpen} theme={theme} s={s} />
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData.coursePopularity} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={s.chartGrid} horizontal={false} opacity={0.5} />
                    <XAxis type="number" stroke={s.chartText} fontSize={10} axisLine={{ stroke: s.chartGrid }} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke={s.chartText} fontSize={10} width={80} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                      cursor={{ fill: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', color: s.chartText, paddingTop: '10px' }} iconType="circle" iconSize={8} />
                    <Bar dataKey="usage" name="使用量" fill={COLORS[0]} radius={[0, 4, 4, 0]} barSize={12} />
                    <Bar dataKey="purchase" name="购买量" fill={COLORS[1]} radius={[0, 4, 4, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 客户维度 - 使用趋势 */}
            <div className={`col-span-4 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <CardHeader title="月度使用趋势" subtitle="USAGE TRENDS" icon={TrendingUp} theme={theme} s={s} />
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerData.usageTrends} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={s.chartGrid} vertical={false} opacity={0.5} />
                    <XAxis dataKey="month" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={{ stroke: s.chartGrid }} dy={10} />
                    <YAxis yAxisId="left" stroke={s.chartText} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={-10} />
                    <YAxis yAxisId="right" orientation="right" stroke={s.chartText} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={10} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                      cursor={{ stroke: theme === 'light' ? '#94A3B8' : '#475569', strokeWidth: 1, strokeDasharray: '3 3' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', color: s.chartText, paddingTop: '20px' }} iconType="circle" iconSize={8} />
                    <Line yAxisId="left" type="monotone" dataKey="duration" name="使用时长(h)" stroke={COLORS[2]} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: theme === 'light' ? '#fff' : '#131B2F' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line yAxisId="right" type="monotone" dataKey="activeUsers" name="活跃用户" stroke={COLORS[3]} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: theme === 'light' ? '#fff' : '#131B2F' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 智能体 - 学情分析 */}
            <div className={`col-span-4 ${s.card} rounded-3xl p-6 flex flex-col`}>
              <CardHeader title="智能体学情分析 (错误类型)" subtitle="LEARNING ANALYSIS" icon={Brain} theme={theme} s={s} />
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentData.learningAnalysis.errors} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={s.chartGrid} vertical={false} opacity={0.5} />
                    <XAxis dataKey="type" stroke={s.chartText} fontSize={12} tickLine={false} axisLine={{ stroke: s.chartGrid }} dy={10} />
                    <YAxis stroke={s.chartText} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={-10} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: theme === 'light' ? '#1E293B' : '#fff', padding: '12px' }}
                      itemStyle={{ color: theme === 'light' ? '#1E293B' : '#fff', fontWeight: 500 }}
                      cursor={{ fill: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="count" name="错误次数" fill={COLORS[4]} radius={[6, 6, 0, 0]} maxBarSize={30}>
                      {agentData.learningAnalysis.errors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PlatformOperationsDashboard;
