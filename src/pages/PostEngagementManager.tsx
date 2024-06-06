import { useState } from 'react';
import BulkActionsMenu from '../components/BulkActionsMenu';
import Pagination from '../components/Pagination';
import SearchField from '../components/SearchField';
import Sidebar from '../components/Sidebar';
import TableHeader from '../components/TableHeader';
import TableRow from '../components/TableRow';
import { posts as initialPosts } from '../data/posts';
import NavbarLayout from '../layouts/NavbarLayout';

const itemsPerPage = 10;

const PostEngagementManager = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter((post) => post.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRename = (key: string, newName: string) => {
    setPosts(posts.map((post) => (post.key === key ? { ...post, name: newName } : post)));
  };

  const handleDelete = (key: string) => {
    setPosts(posts.filter((post) => post.key !== key));
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
                  <BulkActionsMenu />
                </div>
                <div className="overflow-y-hidden overflow-x-scroll">
                  <table className="table table-sm bg-base-100 px-6">
                    <TableHeader />
                    <tbody>
                      {paginatedPosts.map((post) => (
                        <TableRow key={post.key} post={post} onRename={handleRename} onDelete={handleDelete} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default PostEngagementManager;
