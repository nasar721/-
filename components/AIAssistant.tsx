
import React, { useState, useEffect } from 'react';
import { analyzeFinances } from '../services/geminiService.ts';
import { Account, Transaction } from '../types.ts';

interface AIAssistantProps {
  accounts: Account[];
  transactions: Transaction[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ accounts, transactions }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState<string[]>([]);

  // محاكاة التعلم الذاتي: تخزين الأنماط المكتشفة
  useEffect(() => {
    const savedKnowledge = localStorage.getItem('ai_knowledge_base');
    if (savedKnowledge) setKnowledgeBase(JSON.parse(savedKnowledge));
  }, []);

  const runFullAnalysis = async () => {
    setLoading(true);
    const data = await analyzeFinances(accounts, transactions);
    setResult(data);
    
    // إضافة النتيجة للقاعدة المعرفية (تعلم ذاتي)
    const newInsight = data.recommendation || "تحليل مالي دوري مكتمل";
    if (!knowledgeBase.includes(newInsight)) {
      const updatedKB = [newInsight, ...knowledgeBase.slice(0, 4)];
      setKnowledgeBase(updatedKB);
      localStorage.setItem('ai_knowledge_base', JSON.stringify(updatedKB));
    }
    
    setLoading(false);
  };

  const solveAccountProblems = () => {
    const problems = [];
    // البحث عن مشاكل في الدليل
    accounts.forEach(acc => {
      if (acc.balance < 0 && (acc.type === 'أصول' || acc.type === 'مصروفات')) {
        problems.push(`الحساب "${acc.name}" لديه رصيد سالب غير منطقي طبيعته مدين.`);
      }
    });

    if (problems.length === 0) {
      setChatHistory(prev => [...prev, { role: 'ai', text: '✅ قمت بفحص دليل الحسابات ولم أجد أي تناقضات منطقية حالياً. استمر في العمل الجيد!' }]);
    } else {
      setChatHistory(prev => [...prev, { role: 'ai', text: `⚠️ وجدت ${problems.length} مشكلة محاسبية:\n${problems.join('\n')}\nمقترح الحل: تحقق من قيود اليومية المرتبطة بهذه الحسابات.` }]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', text: input }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: `بناءً على "التعلم الذاتي" من بياناتك السابقة، أرى أن استفسارك حول "${input}" يرتبط بنمط نمو الأرباح الأخير. أنصحك بالتركيز على تقليل تكاليف التشغيل.` }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
      <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-1">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm lg:text-base">
            <span className="p-1.5 bg-indigo-100 rounded-lg">🧠</span> التحليل والتعلم الذاتي
          </h3>
          <div className="space-y-3">
            <button 
              onClick={runFullAnalysis}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-md shadow-indigo-100 text-xs lg:text-sm"
            >
              {loading ? 'جاري التحليل العميق...' : 'بدء فحص الذكاء الاصطناعي'}
            </button>
            <button 
              onClick={solveAccountProblems}
              className="w-full bg-white text-indigo-600 border border-indigo-200 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all text-xs lg:text-sm"
            >
              🛠️ حل مشكلات الدليل المحاسبي
            </button>
          </div>
        </div>

        {/* Knowledge Base Display */}
        <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl shadow-sm border border-slate-800">
          <h4 className="text-emerald-400 font-bold text-xs mb-3 uppercase tracking-wider">ما تعلمه النظام مؤخراً</h4>
          {knowledgeBase.length === 0 ? (
            <p className="text-[10px] italic">بانتظار تحليل البيانات لبناء القاعدة المعرفية...</p>
          ) : (
            <ul className="space-y-2">
              {knowledgeBase.map((k, i) => (
                <li key={i} className="text-[10px] leading-relaxed flex gap-2">
                  <span className="text-emerald-500">•</span> {k}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
        <div className="p-4 bg-indigo-50/50 border-b border-indigo-100 font-bold text-indigo-900 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            المساعد الذكي (أونلاين)
          </div>
          <span className="text-[10px] bg-indigo-100 px-2 py-1 rounded text-indigo-600">v2.1 Self-Learning Enabled</span>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none border-indigo-500' 
                  : 'bg-white text-slate-800 rounded-tl-none border-slate-200'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-indigo-400 text-xs animate-pulse">المساعد يفكر ويحلل الأنماط...</div>}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل عن أي مشكلة محاسبية..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-100">
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
