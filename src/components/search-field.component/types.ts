export type SearchFieldProps = {
  value?: string;
  placeholder?: string;
  /** How long to wait after the last keystroke before querying. */
  debounceMs?: number;
  onChange(value: string): void;
};
