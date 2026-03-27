import React, { useState } from "react";
import { Search, Plus, RotateCcw, ChevronDown } from "lucide-react";

interface PluginData {
  id: number;
  name: string;
  env: string;
  createTime: string;
}

const PluginManagement: React.FC = () => {
  const [env, setEnv] = useState("实验环境");

  const plugins: PluginData[] = [
    { id: 1, name: "ChirpStack", env: "--", createTime: "2024-02-19 09:47:00" },
    { id: 2, name: "HomeAssistant", env: "--", createTime: "0000-00-00 00:00:00" },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header & Actions */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          新增环境插件
        </button>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <button className="w-full flex items-center justify-between pl-3 pr-3 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              <span>{env}</span>
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

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6 mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-4 text-sm font-bold text-slate-700">环境插件ID</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">环境插件名称</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">关联环境</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">创建时间</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {plugins.map((plugin) => (
              <tr key={plugin.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 text-sm text-slate-600">{plugin.id}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{plugin.name}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{plugin.env}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{plugin.createTime}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-sm">
                    <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      编辑
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end gap-4 text-sm text-slate-500">
          <span>共 2 条</span>
          <select className="px-2 py-1 border border-slate-200 rounded bg-white">
            <option>10条/页</option>
          </select>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded">1</button>
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
    </div>
  );
};

export default PluginManagement;
