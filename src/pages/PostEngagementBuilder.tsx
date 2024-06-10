import NavbarLayout from '../layouts/NavbarLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import TabList from '../components/TabList';
import SelectPost from '../components/SelectPost';
import PostIdUrl from '../components/PostIdUrl';
import Settings from '../components/Settings';
import AutoResponse from '../components/AutoResponse';
import Notification from '../components/Notification'; // Import the Notification component
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchPost,
  selectCurrentPost,
  selectFetchPostError,
  selectFetchPostStatus,
  selectUpdatePostStatus,
  selectUpdatePostError,
  updatePost,
} from '../store/postsSlice';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostNotFound from '../components/PostNotFound';
import { Post } from '../types/data';

const PostEngagementBuilder = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const fetchStatus = useAppSelector(selectFetchPostStatus);
  const fetchError = useAppSelector(selectFetchPostError);
  const currentPost = useAppSelector(selectCurrentPost);
  const updateStatus = useAppSelector(selectUpdatePostStatus);
  const updateError = useAppSelector(selectUpdatePostError);

  const [localPost, setLocalPost] = useState<Post | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (fetchStatus === 'idle' && params.id) {
      dispatch(fetchPost(params.id));
    }
  }, [fetchStatus, dispatch, params.id]);

  useEffect(() => {
    if (currentPost) {
      setLocalPost(currentPost);
    }
  }, [currentPost]);

  useEffect(() => {
    if (updateStatus === 'succeeded') {
      setNotification({ message: 'Post updated successfully!', type: 'success' });
    } else if (updateStatus === 'failed') {
      setNotification({ message: updateError ?? 'Failed to update post', type: 'error' });
    }
  }, [updateStatus, updateError]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSave = () => {
    if (localPost) {
      dispatch(updatePost(localPost));
    }
  };

  const handleGrabPost = () => {
    setNotification({ message: 'Not Implemented', type: 'error' });
  };

  if (fetchStatus === 'loading') {
    return (
      <NavbarLayout>
        <Loader />
      </NavbarLayout>
    );
  }

  if (fetchStatus === 'failed') {
    return (
      <NavbarLayout>
        <ErrorMessage message={fetchError ?? 'Something went wrong'} />
      </NavbarLayout>
    );
  }

  if (!localPost) {
    return <PostNotFound />;
  }

  return (
    <NavbarLayout>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <Breadcrumbs onSave={handleSave} />
      <div className="mx-6">
        <div aria-label="Card" className="card bg-base-100 p-0 shadow-sm card-bordered">
          <div className="card-body gap-0 p-0">
            <div className="card-title"></div>
            <div className="flex flex-row">
              <TabList
                tabs={[
                  { label: 'Settings', content: <Settings post={localPost} updatePost={setLocalPost} /> },
                  { label: 'Auto Response', content: <AutoResponse post={localPost} updatePost={setLocalPost} /> },
                ]}
                className="basis-2/5"
                tabListClassName="tabs child:!border-b child:!text-sm tabs-bordered tabs-lg"
              />
              <TabList
                tabs={[
                  { label: 'Select A Post', content: <SelectPost /> },
                  { label: 'Post ID / URL', content: <PostIdUrl handleGrabPost={handleGrabPost} /> },
                ]}
                className="basis-3/5"
                tabListClassName="tabs h-12 bg-base-100 p-0 child:!rounded-none rounded-b-none border-b border-b-base-300 tabs-boxed tabs-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default PostEngagementBuilder;
