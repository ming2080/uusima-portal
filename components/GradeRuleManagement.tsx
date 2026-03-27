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
  Settings
} from "lucide-react";

interface GradeRuleData {
  id: number;
  scene: string;
  name: string;
  env: string;
  desc: string;
  method: string;
  updateTime: string;
  status: boolean;
}

const GradeRuleManagement: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const rules: GradeRuleData[] = [
    { id: 1, scene: "软件实验", name: "节点选型自动匹配", env: "NodeRed", desc: "--", method: "有值即可", updateTime: "2025-12-18 21:48:44", status: true },
    { id: 2, scene: "软件实验", name: "规则链-根规则链的Message Type S...", env: "ThingsBoard", desc: "根规则链的Message Type Switch是...", method: "完全相等", updateTime: "2025-12-14 21:33:37", status: true },
    { id: 3, scene: "软件实验", name: "规则链-根规则链是否包含xx规则链路", env: "ThingsBoard", desc: "根规则链是否包含xx规则链", method: "完全相等", updateTime: "2025-12-14 21:28:58", status: true },
    { id: 4, scene: "软件实验", name: "规则链-有无", env: "ThingsBoard", desc: "是否存在指定名称的规则链", method: "完全相等", updateTime: "2025-12-14 21:26:46", status: true },
    { id: 5, scene: "软件实验", name: "仪表板控制部件-是否有数据", env: "ThingsBoard", desc: "是否采集到数据", method: "有值即可", updateTime: "2025-12-13 11:26:16", status: true },
    { id: 6, scene: "软件实验", name: "仪表板部件-Control switch部件高级...", env: "ThingsBoard", desc: "高级设置：RPC set value method、...", method: "完全相等", updateTime: "2025-12-13 11:24:09", status: true },
    { id: 7, scene: "软件实验", name: "仪表板部件-Analogue gauges部件高...", env: "ThingsBoard", desc: "高级设置：Minuimun、Maxnuimum...", method: "完全相等", updateTime: "2025-12-13 11:18:36", status: true },
    { id: 8, scene: "软件实验", name: "仪表板部件-设置显示标题", env: "ThingsBoard", desc: "部件的设置-显示标题是否选中", method: "成功", updateTime: "2025-12-13 11:14:34", status: true },
    { id: 9, scene: "软件实验", name: "仪表板部件-数据源配置", env: "ThingsBoard", desc: "存在指定名称部件、且数据源配置相同", method: "完全相等", updateTime: "2025-12-13 11:11:45", status: true },
    { id: 10, scene: "软件实验", name: "仪表板控制部件-执行", env: "ThingsBoard", desc: "存在指定控制部件、且执行成功，前...", method: "成功", updateTime: "2025-12-13 11:07:47", status: true },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === rules.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(rules.map(r => r.id));
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
            <span className="text-sm text-slate-500 whitespace-nowrap">规则名称:</span>
            <input
              type="text"
              placeholder="请输入规则名称"
              className="w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 whitespace-nowrap">规则状态:</span>
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 whitespace-nowrap">评分方式:</span>
            <select className="w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-400">
              <option value="">请选择评分方式</option>
              <option value="exact">完全相等</option>
              <option value="exists">有值即可</option>
              <option value="success">成功</option>
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
        <div className="flex items-center gap-4 pt-2">
          <span className="text-sm text-slate-500 whitespace-nowrap">评分场景:</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="scene" defaultChecked className="text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">全部</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="scene" className="text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">软件实验</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="scene" className="text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">硬件实验</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 flex gap-3 items-center border-b border-slate-100">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          新增
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
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === rules.length && rules.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">序号</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">评分场景</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">规则名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">实验环境</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">规则描述</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">评分方式</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">更新时间</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">状态</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r, idx) => (
              <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(r.id)}
                    onChange={() => toggleSelect(r.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{idx + 1}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.scene}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600 flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                    <Settings className="w-3 h-3" />
                  </div>
                  {r.env}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.desc}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.method}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{r.updateTime}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">禁用</span>
                    <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${r.status ? 'bg-blue-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${r.status ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">启用</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
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
          <span>共 41 条</span>
          <select className="px-2 py-1 border border-slate-200 rounded bg-white">
            <option>10条/页</option>
          </select>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">4</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">5</button>
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

export default GradeRuleManagement;
