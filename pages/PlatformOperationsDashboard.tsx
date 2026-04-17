import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Legend,
  LabelList
} from "recharts";
import { 
  Clock, 
  ArrowLeft, 
  Users, 
  School, 
  BookOpen, 
  Wrench, 
  Cpu,
  TrendingUp,
  BarChart3,
  Flame,
  Award,
  ChevronDown,
  X
} from "lucide-react";

// --- Mock Data ---
const overallData = {
  users: { total: 12580, trial: 3200, official: 9380 },
  schools: { total: 156, online: 128, private: 28 },
  courseSales: { total: 2850, online: 2120, private: 730 },
  toolUsage: { total: 45680 },
  agentInvocations: { total: 128500, software: 95200, hardware: 33300 },
  labDuration: { total: 68900, hours: 12580 }
};

const trendData = {
  courseLearning: [
    { month: '9月', online: 12000, private: 22000 },
    { month: '10月', online: 13000, private: 25000 },
    { month: '11月', online: 14000, private: 28000 },
    { month: '12月', online: 15000, private: 32000 },
  ],
  labDuration: [
    { month: '9月', online: 15000, private: 35000 },
    { month: '10月', online: 18000, private: 38000 },
    { month: '11月', online: 20000, private: 42000 },
    { month: '12月', online: 22000, private: 45000 },
  ],
  newSchools: [
    { month: '9月', count: 12 },
    { month: '10月', count: 15 },
    { month: '11月', count: 18 },
    { month: '12月', count: 22 },
  ]
};

const activityData = {
  activeSchools: [
    { name: '深圳职业技术学院', lab: 6000, login: 7000, course: 5500 },
    { name: '广州番禺职业技术学院', lab: 5500, login: 6500, course: 5000 },
    { name: '广东轻工职业技术学院', lab: 5000, login: 6000, course: 4500 },
    { name: '顺德职业技术学院', lab: 4500, login: 5500, course: 4000 },
    { name: '广东科学技术职业学院', lab: 4000, login: 5000, course: 3500 },
  ],
  activeCourses: [
    { name: 'Python 程序设计', duration: 75000, visits: 40000 },
    { name: '人工智能基础', duration: 65000, visits: 35000 },
    { name: '物联网导论', duration: 55000, visits: 30000 },
    { name: '大数据分析', duration: 45000, visits: 25000 },
    { name: '工业互联网', duration: 35000, visits: 22000 },
  ],
  activeLabs: [
    { name: 'AI 模型训练实验室', count: 9000, duration: 45000 },
    { name: '物联网仿真实验室', count: 8000, duration: 40000 },
    { name: '大数据处理实验室', count: 7000, duration: 35000 },
    { name: '区块链开发实验室', count: 6000, duration: 28000 },
    { name: '工业互联网实验室', count: 5000, duration: 25000 },
  ]
};

const leaderboardData = {
  schools: [
    { rank: 1, name: '深圳职业技术学院', duration: '45,800 分钟', token: '125,000' },
    { rank: 2, name: '广州番禺职业技术学院', duration: '41,200 分钟', token: '112,000' },
    { rank: 3, name: '广东轻工职业技术学院', duration: '37,500 分钟', token: '98,000' },
    { rank: 4, name: '顺德职业技术学院', duration: '33,800 分钟', token: '88,000' },
    { rank: 5, name: '广东科学技术职业学院', duration: '30,200 分钟', token: '78,000' },
  ],
  courses: [
    { rank: 1, name: 'Python 程序设计', duration: '68,000 分钟' },
    { rank: 2, name: '人工智能基础', duration: '62,000 分钟' },
    { rank: 3, name: '物联网导论', duration: '53,000 分钟' },
    { rank: 4, name: '大数据分析', duration: '46,000 分钟' },
    { rank: 5, name: '工业互联网', duration: '39,000 分钟' },
  ],
  labs: [
    { rank: 1, name: 'AI 模型训练实验室', duration: '45,000 分钟' },
    { rank: 2, name: '物联网仿真实验室', duration: '39,500 分钟' },
    { rank: 3, name: '大数据处理实验室', duration: '35,000 分钟' },
    { rank: 4, name: '区块链开发实验室', duration: '28,500 分钟' },
    { rank: 5, name: '工业互联网实验室', duration: '23,800 分钟' },
  ]
};

// Generate mock data for "View All" modals
const generateMockData = (type: string, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const rank = i + 1;
    if (type === 'activeSchools') {
      return { rank, name: `测试院校 ${rank}`, lab: Math.floor(Math.random() * 5000) + 1000, login: Math.floor(Math.random() * 6000) + 1000, course: Math.floor(Math.random() * 4000) + 1000 };
    }
    if (type === 'activeCourses') {
      return { rank, name: `测试课程 ${rank}`, duration: Math.floor(Math.random() * 50000) + 10000, visits: Math.floor(Math.random() * 30000) + 5000 };
    }
    if (type === 'activeLabs') {
      return { rank, name: `测试实验环境 ${rank}`, count: Math.floor(Math.random() * 8000) + 1000, duration: Math.floor(Math.random() * 40000) + 5000 };
    }
    if (type === 'leaderboardSchools') {
      return { rank, name: `测试院校 ${rank}`, duration: `${(Math.floor(Math.random() * 40000) + 5000).toLocaleString()} 分钟`, token: (Math.floor(Math.random() * 100000) + 10000).toLocaleString() };
    }
    if (type === 'leaderboardCourses') {
      return { rank, name: `测试课程 ${rank}`, duration: `${(Math.floor(Math.random() * 60000) + 10000).toLocaleString()} 分钟` };
    }
    if (type === 'leaderboardLabs') {
      return { rank, name: `测试实验环境 ${rank}`, duration: `${(Math.floor(Math.random() * 40000) + 5000).toLocaleString()} 分钟` };
    }
    if (type === 'trendCourseDetails') {
      return { rank, name: `测试院校 ${rank}`, duration: `${(Math.floor(Math.random() * 80000) + 10000).toLocaleString()} 分钟` };
    }
    if (type === 'trendLabDetails') {
      return { rank, name: `测试院校 ${rank}`, duration: `${(Math.floor(Math.random() * 60000) + 5000).toLocaleString()} 分钟` };
    }
    if (type === 'trendNewSchoolsDetails') {
      return { rank, name: `新合作院校 ${rank}`, accountCount: Math.floor(Math.random() * 500) + 50, duration: `${(Math.floor(Math.random() * 20000) + 1000).toLocaleString()} 分钟` };
    }
    return { rank, name: `Item ${rank}` };
  });
};

const fullData = {
  activeSchools: [...activityData.activeSchools.map((item, i) => ({ rank: i + 1, ...item })), ...generateMockData('activeSchools', 115)],
  activeCourses: [...activityData.activeCourses.map((item, i) => ({ rank: i + 1, ...item })), ...generateMockData('activeCourses', 145)],
  activeLabs: [...activityData.activeLabs.map((item, i) => ({ rank: i + 1, ...item })), ...generateMockData('activeLabs', 105)],
  leaderboardSchools: [...leaderboardData.schools, ...generateMockData('leaderboardSchools', 125)],
  leaderboardCourses: [...leaderboardData.courses, ...generateMockData('leaderboardCourses', 135)],
  leaderboardLabs: [...leaderboardData.labs, ...generateMockData('leaderboardLabs', 120)],
  trendCourseDetails: generateMockData('trendCourseDetails', 150),
  trendLabDetails: generateMockData('trendLabDetails', 150),
  trendNewSchoolsDetails: generateMockData('trendNewSchoolsDetails', 67),
};

const PlatformOperationsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isChartAnimationActive, setIsChartAnimationActive] = useState(true);
  
  // Filters state
  const [schoolFilter, setSchoolFilter] = useState('按日');
  const [courseFilter, setCourseFilter] = useState('按日');
  const [labFilter, setLabFilter] = useState('按日');

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    columns: string[];
    data: any[];
    type: string;
  }>({
    isOpen: false,
    title: '',
    columns: [],
    data: [],
    type: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartAnimationActive(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleViewAll = (title: string, columns: string[], data: any[], type: string) => {
    setModalConfig({
      isOpen: true,
      title,
      columns,
      data,
      type
    });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const getScaledData = (data: any[], filter: string) => {
    const multiplier = filter === '按日' ? 1 : filter === '按周' ? 7 : filter === '按月' ? 30 : 365;
    
    const scaled = data.map(item => {
      const newItem = { ...item };
      // Generate a stable pseudo-random factor based on name and filter
      const seedStr = item.name + filter;
      let hash = 0;
      for (let i = 0; i < seedStr.length; i++) {
        hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
        hash |= 0;
      }
      const randomFactor = 0.7 + (Math.abs(hash % 60) / 100); // 0.7 to 1.29
      
      for (const key in newItem) {
        if (typeof newItem[key] === 'number' && key !== 'rank') {
          newItem[key] = Math.floor(newItem[key] * multiplier * randomFactor);
        }
      }
      return newItem;
    });

    // Sort by the first numeric key to maintain largest to smallest order
    scaled.sort((a, b) => {
      const key = Object.keys(a).find(k => typeof a[k] === 'number' && k !== 'rank');
      if (key) {
        return (b[key as keyof typeof b] as number) - (a[key as keyof typeof a] as number);
      }
      return 0;
    });

    // Update ranks after sorting
    return scaled.map((item, index) => ({ ...item, rank: index + 1 }));
  };

  const StickyTooltip = ({ active, payload, label, setHasHovered }: any) => {
    const [lastData, setLastData] = useState<{ payload: any, label: any } | null>(null);

    useEffect(() => {
      if (active && payload && payload.length) {
        setLastData({ payload, label });
        if (setHasHovered) setHasHovered(true);
      }
    }, [active, payload, label, setHasHovered]);

    if (!lastData) return null;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100 min-w-[150px]">
        <p className="font-medium text-slate-800 mb-2">{lastData.label}</p>
        {lastData.payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium text-slate-900">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  const [hoveredCharts, setHoveredCharts] = useState<Record<string, boolean>>({});

  const SectionTitle = ({ icon: Icon, title, color }: { icon: any, title: string, color: string }) => (
    <div className="flex items-center gap-2 mb-4 mt-8 first:mt-0">
      <Icon className={`w-5 h-5 ${color}`} />
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
  );

  const StatCard = ({ title, value, subtext, icon: Icon, iconColor }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <div className={`p-2 rounded-lg bg-slate-50`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900 mb-2 font-din">{value.toLocaleString()}</div>
        <div className="text-xs text-slate-500">{subtext}</div>
      </div>
    </div>
  );

  const ChartCard = ({ title, onViewAll, viewAllText = "查看全部", filter, onFilterChange, children }: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col h-[320px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <div className="flex items-center gap-3">
            {onViewAll && (
              <button 
                onClick={onViewAll}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {viewAllText}
              </button>
            )}
            {filter && onFilterChange ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  {filter} <ChevronDown className="w-3 h-3" />
                </button>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-1 w-24 bg-white border border-slate-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        {['按日', '按周', '按月', '按年'].map(f => (
                          <button 
                            key={f}
                            onClick={() => {
                              onFilterChange(f);
                              setIsDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 ${filter === f ? 'bg-slate-50 font-medium' : ''}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100 transition-colors">
                  按月 <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 mt-1 w-24 bg-white border border-slate-200 rounded-md shadow-lg hidden group-hover:block z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">按日</button>
                    <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">按周</button>
                    <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 bg-slate-50 font-medium">按月</button>
                    <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">按年</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 w-full h-full min-h-0">
          {children}
        </div>
      </div>
    );
  };

  const LeaderboardCard = ({ title, icon: Icon, iconColor, columns, data, onViewAll }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
        </div>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            查看全部
          </button>
        )}
      </div>
      <div className="flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 border-b border-slate-100">
            <tr>
              {columns.map((col: string, idx: number) => (
                <th key={idx} className={`pb-3 font-medium ${idx > 0 ? 'text-right' : ''}`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, idx: number) => (
              <tr key={idx} className="border-b border-slate-50 last:border-0">
                <td className="py-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                    row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                    row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-slate-50 text-slate-500'
                  }`}>
                    {row.rank}
                  </div>
                </td>
                <td className="py-3 font-medium text-slate-700">{row.name}</td>
                {row.duration && <td className="py-3 text-right text-slate-600">{row.duration}</td>}
                {row.token && <td className="py-3 text-right text-slate-600">{row.token}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-y-auto pb-10">
      <style>{`
        .sticky-tooltip-wrapper {
          visibility: visible !important;
          opacity: 1 !important;
          transition: transform 0.2s ease;
          z-index: 50;
        }
        .sticky-tooltip-wrapper.hidden-initial {
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/big-screen-dashboard')}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              UUSIMA 平台运营数据看板
            </h1>
            <div className="text-xs text-slate-500 mt-0.5">
              实时监测平台运营数据与使用情况
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-500 flex items-center gap-2">
          最后更新: <span className="font-din font-medium text-slate-700">{currentTime.toLocaleTimeString('zh-CN', { hour12: false })}</span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 pt-6 space-y-8">
        
        {/* Section 1: 数据总览 */}
        <section>
          <SectionTitle icon={BarChart3} title="数据总览" color="text-blue-600" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard 
              title="平台用户数" 
              value={overallData.users.total} 
              subtext={`体验账号: ${overallData.users.trial.toLocaleString()} | 正式账号: ${overallData.users.official.toLocaleString()}`}
              icon={Users}
              iconColor="text-blue-500"
            />
            <StatCard 
              title="学校总数" 
              value={overallData.schools.total} 
              subtext={`线上: ${overallData.schools.online} | 私有化: ${overallData.schools.private}`}
              icon={School}
              iconColor="text-emerald-500"
            />
            <StatCard 
              title="课程销量" 
              value={overallData.courseSales.total} 
              subtext={`线上: ${overallData.courseSales.online.toLocaleString()} | 私有化: ${overallData.courseSales.private.toLocaleString()}`}
              icon={BookOpen}
              iconColor="text-violet-500"
            />
            <StatCard 
              title="教学工具使用量" 
              value={overallData.toolUsage.total} 
              subtext="AI 教学工具总使用次数"
              icon={Wrench}
              iconColor="text-orange-500"
            />
            <StatCard 
              title="智能体调用次数" 
              value={overallData.agentInvocations.total} 
              subtext={`软件: ${overallData.agentInvocations.software.toLocaleString()} | 硬件: ${overallData.agentInvocations.hardware.toLocaleString()}`}
              icon={Cpu}
              iconColor="text-pink-500"
            />
            <StatCard 
              title="实验使用时长" 
              value={overallData.labDuration.total} 
              subtext={`总时长: ${overallData.labDuration.hours.toLocaleString()} 小时`}
              icon={Clock}
              iconColor="text-cyan-500"
            />
          </div>
        </section>

        {/* Section 2: 趋势分析 */}
        <section>
          <SectionTitle icon={TrendingUp} title="趋势分析" color="text-emerald-600" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard 
              title="课程学习时长"
              viewAllText="查看详情"
              onViewAll={() => handleViewAll('课程学习时长排行', ['排名', '学校名称', '累计学习时长'], fullData.trendCourseDetails, 'trendCourseDetails')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData.courseLearning} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrivateCourse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOnlineCourse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <RechartsTooltip isAnimationActive={false} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="private" name="私有化课程" stroke="#34D399" fillOpacity={1} fill="url(#colorPrivateCourse)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="private" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Area>
                  <Area type="monotone" dataKey="online" name="线上课程" stroke="#60A5FA" fillOpacity={1} fill="url(#colorOnlineCourse)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="online" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard 
              title="实验使用时长"
              viewAllText="查看详情"
              onViewAll={() => handleViewAll('实验环境使用时长排行', ['排名', '学校名称', '累计使用时长'], fullData.trendLabDetails, 'trendLabDetails')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData.labDuration} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrivateLab" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOnlineLab" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <RechartsTooltip isAnimationActive={false} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="private" name="私有化实验" stroke="#A78BFA" fillOpacity={1} fill="url(#colorPrivateLab)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="private" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Area>
                  <Area type="monotone" dataKey="online" name="线上实验" stroke="#FBBF24" fillOpacity={1} fill="url(#colorOnlineLab)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="online" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard 
              title="新开通学校数"
              viewAllText="查看详情"
              onViewAll={() => handleViewAll('新开通学校详情', ['序号', '学校名称', '账号数', '累计时长'], fullData.trendNewSchoolsDetails, 'trendNewSchoolsDetails')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData.newSchools} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <RechartsTooltip isAnimationActive={false} cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="count" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>

        {/* Section 3: 教学与实训活动情况 */}
        <section>
          <SectionTitle icon={Flame} title="教学与实训活动情况" color="text-red-500" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard 
              title="活跃院校榜单"
              filter={schoolFilter}
              onFilterChange={setSchoolFilter}
              onViewAll={() => handleViewAll('活跃院校榜单', ['排名', '学校名称', '实验环境调用量', '平台登录人次', '课程参与频次'], getScaledData(fullData.activeSchools, schoolFilter), 'activeSchools')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getScaledData(activityData.activeSchools, schoolFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={100} />
                  <RechartsTooltip 
                    content={<StickyTooltip setHasHovered={(v: boolean) => setHoveredCharts(prev => ({...prev, activeSchools: v}))} />}
                    wrapperClassName={hoveredCharts['activeSchools'] ? "sticky-tooltip-wrapper" : "sticky-tooltip-wrapper hidden-initial"}
                    cursor={{ fill: '#F1F5F9' }} 
                    isAnimationActive={false}
                  />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="lab" name="实验环境调用量" fill="#F59E0B" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="lab" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="login" name="平台登录人次" fill="#3B82F6" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="login" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="course" name="课程参与频次" fill="#10B981" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="course" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard 
              title="课程热度榜单"
              filter={courseFilter}
              onFilterChange={setCourseFilter}
              onViewAll={() => handleViewAll('课程热度榜单', ['排名', '课程名称', '累计学习时长', '累计访问人次'], getScaledData(fullData.activeCourses, courseFilter), 'activeCourses')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getScaledData(activityData.activeCourses, courseFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={80} />
                  <RechartsTooltip 
                    content={<StickyTooltip setHasHovered={(v: boolean) => setHoveredCharts(prev => ({...prev, activeCourses: v}))} />}
                    wrapperClassName={hoveredCharts['activeCourses'] ? "sticky-tooltip-wrapper" : "sticky-tooltip-wrapper hidden-initial"}
                    cursor={{ fill: '#F1F5F9' }} 
                    isAnimationActive={false}
                  />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="duration" name="累计学习时长" fill="#EC4899" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="duration" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="visits" name="累计访问人次" fill="#8B5CF6" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="visits" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard 
              title="实验环境使用榜单"
              filter={labFilter}
              onFilterChange={setLabFilter}
              onViewAll={() => handleViewAll('实验环境使用榜单', ['排名', '实验环境名称', '资源并发数', '累计运行时长'], getScaledData(fullData.activeLabs, labFilter), 'activeLabs')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getScaledData(activityData.activeLabs, labFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={100} />
                  <RechartsTooltip 
                    content={<StickyTooltip setHasHovered={(v: boolean) => setHoveredCharts(prev => ({...prev, activeLabs: v}))} />}
                    wrapperClassName={hoveredCharts['activeLabs'] ? "sticky-tooltip-wrapper" : "sticky-tooltip-wrapper hidden-initial"}
                    cursor={{ fill: '#F1F5F9' }} 
                    isAnimationActive={false}
                  />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="count" name="资源并发数" fill="#06B6D4" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="count" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="duration" name="累计运行时长" fill="#F97316" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="duration" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>

        {/* Section 4: 核心业务排行 */}
        <section>
          <SectionTitle icon={Award} title="核心业务排行" color="text-amber-500" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LeaderboardCard 
              title="院校资源用量排行 Top5" 
              icon={School} 
              iconColor="text-blue-500"
              columns={['排名', '学校名称', '累计实训时长', 'AI 算力消耗']}
              data={leaderboardData.schools}
              onViewAll={() => handleViewAll('院校资源用量排行', ['排名', '学校名称', '累计实训时长', 'AI 算力消耗'], fullData.leaderboardSchools, 'leaderboardSchools')}
            />
            <LeaderboardCard 
              title="热门课程学时榜单 Top5" 
              icon={BookOpen} 
              iconColor="text-emerald-500"
              columns={['排名', '课程名称', '累计学时']}
              data={leaderboardData.courses}
              onViewAll={() => handleViewAll('热门课程学时榜单', ['排名', '课程名称', '累计学时'], fullData.leaderboardCourses, 'leaderboardCourses')}
            />
            <LeaderboardCard 
              title="实训环境调用排行 Top5" 
              icon={Wrench} 
              iconColor="text-purple-500"
              columns={['排名', '实验环境名称', '环境运行总时长']}
              data={leaderboardData.labs}
              onViewAll={() => handleViewAll('实训环境调用排行', ['排名', '实验环境名称', '环境运行总时长'], fullData.leaderboardLabs, 'leaderboardLabs')}
            />
          </div>
        </section>

      </main>

      {/* Data Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">{modalConfig.title}</h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 border-b border-slate-200 sticky top-0 bg-white z-10">
                  <tr>
                    {modalConfig.columns.map((col: string, idx: number) => (
                      <th key={idx} className={`pb-3 pt-2 font-medium ${idx > 1 ? 'text-right' : ''}`}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalConfig.data.map((row: any, idx: number) => (
                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 w-16">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                          row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                          row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                          'bg-slate-50 text-slate-500'
                        }`}>
                          {row.rank}
                        </div>
                      </td>
                      <td className="py-3 font-medium text-slate-700">{row.name}</td>
                      
                      {/* Dynamic columns based on type */}
                      {modalConfig.type === 'activeSchools' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.lab?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.login?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.course?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'activeCourses' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.duration?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.visits?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'activeLabs' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.count?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.duration?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'leaderboardSchools' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.duration}</td>
                          <td className="py-3 text-right text-slate-600">{row.token}</td>
                        </>
                      )}
                      {modalConfig.type === 'leaderboardCourses' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'leaderboardLabs' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendCourseDetails' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendLabDetails' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendNewSchoolsDetails' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.accountCount}</td>
                          <td className="py-3 text-right text-slate-600">{row.duration}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-right">
              共 {modalConfig.data.length} 条记录
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformOperationsDashboard;
