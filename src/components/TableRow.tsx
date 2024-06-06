import { useNavigate } from 'react-router-dom';
import { Post } from '../types/data';
import instagramImage from '../assets/img/instagram.png';
import messengerImage from '../assets/img/messenger.png';
import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';

const imageMap: { [key: string]: string } = {
  instagram: instagramImage,
  messenger: messengerImage,
};

const TableRow = ({
  post,
  onRename,
  onDelete,
  isSelected,
  onSelect,
  direction = 'dropdown-end',
}: {
  post: Post;
  onRename: (key: string, newName: string) => void;
  onDelete: (key: string) => void;
  isSelected: boolean;
  onSelect: (key: string, isSelected: boolean) => void;
  direction?: 'dropdown-end' | 'dropdown-top';
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log('Edit', post.key);
    navigate(`/edit/${post.key}`);
  };

  const handleRename = () => {
    console.log('handleRename', post.key);
    const newName = prompt('Enter new name:', post.name);
    if (newName) {
      onRename(post.key, newName);
    }
  };

  const handleDelete = () => {
    console.log('handleDelete', post.key);
    if (window.confirm(`Are you sure you want to delete ${post.name}?`)) {
      onDelete(post.key);
    }
  };

  const menuItems: DropdownListItem[] = [
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'rename', label: 'Rename', onClick: handleRename },
    { key: 'delete', label: 'Delete', onClick: handleDelete },
  ];

  return (
    <tr>
      <td style={{ width: '20px' }}>
        <div className="px-1">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={isSelected}
            onChange={(e) => onSelect(post.key, e.target.checked)}
          />
        </div>
      </td>
      <td style={{ width: '20px' }}>
        <img className="h-3.5 w-3.5" src={imageMap[post.platform]} alt={post.platform} />
      </td>
      <td style={{ width: '150px' }}>{post.name}</td>
      <td style={{ width: '150px' }}>{post.engaged}</td>
      <td style={{ width: '150px' }}>{post.acquired}</td>
      <td style={{ width: '150px' }}>{post.conversion}</td>
      <td style={{ width: '20px' }}>
        <DropdownList items={menuItems} buttonText="Actions" direction={direction} />
      </td>
    </tr>
  );
};

export default TableRow;
