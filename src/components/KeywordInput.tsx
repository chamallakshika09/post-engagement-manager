import Badge from './Badge';
import ButtonedInput from './ButtonedInput';

const KeywordInput = ({
  label,
  placeholder,
  value,
  onChange,
  onAdd,
  tags,
  onRemove,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  tags: string[];
  onRemove: (kw: string) => void;
}) => {
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="mb-2.5">
        {tags.map((tag) => (
          <Badge key={tag} text={tag} onRemove={() => onRemove(tag)} />
        ))}
      </div>
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
