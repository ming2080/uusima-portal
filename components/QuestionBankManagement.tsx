import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart2
} from "lucide-react";

interface QuestionBank {
  id: number;
  name: string;
  category: string;
  knowledgePoint: string;
  totalQuestions: number;
  objectiveQuestions: number;
  subjectiveQuestions: number;
  creator: string;
}

const QuestionBankManagement: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const banks: QuestionBank[] = [
    { id: 1, name: "区块链", category: "计算机技能", knowledgePoint: "区块链技术", totalQuestions: 13, objectiveQuestions: 11, subjectiveQuestions: 2, creator: "林志斌" },
    { id: 2, name: "大数据", category: "计算机技能", knowledgePoint: "大数据处理", totalQuestions: 13, objectiveQuestions: 11, subjectiveQuestions: 2, creator: "林志斌" },
    { id: 3, name: "物联网", category: "计算机技能", knowledgePoint: "物联网开发", totalQuestions: 15, objectiveQuestions: 13, subjectiveQuestions: 2, creator: "林志斌" },
    { id: 4, name: "人工智能", category: "计算机技能", knowledgePoint: "人工智能素质", totalQuestions: 15, objectiveQuestions: 13, subjectiveQuestions: 2, creator: "林志斌" },
    { id: 5, name: "学伴030918", category: "医学医药类", knowledgePoint: "Spring", totalQuestions: 11, objectiveQuestions: 8, subjectiveQuestions: 3, creator: "" },
    { id: 6, name: "小锋测试题库", category: "计算机技能", knowledgePoint: "Java", totalQuestions: 14, objectiveQuestions: 9, subjectiveQuestions: 5, creator: "郭尧锋" },
    { id: 7, name: "物联网考试1", category: "医学医药类", knowledgePoint: "Spring", totalQuestions: 17, objectiveQuestions: 13, subjectiveQuestions: 4, creator: "林明旭" },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === banks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(banks.map(b => b.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="w-48">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择题库分类</option>
            <option value="it">计算机技能</option>
            <option value="medical">医学医药类</option>
          </select>
        </div>
        <div className="w-48">
          <input
            type="text"
            placeholder="搜索题库名称"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors ml-auto">
          <RotateCcw className="w-4 h-4" />
          重置
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 items-center">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          新增
        </button>
        <button 
          disabled={selectedIds.length !== 1}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg disabled:cursor-not-allowed"
        >
          <Edit className="w-4 h-4" />
          编辑
        </button>
        <button 
          disabled={selectedIds.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          删除
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === banks.length && banks.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">题库名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">题库分类</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">根知识点</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">总题数</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">客观题数</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">主观题数</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">创建人</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((b) => (
              <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(b.id)}
                    onChange={() => toggleSelect(b.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    {b.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{b.category}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{b.knowledgePoint}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{b.totalQuestions}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{b.objectiveQuestions}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{b.subjectiveQuestions}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{b.creator || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    <BarChart2 className="w-3.5 h-3.5" />
                    题库分析
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
            共7条
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium bg-blue-600 text-white">
                1
              </button>
            </div>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 ml-4">
              <select className="px-2 py-1 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none">
                <option>10 条/页</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankManagement;
