
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import ChartOfAccounts from './components/ChartOfAccounts.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import Partners from './components/Partners.tsx';
import Invoices from './components/Invoices.tsx';
import { Account, Transaction, Partner, Invoice } from './types.ts';
import { INITIAL_CHART_OF_ACCOUNTS } from './constants.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Load local data (Offline support)
    const savedAccounts = localStorage.getItem('almuhasib_accounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      setAccounts(INITIAL_CHART_OF_ACCOUNTS);
    }

    const savedTransactions = localStorage.getItem('almuhasib_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    const savedPartners = localStorage.getItem('almuhasib_partners');
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    } else {
      // Demo data
      const demoPartners: Partner[] = [
        { id: 'p1', name: 'شركة التوريدات الحديثة', type: 'supplier', phone: '0501234567', balance: -5000 },
        { id: 'p2', name: 'أحمد علي (عميل تميز)', type: 'customer', phone: '0559876543', balance: 2400 },
      ];
      setPartners(demoPartners);
    }

    const savedInvoices = localStorage.getItem('almuhasib_invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    } else {
      // Demo invoices
      const demoInvoices: Invoice[] = [
        { id: 'i1', number: 'INV-1001', date: '2023-10-01', partnerId: 'p2', type: 'sales', total: 1200, items: [], status: 'paid' },
        { id: 'i2', number: 'PUR-5001', date: '2023-10-02', partnerId: 'p1', type: 'purchase', total: 3000, items: [], status: 'unpaid' },
      ];
      setInvoices(demoInvoices);
    }
  }, []);

  useEffect(() => {
    if (accounts.length > 0) localStorage.setItem('almuhasib_accounts', JSON.stringify(accounts));
    if (partners.length > 0) localStorage.setItem('almuhasib_partners', JSON.stringify(partners));
    if (invoices.length > 0) localStorage.setItem('almuhasib_invoices', JSON.stringify(invoices));
  }, [accounts, partners, invoices]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard accounts={accounts} transactions={transactions} invoices={invoices} />;
      case 'accounts':
        return <ChartOfAccounts accounts={accounts} />;
      case 'customers':
        return <Partners type="customer" partners={partners} />;
      case 'suppliers':
        return <Partners type="supplier" partners={partners} />;
      case 'sales':
        return <Invoices type="sales" invoices={invoices} partners={partners} />;
      case 'purchases':
        return <Invoices type="purchase" invoices={invoices} partners={partners} />;
      case 'ai-assistant':
        return <AIAssistant accounts={accounts} transactions={transactions} />;
      default:
        return <Dashboard accounts={accounts} transactions={transactions} invoices={invoices} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
