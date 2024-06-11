import { ColumnConfig, DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';
import instagramImage from '../assets/img/instagram.svg';
import messengerImage from '../assets/img/messenger.svg';

const imageMap: { [key: string]: string } = {
  instagram: instagramImage,
  messenger: messengerImage,
};

const TableRow = <T extends { key: string }>({
  item,
  direction = 'dropdown-end',
  menuItems,
  selectedItems,
  columns,
  updateSelectedItems,
  selectable = false,
  actionsColumn = false,
}: {
  item: T;
  direction?: 'dropdown-end' | 'dropdown-top';
  menuItems: DropdownListItem<T>[];
  selectedItems: string[];
  columns: ColumnConfig<T>[];
  updateSelectedItems: (selectedItems: string[]) => void;
  selectable?: boolean;
  actionsColumn?: boolean;
}) => {
  const handleRowSelect = (key: string, isSelected: boolean) => {
    const newSelectedItems = new Set([...selectedItems]);
    if (isSelected) {
      newSelectedItems.add(key);
    } else {
      newSelectedItems.delete(key);
    }
    updateSelectedItems([...newSelectedItems]);
  };

  return (
    <tr>
      {selectable && (
        <td style={{ width: '20px' }}>
          <div className="px-1">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={selectedItems.includes(item.key)}
              onChange={(e) => handleRowSelect(item.key, e.target.checked)}
            />
          </div>
        </td>
      )}
      {columns.map((column) => (
        <td key={column.key as string} style={{ width: column.width }}>
          {column.key === 'platform' ? (
            <img className="h-3.5 w-3.5" src={imageMap[item[column.key] as string]} alt={item[column.key] as string} />
          ) : (
            (item[column.key] as string)
          )}
        </td>
      ))}
      {actionsColumn && (
        <td style={{ width: '20px' }}>
          <DropdownList menuItems={menuItems} buttonText="Actions" direction={direction} item={item} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
