import React from 'react';

const Products: React.FC = () => (
    <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
             <h1 className="text-3xl font-bold text-gray-900 mb-8">产品中心</h1>
             <p className="text-gray-600 mb-12">新大陆教育开发的教育硬件和软件解决方案。</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[1,2,3].map(i => (
                     <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                         <div className="h-40 bg-gray-200 rounded mb-4"></div>
                         <h3 className="font-bold text-lg mb-2">教学实训套件 V{i}.0</h3>
                         <p className="text-sm text-gray-500">面向课堂物联网实验的综合硬件套件。</p>
                     </div>
                 ))}
             </div>
        </div>
    </div>
);
export default Products;