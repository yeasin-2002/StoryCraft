import { Image as ImageIcon, ImageOff } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
} from "react";

interface ImagePreviewerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  img: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ImagePreviewer = ({
  img,
  setImage,
  ...rest
}: ImagePreviewerProps) => {
  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const makeUrl = URL.createObjectURL(e?.currentTarget?.files![0]);
    setImage(makeUrl);
  };

  return (
    <div {...rest}>
      <label
        htmlFor="img"
        className="input-round  w-full  flex items-center gap-x-2 cursor-pointer"
      >
        {!img ? (
          <Fragment>
            <ImageOff /> No File Selected
          </Fragment>
        ) : (
          <Fragment>
            <ImageIcon /> 1 File selected
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
    </div>
  );
};
