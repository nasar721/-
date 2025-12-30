
import React from 'react';
import { Account, AccountType } from '../types';

interface ChartOfAccountsProps {
  accounts: Account[];
}

const ChartOfAccounts: React.FC<ChartOfAccountsProps> = ({ accounts }) => {
  const getTypeColor = (type: AccountType) => {
    switch (type) {
      case AccountType.ASSET: return 'bg-blue-100 text-blue-700';
      case AccountType.LIABILITY: return 'bg-rose-100 text-rose-700';
      case AccountType.EQUITY: return 'bg-emerald-100 text-emerald-700';
      case AccountType.REVENUE: return 'bg-amber-100 text-amber-700';
      case AccountType.EXPENSE: return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold">دليل الحسابات الشجري</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
          + إضافة حساب جديد
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
              <th className="px-6 py-4 font-semibold">الكود</th>
              <th className="px-6 py-4 font-semibold">اسم الحساب</th>
              <th className="px-6 py-4 font-semibold">النوع</th>
              <th className="px-6 py-4 font-semibold">الرصيد الحالي</th>
              <th className="px-6 py-4 font-semibold text-center">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr 
                key={account.id} 
                className="group border-b border-slate-50 hover:bg-indigo-50/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer relative z-0 hover:z-10"
              >
                <td className="px-6 py-4 font-mono text-sm">{account.code}</td>
                <td className="px-6 py-4 font-bold">{account.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getTypeColor(account.type)}`}>
                    {account.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-indigo-700">{account.balance.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-indigo-600 hover:underline text-sm ml-3">تعديل</button>
                  <button className="text-slate-400 hover:text-rose-500 text-sm">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
