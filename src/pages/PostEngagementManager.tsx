import { useState } from 'react';
import BulkActionsMenu from '../components/BulkActionsMenu';
import SearchField from '../components/SearchField';
import Sidebar from '../components/Sidebar';
import PostTable from '../components/PostTable';
import Modal from '../components/Modal';
import { posts as initialPosts } from '../data/posts';
import NavbarLayout from '../layouts/NavbarLayout';
import { Post } from '../types/data';

const PostEngagementManager = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRename = (key: string, newName: string) => {
    setPosts(posts.map((post) => (post.key === key ? { ...post, name: newName } : post)));
  };

  const handleDelete = (key: string) => {
    setPosts(posts.filter((post) => post.key !== key));
  };

  const handleBulkDelete = () => {
    setPosts(posts.filter((post) => !selectedPosts.has(post.key)));
    setSelectedPosts(new Set());
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };

  return (
    <NavbarLayout>
      <div className="drawer-content">
        <div className="pt-24">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-9">
            <Sidebar />
            <div className="lg:col-span-7">
              <div className="px-6">
                <div className="mb-2 flex flex-row items-end gap-2">
                  <div className="grow truncate">
                    <h4 className="truncate text-xl">Post Engagements</h4>
                  </div>
                  <SearchField onSearch={handleSearch} />
                  <BulkActionsMenu onBulkDelete={openBulkDeleteModal} />
                </div>
                <PostTable
                  posts={posts}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  searchQuery={searchQuery}
                  selectedPosts={selectedPosts}
                  setSelectedPosts={setSelectedPosts}
                />
              </div>
            </div>
          </div>
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
