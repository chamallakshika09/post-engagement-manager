import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';

const BulkActionsMenu = ({ onBulkDelete }: { onBulkDelete: () => void }) => {
  const bulkMenuItems: DropdownListItem[] = [{ key: 'delete', label: 'Delete', onClick: onBulkDelete }];

  return <DropdownList items={bulkMenuItems} additionalClasses="w-48 mt-1" size="sm" buttonText="Bulk Actions" icon />;
};

export default BulkActionsMenu;
