
import React from 'react';
import { Invoice, Partner } from '../types.ts';

interface InvoicesProps {
  type: 'sales' | 'purchase';
  invoices: Invoice[];
  partners: Partner[];
}

const Invoices: React.FC<InvoicesProps> = ({ type, invoices, partners }) => {
  const filteredInvoices = invoices.filter(inv => inv.type === type);

  const getPartnerName = (id: string) => {
    return partners.find(p => p.id === id)?.name || 'غير معروف';
  };

  // الأرباح = الإجمالي - التكاليف (نفترض تكلفة 70% للمشتريات والمصاريف)
  const calculateProfit = (total: number) => {
    return total * 0.3; 
  };

  const handlePrint = (inv: Invoice) => {
    const partnerName = getPartnerName(inv.partnerId);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const isSales = inv.type === 'sales';
    
    // استخدام القوالب المقدمة من المستخدم
    const template = isSales ? `
      <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; direction: rtl; }
          .invoice-card { background: #fff; max-width: 850px; margin: auto; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { display: flex; justify-content: space-between; border-bottom: 3px solid #2c3e50; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #2c3e50; margin: 0; font-size: 28px; }
          .details-section { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .details-box h3 { color: #27ae60; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background-color: #2c3e50; color: #fff; text-align: right; padding: 12px; }
          td { border-bottom: 1px solid #eee; padding: 12px; font-size: 14px; }
          .total-box { background: #2c3e50; color: #fff; padding: 15px; font-weight: bold; border-radius: 4px; text-align: center; width: 250px; float: left; }
      </style>
      <div class="invoice-card">
          <div class="header">
              <div><h1>المحاسب الذكي AI</h1><p>الرقم الضريبي: 310294857600003</p></div>
              <div style="text-align: left;">
                  <h2 style="color: #e67e22;">فاتورة ضريبية</h2>
                  <p>رقم الفاتورة: #${inv.number}</p>
                  <p>التاريخ: ${inv.date}</p>
              </div>
          </div>
          <div class="details-section">
              <div class="details-box">
                  <h3>بيانات العميل</h3>
                  <p><strong>الاسم:</strong> ${partnerName}</p>
                  <p><strong>الحالة:</strong> ${inv.status === 'paid' ? 'مسددة بالكامل' : 'ذمم مدينة'}</p>
              </div>
          </div>
          <table>
              <thead><tr><th>م</th><th>وصف الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead>
              <tbody>
                ${inv.items.length > 0 ? inv.items.map((item, i) => `
                  <tr><td>${i+1}</td><td>${item.description}</td><td>${item.quantity}</td><td>${item.price} ر.س</td><td>${item.quantity * item.price} ر.س</td></tr>
                `).join('') : `<tr><td>1</td><td>بضاعة متنوعة - مبيعات عامة</td><td>1</td><td>${inv.total}</td><td>${inv.total} ر.س</td></tr>`}
              </tbody>
          </table>
          <div class="total-box">الإجمالي النهائي: ${inv.total.toLocaleString()} ر.س</div>
          <div style="clear: both; margin-top: 50px; text-align: center; font-size: 12px; color: #777;">شكراً لتعاملك معنا. صدرت إلكترونياً.</div>
      </div>
    ` : `
      <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 20px; color: #333; direction: rtl; }
          .invoice-box { max-width: 800px; margin: auto; border: 1px solid #eee; padding: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
          .info-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; text-align: right; }
          th { background-color: #f8f9fa; border: 1px solid #ddd; padding: 12px; }
          td { border: 1px solid #ddd; padding: 12px; }
          .footer { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { border-top: 1px solid #333; width: 200px; text-align: center; padding-top: 10px; }
      </style>
      <div class="invoice-box">
          <div class="header">
              <div><h1>المحاسب الذكي AI</h1><p>قسم المستودعات</p></div>
              <div><h2>مذكرة استلام بضاعة</h2></div>
          </div>
          <div class="info-section">
              <div><p><strong>اسم المورد:</strong> ${partnerName}</p><p><strong>رقم المستند:</strong> ${inv.number}</p></div>
              <div><p><strong>التاريخ:</strong> ${inv.date}</p></div>
          </div>
          <table>
              <thead><tr><th>م</th><th>وصف الصنف / المواد</th><th>الكمية</th><th>ملاحظات الحالة</th></tr></thead>
              <tbody>
                  <tr><td>1</td><td>أصناف واردة حسب الفاتورة</td><td>1</td><td>تم الفحص والاستلام</td></tr>
              </tbody>
          </table>
          <div class="footer">
              <div class="signature-box">توقيع أمين المخزن</div>
              <div class="signature-box">توقيع المورد</div>
          </div>
      </div>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head><meta charset="UTF-8"></head>
      <body>
        ${template}
        <script>window.onload = () => { window.print(); window.close(); }</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-lg lg:text-xl text-indigo-950">
            سجل {type === 'sales' ? 'المبيعات والربحية' : 'المشتريات والواردات'}
          </h3>
          <p className="text-[10px] lg:text-xs text-slate-500">مجموع الفواتير النشطة: {filteredInvoices.length}</p>
        </div>
        <button className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-lg ${
          type === 'sales' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
        }`}>
          + إضافة فاتورة
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                <th className="px-6 py-4">الرقم</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">{type === 'sales' ? 'العميل' : 'المورد'}</th>
                <th className="px-6 py-4">الإجمالي</th>
                {type === 'sales' && <th className="px-6 py-4 text-emerald-600">الأرباح التقديرية</th>}
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-indigo-600">#{inv.number}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{getPartnerName(inv.partnerId)}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.total.toLocaleString()} ر.س</td>
                  {type === 'sales' && (
                    <td className="px-6 py-4 font-bold text-emerald-600 bg-emerald-50/20">
                      {calculateProfit(inv.total).toLocaleString()} ر.س
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                      inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inv.status === 'paid' ? 'مكتملة' : 'آجلة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handlePrint(inv)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="طباعة مستند رسمي"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
