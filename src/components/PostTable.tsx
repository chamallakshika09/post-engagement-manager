import { useMemo, useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';
import { Post } from '../types/data';

const itemsPerPage = 10;

const PostTable = ({
  posts,
  onRename,
  onDelete,
  searchQuery,
}: {
  posts: Post[];
  onRename: (key: string, newName: string) => void;
  onDelete: (key: string) => void;
  searchQuery: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Post; direction: 'ascending' | 'descending' } | null>(null);

  const sortedPosts = useMemo(() => {
    const sortablePosts = [...posts];
    if (sortConfig !== null) {
      sortablePosts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePosts;
  }, [posts, sortConfig]);

  const filteredPosts = sortedPosts.filter((post) => post.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (key: keyof Post) => {
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        setSortConfig({ key, direction: 'descending' });
      } else if (sortConfig.direction === 'descending') {
        setSortConfig(null);
      } else {
        setSortConfig({ key, direction: 'ascending' });
      }
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="overflow-y-hidden overflow-x-scroll">
        <table className="table table-sm bg-base-100 px-6">
          <TableHeader onSort={handleSort} sortConfig={sortConfig} />
          <tbody>
            {paginatedPosts.map((post, index) => (
              <TableRow
                key={post.key}
                post={post}
                onRename={onRename}
                onDelete={onDelete}
                direction={index < itemsPerPage / 2 ? 'dropdown-end' : 'dropdown-top'}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PostTable;
