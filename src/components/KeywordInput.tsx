import ButtonedInput from './ButtonedInput';

const KeywordInput = ({
  label,
  placeholder,
  value,
  onChange,
  onAdd,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}) => {
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="mb-2.5"></div>
      <div className="join">
        <ButtonedInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onAdd}
          buttonText="Add Keyword"
          widthClass="w-full"
        />
      </div>
    </div>
  );
};

export default KeywordInput;
