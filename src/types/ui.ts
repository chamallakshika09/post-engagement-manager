export type DropdownListItem<T = undefined> = { key: string; label: string; onClick: (item?: T) => void };

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
};
