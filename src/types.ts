export type Country = {
  name: string;
  currency: string;
  currencySymbol: string;
  code: string;
};

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  country: string | Country;
  emailVerified: boolean;
  avatar?: string;
  phonenumber?: string;
};
