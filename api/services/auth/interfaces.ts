export interface AuthServicesResponsesI {
  error: boolean;
  status: number;
  detail: string;
};

type Provider = "email" | "google";

export interface PayloadI {
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  password?: string;
  provider: Provider
};
