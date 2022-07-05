export type TableMoreCellOption = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
};

export type TableMoreCellProps = {
  options: TableMoreCellOption[];
};
