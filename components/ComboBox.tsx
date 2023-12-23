"use client";

import { CheckCircle } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";

interface ComboBoxProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const ComboBox = ({
  options,
  value,
  setValue,
  placeholder,
}: ComboBoxProps) => {
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger className="border border-gray-600  rounded-md px-2 py-3 min-w-40 ">
          {value ? value : placeholder ? placeholder : "Select"}
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="search..." />
            <CommandList className="bg-gray-50 text-gray-800">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((item) => {
                  return (
                    <CommandItem key={item.label + item.value}>
                      <div
                        className="py-2  px-4 cursor-pointer hover:bg-gray-100 w-full h-full flex items-center gap-x-2"
                        onClick={() => {
                          if (item.value === value) {
                            return setValue("");
                          }
                          return setValue(item.value);
                        }}
                      >
                        <p>{item.label}</p>
                        {item.value === value && (
                          <CheckCircle size={20} className="text-green-800" />
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};
