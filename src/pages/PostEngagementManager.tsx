import { useEffect } from 'react';
import BulkActionsMenu from '../components/BulkActionsMenu';
import SearchField from '../components/SearchField';
import Sidebar from '../components/Sidebar';
import PostTable from '../components/PostTable';
import Modal from '../components/Modal';
import NavbarLayout from '../layouts/NavbarLayout';
import { useAppDispatch, useAppSelector } from '../store';
import {
  closeModal,
  deleteSelectedPosts,
  fetchPosts,
  removePost,
  selectCurrentPost,
  selectError,
  selectModalType,
  selectNewName,
  selectSelectedPosts,
  selectStatus,
  setNewName,
  updatePost,
} from '../store/postsSlice';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const PostEngagementManager = () => {
  const dispatch = useAppDispatch();

  const selectedPosts = useAppSelector(selectSelectedPosts);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const modalType = useAppSelector(selectModalType);
  const currentPost = useAppSelector(selectCurrentPost);
  const newName = useAppSelector(selectNewName);

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
            <BulkActionsMenu />
          </div>
          <PostTable />
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
