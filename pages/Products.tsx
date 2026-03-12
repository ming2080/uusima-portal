import React from 'react';
import { Box, Cpu, Package } from 'lucide-react';

const Products: React.FC = () => {
    const products = [
        { id: 1, name: "物联网综合实训台 V3.0", desc: "集成了 Zigbee、NB-IoT、LoRa 等多模组的教学硬件平台。", image: "https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&q=80&w=800" },
        { id: 2, name: "边缘计算网关套件", desc: "支持 Docker 容器部署的高性能工业级网关开发套件。", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
        { id: 3, name: "AI 视觉开发车 V2.0", desc: "基于 Jetson Nano 的自动驾驶与机器视觉教学小车。", image: "https://images.unsplash.com/photo-1535378437327-b7107b231151?auto=format&fit=crop&q=80&w=800" }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-[1440px] mx-auto px-4">
                 <div className="text-center mb-12">
                     <h1 className="text-3xl font-bold text-gray-900 mb-4">产品中心</h1>
                     <p className="text-gray-600 max-w-2xl mx-auto">
                         新大陆教育开发的专业级教育硬件与软件解决方案，专为高等职业教育实验实训设计，
                         无缝对接“岗课赛证”融通模式。
                     </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {products.map(product => (
                         <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 group">
                             <div className="h-48 overflow-hidden bg-gray-100 relative">
                                 <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                 <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                                     <Box className="w-4 h-4 text-blue-600" />
                                 </div>
                             </div>
                             <div className="p-6">
                                 <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                 <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.desc}</p>
                                 <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                                     查看参数详情 &rarr;
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};
export default Products;