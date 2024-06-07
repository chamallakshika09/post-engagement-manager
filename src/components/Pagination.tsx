import { ChangeEvent } from 'react';
import GoToFirstIcon from '../assets/icons/GoToFirst.icon';
import GoToLastIcon from '../assets/icons/GoToLast.icon';
import NextIcon from '../assets/icons/Next.icon';
import PreviousIcon from '../assets/icons/Previous.icon';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCurrentPage, setCurrentPage } from '../store/postsSlice';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectCurrentPage);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleClickFirst = () => {
    dispatch(setCurrentPage(1));
  };

  const handleClickLast = () => {
    dispatch(setCurrentPage(totalPages));
  };

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= totalPages) {
      dispatch(setCurrentPage(value));
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-3.5">
      <button className="btn btn-circle btn-primary btn-sm" disabled={currentPage === 1} onClick={handleClickFirst}>
        <GoToFirstIcon />
      </button>
      <button className="btn btn-circle btn-primary btn-sm" disabled={currentPage === 1} onClick={handleClickPrevious}>
        <PreviousIcon />
      </button>
      <button
        className="btn btn-circle btn-primary btn-sm"
        disabled={currentPage === totalPages}
        onClick={handleClickNext}
      >
        <NextIcon />
      </button>
      <button
        className="btn btn-circle btn-primary btn-sm"
        disabled={currentPage === totalPages}
        onClick={handleClickLast}
      >
        <GoToLastIcon />
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {`${currentPage}`} of {`${totalPages}`}
        </strong>
      </span>
      <span className="hidden items-center gap-1 md:flex">
        Go to page:{' '}
        <input
          type="number"
          className="input w-16 p-1 input-sm input-bordered focus:outline-offset-0"
          value={currentPage}
          onChange={handlePageChange}
          min={1}
          max={totalPages}
        />
      </span>
    </div>
  );
};

export default Pagination;
