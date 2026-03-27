import React, { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";

interface ExperimentData {
  id: number;
  sortNo: number;
  env: string;
  type: string;
  status: string;
  hallStatus: string;
  createTime: string;
  icon: string;
}

const ExperimentList: React.FC = () => {
  const [category, setCategory] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [hallStatus, setHallStatus] = useState("全部");

  const experiments: ExperimentData[] = [
    { id: 1, sortNo: 1, env: "工程虚拟仿真", type: "平台型", status: "启用", hallStatus: "显示", createTime: "2024-02-18 18:19:11", icon: "bg-blue-500" },
    { id: 2, sortNo: 2, env: "3D应用设计器", type: "平台型", status: "启用", hallStatus: "显示", createTime: "2024-02-18 18:27:15", icon: "bg-slate-800" },
    { id: 3, sortNo: 4, env: "嵌入式仿真", type: "平台型", status: "启用", hallStatus: "隐藏", createTime: "2024-02-19 09:10:35", icon: "bg-teal-500" },
    { id: 4, sortNo: 6, env: "2D应用设计器", type: "平台型", status: "启用", hallStatus: "显示", createTime: "2024-09-19 18:13:10", icon: "bg-cyan-500" },
    { id: 5, sortNo: 1, env: "智慧水务", type: "平台型", status: "启用", hallStatus: "隐藏", createTime: "2024-09-19 18:13:57", icon: "bg-blue-400" },
    { id: 6, sortNo: 1, env: "智慧健康", type: "平台型", status: "启用", hallStatus: "隐藏", createTime: "2024-09-19 18:14:21", icon: "bg-rose-500" },
    { id: 7, sortNo: 1, env: "案例题", type: "平台型", status: "启用", hallStatus: "隐藏", createTime: "2025-05-16 17:35:39", icon: "bg-blue-500" },
    { id: 8, sortNo: 1, env: "大数据", type: "容器型", status: "启用", hallStatus: "隐藏", createTime: "2025-05-20 20:01:06", icon: "bg-indigo-500" },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-100 flex justify-end">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="请输入名称进行搜索"
            className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-slate-100 space-y-4 relative">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 w-16">分类:</span>
          <div className="flex items-center gap-2">
            {['全部', '平台型', '容器型', '虚拟系统', '组合型'].map(item => (
              <button 
                key={item}
                onClick={() => setCategory(item)}
                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${category === item ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 w-16">状态:</span>
          <div className="flex items-center gap-2">
            {['全部', '启用', '禁用', '归档'].map(item => (
              <button 
                key={item}
                onClick={() => setStatus(item)}
                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${status === item ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 w-16">实验大厅:</span>
          <div className="flex items-center gap-2">
            {['全部', '隐藏', '显示'].map(item => (
              <button 
                key={item}
                onClick={() => setHallStatus(item)}
                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${hallStatus === item ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <button className="absolute right-6 bottom-6 text-sm text-blue-600 hover:text-blue-700 flex items-center">
          收起 <ChevronRight className="w-4 h-4 -rotate-90 ml-1" />
        </button>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-b border-slate-100">
        <button className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
          添加
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-4 text-sm font-bold text-slate-700">排序号 <span className="text-slate-300 ml-1">↕</span></th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700">实验环境</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700">类型</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700">状态</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700">实验大厅</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700">创建时间 <span className="text-slate-300 ml-1">↕</span></th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((exp) => (
              <tr key={exp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 text-sm text-slate-600">{exp.sortNo}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md ${exp.icon} flex items-center justify-center text-white text-xs font-bold`}>
                      {exp.env.charAt(0)}
                    </div>
                    <span className="text-sm text-slate-700">{exp.env}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{exp.type}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{exp.status}</td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-1 rounded border ${exp.hallStatus === '显示' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-rose-500 border-rose-200 bg-rose-50'}`}>
                    {exp.hallStatus}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500">{exp.createTime}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-sm">
                    {exp.hallStatus === '隐藏' && <button className="text-blue-600 hover:text-blue-800">禁用</button>}
                    <button className="text-blue-600 hover:text-blue-800">配置</button>
                    {exp.hallStatus === '隐藏' && <button className="text-blue-600 hover:text-blue-800">归档</button>}
                    <button className="text-blue-600 hover:text-blue-800">进入实验</button>
                    <button className="text-blue-600 hover:text-blue-800">复制</button>
                    {exp.hallStatus === '显示' ? (
                      <button className="text-red-500 hover:text-red-600">取消发布</button>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-800">发布</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end gap-4 text-sm text-slate-500">
          <span>共 54 条</span>
          <select className="px-2 py-1 border border-slate-200 rounded bg-white">
            <option>10条/页</option>
          </select>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">4</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">5</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">6</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span>前往</span>
            <input type="text" defaultValue="1" className="w-10 px-1 py-1 border border-slate-200 rounded text-center" />
            <span>页</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentList;
