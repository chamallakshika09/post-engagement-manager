const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ width: '20px' }}>
          <div className="px-1">
            <input type="checkbox" className="checkbox checkbox-sm" />
          </div>
        </th>
        <th style={{ width: '20px' }}>
          <div className="px-1"></div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="cursor-pointer select-none">Name</div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="px-1">Engaged / Unique</div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="px-1">Acquired</div>
        </th>
        <th style={{ width: '150px' }}>
          <div className="px-1">Conversion</div>
        </th>
        <th style={{ width: '20px' }}>
          <div className="px-1">Action</div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
