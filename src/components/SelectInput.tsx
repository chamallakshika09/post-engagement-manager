const SelectInput = ({
  label,
  value,
  options,
  onChange,
  disabledOption,
  additionalClasses,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabledOption?: { value: string; label: string };
  additionalClasses?: string;
}) => {
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="form-control">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck="true"
          autoComplete="on"
          className={`select select-bordered ${additionalClasses}`}
        >
          {disabledOption && (
            <option value={disabledOption.value} disabled>
              {disabledOption.label}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
