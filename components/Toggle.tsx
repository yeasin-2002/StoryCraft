"use client";

import { cn } from "@/utils";
import { DetailedHTMLProps, Dispatch, InputHTMLAttributes } from "react";

interface ToggleProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  toggleValue: boolean;
  setToggleValue: Dispatch<React.SetStateAction<boolean>>;
  text?: string;
  labelClassName?: string;
  className?: string;
}

export const Toggle = ({
  toggleValue = false,
  setToggleValue,
  text,
  labelClassName,
  className,
  ...rest
}: ToggleProps) => {
  return (
    <label
      className={cn(
        "relative inline-flex items-center cursor-pointer",
        labelClassName
      )}
    >
      <input
        type="checkbox"
        className={cn("sr-only peer", className)}
        defaultChecked={toggleValue}
        {...rest}
        onChange={(e) => {
          setToggleValue(e.target.checked);
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
      {text && (
        <span className="ms-3 text-sm font-medium text-gray-900 ">{text}</span>
      )}
    </label>
  );
};
