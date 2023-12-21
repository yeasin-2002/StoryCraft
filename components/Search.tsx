import { Search as SearchIcon } from "lucide-react";
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";

interface SearchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelName: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const Search = ({
  labelName,
  value,
  setValue,
  ...rest
}: SearchProps) => {
  return (
    <div>
      <label
        htmlFor={labelName}
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          {...rest}
          type="search"
          id={labelName}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50     dark:text-white   "
        />
      </div>
    </div>
  );
};
