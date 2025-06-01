import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(function Input(
  {
    icon: Icon = null,
    label = '',
    type = 'text',
    classNames = '',
    placeHolder = '',
    errorMsg,
    ...props
  },
  ref
) {
  const inputId = useId();
  const [show, setShow] = useState(false);

  const togglePassword = () => {
    setShow((prev) => !prev);
  };

  const inputType = type === 'password' && show ? 'text' : type;

  return (
    <div className="my-2">
      {label && (
        <label className="label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <label htmlFor={inputId} className="input mt-1">
        {Icon && <Icon />}
        <input
          id={inputId}
          type={inputType}
          className={`${classNames}`}
          placeholder={placeHolder}
          ref={ref}
          {...props}
        />

        {type === 'password' && (
          <span onClick={togglePassword} className="cursor-pointer">
            {show ? <EyeOff /> : <Eye />}
          </span>
        )}
      </label>
      {errorMsg && <p className="text-red-600 my-1">{errorMsg}</p>}
    </div>
  );
});

export default Input;
