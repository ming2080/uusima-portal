import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Layers,
  Upload,
  Download,
  RotateCcw,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Filter
} from "lucide-react";

interface Question {
  id: number;
  content: string;
  bank: string;
  type: string;
  difficulty: string;
  knowledgePoint: string;
  manualGrading: boolean;
  creator: string;
}

const QuestionManagement: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const questions: Question[] = [
    { id: 1, content: "1. 区块链技术的首个成功应用...", bank: "区块链", type: "单选题", difficulty: "简单", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 2, content: "2. 比特币采用的共识机制是?", bank: "区块链", type: "单选题", difficulty: "一般", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 3, content: "3. 区块链中，能够实现\"去中...", bank: "区块链", type: "单选题", difficulty: "一般", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 4, content: "4. 区块链中，前一个区块与后...", bank: "区块链", type: "单选题", difficulty: "简单", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 5, content: "5. 区块链的核心特性包括哪些?", bank: "区块链", type: "多选题", difficulty: "一般", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 6, content: "6. 按照准入机制分类，区块链...", bank: "区块链", type: "多选题", difficulty: "简单", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 7, content: "7. 非对称加密技术中，公钥用...", bank: "区块链", type: "判断题", difficulty: "一般", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 8, content: "8. 51% 攻击是指黑客控制了全...", bank: "区块链", type: "判断题", difficulty: "一般", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 10, content: "10. 区块链 2.0 时代的典型代...", bank: "区块链", type: "填空题", difficulty: "简单", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
    { id: 11, content: "11. 区块链中用于确保存储效率...", bank: "区块链", type: "填空题", difficulty: "较难", knowledgePoint: "", manualGrading: false, creator: "林志斌" },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map(q => q.id));
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
          <input
            type="text"
            placeholder="选择或搜索题库"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="w-40">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择试题类型</option>
            <option value="single">单选题</option>
            <option value="multiple">多选题</option>
            <option value="judge">判断题</option>
            <option value="fill">填空题</option>
          </select>
        </div>
        <div className="w-40">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择试题难度</option>
            <option value="easy">简单</option>
            <option value="medium">一般</option>
            <option value="hard">较难</option>
          </select>
        </div>
        <div className="w-40">
          <input
            type="text"
            placeholder="选择知识点"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="w-48">
          <input
            type="text"
            placeholder="搜索试题内容"
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
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
          <Layers className="w-4 h-4" />
          批量添加
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
          <Upload className="w-4 h-4" />
          导入
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
          <Download className="w-4 h-4" />
          导出
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
                  checked={selectedIds.length === questions.length && questions.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">试题内容</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">题库</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">题型</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">难度</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">知识点</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">人工批阅</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">创建人</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(q.id)}
                    onChange={() => toggleSelect(q.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <a href="#" className="text-sm text-blue-600 hover:underline line-clamp-1">
                    {q.content}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.bank}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.type}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.difficulty}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{q.knowledgePoint || "-"}</td>
                <td className="px-4 py-3 text-sm text-slate-600 text-center">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                    {q.manualGrading ? "是" : "否"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.creator}</td>
                <td className="px-4 py-3 text-center">
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    预览
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
            共98条
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === 1 ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="text-slate-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                10
              </button>
            </div>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 ml-4">
              <select className="px-2 py-1 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none">
                <option>10 条/页</option>
                <option>20 条/页</option>
                <option>50 条/页</option>
              </select>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                跳至
                <input
                  type="text"
                  className="w-10 px-1 py-1 text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                页
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionManagement;
