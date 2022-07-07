import { ReactNode } from "react";
import { TableMoreCellOption } from "../table.component/types";

export type DataTableTableCell = {
  label: string | ReactNode;
};

export type DataTableProps = {
  title?: string;
  refresh?(): unknown;
  filterContent?: React.ReactNode;
  headRow: DataTableTableCell[];
  data?: { cells: DataTableTableCell[]; moreOptions?: TableMoreCellOption[] }[];
  rowsPerPageOptions?: (
    | number
    | {
        value: number;
        label: string;
      }
  )[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  onRowsPerPageChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  shouldRefresh?: boolean;
};
