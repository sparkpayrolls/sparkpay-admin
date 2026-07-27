import { Box, Button, Chip } from "@mui/material";
import { DataTable } from "../../components/datatable.component/datatable.component";
import { TableMoreCellOption } from "../../components/table.component/types";
import { DemoBooking } from "../../helpers/api/modules/demo-booking/types";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { useDemoBookingsPageContext } from "./hooks";

const STATUS_COLOR = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "default",
} as const;

const FILTERS: { label: string; value: "" | DemoBooking["status"] }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const formatWhen = (iso: string, timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date(iso));

function _DemoBookingsPage() {
  const ctx = useDemoBookingsPageContext();

  const rowActions = (b: DemoBooking): TableMoreCellOption[] => {
    if (b.status === "PENDING") {
      return [
        { label: "Confirm", onClick: () => ctx.onConfirm(b) },
        { label: "Decline", onClick: () => ctx.onCancel(b) },
      ];
    }
    if (b.status === "CONFIRMED") {
      return [{ label: "Cancel", onClick: () => ctx.onCancel(b) }];
    }
    return [];
  };

  const rows = ctx.data.map((b) => ({
    cells: [
      { label: <code>{b.reference}</code> },
      {
        label: (
          <Box>
            <div style={{ fontWeight: 600 }}>{b.name}</div>
            <div style={{ fontSize: 12, color: "#5a6478" }}>{b.email}</div>
          </Box>
        ),
      },
      {
        label: (
          <Box>
            <div>{b.companyName}</div>
            {b.employeeSize && (
              <div style={{ fontSize: 12, color: "#5a6478" }}>
                {b.employeeSize}
              </div>
            )}
          </Box>
        ),
      },
      { label: formatWhen(b.startTime, b.timezone) },
      {
        label: (
          <Chip
            size="small"
            label={b.status}
            color={STATUS_COLOR[b.status]}
          />
        ),
      },
      {
        label: b.meetingLink ? (
          <a href={b.meetingLink} target="_blank" rel="noreferrer">
            Link
          </a>
        ) : (
          "—"
        ),
      },
    ],
    moreOptions: rowActions(b),
  }));

  const filterBar = (
    <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
      {FILTERS.map((f) => (
        <Button
          key={f.label}
          size="small"
          variant={ctx.status === f.value ? "contained" : "text"}
          onClick={() => ctx.onFilterStatus(f.value)}
        >
          {f.label}
        </Button>
      ))}
    </Box>
  );

  return (
    <DashboardLayout loading={ctx.loading}>
      <DataTable
        title={ctx.title}
        count={ctx.count}
        data={rows}
        headRow={ctx.headerRow}
        page={ctx.page}
        rowsPerPage={ctx.rowsPerPage}
        onPageChange={ctx.onPageChange}
        onRowsPerPageChange={ctx.onRowsPerPageChange}
        refresh={ctx.refresh}
        toolBarContent={filterBar}
      />
    </DashboardLayout>
  );
}

const DemoBookingsPage = WithAuth(_DemoBookingsPage);

export default DemoBookingsPage;
