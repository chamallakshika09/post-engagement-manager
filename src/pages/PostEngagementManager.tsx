import { useEffect, useState } from 'react';
import BulkActionsMenu from '../components/BulkActionsMenu';
import SearchField from '../components/SearchField';
import Sidebar from '../components/Sidebar';
import PostTable from '../components/PostTable';
import Modal from '../components/Modal';
import NavbarLayout from '../layouts/NavbarLayout';
import { useAppDispatch } from '../store';
import { deleteSelectedPosts, fetchPosts, selectError, selectSelectedPosts, selectStatus } from '../store/postsSlice';
import { useSelector } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const PostEngagementManager = () => {
  const dispatch = useAppDispatch();

  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const selectedPosts = useSelector(selectSelectedPosts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const handleBulkDelete = () => {
    dispatch(deleteSelectedPosts());
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

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
      <Sidebar />
      <div className="lg:col-span-7">
        <div className="px-6">
          <div className="mb-2 flex flex-row items-end gap-2">
            <div className="grow truncate">
              <h4 className="truncate text-xl">Post Engagements</h4>
            </div>
            <SearchField />
            <BulkActionsMenu onBulkDelete={openBulkDeleteModal} />
          </div>
          <PostTable />
        </div>
      </div>

      <Modal
        isOpen={isBulkDeleteModalOpen}
        onClose={closeBulkDeleteModal}
        onConfirm={handleBulkDelete}
        title="Are you sure you want to delete selected posts?"
      >
        <p>Deleting {selectedPosts.size} posts.</p>
      </Modal>
    </NavbarLayout>
  );
};

export default PostEngagementManager;
