
import { AccountType, Account } from './types.ts';

export const INITIAL_CHART_OF_ACCOUNTS: Account[] = [
  { id: '1', code: '1', name: 'الأصول', type: AccountType.ASSET, balance: 150000 },
  { id: '11', code: '11', name: 'الأصول المتداولة', type: AccountType.ASSET, balance: 50000, parentId: '1' },
  { id: '111', code: '111', name: 'الصندوق', type: AccountType.ASSET, balance: 10000, parentId: '11' },
  { id: '112', code: '112', name: 'البنك', type: AccountType.ASSET, balance: 40000, parentId: '11' },
  { id: '2', code: '2', name: 'الخصوم', type: AccountType.LIABILITY, balance: 30000 },
  { id: '3', code: '3', name: 'حقوق الملكية', type: AccountType.EQUITY, balance: 120000 },
  { id: '4', code: '4', name: 'الإيرادات', type: AccountType.REVENUE, balance: 25000 },
  { id: '5', code: '5', name: 'المصروفات', type: AccountType.EXPENSE, balance: 10000 },
];
