
export enum AccountType {
  ASSET = 'أصول',
  LIABILITY = 'خصوم',
  EQUITY = 'حقوق ملكية',
  REVENUE = 'إيرادات',
  EXPENSE = 'مصروفات'
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  balance: number;
  parentId?: string;
  children?: Account[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  debitAccountId: string;
  creditAccountId: string;
  status: 'pending' | 'posted';
}

export interface Partner {
  id: string;
  name: string;
  type: 'customer' | 'supplier';
  phone: string;
  balance: number;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  partnerId: string;
  type: 'sales' | 'purchase';
  items: InvoiceItem[];
  total: number;
  status: 'paid' | 'unpaid';
}

export interface AIAnalysis {
  insight: string;
  actionRequired: boolean;
  confidence: number;
}
