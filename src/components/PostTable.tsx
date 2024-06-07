import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';
import { useAppSelector } from '../store';
import { selectPaginatedPosts, selectItemsPerPage } from '../store/postsSlice';

const PostTable = () => {
  const paginatedPosts = useAppSelector(selectPaginatedPosts);
  const itemsPerPage = useAppSelector(selectItemsPerPage);

  return (
    <>
      <div className="overflow-y-hidden overflow-x-scroll">
        <table className="table table-sm bg-base-100 px-6">
          <TableHeader />
          <tbody>
            {paginatedPosts.map((post, index) => (
              <TableRow
                key={post.key}
                post={post}
                direction={index < itemsPerPage / 2 ? 'dropdown-end' : 'dropdown-top'}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={Math.ceil(paginatedPosts.length / itemsPerPage)} />
    </>
  );
};

export default PostTable;
