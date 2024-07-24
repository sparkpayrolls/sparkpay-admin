export type Document = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Country = Document & {
  name: string;
  currency: string;
  currencySymbol: string;
  code: string;
};

export type User = Document & {
  firstname: string;
  lastname: string;
  email: string;
  country: string | Country;
  emailVerified: boolean;
  avatar?: string;
  phonenumber?: string;
};

export type Company = Document & {
  name: string;
  country: string | Country;
  email: string;
  phonenumber: string;
  salaryBreakdown: unknown[];
  createdAt: string;
  updatedAt: string;
  wallet: CompanyWallet;
};

export type Administrator = Document & {
  user: string | User;
  company: string | Company;
  isRoot: boolean;
};

export type Payroll = Document & {
  id: string;
  status: string;
  payDate: string;
  company: string | Company;
  totalAmount: number;
  fee: number;
  size: number;
};

export type CompanyWallet = Document & {
  balance: number;
};

export type AuthToken = Document & {
  token: string;
  meta: Record<string, unknown>;
  isRevoked: boolean;
  isUsed: boolean;
};
