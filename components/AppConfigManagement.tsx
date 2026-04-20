import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, Upload } from 'lucide-react';

export interface AppConfigItem {
  id: string;
  title: string;
  code: string;
  logo: string;
  favicon: string;
  loginBg: string;
  showLoginText: boolean;
  showOnHome: boolean;
}

const defaultApps: AppConfigItem[] = [
  {
    id: '1',
    title: 'UUSIMA·智慧教学实验平台',
    code: 'aiot-app',
    logo: 'https://api.iconify.design/logos:react.svg', // Placeholder logo
    favicon: '',
    loginBg: '',
    showLoginText: true,
    showOnHome: true,
  },
  {
    id: '2',
    title: 'AI智能辅助大模型',
    code: 'subject-llm',
    logo: 'https://api.iconify.design/logos:openai-icon.svg',
    favicon: '',
    loginBg: '',
    showLoginText: true,
    showOnHome: true,
  },
  {
    id: '3',
    title: '工业互联网平台',
    code: 'industrial-internet',
    logo: 'https://api.iconify.design/logos:docker.svg',
    favicon: '',
    loginBg: '',
    showLoginText: true,
    showOnHome: false,
  }
];

const AppConfigManagement: React.FC = () => {
  const [apps, setApps] = useState<AppConfigItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppConfigItem | null>(null);

  useEffect(() => {
    const loadApps = () => {
      const stored = localStorage.getItem('appConfigs');
      if (stored) {
        setApps(JSON.parse(stored));
      } else {
        setApps(defaultApps);
        localStorage.setItem('appConfigs', JSON.stringify(defaultApps));
      }
    };
    loadApps();
  }, []);

  const saveApps = (newApps: AppConfigItem[]) => {
    setApps(newApps);
    localStorage.setItem('appConfigs', JSON.stringify(newApps));
    window.dispatchEvent(new Event('appConfigsChanged'));
  };

  const handleDelete = (id: string) => {
    if (confirm('确认删除此应用配置吗？')) {
      saveApps(apps.filter(app => app.id !== id));
    }
  };

  const handleEdit = (app: AppConfigItem) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingApp(null);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newApp: AppConfigItem = {
      id: editingApp ? editingApp.id : Date.now().toString(),
      title: formData.get('title') as string,
      code: formData.get('code') as string,
      logo: editingApp?.logo || 'https://api.iconify.design/logos:react.svg',
      favicon: editingApp?.favicon || '',
      loginBg: editingApp?.loginBg || '',
      showLoginText: formData.get('showLoginText') === 'true',
      showOnHome: formData.get('showOnHome') === 'true',
    };

    if (editingApp) {
      saveApps(apps.map(app => app.id === editingApp.id ? newApp : app));
    } else {
      saveApps([...apps, newApp]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full animate-fade-in">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">应用配置</h2>
      </div>

      <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          添加应用配置
        </button>

        <div className="flex items-center gap-4">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 min-w-[150px]">
            <option>全部</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
            查询
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50">
            <tr>
              <th className="px-4 py-4 rounded-l-lg font-bold">序号</th>
              <th className="px-4 py-4 font-bold">应用标题</th>
              <th className="px-4 py-4 font-bold">应用编码</th>
              <th className="px-4 py-4 font-bold">应用LOGO</th>
              <th className="px-4 py-4 font-bold">网站图标</th>
              <th className="px-4 py-4 font-bold">登录背景图</th>
              <th className="px-4 py-4 font-bold">显示登录文案</th>
              <th className="px-4 py-4 rounded-r-lg font-bold">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {apps.map((app, index) => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4 font-medium text-slate-900">{app.title}</td>
                <td className="px-4 py-4">{app.code}</td>
                <td className="px-4 py-4">
                  {app.logo ? <img src={app.logo} alt="logo" className="h-8 object-contain" /> : <span className="text-slate-400">-</span>}
                </td>
                <td className="px-4 py-4">
                  {app.favicon ? <img src={app.favicon} alt="favicon" className="h-6 object-contain" /> : <span className="text-slate-400">-</span>}
                </td>
                <td className="px-4 py-4">
                  {app.loginBg ? <img src={app.loginBg} alt="bg" className="h-8 object-contain rounded" /> : <span className="text-slate-400">-</span>}
                </td>
                <td className="px-4 py-4">{app.showLoginText ? '显示' : '隐藏'}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleEdit(app)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                      <Edit className="w-3.5 h-3.5" /> 编辑
                    </button>
                    <button onClick={() => handleDelete(app.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> 删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                  暂无应用配置数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">
                {editingApp ? '编辑应用配置' : '添加应用配置'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveModal} className="px-8 py-6 space-y-6">
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-medium text-slate-700"><span className="text-red-500 mr-1">*</span>选择应用</label>
                <select name="code" defaultValue={editingApp?.code || 'aiot-app'} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700">
                  <option value="aiot-app">AIOT应用 (aiot-app)</option>
                  <option value="subject-llm">智能辅助大模型 (subject-llm)</option>
                  <option value="industrial-internet">工业互联网 (industrial-internet)</option>
                  <option value="custom-app">自定义应用</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-medium text-slate-700"><span className="text-red-500 mr-1">*</span>应用标题</label>
                <div className="flex-1 relative">
                  <input 
                    name="title" 
                    required 
                    defaultValue={editingApp?.title || ''} 
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 placeholder-slate-400"
                    placeholder="请输入应用标题"
                    maxLength={50}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    15/50
                  </span>
                </div>
              </div>

              <div className="flex gap-12 ml-28">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block"><span className="text-red-500 mr-1">*</span>应用LOGO</label>
                  <div className="w-32 h-12 border border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden relative cursor-pointer hover:bg-slate-100 transition-colors">
                    {editingApp?.logo ? (
                      <img src={editingApp.logo} alt="logo" className="h-8 object-contain" />
                    ) : (
                      <Upload className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block"><span className="text-red-500 mr-1">*</span>网站图标</label>
                  <div className="w-12 h-12 border border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden relative cursor-pointer hover:bg-slate-100 transition-colors">
                    {editingApp?.favicon ? (
                      <img src={editingApp.favicon} alt="favicon" className="h-6 object-contain" />
                    ) : (
                      <Upload className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <label className="w-24 text-right text-sm font-medium text-slate-700 pt-2">登录页背景</label>
                <div className="w-32 h-24 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-blue-300 transition-colors text-slate-400">
                   <Plus className="w-6 h-6 mb-1" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-medium text-slate-700">登录页文案</label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">隐藏</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="showLoginText" value="true" defaultChecked={editingApp ? editingApp.showLoginText : true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm text-blue-600 font-medium">显示</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-medium text-slate-700 leading-tight">在首页<br/>顶部显示</label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">否</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="showOnHome" value="true" defaultChecked={editingApp ? editingApp.showOnHome : true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm text-blue-600 font-medium">是</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-6 mt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="px-8 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  确定
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppConfigManagement;
