import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';

const BulkActionsMenu = <T,>({ bulkMenuItems }: { bulkMenuItems: DropdownListItem<T>[] }) => {
  return (
    <DropdownList menuItems={bulkMenuItems} additionalClasses="w-48 mt-1" size="sm" buttonText="Bulk Actions" icon />
  );
};

export default BulkActionsMenu;
