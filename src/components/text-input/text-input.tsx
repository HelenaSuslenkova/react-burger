import { useRef, FC } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

type TextInputProps = {
  placeholder: string,
  icon: any;
  name: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  value: string;
}
export const TextInput: FC<TextInputProps> = ({ placeholder, icon, name, value, onChange}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    inputRef.current!.focus()
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
