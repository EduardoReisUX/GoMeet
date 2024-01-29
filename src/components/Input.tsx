import { ForwardRefRenderFunction, forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { placeholder, type, ...rest },
  ref
) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className="px-3 py-2 bg-gray-950 rounded-md h-full w-full"
      />
    </div>
  );
};

export const Input = forwardRef(InputBase);
