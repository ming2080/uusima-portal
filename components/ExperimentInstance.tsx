import React, { useState } from "react";
import { Search, RotateCcw, ChevronDown, MoreHorizontal } from "lucide-react";

interface InstanceData {
  id: string;
  name: string;
  ip: string;
  serviceType: string;
  env: string;
  diskName: string;
  diskStorage: number;
  phone: string;
  school: string;
  status: string;
  startTime: string;
  createTime: string;
}

const ExperimentInstance: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("状态");

  const instances: InstanceData[] = [
    { id: "1788402592284889090", name: "dp-pro-sql-13024041701", ip: "--", serviceType: "eip", env: "mysql", diskName: "cce-pvc-pro-13024041701", diskStorage: 10240, phone: "13024041701", school: "AIOT综合案例", status: "离线", startTime: "2024-10-10 14:33:05", createTime: "2024-05-09 10:56:20" },
    { id: "1783747801446768641", name: "dp-pro-13024042501", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-13024042501", diskStorage: 10240, phone: "13024042501", school: "AIOT综合案例", status: "离线", startTime: "2024-10-10 14:28:16", createTime: "2024-04-26 14:39:51" },
    { id: "1810584262084554754", name: "dp-pro-13515154412", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-13515154412", diskStorage: 10240, phone: "13515154412", school: "盐城幼儿师范高等专科学校", status: "离线", startTime: "2025-09-03 10:26:18", createTime: "2024-07-09 15:58:22" },
    { id: "1812372775142584321", name: "dp-pro-ddm-13515154412", ip: "--", serviceType: "eip", env: "低代码", diskName: "cce-pvc-pro-13515154412", diskStorage: 10240, phone: "13515154412", school: "盐城幼儿师范高等专科学校", status: "离线", startTime: "2024-09-17 00:31:13", createTime: "2024-07-14 14:25:17" },
    { id: "1811276298238005249", name: "dp-pro-18668103480", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-18668103480", diskStorage: 10240, phone: "18668103480", school: "济南护理职业学院", status: "离线", startTime: "2026-02-05 10:45:24", createTime: "2024-07-11 13:48:16" },
    { id: "1783664875119992833", name: "dp-pro-13024042503", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-13024042503", diskStorage: 10240, phone: "13024042503", school: "AIOT综合案例", status: "离线", startTime: "2024-10-10 14:29:13", createTime: "2024-04-26 09:10:20" },
    { id: "1814197211906863106", name: "dp-pro-13024030601", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-13024030601", diskStorage: 10240, phone: "13024030601", school: "AIOT综合案例", status: "离线", startTime: "2024-10-10 10:41:29", createTime: "2024-07-19 15:14:56" },
    { id: "1780789084961591298", name: "dp-pro-13024041801", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-13024041801", diskStorage: 10240, phone: "13024041801", school: "AIOT综合案例", status: "离线", startTime: "2024-10-10 14:34:59", createTime: "2024-04-18 10:42:58" },
    { id: "1823316991396978690", name: "dp-pro-13024041101", ip: "--", serviceType: "eip", env: "物联网", diskName: "cce-pvc-pro-13024041101", diskStorage: 10240, phone: "13024041101", school: "AIOT综合案例", status: "离线", startTime: "2025-08-25 14:25:38", createTime: "2024-08-13 19:13:41" },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('list')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'list' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            列表
          </button>
          <button 
            onClick={() => setActiveTab('chart')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'chart' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            图表
          </button>
        </div>

        <div className="flex items-center gap-3 pr-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="输入学校名称/手机号查询"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="relative w-32">
            <button className="w-full flex items-center justify-between pl-3 pr-3 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              <span>{statusFilter}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            <Search className="w-4 h-4" />
            搜索
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'list' ? (
        <div className="flex-1 overflow-auto px-6 pb-6 mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-4 text-sm font-bold text-slate-700">容器ID</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">容器名称</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">公网IP</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">服务类型</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">实验环境</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">磁盘名</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">磁盘存储（M）</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">手机号</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">学校</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">状态</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">启动时间</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">创建时间</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance) => (
                <tr key={instance.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-slate-600">{instance.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">
                    <div className="max-w-[150px] break-words mx-auto">{instance.name}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{instance.ip}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{instance.serviceType}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{instance.env}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">
                    <div className="max-w-[150px] break-words mx-auto">{instance.diskName}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{instance.diskStorage}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{instance.phone}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">
                    <div className="max-w-[150px] break-words mx-auto">{instance.school}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${instance.status === '离线' ? 'bg-slate-300' : 'bg-emerald-500'}`}></div>
                      {instance.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">
                    <div className="max-w-[100px] break-words mx-auto">{instance.startTime}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">
                    <div className="max-w-[100px] break-words mx-auto">{instance.createTime}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-end gap-4 text-sm text-slate-500">
            <span>共 29162 条</span>
            <select className="px-2 py-1 border border-slate-200 rounded bg-white">
              <option>10条/页</option>
            </select>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">3</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">4</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">5</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">6</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-10 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">2917</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span>前往</span>
              <input type="text" defaultValue="1" className="w-10 px-1 py-1 border border-slate-200 rounded text-center" />
              <span>页</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          图表视图开发中...
        </div>
      )}
    </div>
  );
};

export default ExperimentInstance;
