import { useEffect } from 'react';
import BulkActionsMenu from '../components/BulkActionsMenu';
import SearchField from '../components/SearchField';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import Modal from '../components/Modal';
import NavbarLayout from '../layouts/NavbarLayout';
import { useAppDispatch, useAppSelector } from '../store';
import {
  closeModal,
  deleteSelectedPosts,
  fetchPosts,
  openModal,
  removePost,
  selectCurrentPage,
  selectCurrentPost,
  selectError,
  selectItemsPerPage,
  selectModalType,
  selectNewName,
  selectPaginatedPosts,
  selectSelectedPosts,
  selectSortConfig,
  selectSortedPosts,
  selectStatus,
  setCurrentPage,
  setNewName,
  setSearchQuery,
  setSelectedPosts,
  setSortConfig,
  updatePost,
} from '../store/postsSlice';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { ColumnConfig, DropdownListItem } from '../types/ui';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/data';

const columns: ColumnConfig<Post>[] = [
  { key: 'platform', label: '', width: '20px' },
  { key: 'name', label: 'Name', sortable: true, width: '150px' },
  { key: 'engaged', label: 'Engaged / Unique', width: '150px' },
  { key: 'acquired', label: 'Acquired', sortable: true, width: '150px' },
  { key: 'conversion', label: 'Conversion', sortable: true, width: '150px' },
];

const PostEngagementManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedPosts = useAppSelector(selectSelectedPosts);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const modalType = useAppSelector(selectModalType);
  const currentPost = useAppSelector(selectCurrentPost);
  const newName = useAppSelector(selectNewName);
  const paginatedPosts = useAppSelector(selectPaginatedPosts);
  const itemsPerPage = useAppSelector(selectItemsPerPage);
  const sortedPosts = useAppSelector(selectSortedPosts);
  const sortConfig = useAppSelector(selectSortConfig);
  const currentPage = useAppSelector(selectCurrentPage);

  const updateSelectedPosts = (newSelectedPosts: string[]) => {
    dispatch(setSelectedPosts(newSelectedPosts));
  };

  const updateSortConfig = (newSortConfig: { key: keyof Post; direction: 'ascending' | 'descending' } | null) => {
    dispatch(setSortConfig(newSortConfig));
  };

  const updateCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const updateSearchQuery = (searchQuery: string) => {
    dispatch(setSearchQuery(searchQuery));
  };

  const handleEdit = (post?: Post) => {
    if (post) {
      navigate(`/post-engagement/${post.key}`);
    }
  };

  const handleRename = (post?: Post) => {
    if (post) {
      dispatch(openModal({ modalType: 'rename', post }));
    }
  };

  const handleDelete = (post?: Post) => {
    if (post) {
      dispatch(openModal({ modalType: 'delete', post }));
    }
  };

  const menuItems: DropdownListItem<Post>[] = [
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'rename', label: 'Rename', onClick: handleRename },
    { key: 'delete', label: 'Delete', onClick: handleDelete },
  ];

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const confirmAction = () => {
    if (modalType === 'rename' && currentPost) {
      dispatch(updatePost({ ...currentPost, name: newName }));
    } else if (modalType === 'delete' && currentPost) {
      dispatch(removePost(currentPost.key));
    } else if (modalType === 'bulkDelete') {
      dispatch(deleteSelectedPosts());
    }
    dispatch(closeModal());
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleBulkDelete = () => {
    dispatch(openModal({ modalType: 'bulkDelete' }));
  };

  const bulkMenuItems: DropdownListItem[] = [{ key: 'delete', label: 'Delete', onClick: handleBulkDelete }];

  if (status === 'loading') {
    return (
      <NavbarLayout>
        <Loader />
      </NavbarLayout>
    );
  }

  if (status === 'failed') {
    return (
      <NavbarLayout>
        <ErrorMessage message={error ?? 'Something went wrong'} />
      </NavbarLayout>
    );
  }

  return (
    <NavbarLayout>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-9">
        <Sidebar />
        <div className="lg:col-span-7">
          <div className="px-6">
            <div className="mb-2 flex flex-row items-end gap-2">
              <div className="grow truncate">
                <h4 className="truncate text-xl">Post Engagements</h4>
              </div>
              <SearchField updateSearchQuery={updateSearchQuery} />
              <BulkActionsMenu bulkMenuItems={bulkMenuItems} />
            </div>
            <Table
              columns={columns}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              menuItems={menuItems}
              paginatedItems={paginatedPosts}
              selectedItems={selectedPosts}
              sortConfig={sortConfig}
              sortedItems={sortedPosts}
              updateCurrentPage={updateCurrentPage}
              updateSelectedItems={updateSelectedPosts}
              updateSortConfig={updateSortConfig}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalType !== null}
        onClose={closeModalHandler}
        onConfirm={confirmAction}
        title={
          modalType === 'rename'
            ? 'Please enter new name'
            : modalType === 'delete'
              ? 'Are you sure you want to delete this post?'
              : 'Are you sure you want to delete selected posts?'
        }
      >
        {modalType === 'rename' ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => dispatch(setNewName(e.target.value))}
            className="input input-bordered w-full"
            placeholder="Enter text here"
          />
        ) : (
          <p>
            {modalType === 'delete' ? `Deleting post: ${currentPost?.name}` : `Deleting ${selectedPosts.length} posts.`}
          </p>
        )}
      </Modal>
    </NavbarLayout>
  );
};

export default PostEngagementManager;
