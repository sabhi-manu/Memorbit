
import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";

const ImageSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previeUrl, setPrevieUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (typeof image === "string") {
      // Image coming from backend
      setPrevieUrl(image);
    } else if (image instanceof File) {
      // New image selected from computer
      const url = URL.createObjectURL(image);
      setPrevieUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPrevieUrl(null);
    }
  }, [image]);

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {previeUrl ? (
        <div className="w-full relative">
          <img
            src={previeUrl}
            alt="selected"
            className="w-full h-[300px] object-cover rounded-lg"
          />

          <button
            type="button"
            onClick={onChooseFile}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg border border-slate-300"
          >
            Change Image
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="w-full h-[220px] flex flex-col justify-center items-center gap-4 bg-slate-50 rounded border border-slate-300"
          onClick={onChooseFile}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-100 rounded-full border border-cyan-200">
            <FaRegFileImage className="text-xl text-sky-400" />
          </div>

          <p>Browse image files to upload</p>
        </button>
      )}
    </div>
  );
};

export default ImageSelector;
