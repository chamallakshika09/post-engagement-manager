import { Post } from '../types/data';
import DownArrowIcon from '../assets/icons/DownArrow.icon';
import { useAppDispatch, useAppSelector } from '../store';
import {
  selectPaginatedPosts,
  selectSelectedPosts,
  selectSortConfig,
  setSelectedPosts,
  setSortConfig,
} from '../store/postsSlice';

const TableHeader = () => {
  const dispatch = useAppDispatch();

  const selectedPosts = useAppSelector(selectSelectedPosts);
  const sortConfig = useAppSelector(selectSortConfig);
  const paginatedPosts = useAppSelector(selectPaginatedPosts);

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

  const handleSort = (key: keyof Post) => {
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        dispatch(setSortConfig({ key, direction: 'descending' }));
      } else if (sortConfig.direction === 'descending') {
        dispatch(setSortConfig(null));
      } else {
        dispatch(setSortConfig({ key, direction: 'ascending' }));
      }
    } else {
      dispatch(setSortConfig({ key, direction: 'ascending' }));
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
        <th style={{ width: '150px' }} onClick={() => handleSort('name')}>
          <div className="cursor-pointer select-none flex items-center">
            Name
            {sortConfig?.key === 'name' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="px-1">Engaged / Unique</div>
        </th>
        <th style={{ width: '150px' }} onClick={() => handleSort('acquired')}>
          <div className="cursor-pointer select-none flex items-center">
            Acquired
            {sortConfig?.key === 'acquired' && <DownArrowIcon direction={sortConfig.direction} />}
          </div>
        </th>
        <th style={{ width: '150px' }} onClick={() => handleSort('conversion')}>
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
