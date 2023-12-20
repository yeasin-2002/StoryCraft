"use client";

import { Image as ImageOff, X } from "lucide-react";

import Image from "next/image";
import {
  ChangeEvent,
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  useState,
} from "react";

interface ImagePreviewerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  img: null | File;
  setImage: React.Dispatch<React.SetStateAction<null | File>>;
}

export const ImagePreviewer = ({
  img,
  setImage,
  ...rest
}: ImagePreviewerProps) => {
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);
  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const makeUrl = URL.createObjectURL(e?.currentTarget?.files![0]);
    setImage(e?.currentTarget?.files![0]);
    setPreviewUrl(makeUrl);
  };

  return (
    <div
      {...rest}
      className="input-round  w-full  flex items-center  justify-between"
    >
      <label
        htmlFor="img"
        className="flex items-center gap-x-2    cursor-pointer"
      >
        {!previewUrl ? (
          <Fragment>
            <ImageOff /> No File Selected
          </Fragment>
        ) : (
          <Fragment>
            <Image
              src={previewUrl}
              width={20}
              height={20}
              alt="ImagePreviewer"
              className="object-cover rounded-md "
            />
            <span>Change Image</span>
          </Fragment>
        )}
      </label>

      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        placeholder="chose an image"
        className=" hidden  outline-none rounded-lg px-2"
        onChange={imageHandler}
      />
      <div
        className="cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md p-1"
        onClick={() => setPreviewUrl(null)}
      >
        <X size={15} />
      </div>
    </div>
  );
};
