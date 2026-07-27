export type DemoBookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type DemoBooking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  employeeSize?: string;
  notes?: string;
  startTime: string;
  endTime: string;
  timezone: string;
  durationMinutes: number;
  status: DemoBookingStatus;
  meetingLink?: string;
  reference: string;
  createdAt: string;
};

export type ListMeta = {
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
};

export type ListDemoBookingsParams = {
  page?: number;
  perPage?: number;
  status?: DemoBookingStatus;
};

export type ListDemoBookingsResponse = {
  message: string;
  data: DemoBooking[];
  meta: ListMeta;
};
