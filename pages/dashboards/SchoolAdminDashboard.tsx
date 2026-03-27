import React from 'react';
import { Users, BookOpen, Monitor, Building, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
}

const SchoolAdminDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">校级教学管理员控制台</h1>
          <p className="text-gray-500 mt-1">监控全校教学运行数据，优化教学资源分配。</p>
        </div>
        <div className="flex gap-3">
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: '全校学生', value: '12,540', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+5%' },
          { label: '全校教师', value: '342', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+2%' },
          { label: '活跃课程', value: '1,205', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+15%' },
          { label: '实验资源使用率', value: '85%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+8%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: School Overview */}
        <div className="lg:col-span-2 space-y-8">
          {/* Department Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">各院系教学情况</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看详情</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">院系名称</th>
                    <th className="px-4 py-3">学生人数</th>
                    <th className="px-4 py-3">教师人数</th>
                    <th className="px-4 py-3">活跃课程</th>
                    <th className="px-4 py-3 rounded-r-lg">实验时长</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '计算机工程学院', students: 3200, teachers: 85, courses: 240, labHours: '45,000h' },
                    { name: '物联网工程学院', students: 2800, teachers: 70, courses: 180, labHours: '38,500h' },
                    { name: '人工智能学院', students: 1500, teachers: 45, courses: 120, labHours: '25,000h' },
                    { name: '大数据学院', students: 2100, teachers: 60, courses: 150, labHours: '30,200h' },
                  ].map((dept, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-4 font-medium text-gray-900 flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" /> {dept.name}
                      </td>
                      <td className="px-4 py-4">{dept.students}</td>
                      <td className="px-4 py-4">{dept.teachers}</td>
                      <td className="px-4 py-4">{dept.courses}</td>
                      <td className="px-4 py-4 text-blue-600 font-medium">{dept.labHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resource Usage Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">校内实验资源负载</h2>
              <select className="text-sm border-gray-200 rounded-lg text-gray-600">
                <option>本周</option>
                <option>本月</option>
                <option>本学期</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 pt-4">
              {/* Mock Bar Chart */}
              {[40, 60, 45, 80, 95, 70, 30].map((height, idx) => (
                <div key={idx} className="w-full flex flex-col items-center group">
                  <div className="w-full bg-blue-100 rounded-t-md relative group-hover:bg-blue-200 transition-colors" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}%
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">周{['一', '二', '三', '四', '五', '六', '日'][idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Alerts & Quick Links */}
        <div className="space-y-8">
          {/* System Alerts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">教学预警</h2>
            <div className="space-y-4">
              {[
                { title: 'GPU 算力资源告急', desc: '人工智能学院当前 GPU 资源分配达到 95%，建议协调空闲节点。', type: 'warning', color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { title: '实验存储空间预警', desc: '大数据学院 HDFS 集群存储空间剩余不足 10%。', type: 'error', color: 'text-red-600 bg-red-50 border-red-200' },
                { title: '教务数据同步完成', desc: '本学期教务系统数据同步成功，共导入 1,205 门课程。', type: 'info', color: 'text-blue-600 bg-blue-50 border-blue-200' },
              ].map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${alert.color}`}>
                  <h3 className="text-sm font-bold mb-1">{alert.title}</h3>
                  <p className="text-xs opacity-80">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">快捷管理</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: '用户管理', icon: Users },
                { name: '课程审核', icon: BookOpen },
                { name: '资源分配', icon: Monitor },
                { name: '教学报表', icon: Activity },
              ].map((item, idx) => (
                <button key={idx} className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all group">
                  <item.icon className="w-6 h-6 text-gray-400 mb-2 group-hover:text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
