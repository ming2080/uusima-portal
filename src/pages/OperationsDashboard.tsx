import React, { useState, useEffect } from "react";
import {
  Activity,
  Users,
  Server,
  TrendingUp,
  AlertTriangle,
  Building2,
  MonitorPlay,
  Cpu,
  ArrowUpRight,
  Clock,
  Layers,
  CheckCircle2,
  Calendar,
  MoreHorizontal,
  Car,
  Truck,
  Shield,
  Battery,
  GraduationCap,
  BookOpen,
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
  ComposedChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- Mock Data ---
const sparklineData1 = [
  { val: 400 },
  { val: 300 },
  { val: 550 },
  { val: 400 },
  { val: 700 },
  { val: 600 },
  { val: 800 },
];
const sparklineData2 = [
  { val: 200 },
  { val: 400 },
  { val: 300 },
  { val: 600 },
  { val: 500 },
  { val: 700 },
  { val: 650 },
];
const sparklineData3 = [
  { val: 600 },
  { val: 500 },
  { val: 800 },
  { val: 600 },
  { val: 900 },
  { val: 750 },
  { val: 950 },
];
const sparklineData4 = [
  { val: 800 },
  { val: 700 },
  { val: 900 },
  { val: 850 },
  { val: 1000 },
  { val: 900 },
  { val: 1100 },
];

const mainChartData = [
  { name: "01", uv: 400, pv: 240 },
  { name: "02", uv: 300, pv: 139 },
  { name: "03", uv: 200, pv: 980 },
  { name: "04", uv: 278, pv: 390 },
  { name: "05", uv: 189, pv: 480 },
  { name: "06", uv: 239, pv: 380 },
  { name: "07", uv: 349, pv: 430 },
  { name: "08", uv: 200, pv: 980 },
  { name: "09", uv: 278, pv: 390 },
  { name: "10", uv: 189, pv: 480 },
  { name: "11", uv: 239, pv: 380 },
  { name: "12", uv: 349, pv: 430 },
];

const OperationsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-800 font-sans pb-12">
      {/* 顶部导航栏 */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-wide">
              UUSIMA 运营决策大屏
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              EXECUTIVE OPERATIONS DASHBOARD
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right font-mono">
            <div className="text-blue-600 text-lg font-bold tracking-wider">
              {currentTime.toLocaleTimeString("en-US", { hour12: false })}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {currentTime.toLocaleDateString("zh-CN")}
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 shadow-sm transition-all"
          >
            返回平台
          </button>
        </div>
      </header>

      <main className="p-6 max-w-[1920px] mx-auto">
        {/* ================= Row 1: KPI Cards ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "今日 ARR",
              val: "1095.89",
              icon: <TrendingUp className="w-5 h-5" />,
              color: "blue",
              hex: "#1890ff",
              data: sparklineData1,
            },
            {
              title: "在网学校",
              val: "856.00",
              icon: <Building2 className="w-5 h-5" />,
              color: "orange",
              hex: "#fa8c16",
              data: sparklineData2,
            },
            {
              title: "并发用户",
              val: "1.24",
              unit: "w",
              icon: <MonitorPlay className="w-5 h-5" />,
              color: "purple",
              hex: "#722ed1",
              data: sparklineData3,
            },
            {
              title: "累计用户",
              val: "120.50",
              unit: "w",
              icon: <Users className="w-5 h-5" />,
              color: "pink",
              hex: "#eb2f96",
              data: sparklineData4,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">
                    {item.title} {item.unit ? `(${item.unit})` : "(万)"}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mt-1">
                    {item.val}
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center text-${item.color}-500`}
                >
                  {item.icon}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-3 flex items-center">
                昨日数据 603.21 环比{" "}
                <span className="text-green-500 ml-1 flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> 50.32%
                </span>
              </div>
              <div className="h-14 w-full mt-2 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={item.data}>
                    <defs>
                      <linearGradient
                        id={`color${item.color}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={item.hex}
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor={item.hex}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="val"
                      stroke={item.hex}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={`url(#color${item.color})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Row 2: Donut Cards ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {[
            { title: "在线平台", val: "1250", unit: "家", color: "#1890ff" },
            { title: "私有化平台", val: "320", unit: "家", color: "#fa8c16" },
            { title: "在线课程", val: "8500", unit: "套", color: "#722ed1" },
            { title: "私有化课程", val: "1200", unit: "套", color: "#eb2f96" },
            { title: "服务器销量", val: "450", unit: "台", color: "#52c41a" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 relative flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ value: 75 }, { value: 25 }]}
                      innerRadius={16}
                      outerRadius={22}
                      dataKey="value"
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill={item.color} />
                      <Cell fill="#f0f2f5" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="text-xs text-gray-500">指标数据</div>
                <div className="text-lg font-bold text-gray-800 flex items-baseline gap-1">
                  {item.val}{" "}
                  <span className="text-xs font-normal text-gray-400">
                    {item.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Row 3: Large Charts ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Chart 1 */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                <div className="font-bold text-gray-800">平台销售趋势</div>
              </div>
              <div className="flex items-center text-xs text-gray-400 border border-gray-200 rounded px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                开始日期 - 结束日期 <Calendar className="w-3 h-3 ml-2" />
              </div>
            </div>
            <div className="flex gap-6 text-xs text-gray-500 mb-4 px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                累计数据 1095.89 m
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>{" "}
                累计数据 1095.89 m
              </div>
              <div className="flex items-center gap-1 text-green-500">
                趋势 <ArrowUpRight className="w-3 h-3" /> 50.32%
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={mainChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#1890ff"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#fa8c16"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                <div className="font-bold text-gray-800">课程授权趋势</div>
              </div>
              <div className="flex items-center text-xs text-gray-400 border border-gray-200 rounded px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                开始日期 - 结束日期 <Calendar className="w-3 h-3 ml-2" />
              </div>
            </div>
            <div className="flex gap-6 text-xs text-gray-500 mb-4 px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                累计数据 1095.89 m
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>{" "}
                累计数据 1095.89 m
              </div>
              <div className="flex items-center gap-1 text-green-500">
                趋势 <ArrowUpRight className="w-3 h-3" /> 50.32%
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mainChartData.slice(0, 7)}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#1890ff"
                    radius={[2, 2, 0, 0]}
                    barSize={12}
                  />
                  <Bar
                    dataKey="pv"
                    fill="#fa8c16"
                    radius={[2, 2, 0, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ================= Row 4: Colored Summary Cards ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {[
            {
              title: "日活跃用户",
              val: "125.89",
              unit: "k",
              color: "bg-blue-100/50",
              text: "text-blue-600",
              icon: <Users className="w-12 h-12 text-blue-200" />,
            },
            {
              title: "月活跃用户",
              val: "450.21",
              unit: "k",
              color: "bg-orange-100/50",
              text: "text-orange-600",
              icon: <Activity className="w-12 h-12 text-orange-200" />,
            },
            {
              title: "AI 调用量",
              val: "8.50",
              unit: "m",
              color: "bg-purple-100/50",
              text: "text-purple-600",
              icon: <Cpu className="w-12 h-12 text-purple-200" />,
            },
            {
              title: "实训完成率",
              val: "88.50",
              unit: "%",
              color: "bg-pink-100/50",
              text: "text-pink-600",
              icon: <CheckCircle2 className="w-12 h-12 text-pink-200" />,
            },
            {
              title: "平均时长",
              val: "45.00",
              unit: "m",
              color: "bg-green-100/50",
              text: "text-green-600",
              icon: <Clock className="w-12 h-12 text-green-200" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.color} rounded-xl p-4 flex justify-between items-center overflow-hidden relative hover:shadow-sm transition-shadow`}
            >
              <div className="relative z-10">
                <div className={`text-xs ${item.text} opacity-80 font-medium`}>
                  {item.title} <span className="text-[10px]">用量</span>
                </div>
                <div
                  className={`text-2xl font-bold ${item.text} mt-1 flex items-baseline gap-1`}
                >
                  {item.val}{" "}
                  <span className="text-xs font-normal opacity-80">
                    {item.unit}
                  </span>
                </div>
              </div>
              <div className="absolute -right-2 -bottom-2 opacity-60 transform rotate-12">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ================= Row 5: List/Grid Cards ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* List Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                <div className="font-bold text-gray-800">资源利用率</div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  title: "GPU 集群",
                  val: "76.50",
                  unit: "%",
                  icon: <Server className="w-5 h-5" />,
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
                {
                  title: "存储空间",
                  val: "42.10",
                  unit: "%",
                  icon: <Layers className="w-5 h-5" />,
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                },
                {
                  title: "网络带宽",
                  val: "58.90",
                  unit: "%",
                  icon: <Activity className="w-5 h-5" />,
                  color: "text-purple-500",
                  bg: "bg-purple-50",
                },
                {
                  title: "内存消耗",
                  val: "64.20",
                  unit: "%",
                  icon: <Cpu className="w-5 h-5" />,
                  color: "text-pink-500",
                  bg: "bg-pink-50",
                },
                {
                  title: "离线预警",
                  val: "3.00",
                  unit: "台",
                  icon: <AlertTriangle className="w-5 h-5" />,
                  color: "text-green-500",
                  bg: "bg-green-50",
                },
                {
                  title: "并发峰值",
                  val: "1.24",
                  unit: "w",
                  icon: <MonitorPlay className="w-5 h-5" />,
                  color: "text-yellow-500",
                  bg: "bg-yellow-50",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">
                      {item.title} <span className="text-[10px]">用量</span>
                    </div>
                    <div className="text-sm font-bold text-gray-800 flex items-baseline gap-1">
                      {item.val}{" "}
                      <span className="text-xs font-normal text-gray-400">
                        {item.unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* List Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                <div className="font-bold text-gray-800">核心指标监控</div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "课程完播率", val: "85.89", unit: "%" },
                { title: "作业提交率", val: "92.10", unit: "%" },
                { title: "考试通过率", val: "78.50", unit: "%" },
                { title: "实训达标率", val: "88.20", unit: "%" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                >
                  <div className="text-xs font-bold text-gray-700 mb-2">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <div className="w-3 h-3 rounded-full border-2 border-green-500 flex items-center justify-center">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      {item.val}
                    </span>
                    <span className="text-[10px]">{item.unit}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 flex items-center mt-1.5">
                    较上周{" "}
                    <span className="text-green-500 ml-1 flex items-center">
                      <ArrowUpRight className="w-2 h-2" /> 50.32%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperationsDashboard;
