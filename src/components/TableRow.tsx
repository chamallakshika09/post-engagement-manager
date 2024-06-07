import { useNavigate } from 'react-router-dom';
import { Post } from '../types/data';
import instagramImage from '../assets/img/instagram.png';
import messengerImage from '../assets/img/messenger.png';
import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';
import { openModal, selectSelectedPosts, setSelectedPosts } from '../store/postsSlice';
import { useAppDispatch, useAppSelector } from '../store';

const imageMap: { [key: string]: string } = {
  instagram: instagramImage,
  messenger: messengerImage,
};

const TableRow = ({
  post,
  direction = 'dropdown-end',
}: {
  post: Post;
  direction?: 'dropdown-end' | 'dropdown-top';
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedPosts = useAppSelector(selectSelectedPosts);

  const handleEdit = () => {
    navigate(`/post-engagement/${post.key}`);
  };

  const handleRename = () => {
    dispatch(openModal({ modalType: 'rename', post }));
  };

  const handleDelete = () => {
    dispatch(openModal({ modalType: 'delete', post }));
  };

  const handleRowSelect = (key: string, isSelected: boolean) => {
    const newSelectedPosts = new Set([...selectedPosts]);
    if (isSelected) {
      newSelectedPosts.add(key);
    } else {
      newSelectedPosts.delete(key);
    }
    dispatch(setSelectedPosts([...newSelectedPosts]));
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
            checked={selectedPosts.includes(post.key)}
            onChange={(e) => handleRowSelect(post.key, e.target.checked)}
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
