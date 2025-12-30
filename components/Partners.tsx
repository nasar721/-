
import React from 'react';
import { Partner } from '../types.ts';

interface PartnersProps {
  type: 'customer' | 'supplier';
  partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ type, partners }) => {
  const filteredPartners = partners.filter(p => p.type === type);
  const title = type === 'customer' ? 'العملاء' : 'الموردين';
  const addButtonText = type === 'customer' ? 'عميل جديد' : 'مورد جديد';

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-lg lg:text-xl text-indigo-950">قائمة {title}</h3>
          <p className="text-[10px] lg:text-xs text-slate-500">إجمالي المسجلين: {filteredPartners.length}</p>
        </div>
        <button className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100">
          + إضافة {addButtonText}
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
              <th className="px-6 py-4">الاسم</th>
              <th className="px-6 py-4">رقم الهاتف</th>
              <th className="px-6 py-4">الرصيد المستحق</th>
              <th className="px-6 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredPartners.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  لا يوجد {title} مضافين حالياً.
                </td>
              </tr>
            ) : (
              filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{partner.name}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm font-mono">{partner.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold text-base ${partner.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {Math.abs(partner.balance).toLocaleString()} ر.س
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">كشف حساب</button>
                      <button className="text-slate-400 hover:text-rose-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">تعديل</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="lg:hidden space-y-3">
        {filteredPartners.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-slate-400 border border-dashed border-slate-200">
            قائمة {title} فارغة
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <div key={partner.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-slate-900 text-lg">{partner.name}</div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${partner.balance >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {partner.balance >= 0 ? 'له رصيد' : 'عليه مستحقات'}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-mono">{partner.phone}</span>
              </div>

              <div className="flex justify-between items-end pt-3 border-t border-slate-50">
                <div>
                  <div className="text-[10px] text-slate-400 mb-0.5">الرصيد الحالي</div>
                  <div className={`text-lg font-bold ${partner.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {Math.abs(partner.balance).toLocaleString()} ر.س
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-indigo-50 text-indigo-600 p-2 rounded-xl active:bg-indigo-100 transition-colors" title="كشف حساب">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button className="bg-slate-50 text-slate-500 p-2 rounded-xl active:bg-slate-100 transition-colors" title="تعديل البيانات">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Partners;
