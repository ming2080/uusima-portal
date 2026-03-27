import React, { useState } from "react";
import {
  Plus,
  Search,
  RotateCcw,
  Edit,
  Trash2,
  Eye,
  Archive,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  MoreHorizontal
} from "lucide-react";

interface ClassData {
  id: number;
  name: string;
  specialty: string;
  org: string;
  status: boolean;
}

const ClassManagement: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState("新大陆大学");
  const [expandedOrgs, setExpandedOrgs] = useState<string[]>(["新大陆大学"]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const classes: ClassData[] = [
    { id: 1, name: "三年四班", specialty: "物联网", org: "新大陆大学", status: true },
    { id: 2, name: "物联网", specialty: "传感器", org: "新大陆大学", status: true },
    { id: 3, name: "考试班级", specialty: "嵌入式系统", org: "新大陆大学", status: true },
  ];

  const toggleOrg = (name: string) => {
    setExpandedOrgs(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === classes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(classes.map(c => c.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Left Organization Tree */}
      <div className="w-64 border-r border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="请输入组织名称搜索"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <div className="group">
              <div 
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${selectedOrg === '新大陆大学' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-700'}`}
                onClick={() => setSelectedOrg('新大陆大学')}
              >
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); toggleOrg('新大陆大学'); }}>
                    {expandedOrgs.includes('新大陆大学') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <span className="text-sm font-medium">新大陆大学</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 text-blue-500 hover:text-blue-700" />
                  <Edit className="w-3.5 h-3.5 text-slate-400 hover:text-blue-500" />
                  <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                </div>
              </div>
              
              {expandedOrgs.includes('新大陆大学') && (
                <div className="ml-6 mt-1 space-y-1">
                  {['物联网', '考试班级', '三年四班'].map(item => (
                    <div 
                      key={item}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${selectedOrg === item ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-600'}`}
                      onClick={() => setSelectedOrg(item)}
                    >
                      <span className="text-sm">{item}</span>
                      <div className="hidden group-hover:flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5 text-blue-500 hover:text-blue-700" />
                        <Edit className="w-3.5 h-3.5 text-slate-400 hover:text-blue-500" />
                        <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Filters */}
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 whitespace-nowrap">名称:</span>
              <input
                type="text"
                placeholder="请输入名称"
                className="w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 whitespace-nowrap">专业:</span>
              <select className="w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                <option value="">请选择专业</option>
                <option value="iot">物联网</option>
                <option value="embedded">嵌入式系统</option>
              </select>
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
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">状态:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">启用</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">禁用</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 items-center">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            新增
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors">
            <Check className="w-4 h-4" />
            批量启用
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-lg hover:bg-amber-100 transition-colors">
            <X className="w-4 h-4" />
            批量禁用
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === classes.length && classes.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">序号</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">班级名称</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">专业</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">所属组织</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">状态</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, idx) => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                      {c.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.specialty}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.org}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${c.status ? 'bg-blue-500' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${c.status ? 'left-4.5' : 'left-0.5'}`}></div>
                      </div>
                      <span className={`text-xs font-medium ${c.status ? 'text-blue-600' : 'text-slate-400'}`}>
                        {c.status ? '启用' : '禁用'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">查看</button>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">归档</button>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">编辑</button>
                      <button className="text-xs font-medium text-red-500 hover:text-red-600">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
