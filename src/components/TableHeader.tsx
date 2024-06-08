import DownArrowIcon from '../assets/icons/DownArrow.icon';
import { ColumnConfig } from '../types/ui';

const TableHeader = <T extends { key: string }>({
  columns,
  paginatedItems,
  selectedItems,
  sortConfig,
  updateSelectedItems,
  updateSortConfig,
  selectable = false,
  actionsColumn = false,
}: {
  columns: ColumnConfig<T>[];
  paginatedItems: T[];
  selectedItems: string[];
  sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null;
  updateSelectedItems: (selectedItems: string[]) => void;
  updateSortConfig: (sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null) => void;
  selectable?: boolean;
  actionsColumn?: boolean;
}) => {
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const newSelectedItems = new Set(paginatedItems.map((item) => item.key));
      updateSelectedItems([...new Set([...selectedItems, ...newSelectedItems])]);
    } else {
      const newSelectedItems = new Set([...selectedItems]);
      paginatedItems.forEach((item) => newSelectedItems.delete(item.key));
      updateSelectedItems([...newSelectedItems]);
    }
  };

  const handleSort = (key: keyof T) => {
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        updateSortConfig({ key, direction: 'descending' });
      } else if (sortConfig.direction === 'descending') {
        updateSortConfig(null);
      } else {
        updateSortConfig({ key, direction: 'ascending' });
      }
    } else {
      updateSortConfig({ key, direction: 'ascending' });
    }
  };

  return (
    <thead>
      <tr>
        {selectable && (
          <th style={{ width: '20px' }}>
            <div className="px-1">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={paginatedItems.every((item) => selectedItems.includes(item.key))}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
          </th>
        )}

        {columns.map((column) => (
          <th
            key={column.key as string}
            style={{ width: column.width }}
            onClick={column.sortable ? () => handleSort(column.key) : () => {}}
          >
            <div className={column.sortable ? 'cursor-pointer select-none flex items-center' : 'px-1'}>
              {column.label}
              {column.sortable && sortConfig?.key === column.key && <DownArrowIcon direction={sortConfig.direction} />}
            </div>
          </th>
        ))}

        {actionsColumn && (
          <th style={{ width: '20px' }}>
            <div className="px-1">Action</div>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
