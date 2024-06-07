import { Post } from '../types/data';
import DownArrowIcon from '../assets/icons/DownArrow.icon';
import { useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { selectSelectedPosts, setSelectedPosts } from '../store/postsSlice';

const TableHeader = ({
  onSort,
  sortConfig,
  paginatedPosts,
}: {
  onSort: (key: keyof Post) => void;
  sortConfig: { key: keyof Post; direction: 'ascending' | 'descending' } | null;
  paginatedPosts: Post[];
}) => {
  const dispatch = useAppDispatch();

  const selectedPosts = useSelector(selectSelectedPosts);

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const newSelectedPosts = new Set(paginatedPosts.map((post) => post.key));
      dispatch(setSelectedPosts(new Set([...selectedPosts, ...newSelectedPosts])));
    } else {
      const newSelectedPosts = new Set([...selectedPosts]);
      paginatedPosts.forEach((post) => newSelectedPosts.delete(post.key));
      dispatch(setSelectedPosts(newSelectedPosts));
    }
  };

  return (
    <thead>
      <tr>
        <th style={{ width: '20px' }}>
          <div className="px-1">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={paginatedPosts.every((post) => selectedPosts.has(post.key))}
              onChange={(e) => handleSelectAll(e.target.checked)}
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
