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
};

export type Administrator = Document & {
  user: string | User;
  company: string | Company;
  isRoot: boolean;
};

export type Payroll = Document & {
  status: string;
  payDate: string;
};
