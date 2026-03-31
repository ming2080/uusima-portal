import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  Legend
} from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Clock, ArrowLeft, Activity, Server, Users, Zap } from "lucide-react";

// --- Utility Functions ---
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

// --- Mock Data ---
const businessData = {
  schoolSales: { total: 1570, online: 1250, private: 320 },
  courseSalesTotal: { total: 9700, online: 8500, private: 1200 },
  huaweiCloud: { totalUsage: 1250000, monthUsage: 150000, balance: 350000 },
  aliCloud: { totalUsage: 2800000, monthUsage: 320000, balance: 850000 },
};

const opsData = {
  totalUsers: 1200000,
  mau: 450000,
  concurrentUsers: 12450,
  offlineServers: 3,
  onlineServers: 128,
};

const regionLeaderboard = [
  { region: '华东大区', sales: 12500000, customers: 350 },
  { region: '华北大区', sales: 9800000, customers: 280 },
  { region: '华南大区', sales: 8500000, customers: 245 },
  { region: '华中大区', sales: 6200000, customers: 180 },
  { region: '西南大区', sales: 5400000, customers: 150 },
  { region: '西北大区', sales: 3800000, customers: 110 },
  { region: '东北大区', sales: 3200000, customers: 95 },
  { region: '港澳台及海外', sales: 1500000, customers: 40 },
];

const pieData = [
  { name: '在线学校', value: businessData.schoolSales.online },
  { name: '私有化学校', value: businessData.schoolSales.private },
];
const COLORS = ['#22D3EE', '#A78BFA']; // Cyan and Purple

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

const CardHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) => (
  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="w-5 h-5 text-violet-400" />}
      <h3 className="text-base font-bold text-slate-100 tracking-wider">{title}</h3>
    </div>
    {subtitle && <span className="text-[10px] text-slate-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{subtitle}</span>}
  </div>
);

const BigScreenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 font-sans overflow-hidden flex flex-col relative selection:bg-violet-500/30">
      {/* 装饰背景 - 深曜石默蓝 + AI时尚紫色系 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-900/10 rounded-full blur-[100px]"></div>
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 bg-[#0B1121]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/operations-dashboard')} className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 tracking-widest">
              UUSIMA 运营决策大屏
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 text-violet-200 font-medium bg-white/5 px-5 py-2 rounded-xl border border-white/10 backdrop-blur-md">
          <Clock className="w-4 h-4 text-violet-400" />
          <span className="text-sm tracking-wider font-mono">
            {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })} {' '}
            {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </span>
        </div>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="flex-1 p-6 grid grid-cols-12 gap-6 relative z-10 h-[calc(100vh-88px)]">
        
        {/* Left Column */}
        <div className="col-span-3 flex flex-col gap-6 h-full">
          {/* Card 1: 平台销售学校数量 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 flex flex-col relative overflow-hidden group hover:border-violet-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <CardHeader title="平台销售学校" subtitle="SCHOOLS" icon={Activity} />
            <div className="flex-1 flex flex-col justify-center items-center relative z-10">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 font-mono tracking-tight">
                {businessData.schoolSales.total}
              </div>
              <div className="text-sm text-slate-400 font-medium mb-8 tracking-widest">总销售学校 (所)</div>
              <div className="flex w-full justify-around bg-black/20 rounded-2xl p-4 border border-white/5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 font-mono tracking-tight">{businessData.schoolSales.online}</div>
                  <div className="text-xs text-slate-400 mt-1">在线版</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-400 font-mono tracking-tight">{businessData.schoolSales.private}</div>
                  <div className="text-xs text-slate-400 mt-1">私有化</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 平台销售占比 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 flex flex-col group hover:border-violet-500/30 transition-colors">
            <CardHeader title="销售形态占比" subtitle="RATIO" icon={PieChart as any} />
            <div className="flex-1 w-full h-full min-h-[150px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.map(d => ({...d}))}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-xs text-slate-400">总计</span>
                <span className="text-xl font-bold text-slate-200 font-mono tracking-tight">{businessData.schoolSales.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="col-span-6 flex flex-col gap-6 h-full">
          {/* Top 4 KPI Cards - Bento Style */}
          <div className="grid grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden group hover:bg-white/10 transition-all">
              <div className="text-xs font-medium text-slate-400 mb-2 tracking-wider">课程销售总量</div>
              <div className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">{businessData.courseSalesTotal.total}</div>
              <div className="flex justify-between text-[10px] text-slate-400 bg-black/20 px-3 py-1.5 rounded-lg font-mono">
                <span className="text-cyan-400">在线: {businessData.courseSalesTotal.online}</span>
                <span className="text-violet-400">私有: {businessData.courseSalesTotal.private}</span>
              </div>
            </div>
            {/* KPI 2 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden group hover:bg-white/10 transition-all">
              <div className="text-xs font-medium text-slate-400 mb-2 tracking-wider">华为云总用量</div>
              <div className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">¥{formatChineseUnit(businessData.huaweiCloud.totalUsage)}</div>
              <div className="flex justify-between text-[10px] text-slate-400 bg-black/20 px-3 py-1.5 rounded-lg font-mono">
                <span>月: {formatChineseUnit(businessData.huaweiCloud.monthUsage)}</span>
                <span className="text-emerald-400">余: {formatChineseUnit(businessData.huaweiCloud.balance)}</span>
              </div>
            </div>
            {/* KPI 3 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden group hover:bg-white/10 transition-all">
              <div className="text-xs font-medium text-slate-400 mb-2 tracking-wider">阿里云总用量</div>
              <div className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">¥{formatChineseUnit(businessData.aliCloud.totalUsage)}</div>
              <div className="flex justify-between text-[10px] text-slate-400 bg-black/20 px-3 py-1.5 rounded-lg font-mono">
                <span>月: {formatChineseUnit(businessData.aliCloud.monthUsage)}</span>
                <span className="text-emerald-400">余: {formatChineseUnit(businessData.aliCloud.balance)}</span>
              </div>
            </div>
            {/* KPI 4: Server Status */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden group hover:bg-white/10 transition-all">
              <div className="text-xs font-medium text-slate-400 mb-2 tracking-wider">服务器状态</div>
              <div className="flex items-baseline gap-2 mb-3">
                <div className="text-3xl font-bold text-cyan-400 font-mono tracking-tight">{opsData.onlineServers}</div>
                <div className="text-sm text-slate-500 font-mono">/ {opsData.onlineServers + opsData.offlineServers}</div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 bg-black/20 px-3 py-1.5 rounded-lg font-mono">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>在线</span>
                <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>离线: {opsData.offlineServers}</span>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative flex flex-col items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none"></div>
            
            <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
              <div className="w-2 h-6 bg-violet-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-white tracking-widest">
                全国销售分布态势
              </h2>
            </div>
            
            {/* Map Container */}
            <div className="w-full h-full relative z-0 flex items-center justify-center pt-10">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 750, center: [105, 36] }}
                style={{ width: "100%", height: "100%", filter: "drop-shadow(0px 10px 20px rgba(139, 92, 246, 0.2))" }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const d = provinceData.find((s) => s.id === geo.properties["hc-key"]);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={d ? colorScale(d.sales) : "rgba(255,255,255,0.02)"}
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth={0.8}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#A855F7", outline: "none", cursor: "pointer", transition: "all 0.3s ease" },
                            pressed: { fill: "#9333EA", outline: "none" },
                          }}
                          onMouseEnter={() => {
                            if (d) {
                              setTooltipContent(`${d.name} - 销售额: ¥${formatChineseUnit(d.sales)} | 客户: ${d.customers}家`);
                            } else {
                              setTooltipContent(`${geo.properties.name || '未知'} - 暂无数据`);
                            }
                          }}
                          onMouseLeave={() => {
                            setTooltipContent("");
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
              
              {/* Custom Tooltip */}
              {tooltipContent && (
                <div className="absolute top-1/4 right-1/4 bg-[#0B1121]/90 text-white px-5 py-3 rounded-xl text-sm shadow-2xl backdrop-blur-xl border border-white/10 pointer-events-none z-50 transition-opacity flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                  {tooltipContent}
                </div>
              )}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-400">
              <span>低</span>
              <div className="w-32 h-1.5 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#8B5CF6]"></div>
              <span>高</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 flex flex-col gap-6 h-full">
          {/* Card 1: 活跃度指标 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 flex flex-col group hover:border-violet-500/30 transition-colors">
            <CardHeader title="用户活跃度" subtitle="ACTIVITY" icon={Users} />
            <div className="flex-1 flex flex-col justify-around">
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                    <Users className="w-5 h-5 text-violet-400" />
                  </div>
                  <span className="text-sm text-slate-400">累计注册</span>
                </div>
                <span className="text-xl font-bold text-white font-mono tracking-tight">{formatChineseUnit(opsData.totalUsers)}</span>
              </div>
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30">
                    <Activity className="w-5 h-5 text-fuchsia-400" />
                  </div>
                  <span className="text-sm text-slate-400">MAU</span>
                </div>
                <span className="text-xl font-bold text-white font-mono tracking-tight">{formatChineseUnit(opsData.mau)}</span>
              </div>
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 relative">
                    <div className="absolute inset-0 rounded-xl border border-cyan-400 animate-ping opacity-20"></div>
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-400">实时并发</span>
                </div>
                <span className="text-xl font-bold text-cyan-400 font-mono tracking-tight">{opsData.concurrentUsers.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Card 2: 战区销售排行榜 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-[1.5] flex flex-col group hover:border-violet-500/30 transition-colors">
            <CardHeader title="战区销售排行" subtitle="RANKING" icon={Server} />
            <div className="flex-1 w-full h-full min-h-[200px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...regionLeaderboard].map(d => ({...d})).sort((a, b) => b.sales - a.sales)} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} width={70} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`¥${formatChineseUnit(value)}`, '销售额']}
                  />
                  <Bar dataKey="sales" radius={[0, 6, 6, 0]} barSize={10}>
                    {regionLeaderboard.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 3 ? '#A855F7' : '#6366F1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default BigScreenDashboard;
