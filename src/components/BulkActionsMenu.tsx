import { useAppDispatch } from '../store';
import { openModal } from '../store/postsSlice';
import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';

const BulkActionsMenu = () => {
  const dispatch = useAppDispatch();

  const handleBulkDelete = () => {
    dispatch(openModal({ modalType: 'bulkDelete' }));
  };

  const bulkMenuItems: DropdownListItem[] = [{ key: 'delete', label: 'Delete', onClick: handleBulkDelete }];

  return <DropdownList items={bulkMenuItems} additionalClasses="w-48 mt-1" size="sm" buttonText="Bulk Actions" icon />;
};

export default BulkActionsMenu;
