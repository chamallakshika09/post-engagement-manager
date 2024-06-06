const DownArrowIcon = ({ direction = 'descending' }: { direction?: 'ascending' | 'descending' }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={`h-4 w-4 transform ${direction === 'ascending' ? 'rotate-180' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m11.998 17 7-8h-14z"></path>
    </svg>
  );
};

export default DownArrowIcon;
