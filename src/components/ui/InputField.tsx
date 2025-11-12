import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  type: string;
  large?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  type,
  large,
  onChange,
}) => {
  const inputClasses = `
    w-full
    px-4
    py-3
    bg-white/10
    backdrop-blur-sm
    border
    border-white/20
    rounded-xl
    text-white
    placeholder-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    focus:border-blue-400
    shadow-lg
    transition-all
    duration-200
    hover:bg-white/15
    hover:shadow-xl
    ${large ? 'h-32 resize-none' : 'h-12'}
  `;

  return (
    <div className="mb-6">
      <label className="block text-white text-sm font-semibold mb-3">
        {label}
      </label>
      {large ? (
        <textarea
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={inputClasses}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
