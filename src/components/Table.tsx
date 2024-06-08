import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';

import { ColumnConfig, DropdownListItem } from '../types/ui';

const Table = <T extends { key: string }>({
  paginatedItems,
  selectedItems,
  sortConfig,
  updateSelectedItems,
  updateSortConfig,
  menuItems,
  itemsPerPage,
  currentPage,
  sortedItems,
  updateCurrentPage,
  columns,
}: {
  paginatedItems: T[];
  selectedItems: string[];
  sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null;
  updateSelectedItems: (selectedItems: string[]) => void;
  updateSortConfig: (sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null) => void;
  menuItems: DropdownListItem<T>[];
  itemsPerPage: number;
  currentPage: number;
  sortedItems: T[];
  updateCurrentPage: (page: number) => void;
  columns: ColumnConfig<T>[];
}) => {
  return (
    <>
      <div className="overflow-y-hidden overflow-x-scroll">
        <table className="table table-sm bg-base-100 px-6">
          <TableHeader
            columns={columns}
            paginatedItems={paginatedItems}
            selectedItems={selectedItems}
            sortConfig={sortConfig}
            updateSelectedItems={updateSelectedItems}
            updateSortConfig={updateSortConfig}
            selectable
            actionsColumn
          />
          <tbody>
            {paginatedItems.map((item, index) => (
              <TableRow
                key={item.key}
                item={item}
                direction={index < itemsPerPage / 2 ? 'dropdown-end' : 'dropdown-top'}
                menuItems={menuItems}
                selectedItems={selectedItems}
                columns={columns}
                updateSelectedItems={updateSelectedItems}
                selectable
                actionsColumn
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={Math.ceil(sortedItems.length / itemsPerPage)}
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
      />
    </>
  );
};

export default Table;
