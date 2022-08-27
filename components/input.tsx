import type { UseFormRegisterReturn } from "react-hook-form";
import { cls } from "@libs/client/utils";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone";
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
  placeholder?: string;
  color?: string;
}

export default function Input({
  color = "blue",
  label,
  name,
  kind = "text",
  register,
  type,
  required,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            placeholder={placeholder}
            required={required}
            {...register}
            type={type}
            className={cls(
              "appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none",
              color === "blue"
                ? "focus:ring-blue-500 focus:border-blue-500"
                : "focus:ring-[#96c0a9] focus:border-[#96c0a9]"
            )}
          />
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            placeholder={placeholder}
            id={name}
            required={required}
            {...register}
            type={type}
            className={cls(
              "appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none",
              color === "blue"
                ? "focus:ring-blue-500 focus:border-blue-500"
                : "focus:ring-[#96c0a9] focus:border-[#96c0a9]"
            )}
          />
        </div>
      ) : null}
    </div>
  );
}
