import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/data';
import instagramImage from '../assets/img/instagram.png';
import messengerImage from '../assets/img/messenger.png';
import { DropdownListItem } from '../types/ui';
import DropdownList from './DropdownList';
import Modal from './Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'rename' | 'delete' | null>(null);
  const [newName, setNewName] = useState(post.name);

  const handleEdit = () => {
    navigate(`/post-engagement/${post.key}`);
  };

  const handleRename = () => {
    setModalType('rename');
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalType('delete');
    setIsModalOpen(true);
  };

  const confirmRename = () => {
    onRename(post.key, newName);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    onDelete(post.key);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const menuItems: DropdownListItem[] = [
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'rename', label: 'Rename', onClick: handleRename },
    { key: 'delete', label: 'Delete', onClick: handleDelete },
  ];

  return (
    <>
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={modalType === 'rename' ? confirmRename : confirmDelete}
        title={modalType === 'rename' ? 'Please enter new name' : 'Are you sure you want to delete this post?'}
      >
        {modalType === 'rename' ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter text here"
          />
        ) : (
          <p>Deleting post: {post.name}</p>
        )}
      </Modal>
    </>
  );
};

export default TableRow;
