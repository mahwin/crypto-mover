import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  ref?: { current: string | undefined };
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ref = undefined,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...ref}
        id={name}
        {...register}
        className="mt-1 p-1 shadow-sm w-full focus:ring-blue-500 rounded-md border-gray-300 focus:border-blue-500 "
        rows={10}
        {...rest}
      />
    </div>
  );
}
