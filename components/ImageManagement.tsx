import React, { useState } from "react";
import { Search, Plus, RotateCcw } from "lucide-react";

interface ImageData {
  id: string;
  name: string;
  mountDir: string;
  podPrefix: string;
  serviceType: string;
  openPorts: string;
  accessSuffix: string;
  tags: string;
}

const ImageManagement: React.FC = () => {
  const [searchName, setSearchName] = useState("");

  const images: ImageData[] = [
    { id: "2004470105570279425", name: "区块链-以太坊", mountDir: "/root", podPrefix: "bc-eth", serviceType: "svc", openPorts: "6080,2222,18888", accessSuffix: "/vnc.html", tags: "区块链" },
    { id: "2003360615307411458", name: "大模型训练", mountDir: "/root", podPrefix: "llm", serviceType: "eip", openPorts: "22,30001,30002", accessSuffix: "--", tags: "general" },
    { id: "1986347035571781634", name: "物联网人工智能终端", mountDir: "/home/jovyan", podPrefix: "smartai", serviceType: "eip&svc", openPorts: "8888,30001,30002", accessSuffix: "/lab", tags: "AI物联网终端" },
    { id: "1981541553858412545", name: "软件测试", mountDir: "/root", podPrefix: "--", serviceType: "eip", openPorts: "--", accessSuffix: "--", tags: "general" },
    { id: "1980120435921936386", name: "人工智能平台-exam", mountDir: "/home/jovyan", podPrefix: "ai-exam", serviceType: "svc", openPorts: "8888,30001,30002", accessSuffix: "/lab", tags: "general" },
    { id: "1963134536004550657", name: "区块链竞赛-exam-fisco", mountDir: "/root", podPrefix: "exam-fisco", serviceType: "svc", openPorts: "18888,5000,5002", accessSuffix: "--", tags: "区块链竞赛" },
    { id: "1953698765905600514", name: "Jupyter-3.10", mountDir: "/home/jovyan", podPrefix: "smartai-agri", serviceType: "eip&svc", openPorts: "8888,30001,30002", accessSuffix: "/lab", tags: "AI物联网终端" },
    { id: "1937073955842330625", name: "AI物联网终端", mountDir: "/home/jovyan", podPrefix: "ai-terminal", serviceType: "eip&svc", openPorts: "8888,30001,30002", accessSuffix: "/lab", tags: "AI物联网终端" },
    { id: "21", name: "终端-novnc", mountDir: "/root", podPrefix: "vnc-hadoop", serviceType: "svc", openPorts: "6080,2222,18888", accessSuffix: "/vnc.html", tags: "--" },
    { id: "22", name: "大数据-init", mountDir: "/root", podPrefix: "init-hadoop", serviceType: "svc", openPorts: "18888,2222,6080", accessSuffix: "--", tags: "--" },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header & Actions */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          新增镜像副本
        </button>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="镜像副本名称"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
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
              <th className="px-4 py-4 text-sm font-bold text-slate-700">镜像副本ID</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">镜像副本名称</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">挂载目录</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">pod前缀</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">服务类型</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">开放端口</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">访问后缀</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-center">标签</th>
              <th className="px-4 py-4 text-sm font-bold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 text-sm text-slate-600">{img.id}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.name}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.mountDir}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.podPrefix}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.serviceType}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.openPorts}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.accessSuffix}</td>
                <td className="px-4 py-4 text-sm text-slate-600 text-center">{img.tags}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-sm">
                    <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                      <Search className="w-3 h-3" /> 查看
                    </button>
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
          <span>共 25 条</span>
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

export default ImageManagement;
