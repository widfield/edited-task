import "./Checkbox.css";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  return (
    <div className="checkboxWrapper">
      <input
        type="checkbox"
        className="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
