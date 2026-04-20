import React from 'react';
import { Server, Shield, Database, Activity, Settings, Users, HardDrive, Building } from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
}

const SystemAdminDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">校级系统管理员控制台</h1>
          <p className="text-gray-500 mt-1">负责本校私有化部署环境的运行维护与全局配置。</p>
        </div>
        <div className="flex gap-3">
        </div>
      </div>

      {/* Global Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: '部门/院系数量', value: '12', icon: Building, color: 'text-blue-600', bg: 'bg-blue-50', status: '正常' },
          { label: '全校活跃用户', value: '8,450', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', status: '正常' },
          { label: '本地服务器节点', value: '32', icon: Server, color: 'text-emerald-600', bg: 'bg-emerald-50', status: '健康' },
          { label: '校内存储占用', value: '120 TB', icon: HardDrive, color: 'text-amber-600', bg: 'bg-amber-50', status: '正常' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                stat.status === '正常' || stat.status === '健康' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
              }`}>
                {stat.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Platform Management */}
        <div className="lg:col-span-2 space-y-8">
          {/* Department Resource Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">各部门/实训室资源分配</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">资源管理</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">部门名称</th>
                    <th className="px-4 py-3">分配用户数</th>
                    <th className="px-4 py-3">CPU/内存配额</th>
                    <th className="px-4 py-3">存储空间</th>
                    <th className="px-4 py-3 rounded-r-lg">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '计算机工程学院', users: '3,200', compute: '256 Core / 1TB', storage: '20 TB', status: '正常', color: 'text-emerald-600 bg-emerald-50' },
                    { name: '人工智能实训中心', users: '1,500', compute: '512 Core / 2TB', storage: '50 TB', status: '高负载', color: 'text-amber-600 bg-amber-50' },
                    { name: '大数据实验室', users: '2,100', compute: '128 Core / 512GB', storage: '30 TB', status: '正常', color: 'text-emerald-600 bg-emerald-50' },
                    { name: '物联网工程学院', users: '2,800', compute: '128 Core / 512GB', storage: '15 TB', status: '正常', color: 'text-emerald-600 bg-emerald-50' },
                  ].map((dept, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-4 font-medium text-gray-900">{dept.name}</td>
                      <td className="px-4 py-4">{dept.users}</td>
                      <td className="px-4 py-4">{dept.compute}</td>
                      <td className="px-4 py-4">{dept.storage}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${dept.color}`}>{dept.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">校内私有云服务状态</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">详细监控</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: '校园网接入', load: 35, status: '良好' },
                { name: '本地存储集群', load: 55, status: '正常' },
                { name: 'GPU 计算节点', load: 82, status: '高负载' },
              ].map((service, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-gray-900">{service.name}</h3>
                    <span className={`text-xs font-medium ${service.load > 80 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>负载率</span>
                    <span>{service.load}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${service.load > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${service.load}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Security & Settings */}
        <div className="space-y-8">
          {/* Security Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">系统安全与备份</h2>
            <div className="space-y-4">
              {[
                { title: '防火墙拦截异常访问', time: '10分钟前', type: 'security', color: 'text-red-600 bg-red-50 border-red-200' },
                { title: '校内数据增量备份完成', time: '2小时前', type: 'system', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { title: '本地节点扩容成功', time: '昨天 15:30', type: 'update', color: 'text-blue-600 bg-blue-50 border-blue-200' },
              ].map((event, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${event.color} flex items-start`}>
                  <Shield className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold mb-1">{event.title}</h3>
                    <p className="text-xs opacity-80">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">校级平台配置</h2>
            <div className="space-y-2">
              {[
                { name: '校内参数设置', icon: Settings },
                { name: '本地算力资源配置', icon: Database },
                { name: '校内角色权限管理', icon: Shield },
                { name: '本地服务运行状态', icon: Activity },
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all group">
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{item.name}</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-500">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
