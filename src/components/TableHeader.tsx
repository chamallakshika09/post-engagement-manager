import { Post } from '../types/data';
import DownArrowIcon from '../assets/icons/DownArrow.icon';

const TableHeader = ({
  onSort,
  sortConfig,
}: {
  onSort: (key: keyof Post) => void;
  sortConfig: { key: keyof Post; direction: 'ascending' | 'descending' } | null;
}) => {
  return (
    <thead>
      <tr>
        <th style={{ width: '20px' }}>
          <div className="px-1">
            <input type="checkbox" className="checkbox checkbox-sm" />
          </div>
        </th>
        <th style={{ width: '20px' }}>
          <div className="px-1"></div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="cursor-pointer select-none flex items-center" onClick={() => onSort('name')}>
            Name
            {sortConfig?.key === 'name' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="px-1">Engaged / Unique</div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="cursor-pointer select-none flex items-center" onClick={() => onSort('acquired')}>
            Acquired
            {sortConfig?.key === 'acquired' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="cursor-pointer select-none flex items-center" onClick={() => onSort('conversion')}>
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
