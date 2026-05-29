import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  School,
  Users,
  GraduationCap,
  Clock,
  Building,
  HelpCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Line
} from 'recharts';

// --- Custom Interfaces ---
interface SchoolRecord {
  school: string;
  format: 'SaaS云服务' | '私有化部署' | '试用开通';
  startDate: string;
  year: number;
  platform: string;
  accountQuantity: number;
  firstBuyYear: number;
  licensePeriod: string;
  contractYear: number;
  cumulativeYears: string;
  range: '1-30' | '31-100' | '101-300' | '300以上';
  remainingDays: number;
}

// --- Vocatonal College Data (Chinese Higher Vocational Schools Only) ---
const applicationData: SchoolRecord[] = [
  {
    school: '深圳职业技术大学',
    format: 'SaaS云服务',
    startDate: '2022-03-15',
    year: 2022,
    platform: '智慧教学平台',
    accountQuantity: 58762,
    firstBuyYear: 2022,
    licensePeriod: '3年',
    contractYear: 2022,
    cumulativeYears: '4年',
    range: '300以上',
    remainingDays: 247
  },
  {
    school: '广州番禺职业技术学院',
    format: '私有化部署',
    startDate: '2021-07-20',
    year: 2021,
    platform: '教学管理平台',
    accountQuantity: 42318,
    firstBuyYear: 2021,
    licensePeriod: '3年',
    contractYear: 2021,
    cumulativeYears: '5年',
    range: '300以上',
    remainingDays: 118
  },
  {
    school: '广东轻工职业技术学院',
    format: 'SaaS云服务',
    startDate: '2023-01-10',
    year: 2023,
    platform: '在线学习平台',
    accountQuantity: 26845,
    firstBuyYear: 2023,
    licensePeriod: '2年',
    contractYear: 2023,
    cumulativeYears: '3年',
    range: '101-300',
    remainingDays: 332
  },
  {
    school: '顺德职业技术学院',
    format: '私有化部署',
    startDate: '2022-09-05',
    year: 2022,
    platform: '科研协同平台',
    accountQuantity: 18932,
    firstBuyYear: 2022,
    licensePeriod: '3年',
    contractYear: 2022,
    cumulativeYears: '4年',
    range: '31-100',
    remainingDays: 196
  },
  {
    school: '广东科学技术职业学院',
    format: 'SaaS云服务',
    startDate: '2023-05-18',
    year: 2023,
    platform: '继续教育平台',
    accountQuantity: 9876,
    firstBuyYear: 2023,
    licensePeriod: '2年',
    contractYear: 2023,
    cumulativeYears: '3年',
    range: '31-100',
    remainingDays: 287
  },
  {
    school: '西平职业教育中心',
    format: '试用开通',
    startDate: '2024-11-12',
    year: 2024,
    platform: '智慧校园平台',
    accountQuantity: 2156,
    firstBuyYear: 2024,
    licensePeriod: '1年',
    contractYear: 2024,
    cumulativeYears: '1年',
    range: '1-30',
    remainingDays: 28
  },
  {
    school: '江苏农林职业技术学院',
    format: 'SaaS云服务',
    startDate: '2022-06-30',
    year: 2022,
    platform: '数据中台平台',
    accountQuantity: 6543,
    firstBuyYear: 2022,
    licensePeriod: '3年',
    contractYear: 2022,
    cumulativeYears: '4年',
    range: '31-100',
    remainingDays: 154
  },
  {
    school: '无锡职业技术学院',
    format: '私有化部署',
    startDate: '2021-12-01',
    year: 2021,
    platform: '教学资源平台',
    accountQuantity: 12345,
    firstBuyYear: 2021,
    licensePeriod: '3年',
    contractYear: 2021,
    cumulativeYears: '5年',
    range: '31-100',
    remainingDays: 63
  },
  {
    school: '重庆电子工程职业学院',
    format: '私有化部署',
    startDate: '2023-10-09',
    year: 2023,
    platform: '计算机仿真平台',
    accountQuantity: 34120,
    firstBuyYear: 2023,
    licensePeriod: '3年',
    contractYear: 2023,
    cumulativeYears: '3年',
    range: '300以上',
    remainingDays: 412
  },
  {
    school: '陕西工业职业技术学院',
    format: '试用开通',
    startDate: '2025-02-14',
    year: 2025,
    platform: '工业互联网教学中台',
    accountQuantity: 1820,
    firstBuyYear: 2025,
    licensePeriod: '1年',
    contractYear: 2025,
    cumulativeYears: '1年',
    range: '1-30',
    remainingDays: 15
  },
  {
    school: '北京电子科技职业学院',
    format: 'SaaS云服务',
    startDate: '2022-08-20',
    year: 2022,
    platform: '物联网实践系统',
    accountQuantity: 21900,
    firstBuyYear: 2022,
    licensePeriod: '3年',
    contractYear: 2022,
    cumulativeYears: '4年',
    range: '101-300',
    remainingDays: 205
  },
  {
    school: '常州信息职业技术学院',
    format: '私有化部署',
    startDate: '2022-11-05',
    year: 2022,
    platform: '人工智能实训套件',
    accountQuantity: 15400,
    firstBuyYear: 2022,
    licensePeriod: '3年',
    contractYear: 2022,
    cumulativeYears: '3年',
    range: '101-300',
    remainingDays: 145
  },
  {
    school: '黄河水利职业技术学院',
    format: 'SaaS云服务',
    startDate: '2023-04-20',
    year: 2023,
    platform: '水利工程数字化中台',
    accountQuantity: 8750,
    firstBuyYear: 2023,
    licensePeriod: '2年',
    contractYear: 2023,
    cumulativeYears: '3年',
    range: '31-100',
    remainingDays: 520
  },
  {
    school: '浙江金融职业学院',
    format: '私有化部署',
    startDate: '2021-10-18',
    year: 2021,
    platform: '金融大数据实训平台',
    accountQuantity: 31050,
    firstBuyYear: 2021,
    licensePeriod: '3年',
    contractYear: 2021,
    cumulativeYears: '5年',
    range: '300以上',
    remainingDays: 85
  },
  {
    school: '南京信息职业技术学院',
    format: 'SaaS云服务',
    startDate: '2024-03-12',
    year: 2024,
    platform: '智慧教学协同平台',
    accountQuantity: 12400,
    firstBuyYear: 2024,
    licensePeriod: '2年',
    contractYear: 2024,
    cumulativeYears: '2年',
    range: '31-100',
    remainingDays: 298
  },
  {
    school: '四川建筑职业技术学院',
    format: '试用开通',
    startDate: '2025-01-10',
    year: 2025,
    platform: 'BIM虚拟仿真设计中台',
    accountQuantity: 450,
    firstBuyYear: 2025,
    licensePeriod: '1年',
    contractYear: 2025,
    cumulativeYears: '1年',
    range: '1-30',
    remainingDays: 45
  }
];

// --- Static Analytics Data (Matching Screenshot Visuals) ---
const formatChartData = [
  { name: 'SaaS云服务', value: 772, color: '#00f3ff' },
  { name: '私有化部署', value: 368, color: '#10b981' },
  { name: '试用开通', value: 128, color: '#fb923c' }
];

const bracketChartData = [
  { name: '1-30', value: 506, color: '#3b82f6' },
  { name: '31-100', value: 336, color: '#14b8a6' },
  { name: '101-300', value: 218, color: '#a855f7' },
  { name: '300以上', value: 208, color: '#fb923c' }
];

const expirationTrendData = [
  { month: '2025-06', count: 18, ratio: 5.2 },
  { month: '2025-07', count: 21, ratio: 6.1 },
  { month: '2025-08', count: 27, ratio: 7.8 },
  { month: '2025-09', count: 19, ratio: 5.5 },
  { month: '2025-10', count: 22, ratio: 6.3 },
  { month: '2025-11', count: 25, ratio: 7.2 },
  { month: '2025-12', count: 34, ratio: 9.8 },
  { month: '2026-01', count: 31, ratio: 8.9 },
  { month: '2026-02', count: 28, ratio: 8.0 },
  { month: '2026-03', count: 23, ratio: 6.6 },
  { month: '2026-04', count: 20, ratio: 5.7 },
  { month: '2026-05', count: 17, ratio: 4.9 }
];

export default function PlatformApplicationDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFormat, setFilterFormat] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof SchoolRecord; direction: 'asc' | 'desc' } | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Filtering & Sorting Core Logic ---
  const handleSort = (key: keyof SchoolRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    let result = [...applicationData];

    // Search query matched against school or platform
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.school.toLowerCase().includes(query) || 
        item.platform.toLowerCase().includes(query)
      );
    }

    // Filter by Open Format
    if (filterFormat !== "all") {
      result = result.filter(item => item.format === filterFormat);
    }

    // Filter by Contract Year
    if (filterYear !== "all") {
      result = result.filter(item => item.year === parseInt(filterYear, 10));
    }

    // Apply Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === 'asc' 
            ? (aValue as number) - (bValue as number) 
            : (bValue as number) - (aValue as number);
        }
      });
    }

    return result;
  }, [searchQuery, filterFormat, filterYear, sortConfig]);

  // Reset page relative to search size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterFormat, filterYear]);

  // --- Pagination Slice ---
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // --- CSV Export Handler ---
  const handleExportCSV = () => {
    if (filteredData.length === 0) return;

    const headers = [
      "院校名称", "开通形式", "首次开通时间", "开通产品/平台名称", 
      "授权账号数", "首购年份", "授权周期", "合同/授权年份", 
      "累计购买年限", "账号规模区间", "剩余有效期(天)"
    ];
    
    const csvRows = [
      headers.join(','),
      ...filteredData.map(item => [
        `"${item.school}"`,
        `"${item.format}"`,
        `"${item.startDate}"`,
        `"${item.platform}"`,
        item.accountQuantity,
        item.firstBuyYear,
        `"${item.licensePeriod}"`,
        item.contractYear,
        `"${item.cumulativeYears}"`,
        `"${item.range}"`,
        item.remainingDays
      ].join(','))
    ].join('\n');

    const blob = new Blob(["\ufeff" + csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `UUSIMA_应用开通详细表_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#030712] bg-gradient-to-b from-[#03081a] via-[#02050f] to-[#010206] text-slate-100 font-sans flex flex-col overflow-y-auto pb-10 antialiased selection:bg-cyan-500/30">
      
      {/* 🚀 SCI-FI CYBERPUNK HEADER BANNER */}
      <header className="relative w-full bg-[#050b1a]/95 backdrop-blur-md border-b border-cyan-500/20 px-8 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Left Side Group */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2.5 rounded-full hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/30 text-cyan-400 hover:text-cyan-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 animate-pulse" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
              <Building className="w-5 h-5 text-[#030712]" />
            </div>
            <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-cyan-100 to-white drop-shadow-[0_2px_10px_rgba(6,182,212,0.35)] font-mono">
              智慧教学实验端大屏
            </h1>
          </div>
          
          {/* Cyber Tab Switcher */}
          <div className="flex bg-cyan-950/20 ring-1 ring-cyan-500/10 border border-cyan-500/25 p-1 rounded-2xl ml-8 shadow-inner">
            <button
              onClick={() => navigate('/platform-operations-dashboard')}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5 cursor-pointer"
            >
              运营总览
            </button>
            <button
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all bg-gradient-to-r from-cyan-900/90 to-cyan-800/50 ring-1 ring-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              应用开通
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'operations' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5 cursor-pointer"
            >
              运维健康
            </button>
          </div>
        </div>

        {/* Center Title Logo Glow (Inspired by Attachment) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center">
          <div className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_4px_16px_rgba(0,243,255,0.6)] font-mono px-8 py-1.5 relative border-r-2 border-l-2 border-cyan-500/20 bg-gradient-to-r from-cyan-950/10 via-cyan-950/40 to-cyan-950/10 rounded-lg">
            平台应用开通运营总览大屏
            <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></span>
          </div>
        </div>

        {/* Right Dynamic Date Time */}
        <div className="text-xs text-cyan-500/80 flex items-center gap-2 font-mono bg-cyan-950/30 px-3.5 py-1.5 rounded-lg border border-cyan-500/10 shadow-inner">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>数据更新时间:</span>
          <span className="font-din font-semibold text-[#00f3ff] drop-shadow-[0_0_6px_rgba(0,243,255,0.4)]">
            2026-05-29 {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-8 pt-8 flex flex-col gap-6">
        
        {/* ========================================================
            📊 TOP ROW GLOWING KPI CARDS WITH CONCENTRIC HOVER EFFECTS
            ======================================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" id="applications-kpi-row">
          
          {/* Card 1: 开通院校总数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-cyan-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center gap-5 group hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-cyan-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Concentric Circle Icon Container */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-md" />
              <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-blue-400/30 group-hover:rotate-45 transition-transform duration-700" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-blue-500/20 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <School className="w-6 h-6 text-cyan-400 group-hover:scale-115 transition-transform" />
              </div>
            </div>

            {/* Labels & Values */}
            <div className="flex-1 min-w-0">
              <p className="text-cyan-500/70 text-xs font-bold tracking-wider mb-1">开通院校总数</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(34,211,238,0.4)]">
                  1,268
                </span>
                <span className="text-[10px] text-cyan-600/80 font-bold">所</span>
              </div>
              <p className="text-[10px] text-cyan-600/60 mt-1 truncate">已开通平台的学校总计</p>
            </div>
          </div>

          {/* Card 2: 开通账号总数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center gap-5 group hover:border-emerald-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/15 rounded-full blur-md" />
              <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-emerald-400/30 group-hover:-rotate-45 transition-transform duration-700" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Users className="w-6 h-6 text-emerald-400 group-hover:scale-115 transition-transform" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-emerald-500/70 text-xs font-bold tracking-wider mb-1">开通账号总数</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(16,185,129,0.4)]">
                  856,432
                </span>
                <span className="text-[10px] text-emerald-600/80 font-bold">个</span>
              </div>
              <p className="text-[10px] text-emerald-600/60 mt-1 truncate">已开通授权账号的总数量</p>
            </div>
          </div>

          {/* Card 3: 规模化开通院校数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-purple-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center gap-5 group hover:border-purple-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-md" />
              <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-purple-400/30 group-hover:rotate-90 transition-transform duration-1000" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-purple-500/20 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                <GraduationCap className="w-6 h-6 text-purple-400 group-hover:scale-115 transition-transform" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-purple-500/70 text-xs font-bold tracking-wider mb-1">规模化开通院校数</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(168,85,247,0.4)]">
                  362
                </span>
                <span className="text-[10px] text-purple-600/80 font-bold">所</span>
              </div>
              <p className="text-[10px] text-purple-600/60 mt-1 truncate">账号规模 &gt; 30 个的院校数量</p>
            </div>
          </div>

          {/* Card 4: 一年内到期院校数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-orange-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center gap-5 group hover:border-orange-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-orange-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-md" />
              <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-orange-400/30 group-hover:-rotate-90 transition-transform duration-1000" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-orange-500/20 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Clock className="w-6 h-6 text-orange-400 group-hover:scale-115 transition-transform" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-orange-500/70 text-xs font-bold tracking-wider mb-1">一年内到期院校数</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(249,115,22,0.4)]">
                  146
                </span>
                <span className="text-[10px] text-orange-600/80 font-bold">所</span>
              </div>
              <p className="text-[10px] text-orange-600/60 mt-1 truncate">授权将于本年度到期的院校数量</p>
            </div>
          </div>
        </section>

        {/* ========================================================
            📈 MIDDLE ROW METRIC VISUALIZATIONS & CHARTS
            ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="applications-charts-row">
          
          {/* Chart 1: 开通形式分布 (Pie Donut Chart) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#091024]/80 to-[#040815]/95 rounded-2xl border border-cyan-500/15 p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-[310px] group relative">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2">
              <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-cyan-500 rounded-sm inline-block" />
                开通形式分布
              </span>
              <span className="text-[10px] text-cyan-600 font-medium">数据截止：2026-05-29</span>
            </div>
            
            <div className="flex-1 flex items-center justify-between pr-4 relative">
              {/* Donut Container */}
              <div className="w-[150px] h-[150px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formatChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={68}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {formatChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Embedded Center Total Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-cyan-500/60 font-bold tracking-wider">总计</span>
                  <span className="text-lg font-black text-white font-din leading-none">1,268</span>
                  <span className="text-[9px] text-cyan-500/60 font-bold mt-0.5">所院校</span>
                </div>
              </div>

              {/* Legends Stack Info */}
              <div className="flex-1 flex flex-col gap-2.5 pl-4 z-10">
                {formatChartData.map((item, index) => {
                  const percentVal = index === 0 ? '61%' : index === 1 ? '29%' : '10%';
                  return (
                    <div key={item.name} className="flex items-center justify-between group/legend">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-slate-300 font-medium">{item.name}</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-xs font-bold text-white mr-1.5">{item.value}</span>
                        <span className="text-[9px] text-[#00f3ff] font-bold bg-cyan-950/45 border border-cyan-500/10 px-1 py-0.5 rounded">
                          {percentVal}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Ambient bottom line decorative styling */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>

          {/* Chart 2: 账号规模区间分布 (院校数) (Horizontal Bar Chart) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#091024]/80 to-[#040815]/95 rounded-2xl border border-cyan-500/15 p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-[310px] group">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2">
              <span className="text-xs font-bold text-center text-cyan-300 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-emerald-500 rounded-sm inline-block" />
                账号规模区间分布 (院校数)
              </span>
              <span className="text-[10px] text-cyan-600 font-medium">数据截至: 2026-05-29</span>
            </div>

            {/* Horizontal Stack representation of the horizontal bars in attachment */}
            <div className="flex-1 flex flex-col justify-around py-3 px-1">
              {bracketChartData.map((item, idx) => {
                // Bracket visual widths mapped natively: 506 peak
                const maxVal = 600;
                const percentageWidth = Math.min(100, (item.value / maxVal) * 100);
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">{item.name}</span>
                      <span className="font-din font-bold text-white tracking-wide" style={{ color: item.color }}>{item.value} <span className="text-[10px] text-slate-500">所</span></span>
                    </div>
                    
                    {/* The beautiful gradient bar frame */}
                    <div className="w-full bg-[#040815]/80 border border-cyan-500/10 rounded-full h-2 overflow-hidden shadow-inner flex">
                      <div 
                        className="rounded-full h-full relative transition-all duration-1000"
                        style={{ 
                          width: `${percentageWidth}%`, 
                          backgroundColor: item.color,
                          boxShadow: `0 0 10px ${item.color}50`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Bottom scale display */}
            <div className="flex items-center justify-between text-[9px] text-cyan-600/80 border-t border-cyan-500/5 pt-1.5 font-mono px-2">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
              <span>500</span>
              <span className="text-cyan-500 font-bold">600 (所)</span>
            </div>
          </div>

          {/* Chart 3: 一年内到期院校趋势 (Combo Bar + Line Chart) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#091024]/80 to-[#040815]/95 rounded-2xl border border-cyan-500/15 p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-[310px] group">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-1">
              <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-purple-500 rounded-sm inline-block" />
                一年内到期院校趋势 (所)
              </span>
              <div className="flex items-center gap-3 text-[9px] font-bold">
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-2.5 h-1.5 bg-blue-500 rounded" /> 到期院校
                </span>
                <span className="flex items-center gap-1 text-orange-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" /> 占比
                </span>
              </div>
            </div>

            {/* Dual Y-axis Complex Chart using Recharts */}
            <div className="flex-1 w-full min-h-0 pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={expirationTrendData} margin={{ top: 5, right: -5, left: -15, bottom: 5 }}>
                  <XAxis 
                    dataKey="month" 
                    stroke="#1e293b" 
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 8 }}
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="transparent"
                    tick={{ fill: '#475569', fontSize: 8 }} 
                    domain={[0, 45]}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="transparent"
                    tick={{ fill: '#fb923c', fontSize: 8 }}
                    domain={[0, 25]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#091024', borderColor: '#0891b2', borderRadius: '8px' }}
                    labelStyle={{ color: '#00f3ff', fontWeight: 'bold', fontSize: '10px' }}
                  />
                  {/* Glowing bars */}
                  <Bar 
                    yAxisId="left" 
                    dataKey="count" 
                    fill="#3b82f6" 
                    barSize={10} 
                    radius={[2, 2, 0, 0]}
                  />
                  {/* Dynamic connection line */}
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="ratio" 
                    stroke="#fb923c" 
                    strokeWidth={2}
                    dot={{ fill: '#fb923c', stroke: '#040815', strokeWidth: 1, r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>
        </section>

        {/* ========================================================
            📋 BOTTOM SECTION: ACTIVATION DETAILED TABLE
            ======================================================== */}
        <section className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border border-cyan-500/15 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col p-6 gap-5">
          
          {/* Table Header Controls Grid */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-cyan-500/10 pb-4 gap-4">
            
            {/* Title & Stats */}
            <div className="flex items-center gap-4">
              <div className="bg-cyan-500/10 p-2 border border-cyan-500/20 rounded-xl">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-widest text-[#00f3ff] drop-shadow-[0_0_8px_rgba(0,243,255,0.3)]">
                  开通情况明细表
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-cyan-500/80">当前展示:</span>
                  <span className="font-din font-bold text-white text-sm">{filteredData.length}</span>
                  <span className="text-cyan-600/60">/</span>
                  <span className="text-cyan-600/60">共 {applicationData.length} 条记录</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Tool Filters */}
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Search Bar Input */}
              <div className="relative group">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-cyan-500 group-focus-within:text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)] transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索高职院校或平台名称..."
                  className="pl-9 pr-4 py-2 border border-cyan-500/25 rounded-xl text-xs w-[250px] focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-[#040815]/80 text-cyan-100 placeholder:text-cyan-700/80 shadow-[0_2px_15px_rgba(0,0,0,0.4)] font-mono"
                />
              </div>

              {/* Format Filter Selection */}
              <div className="flex bg-[#040815]/90 border border-cyan-500/25 p-1 rounded-xl shadow-inner gap-1">
                {[
                  { name: '全部形式', key: 'all' },
                  { name: 'SaaS服务', key: 'SaaS云服务' },
                  { name: '私有化款', key: '私有化部署' },
                  { name: '试用版', key: '试用开通' }
                ].map(op => (
                  <button
                    key={op.key}
                    onClick={() => setFilterFormat(op.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs leading-none font-bold transition-all whitespace-nowrap cursor-pointer ${filterFormat === op.key ? 'bg-cyan-500 text-[#030712] font-black' : 'text-cyan-600 hover:text-cyan-200'}`}
                  >
                    {op.name}
                  </button>
                ))}
              </div>

              {/* Year Filter Choice */}
              <div className="flex bg-[#040815]/90 border border-cyan-500/25 p-1 rounded-xl shadow-inner gap-1">
                {[
                  { name: '全部年度', key: 'all' },
                  ...[2021, 2022, 2023, 2024, 2025].map(y => ({ name: `${y}年`, key: String(y) }))
                ].map(op => (
                  <button
                    key={op.key}
                    onClick={() => setFilterYear(op.key)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs leading-none font-bold transition-all whitespace-nowrap cursor-pointer ${filterYear === op.key ? 'bg-cyan-500 text-[#030712] font-black' : 'text-cyan-600 hover:text-cyan-200'}`}
                  >
                    {op.name}
                  </button>
                ))}
              </div>

              {/* Export Trigger */}
              <button 
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4.5 py-2 hover:bg-cyan-950/20 bg-[#091024]/80 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-xs font-bold text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)] active:scale-95 group"
              >
                <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                <span>导出数据</span>
              </button>
            </div>
          </div>

          {/* Actual Detailed Data Grid Table */}
          <div className="overflow-x-auto w-full rounded-xl border border-cyan-500/10 shadow-lg">
            <table className="w-full text-left border-collapse table-fixed min-w-[1250px]">
              <thead className="bg-[#040815]/95 sticky top-0 z-10 border-b border-cyan-500/20">
                <tr className="text-cyan-500 text-xs font-bold uppercase tracking-wider">
                  <th onClick={() => handleSort('school')} className="px-5 py-4 w-[18%] cursor-pointer hover:bg-cyan-950/30 transition-colors group">
                    <div className="flex items-center gap-1.5">
                      院校名称
                      <Filter className={`w-3.5 h-3.5 opacity-30 group-hover:opacity-100 ${sortConfig?.key === 'school' ? 'text-cyan-400 opacity-100' : ''}`} />
                    </div>
                  </th>
                  <th className="px-5 py-4 w-[10%]">开通形式</th>
                  <th onClick={() => handleSort('startDate')} className="px-5 py-4 w-[11%] cursor-pointer hover:bg-cyan-950/30 transition-colors group">
                    <div className="flex items-center gap-1.5">
                      首次开通时间
                      <Filter className={`w-3.5 h-3.5 opacity-30 group-hover:opacity-100 ${sortConfig?.key === 'startDate' ? 'text-cyan-400 opacity-100' : ''}`} />
                    </div>
                  </th>
                  <th className="px-5 py-4 w-[16%]">开通产品/平台名称</th>
                  <th onClick={() => handleSort('accountQuantity')} className="px-5 py-4 w-[10%] text-right cursor-pointer hover:bg-cyan-950/30 transition-colors group">
                    <div className="flex items-center justify-end gap-1.5">
                      授权账号数
                      <Filter className={`w-3.5 h-3.5 opacity-30 group-hover:opacity-100 ${sortConfig?.key === 'accountQuantity' ? 'text-cyan-400 opacity-100' : ''}`} />
                    </div>
                  </th>
                  <th className="px-5 py-4 w-[8%] text-center">首购年份</th>
                  <th className="px-5 py-4 w-[8%] text-center">授权周期</th>
                  <th className="px-5 py-4 w-[10%] text-center">合同/授权年份</th>
                  <th className="px-5 py-4 w-[10%] text-center">累计购买年限</th>
                  <th className="px-5 py-4 w-[11%] text-center">账号规模区间</th>
                  <th onClick={() => handleSort('remainingDays')} className="px-5 py-4 w-[10%] text-right cursor-pointer hover:bg-cyan-950/30 transition-colors group">
                    <div className="flex items-center justify-end gap-1.5">
                      剩余有效期
                      <Filter className={`w-3.5 h-3.5 opacity-30 group-hover:opacity-100 ${sortConfig?.key === 'remainingDays' ? 'text-cyan-400 opacity-100' : ''}`} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10 text-slate-300 text-xs font-mono">
                {pagedData.length > 0 ? pagedData.map((item, index) => {
                  
                  // Remaining validity day color assignment as designed
                  let remColor = "text-emerald-400 font-bold";
                  if (item.remainingDays <= 30) {
                    remColor = "text-red-500 font-extrabold shadow-sm animate-pulse";
                  } else if (item.remainingDays <= 120) {
                    remColor = "text-amber-500 font-bold";
                  }

                  // Open format coloring tags
                  let formClass = "text-cyan-400 bg-cyan-950/40 border border-cyan-500/20";
                  if (item.format === '私有化部署') {
                    formClass = "text-emerald-400 bg-emerald-950/40 border border-emerald-500/20";
                  } else if (item.format === '试用开通') {
                    formClass = "text-orange-400 bg-orange-950/45 border border-orange-500/20";
                  }

                  // Bracket intervals color capsules
                  let bkClass = "bg-blue-950/40 text-blue-300 border border-blue-500/20";
                  if (item.range === '300以上') bkClass = "bg-amber-950/40 text-amber-300 border border-amber-500/20";
                  else if (item.range === '101-300') bkClass = "bg-purple-950/40 text-purple-300 border border-purple-500/20";
                  else if (item.range === '31-100') bkClass = "bg-teal-950/40 text-teal-300 border border-teal-500/20";

                  return (
                    <tr key={index} className="hover:bg-cyan-950/15 group/row transition-all duration-150">
                      
                      {/* School Name */}
                      <td className="px-5 py-4 w-[18%] font-extrabold text-[#e2e8f0] truncate group-hover/row:text-cyan-300 transition-colors" title={item.school}>
                        {item.school}
                      </td>

                      {/* Format Badge */}
                      <td className="px-5 py-4 w-[10%]">
                        <span className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black inline-block ${formClass}`}>
                          {item.format}
                        </span>
                      </td>

                      {/* Launching Date */}
                      <td className="px-5 py-4 w-[11%] text-slate-400 font-din">
                        {item.startDate}
                      </td>

                      {/* Platform */}
                      <td className="px-5 py-4 w-[16%] text-slate-300 font-bold truncate transition-colors group-hover/row:text-slate-100" title={item.platform}>
                        {item.platform}
                      </td>

                      {/* Authorized Account Count */}
                      <td className="px-5 py-4 w-[10%] text-right text-cyan-300 font-din font-bold text-sm">
                        {item.accountQuantity.toLocaleString()}
                      </td>

                      {/* Purchase Year */}
                      <td className="px-5 py-4 w-[8%] text-center text-slate-400 font-din">
                        {item.firstBuyYear}
                      </td>

                      {/* Period */}
                      <td className="px-5 py-4 w-[8%] text-center text-slate-405 font-bold">
                        {item.licensePeriod}
                      </td>

                      {/* Contract Year */}
                      <td className="px-5 py-4 w-[10%] text-center text-slate-405 font-din">
                        {item.contractYear}
                      </td>

                      {/* Cumulative purchased years */}
                      <td className="px-5 py-4 w-[10%] text-center text-slate-350 font-bold">
                        {item.cumulativeYears}
                      </td>

                      {/* Interval/Scale Range */}
                      <td className="px-5 py-4 w-[11%] text-center">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black ${bkClass}`}>
                          {item.range}
                        </span>
                      </td>

                      {/* Remaining Valid Days */}
                      <td className={`px-5 py-4 w-[10%] text-right font-din ${remColor} text-sm`}>
                        {item.remainingDays}天
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={11} className="px-5 py-14 text-center text-cyan-500/40 font-bold text-sm">
                      没有检索到符合过滤限制的高职院校数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Navigation and Selector */}
          <div className="bg-[#040815]/80 border border-cyan-500/10 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-cyan-600">
            
            {/* Page Size Options */}
            <div className="flex items-center gap-3">
              <span>每页显示</span>
              <div className="relative">
                <select 
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="bg-[#091024] cursor-pointer outline-none border border-cyan-500/30 rounded-lg px-2.5 py-1 text-cyan-300 font-mono text-xs focus:ring-1 focus:ring-cyan-500 shadow-inner"
                >
                  {[5, 10, 15, 20].map(sz => (
                    <option key={sz} value={sz} className="bg-[#091024]">{sz} 条</option>
                  ))}
                </select>
              </div>
              <span>记录</span>
            </div>

            {/* Paging Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 px-[7px] border border-cyan-500/10 bg-[#091024]/40 hover:bg-[#091024]/80 disabled:opacity-30 rounded-lg text-cyan-400 hover:text-cyan-100 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 text-xs font-black transition-all rounded-lg cursor-pointer ${currentPage === p ? 'bg-cyan-500 text-[#040815]' : 'border border-cyan-500/10 bg-transparent text-cyan-500 hover:border-cyan-500/30 hover:text-cyan-300'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 px-[7px] border border-cyan-500/10 bg-[#091024]/40 hover:bg-[#091024]/80 disabled:opacity-30 rounded-lg text-cyan-400 hover:text-cyan-100 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
