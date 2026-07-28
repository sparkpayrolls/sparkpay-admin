import { BaseModule } from "../base/base.module";
import {
  ListDemoBookingsParams,
  ListDemoBookingsResponse,
} from "./types";

export class DemoBookingModule extends BaseModule {
  list(params: ListDemoBookingsParams) {
    return this.$get<ListDemoBookingsResponse>("/demo-bookings", { params });
  }

  confirm(id: string, meetingLink: string) {
    return this.$post<{ message: string }>(`/demo-bookings/${id}/confirm`, {
      meetingLink,
    });
  }

  cancel(id: string) {
    return this.$post<{ message: string }>(`/demo-bookings/${id}/cancel`, {});
  }
}
