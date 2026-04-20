import React, { useState } from 'react';
import { Users, BookOpen, Monitor, Building, TrendingUp, Activity, ShieldCheck, Flame } from 'lucide-react';
import { User } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';

interface Props {
  user: User;
}

const mockChartData = {
  day: [
    { name: '04:00', labVal: 500, learnVal: 1200 },
    { name: '08:00', labVal: 1540, learnVal: 2400 },
    { name: '12:00', labVal: 3200, learnVal: 4500 },
    { name: '16:00', labVal: 4100, learnVal: 5600 },
    { name: '20:00', labVal: 2800, learnVal: 3800 },
    { name: '24:00', labVal: 800,  learnVal: 1100 },
  ],
  week: [
    { name: '周一', labVal: 6200, learnVal: 15400 },
    { name: '周二', labVal: 8400, learnVal: 18200 },
    { name: '周三', labVal: 7500, learnVal: 16500 },
    { name: '周四', labVal: 9100, learnVal: 21000 },
    { name: '周五', labVal: 8800, learnVal: 19500 },
    { name: '周六', labVal: 3200, learnVal: 8500 },
    { name: '周日', labVal: 4100, learnVal: 9200 },
  ],
  month: [
    { name: '1日', labVal: 32000, learnVal: 65000 },
    { name: '10日', labVal: 38000, learnVal: 72000 },
    { name: '20日', labVal: 41000, learnVal: 78000 },
    { name: '30日', labVal: 35000, learnVal: 68000 },
  ],
  year: [
    { name: '1季度', labVal: 150000, learnVal: 320000 },
    { name: '2季度', labVal: 180000, learnVal: 380000 },
    { name: '3季度', labVal: 160000, learnVal: 340000 },
    { name: '4季度', labVal: 190000, learnVal: 410000 },
  ]
};

const mockTokenData = {
  day: { used: 45000, remaining: 55000 },
  week: { used: 280000, remaining: 720000 },
  month: { used: 1250000, remaining: 3750000 },
  year: { used: 15400000, remaining: 34600000 }
};

const mockLeaderboardData = {
  lab: [
    { name: '计算机网络核心实验', val: '8,420 小时' },
    { name: '深度学习实践', val: '6,350 小时' },
    { name: '数据库系统综合设计', val: '5,800 小时' },
    { name: '大数据处理实验', val: '4,200 小时' },
    { name: '硬件原理与接口', val: '3,100 小时' },
    { name: '操作系统原理验证', val: '2,800 小时' },
  ],
  learning: [
    { name: '数据结构与算法', val: '12,500 小时' },
    { name: '高等数学(一)', val: '11,200 小时' },
    { name: '大学计算机基础', val: '9,800 小时' },
    { name: '操作系统原理', val: '8,600 小时' },
    { name: '机器学习与应用', val: '7,400 小时' },
    { name: '计算机网络', val: '6,900 小时' },
  ]
};

const formatPercentLabel = (value: number) => {
  return value.toLocaleString('en-US'); // Using comma separator as requested (sometimes mistranslated as percent sign natively)
};

const SchoolAdminDashboard: React.FC<Props> = ({ user }) => {
  const [labTimeRange, setLabTimeRange] = useState<keyof typeof mockChartData>('week');
  const [learnTimeRange, setLearnTimeRange] = useState<keyof typeof mockChartData>('week');
  const [tokenTimeRange, setTokenTimeRange] = useState<keyof typeof mockTokenData>('week');
  const [leaderboardMetric, setLeaderboardMetric] = useState<'lab' | 'learning'>('lab');

  const currentTokenData = mockTokenData[tokenTimeRange];
  const totalToken = currentTokenData.used + currentTokenData.remaining;
  const usedPercent = Math.round((currentTokenData.used / totalToken) * 100);
  const donutData = [
    { name: '已用', value: currentTokenData.used },
    { name: '剩余', value: currentTokenData.remaining },
  ];
  const COLORS = ['#8B5CF6', '#F3F4F6'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">校级教学管理员控制台</h1>
          <p className="text-gray-500 mt-1">监控全校教学运行数据，优化教学资源分配。</p>
        </div>
        <div className="flex gap-3">
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { type: 'normal', label: '全校学生', value: '12,540', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { type: 'normal', label: '全校教师', value: '342', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { type: 'normal', label: '活跃课程', value: '1,205', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
          { 
            type: 'split', 
            label: '实验环境',
            icon: Activity, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            splitData: [
              { label: '使用次数', value: '8,420', unit: '次' },
              { label: '使用时长', value: '12.5w', unit: '小时' }
            ]
          },
        ].map((stat: any, idx) => (
          <div key={idx} className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center min-h-[96px]">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            {stat.type === 'split' ? (
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-sm text-gray-500 font-medium mb-1.5">{stat.label}</p>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5 line-clamp-1">{stat.splitData[0].label}</p>
                    <p className="text-base font-bold text-gray-900 leading-none">
                      {stat.splitData[0].value} <span className="text-[10px] font-normal text-gray-500">{stat.splitData[0].unit}</span>
                    </p>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="flex flex-col">
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5 line-clamp-1">{stat.splitData[1].label}</p>
                    <p className="text-base font-bold text-gray-900 leading-none">
                      {stat.splitData[1].value} <span className="text-[10px] font-normal text-gray-500">{stat.splitData[1].unit}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column: School Overview */}
        <div className="lg:col-span-2">
          {/* Department Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">各院系教学情况</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看详情</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">院系名称</th>
                    <th className="px-4 py-3">学生人数</th>
                    <th className="px-4 py-3">教师人数</th>
                    <th className="px-4 py-3">活跃课程</th>
                    <th className="px-4 py-3 rounded-r-lg">实验时长</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '计算机工程学院', students: 3200, teachers: 85, courses: 240, labHours: '45,000h' },
                    { name: '物联网工程学院', students: 2800, teachers: 70, courses: 180, labHours: '38,500h' },
                    { name: '人工智能学院', students: 1500, teachers: 45, courses: 120, labHours: '25,000h' },
                    { name: '大数据学院', students: 2100, teachers: 60, courses: 150, labHours: '30,200h' },
                  ].map((dept, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-4 font-medium text-gray-900 flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" /> {dept.name}
                      </td>
                      <td className="px-4 py-4">{dept.students}</td>
                      <td className="px-4 py-4">{dept.teachers}</td>
                      <td className="px-4 py-4">{dept.courses}</td>
                      <td className="px-4 py-4 text-blue-600 font-medium">{dept.labHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div>
          {/* Popular Courses Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-bold text-gray-900">热门课程排行榜</h2>
              </div>
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-lg mb-6">
              <button 
                onClick={() => setLeaderboardMetric('lab')}
                className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-colors ${leaderboardMetric === 'lab' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                实验时长
              </button>
              <button 
                onClick={() => setLeaderboardMetric('learning')}
                className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-colors ${leaderboardMetric === 'learning' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                学习时长
              </button>
            </div>

            <div className="space-y-4">
              {mockLeaderboardData[leaderboardMetric].map((course, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                      ${idx === 0 ? 'bg-rose-100 text-rose-600' : 
                        idx === 1 ? 'bg-orange-100 text-orange-600' : 
                        idx === 2 ? 'bg-amber-100 text-amber-600' : 
                        'bg-gray-100 text-gray-500'}`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors cursor-pointer">{course.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{course.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Analytics Charts Section - Full Width Split in Three */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chart 1: 实验时长使用情况 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">实验时长使用情况</h2>
            <select 
              value={labTimeRange}
              onChange={(e) => setLabTimeRange(e.target.value as any)}
              className="text-sm border-gray-200 rounded-lg text-gray-600 bg-gray-50 focus:ring-0 focus:border-gray-300"
            >
              <option value="day">按日</option>
              <option value="week">按周</option>
              <option value="month">按月</option>
              <option value="year">按年</option>
            </select>
          </div>
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-50">
            <div>
               <p className="text-sm text-gray-500 mb-1">总体时长</p>
               <p className="text-2xl font-bold text-gray-900">128,450 <span className="text-sm font-normal text-gray-500">小时</span></p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
               <p className="text-sm text-gray-500 mb-1">剩余时长</p>
               <p className="text-2xl font-bold text-emerald-600">45,120 <span className="text-sm font-normal text-gray-500">小时</span></p>
            </div>
          </div>
          <div className="h-64 mt-auto w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData[labTimeRange]} margin={{ top: 25, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${formatPercentLabel(value)} 小时`, '消耗时长']}
                />
                <Line 
                  type="monotone" 
                  dataKey="labVal" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6 }}
                >
                  <LabelList 
                    dataKey="labVal" 
                    position="top" 
                    offset={10}
                    formatter={formatPercentLabel}
                    fill="#3B82F6"
                    fontSize={11}
                    fontWeight={600}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 学习时长统计 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">学习时长统计</h2>
            <select 
              value={learnTimeRange}
              onChange={(e) => setLearnTimeRange(e.target.value as any)}
              className="text-sm border-gray-200 rounded-lg text-gray-600 bg-gray-50 focus:ring-0 focus:border-gray-300"
            >
              <option value="day">按日</option>
              <option value="week">按周</option>
              <option value="month">按月</option>
              <option value="year">按年</option>
            </select>
          </div>
          <div className="mb-6 pb-6 border-b border-gray-50">
             <p className="text-sm text-gray-500 mb-1">本校课程总累计学习</p>
             <p className="text-2xl font-bold text-indigo-600">342,800 <span className="text-sm font-normal text-gray-500">小时</span></p>
          </div>
          <div className="h-64 mt-auto w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData[learnTimeRange]} margin={{ top: 25, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${formatPercentLabel(value)} 小时`, '学习时长']}
                />
                <Line 
                  type="monotone" 
                  dataKey="learnVal" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6 }}
                >
                  <LabelList 
                    dataKey="learnVal" 
                    position="top" 
                    offset={10}
                    formatter={formatPercentLabel}
                    fill="#4F46E5"
                    fontSize={11}
                    fontWeight={600}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Token 消耗情况 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Token 消耗情况</h2>
            <select 
              value={tokenTimeRange}
              onChange={(e) => setTokenTimeRange(e.target.value as any)}
              className="text-sm border-gray-200 rounded-lg text-gray-600 bg-gray-50 focus:ring-0 focus:border-gray-300"
            >
              <option value="day">按日</option>
              <option value="week">按周</option>
              <option value="month">按月</option>
              <option value="year">按年</option>
            </select>
          </div>
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-50">
            <div>
               <p className="text-sm text-gray-500 mb-1">分配总额度</p>
               <p className="text-2xl font-bold text-gray-900">{formatPercentLabel(totalToken)}</p>
            </div>
          </div>
          <div className="h-64 mt-auto w-full relative flex items-center justify-center text-xs">
            {/* Center percentage label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-4">
              <span className="text-3xl font-bold text-violet-600">{usedPercent}%</span>
              <span className="text-xs text-gray-500 mt-1">已使用</span>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatPercentLabel(value), '']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend below chart */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                <span className="text-gray-600 font-medium whitespace-nowrap">已用 {formatPercentLabel(currentTokenData.used)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-gray-600 font-medium whitespace-nowrap">剩余 {formatPercentLabel(currentTokenData.remaining)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
