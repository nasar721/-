
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: '📊' },
    { id: 'accounts', label: 'دليل الحسابات', icon: '📁' },
    { id: 'customers', label: 'العملاء', icon: '👥' },
    { id: 'suppliers', label: 'الموردين', icon: '🏭' },
    { id: 'sales', label: 'فواتير المبيعات', icon: '📜' },
    { id: 'purchases', label: 'فواتير المشتريات', icon: '🛒' },
    { id: 'ai-assistant', label: 'المساعد الذكي', icon: '🤖' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800">
      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 w-72 bg-indigo-900 text-white flex flex-col shadow-2xl z-[70] 
        transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 text-2xl font-bold border-b border-indigo-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> المحاسب الذكي
          </div>
          <button className="lg:hidden text-indigo-300" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="flex-1 mt-6 overflow-y-auto px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full text-right px-6 py-4 mb-1 flex items-center gap-3 rounded-xl transition-all active:scale-95 ${
                activeTab === item.id 
                  ? 'bg-indigo-700 text-white font-bold shadow-lg ring-1 ring-indigo-500' 
                  : 'hover:bg-indigo-800/50 text-indigo-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-indigo-800 text-[10px] text-indigo-400 text-center uppercase tracking-widest">
          AI-Driven Accounting System v1.2.0
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-100 px-4 py-3 flex justify-between items-center lg:px-8 lg:py-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-indigo-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h1 className="text-xl lg:text-3xl font-extrabold text-indigo-950 truncate">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              أونلاين
            </div>
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-gradient-to-tr from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
              م
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 safe-area-bottom">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
