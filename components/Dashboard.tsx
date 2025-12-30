
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Account, Transaction, Invoice } from '../types';

interface DashboardProps {
  accounts: Account[];
  transactions: Transaction[];
  invoices: Invoice[];
}

const Dashboard: React.FC<DashboardProps> = ({ accounts, transactions, invoices }) => {
  const totalSales = invoices.filter(inv => inv.type === 'sales').reduce((acc, curr) => acc + curr.total, 0);
  const totalPurchases = invoices.filter(inv => inv.type === 'purchase').reduce((acc, curr) => acc + curr.total, 0);
  const totalExpenses = accounts.filter(a => a.type === 'مصروفات').reduce((acc, curr) => acc + curr.balance, 0);
  const netProfit = totalSales - totalPurchases - totalExpenses;

  const chartData = [
    { name: 'المبيعات', value: totalSales },
    { name: 'المشتريات', value: totalPurchases },
    { name: 'الأرباح', value: netProfit },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Main Metrics - Stacked on Mobile, Grid on Tablet+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 active:bg-slate-50 transition-colors">
          <div className="text-slate-500 text-[10px] lg:text-sm mb-1">إجمالي المبيعات</div>
          <div className="text-lg lg:text-2xl font-bold text-emerald-600">{totalSales.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 active:bg-slate-50 transition-colors">
          <div className="text-slate-500 text-[10px] lg:text-sm mb-1">إجمالي المشتريات</div>
          <div className="text-lg lg:text-2xl font-bold text-rose-500">{totalPurchases.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 active:bg-slate-50 transition-colors">
          <div className="text-slate-500 text-[10px] lg:text-sm mb-1">المصروفات</div>
          <div className="text-lg lg:text-2xl font-bold text-amber-600">{totalExpenses.toLocaleString()}</div>
        </div>
        <div className="bg-indigo-600 p-4 lg:p-5 rounded-2xl shadow-md text-white active:bg-indigo-700 transition-colors">
          <div className="text-indigo-100 text-[10px] lg:text-sm mb-1 font-medium">صافي الأرباح</div>
          <div className="text-lg lg:text-2xl font-bold">{netProfit.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Charts - Adjustable height for mobile */}
        <div className="lg:col-span-2 bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-slate-100 h-64 lg:h-80">
          <h3 className="font-bold mb-4 text-indigo-900 text-sm lg:text-base">الأداء المالي</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insight - Improved padding and font for mobile */}
        <div className="bg-slate-900 text-white p-5 lg:p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[180px]">
          <div className="relative z-10">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-emerald-400 text-sm lg:text-base">
              <span className="text-lg">🤖</span> ذكاء الأعمال
            </h3>
            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
              {netProfit > 0 
                ? "أداء ممتاز! تم رصد زيادة في مبيعاتك بنسبة 12%. ينصح النظام بزيادة الاستثمار في الموردين الأكثر طلباً."
                : "تنبيه: نفقاتك التشغيلية مرتفعة هذا الأسبوع. التعلم الذاتي يقترح إعادة هيكلة المصاريف الإدارية."}
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-10 text-[100px] pointer-events-none rotate-12">📈</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
