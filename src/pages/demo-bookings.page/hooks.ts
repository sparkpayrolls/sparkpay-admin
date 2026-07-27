import NiceModal from "@ebay/nice-modal-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { $api } from "../../helpers/api/api";
import { HttpError } from "../../helpers/api/modules/base/http.error";
import {
  DemoBooking,
  DemoBookingStatus,
} from "../../helpers/api/modules/demo-booking/types";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";
import { ConfirmDemoBookingModal } from "../../modals/confirm-demo-booking.modal/confirm-demo-booking.modal";

type StatusFilter = DemoBookingStatus | "";

export const useDemoBookingsPageContext = () => {
  const [data, setData] = useState<DemoBooking[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 1-based (DataTable contract)
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [status, setStatus] = useState<StatusFilter>("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await $api.demoBooking.list({
        page,
        perPage: rowsPerPage,
        status: status || undefined,
      });
      setData(res.data);
      setCount(res.meta.total);
    } catch (e) {
      snackbar({ open: true, message: "Could not load demo bookings" });
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, status]);

  useEffect(() => {
    load();
  }, [load]);

  const onPageChange = (_e: unknown, next: number) => setPage(next);

  const onRowsPerPageChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const onFilterStatus = (next: StatusFilter) => {
    setStatus(next);
    setPage(1);
  };

  const onConfirm = (booking: DemoBooking) => {
    NiceModal.show(ConfirmDemoBookingModal, {
      id: booking.id,
      reference: booking.reference,
    }).then((confirmed) => {
      if (confirmed) {
        snackbar({ open: true, message: "Booking confirmed — invite sent" });
        load();
      }
    });
  };

  const onCancel = (booking: DemoBooking) => {
    const decline = booking.status === "PENDING";
    const message = decline
      ? "Decline this request? The prospect will be emailed and asked to pick another time."
      : "Cancel this booking? The prospect will be notified.";
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (!window.confirm(message)) return;

    $api.demoBooking
      .cancel(booking.id)
      .then(() => {
        snackbar({
          open: true,
          message: decline ? "Request declined" : "Booking cancelled",
        });
        load();
      })
      .catch((e: HttpError) => {
        snackbar({ open: true, message: e?.message || "Could not cancel" });
      });
  };

  const title = `${count} Demo booking${count === 1 ? "" : "s"}`;
  const headerRow = [
    { label: "Reference" },
    { label: "Prospect" },
    { label: "Company" },
    { label: "When" },
    { label: "Status" },
    { label: "Meeting" },
  ];

  return {
    data,
    count,
    loading,
    page,
    rowsPerPage,
    status,
    title,
    headerRow,
    onPageChange,
    onRowsPerPageChange,
    onFilterStatus,
    refresh: load,
    onConfirm,
    onCancel,
  };
};
