import React, { useState } from "react";
import {
  Plus,
  Search,
  RotateCcw,
  Edit,
  Trash2,
  ChevronRight,
  Check,
  X,
  Settings,
  Download,
  Upload
} from "lucide-react";

interface GradeTemplateData {
  id: number;
  name: string;
  desc: string;
  ruleCount: number;
  updateTime: string;
  status: boolean;
}

const GradeTemplateManagement: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const templates: GradeTemplateData[] = [
    { id: 1, name: "学伴122619", desc: "该模板为导入模板", ruleCount: 33, updateTime: "2025-12-30 20:38:50", status: true },
    { id: 2, name: "学伴123020", desc: "该模板为导入模板", ruleCount: 33, updateTime: "2025-12-30 20:38:28", status: true },
    { id: 3, name: "tb2", desc: "该模板为导入模板", ruleCount: 16, updateTime: "2025-12-18 22:26:18", status: true },
    { id: 4, name: "nodered", desc: "--", ruleCount: 2, updateTime: "2025-12-16 00:52:32", status: true },
    { id: 5, name: "仿真", desc: "--", ruleCount: 3, updateTime: "2025-12-16 00:51:42", status: true },
    { id: 6, name: "硬件智能体", desc: "--", ruleCount: 12, updateTime: "2025-12-16 00:39:59", status: true },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === templates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(templates.map(t => t.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Filters */}
      <div className="p-6 border-b border-slate-100 space-y-4">
        <div className="flex flex-wrap gap-8 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 whitespace-nowrap">模板名称:</span>
            <input
              type="text"
              placeholder="请输入模板名称"
              className="w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 whitespace-nowrap">状态:</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-700">全部</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" className="text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-700">启用</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" className="text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-700">禁用</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Search className="w-4 h-4" />
              查询
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 flex gap-3 items-center border-b border-slate-100">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          新增
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          从课程导入
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
          <Trash2 className="w-4 h-4" />
          批量删除
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors">
          <Check className="w-4 h-4" />
          批量启用
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-lg hover:bg-amber-100 transition-colors">
          <X className="w-4 h-4" />
          批量禁用
        </button>
        
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            导入
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === templates.length && templates.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">序号</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">模板名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">描述</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">评分规则数量</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">更新时间</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">状态</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t, idx) => (
              <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(t.id)}
                    onChange={() => toggleSelect(t.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{idx + 1}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{t.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{t.desc}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{t.ruleCount}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{t.updateTime}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">禁用</span>
                    <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${t.status ? 'bg-blue-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${t.status ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">启用</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">配置</button>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">编辑</button>
                    <button className="text-xs font-medium text-red-500 hover:text-red-600">删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end gap-4 text-sm text-slate-500">
          <span>共 6 条</span>
          <select className="px-2 py-1 border border-slate-200 rounded bg-white">
            <option>10条/页</option>
          </select>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded">1</button>
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

export default GradeTemplateManagement;
