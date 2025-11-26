import React from 'react';
import { Lab } from '../types';
import { Terminal, Server, Wifi, Cpu, Play } from 'lucide-react';

interface LabsProps {
  onAccessTrigger: () => void;
}

const LABS_DATA: Lab[] = [
    { id: '1', title: 'Linux 服务器管理', description: '在实时 CentOS 7 实例上练习命令行管理。', tools: ['Bash', 'SSH', 'Vim'], thumbnail: 'https://picsum.photos/600/400?random=20', status: '运行中' },
    { id: '2', title: 'Cisco Packet Tracer', description: '设计和配置复杂的网络拓扑结构。', tools: ['Routers', 'Switches', 'Firewall'], thumbnail: 'https://picsum.photos/600/400?random=21', status: '运行中' },
    { id: '3', title: 'Kubernetes 集群', description: '部署和管理容器化应用程序。', tools: ['K8s', 'Docker', 'Helm'], thumbnail: 'https://picsum.photos/600/400?random=22', status: '维护中' },
    { id: '4', title: 'IoT 智能家居', description: '模拟传感器数据流向 MQTT 代理。', tools: ['MQTT', 'Node-RED'], thumbnail: 'https://picsum.photos/600/400?random=23', status: '运行中' },
];

const Labs: React.FC<LabsProps> = ({ onAccessTrigger }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">实验大厅</h1>
          <p className="text-gray-600 mt-2">直接在浏览器中访问高性能虚拟环境。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {LABS_DATA.map((lab) => (
                <div key={lab.id} className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 hover:border-blue-300 transition-colors">
                    <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                         <img src={lab.thumbnail} alt={lab.title} className="w-full h-full object-cover" />
                         <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold ${lab.status === '运行中' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                             {lab.status}
                         </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {lab.title}
                            </h3>
                            <p className="text-gray-500 mt-2 text-sm">{lab.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                                {lab.tools.map(t => (
                                    <span key={t} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button 
                                onClick={onAccessTrigger}
                                disabled={lab.status !== '运行中'}
                                className={`flex items-center justify-center w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition ${
                                    lab.status === '运行中' 
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <Play className="w-4 h-4 mr-2" />
                                进入实验室
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Labs;