import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";

const applicationData = [
  { school: '福建南靖第一职业技术学校', format: '私有化', startDate: '2024/7/5', year: 2024, platform: '人工智能教学实验平台 V2.0', quantity: null, accountQuantity: null, duration: null, usageDuration: null, limitYears: null, range: null, remainingYears: null, isPrivate: true },
  { school: '阿克苏地区中等职业技术学校', format: '在线', startDate: '2024/4/28', year: 2024, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 236, limitYears: 3, range: '<30', remainingYears: 1, isPrivate: false },
  { school: '安徽材料工程学校', format: '在线', startDate: '', year: null, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 85, limitYears: 3, range: '<30', remainingYears: null, isPrivate: false },
  { school: '安徽材料工程学校', format: '在线', startDate: '2025/12/10', year: 2025, platform: '物联网安装调试员实训平台套件-便携版', quantity: 25, accountQuantity: 25, duration: 10000, usageDuration: 4200, limitYears: 3, range: '<30', remainingYears: 2, isPrivate: false },
  { school: '安徽城市管理职业学院', format: '在线', startDate: '2023/12/19', year: 2023, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 840, limitYears: 3, range: '<30', remainingYears: 0, isPrivate: false },
  { school: '安徽阜阳技师学院', format: '在线', startDate: '2026/2/4', year: 2026, platform: '典型智联网行业应用实训套件(智慧安防)', quantity: 8, accountQuantity: 40, duration: 5600, usageDuration: 120, limitYears: 3, range: '30-49', remainingYears: 3, isPrivate: false },
  { school: '安徽国防科技职业学院', format: '在线', startDate: '2023/12/14', year: 2023, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 930, limitYears: 3, range: '<30', remainingYears: 0, isPrivate: false },
  { school: '安徽国际商务职业学院', format: '在线', startDate: '2026/1/20', year: 2026, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 30, limitYears: 3, range: '<30', remainingYears: 3, isPrivate: false },
  { school: '安徽合肥职院', format: '私有化', startDate: '2025/11/16', year: 2025, platform: '智联网综合实践平台V1.1.2', quantity: null, accountQuantity: null, duration: null, usageDuration: null, limitYears: null, range: null, remainingYears: null, isPrivate: true },
  { school: '安徽机电', format: '私有化', startDate: '2025/4/1', year: 2025, platform: '人工智能教学实验平台 V2.0', quantity: null, accountQuantity: null, duration: null, usageDuration: null, limitYears: null, range: null, remainingYears: null, isPrivate: true },
  { school: '安徽机电技师学院(安徽电子工程学校)', format: '在线', startDate: '2025/7/22', year: 2025, platform: '典型行业应用实训平台 (智能家居套件)', quantity: 10, accountQuantity: 50, duration: 7000, usageDuration: 3500, limitYears: 3, range: '50-99', remainingYears: 2, isPrivate: false },
  { school: '安徽机电职业技术学院', format: '在线', startDate: '2023/6/30', year: 2023, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 990, limitYears: 3, range: '<30', remainingYears: 0, isPrivate: false },
  { school: '安徽机电职业技术学院 (安徽审计职业学院)', format: '在线', startDate: '2024/12/9', year: 2024, platform: '物联网全栈智能应用实训系统', quantity: 1, accountQuantity: 5, duration: 1000, usageDuration: 410, limitYears: 3, range: '<30', remainingYears: 1, isPrivate: false },
  { school: '安徽金寨职业学校 (金寨技师学院)', format: '在线', startDate: '2023/12/22', year: 2023, platform: '物联网全栈智能应用实训系统', quantity: 2, accountQuantity: 10, duration: 2000, usageDuration: 1950, limitYears: 3, range: '<30', remainingYears: 0, isPrivate: false },
];

export default function PlatformApplicationDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFormat, setFilterFormat] = useState("all");
  const [timeRange, setTimeRange] = useState("全部");

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredData = applicationData.filter(item => {
    const matchSearch = item.school.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFormat = filterFormat === "all" ? true : item.format === filterFormat;
    
    // Time filtering logic can be expanded here based on timeRange
    const matchTime = timeRange === "全部" ? true : 
                      timeRange === "2024" ? item.year === 2024 :
                      timeRange === "2025" ? item.year === 2025 :
                      timeRange === "2026" ? item.year === 2026 : true;

    return matchSearch && matchFormat && matchTime;
  });

  // Calculate statistics
  const totalSchools = new Set(filteredData.map(item => item.school)).size;
  const totalAccounts = filteredData.reduce((sum, item) => sum + (item.accountQuantity || 0), 0);
  const schoolsOver30 = new Set(
    filteredData
      .filter(item => (item.accountQuantity || 0) > 30)
      .map(item => item.school)
  ).size;
  const expiringSchools = new Set(
    filteredData
      .filter(item => item.remainingYears !== null && item.remainingYears <= 1 && item.remainingYears >= 0)
      .map(item => item.school)
  ).size;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <line x1="3" x2="21" y1="9" y2="9"/>
                <line x1="9" x2="9" y1="21" y2="9"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-widest text-slate-900">
              UUSIMA 运营决策大屏
            </h1>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 border-slate-200 p-1 rounded-2xl border ml-8">
            <button
              onClick={() => navigate('/platform-operations-dashboard')}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-slate-500 hover:text-slate-700"
            >
              平台运营
            </button>
            <button
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all bg-white text-blue-600 shadow-sm"
            >
              平台应用情况
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'operations' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-slate-500 hover:text-slate-700"
            >
              平台运维
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'business' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-slate-500 hover:text-slate-700"
            >
              运营情况
            </button>
          </div>
        </div>
        <div className="text-sm text-slate-500 flex items-center gap-2">
          最后更新: <span className="font-din font-medium text-slate-700">{currentTime.toLocaleTimeString('zh-CN', { hour12: false })}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-8 flex flex-col">
        
        {/* Controls */}
        <div className="flex flex-col gap-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800">平台应用情况</h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-slate-500 text-sm font-medium">开通账号院校数</span>
              <div className="mt-2 text-3xl font-din font-black text-slate-800">{totalSchools}<span className="text-sm font-medium text-slate-500 ml-1">所</span></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-slate-500 text-sm font-medium">开通账号总数</span>
              <div className="mt-2 text-3xl font-din font-black text-blue-600">{totalAccounts}<span className="text-sm font-medium text-slate-500 ml-1">个</span></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-slate-500 text-sm font-medium">&gt; 30 个账号学校数</span>
              <div className="mt-2 text-3xl font-din font-black text-emerald-600">{schoolsOver30}<span className="text-sm font-medium text-slate-500 ml-1">所</span></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-slate-500 text-sm font-medium">近一年即将到期学校数</span>
              <div className="mt-2 text-3xl font-din font-black text-yellow-600">{expiringSchools}<span className="text-sm font-medium text-slate-500 ml-1">所</span></div>
            </div>
          </div>
            
          <div className="flex items-center justify-start gap-4">
            <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
              <button 
                onClick={() => setTimeRange("全部")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === "全部" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >全部时间</button>
              <button 
                onClick={() => setTimeRange("2024")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === "2024" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >2024年</button>
              <button 
                onClick={() => setTimeRange("2025")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === "2025" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >2025年</button>
              <button 
                onClick={() => setTimeRange("2026")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === "2026" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >2026年</button>
            </div>

            <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
              <button 
                onClick={() => setFilterFormat("all")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filterFormat === "all" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >全部形式</button>
              <button 
                onClick={() => setFilterFormat("在线")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filterFormat === "在线" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >仅在线</button>
              <button 
                onClick={() => setFilterFormat("私有化")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filterFormat === "私有化" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >仅私有化</button>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="搜索院校名称或平台..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#eef5fd] sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc]">院校名称 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[120px]">形式 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[120px]">开通时间 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc]">开通/部署平台 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[100px]">账号数量 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[120px]">使用时长 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[120px]">时长(小) <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[100px]">年份 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[100px]">年限(年) <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap border-r border-[#d5e7fc] w-[130px]">账号数量区间 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap w-[100px]">剩余年份 <Filter className="w-3 h-3 inline ml-1 text-emerald-500" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-800 border-r border-slate-200 font-medium">{item.school}</td>
                    <td className="px-6 py-4 border-r border-slate-200 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${item.isPrivate ? 'bg-[#dae8fa] text-[#4876b5]' : 'bg-[#fff5cc] text-[#9c8430]'}`}>
                        {item.format}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.startDate}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 border-r border-slate-200">{item.platform}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.accountQuantity}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.usageDuration !== null ? `${item.usageDuration}h` : ''}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.duration}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.year}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.limitYears}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200 font-din">{item.range}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-din">{item.remainingYears}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={11} className="px-6 py-12 text-center text-slate-500">
                      没有找到匹配的数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-sm text-slate-600">
            <div>共查询到 <span className="font-bold text-blue-600">{filteredData.length}</span> 条数据</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 bg-white rounded hover:bg-slate-100 disabled:opacity-50" disabled>上一页</button>
              <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 rounded">1</button>
              <button className="px-3 py-1 border border-slate-200 bg-white rounded hover:bg-slate-100 disabled:opacity-50" disabled>下一页</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
