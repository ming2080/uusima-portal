import React from 'react';
import { Server, Shield, Database, Activity, Settings, Users, HardDrive, Building } from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
}

const SystemAdminDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统控制台</h1>
          <p className="text-gray-500 mt-1">UUSIMA 平台全局运行状态监控与管理。</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            系统日志
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            全局设置
          </button>
        </div>
      </div>

      {/* Global Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: '入驻院校', value: '45', icon: Building, color: 'text-blue-600', bg: 'bg-blue-50', status: '正常' },
          { label: '活跃用户数', value: '128,450', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', status: '正常' },
          { label: '集群节点数', value: '1,024', icon: Server, color: 'text-emerald-600', bg: 'bg-emerald-50', status: '健康' },
          { label: '存储使用量', value: '850 TB', icon: HardDrive, color: 'text-amber-600', bg: 'bg-amber-50', status: '警告' },
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
          {/* Tenant (School) Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">租户 (院校) 资源监控</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部租户</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">院校名称</th>
                    <th className="px-4 py-3">授权用户数</th>
                    <th className="px-4 py-3">计算资源配额</th>
                    <th className="px-4 py-3">存储配额</th>
                    <th className="px-4 py-3 rounded-r-lg">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '北京大学', users: '15,000', compute: '1000 Core / 4TB', storage: '100 TB', status: '正常', color: 'text-emerald-600 bg-emerald-50' },
                    { name: '清华大学', users: '18,000', compute: '1200 Core / 5TB', storage: '120 TB', status: '正常', color: 'text-emerald-600 bg-emerald-50' },
                    { name: '浙江大学', users: '20,000', compute: '1500 Core / 6TB', storage: '150 TB', status: '超限预警', color: 'text-amber-600 bg-amber-50' },
                    { name: '复旦大学', users: '12,000', compute: '800 Core / 3TB', storage: '80 TB', status: '正常', color: 'text-emerald-600 bg-emerald-50' },
                  ].map((school, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-4 font-medium text-gray-900">{school.name}</td>
                      <td className="px-4 py-4">{school.users}</td>
                      <td className="px-4 py-4">{school.compute}</td>
                      <td className="px-4 py-4">{school.storage}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${school.color}`}>{school.status}</span>
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
              <h2 className="text-lg font-bold text-gray-900">基础设施健康状况</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">监控大屏</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'API 网关', load: 45, status: '良好' },
                { name: '数据库集群', load: 65, status: '正常' },
                { name: 'K8s 实验集群', load: 88, status: '高负载' },
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
            <h2 className="text-lg font-bold text-gray-900 mb-6">安全与审计</h2>
            <div className="space-y-4">
              {[
                { title: '异常登录尝试拦截', time: '10分钟前', type: 'security', color: 'text-red-600 bg-red-50 border-red-200' },
                { title: '数据库自动备份完成', time: '2小时前', type: 'system', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { title: '平台版本更新 v2.4.1', time: '昨天 02:00', type: 'update', color: 'text-blue-600 bg-blue-50 border-blue-200' },
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
            <h2 className="text-lg font-bold text-gray-900 mb-6">系统配置</h2>
            <div className="space-y-2">
              {[
                { name: '全局参数设置', icon: Settings },
                { name: '大模型 API 配置', icon: Database },
                { name: '角色权限管理', icon: Shield },
                { name: '系统服务状态', icon: Activity },
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
