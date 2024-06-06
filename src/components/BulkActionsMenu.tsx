import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';

const BulkActionsMenu = () => {
  const handleDelete = () => {
    console.log('Deleting...');
  };

  const bulkMenuItems: DropdownListItem[] = [{ key: 'delete', label: 'Delete', onClick: handleDelete }];

  return <DropdownList items={bulkMenuItems} additionalClasses="w-48 mt-1" size="sm" buttonText="Bulk Actions" icon />;
};

export default BulkActionsMenu;
