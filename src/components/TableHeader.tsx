import { Post } from '../types/data';
import DownArrowIcon from '../assets/icons/DownArrow.icon';

const TableHeader = ({
  onSort,
  sortConfig,
  allSelected,
  onSelectAll,
}: {
  onSort: (key: keyof Post) => void;
  sortConfig: { key: keyof Post; direction: 'ascending' | 'descending' } | null;
  allSelected: boolean;
  onSelectAll: (isSelected: boolean) => void;
}) => {
  return (
    <thead>
      <tr>
        <th style={{ width: '20px' }}>
          <div className="px-1">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </div>
        </th>
        <th style={{ width: '20px' }}>
          <div className="px-1"></div>
        </th>
        <th style={{ width: '150px' }} onClick={() => onSort('name')}>
          <div className="cursor-pointer select-none flex items-center">
            Name
            {sortConfig?.key === 'name' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="px-1">Engaged / Unique</div>
        </th>
        <th style={{ width: '150px' }} onClick={() => onSort('acquired')}>
          <div className="cursor-pointer select-none flex items-center">
            Acquired
            {sortConfig?.key === 'acquired' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '150px' }} onClick={() => onSort('conversion')}>
          <div className="cursor-pointer select-none flex items-center">
            Conversion
            {sortConfig?.key === 'conversion' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '20px' }}>
          <div className="px-1">Action</div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
