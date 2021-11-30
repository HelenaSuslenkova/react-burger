import { useRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const TextInput = ({ placeholder, icon, name, value, onChange}) => {
  const inputRef = useRef(null);

  const handleClick =() => {
    inputRef.current.focus()
  };

  return(
    <Input
      type={'text'}
      placeholder={placeholder}
      onChange={onChange}
      icon={icon}
      value={value}
      name={name}
      ref={inputRef}
      onIconClick={handleClick}
    />
  );
};

export default TextInput;
