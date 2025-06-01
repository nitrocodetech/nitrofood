"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import backup from "@/assets/backup.png";

interface FileUploadAreaProps {
  title?: string;
  maxSizeMB?: number;
  onDrop?: (acceptedFiles: File[]) => void;
}

export default function FileUploadArea({
  title = "Cover Photo",
  maxSizeMB = 10,
  onDrop,
}: FileUploadAreaProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        if (onDrop) {
          onDrop(acceptedFiles);
        }
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxSize: maxSizeMB * 1024 * 1024,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="flex flex-col space-y-2 w-full">
      <h2 className="text-sm font-medium">{title}</h2>

      {!previewUrl ? (
        <div
          {...getRootProps()}
          className="w-full max-w-lg h-[150px] border-2 border-dashed border-gray-400 rounded-lg flex flex-col gap-4 justify-center items-center cursor-pointer bg-white"
        >
          <input {...getInputProps()} />
          <Image src={backup} alt="backup" />
          <div className="flex flex-col items-center">
            <p className="text-md font-display">
              Drag your file(s) or{" "}
              <span className="text-blue-600 font-semibold">browse</span>
            </p>
            <p className="text-gray-500 text-sm font-display">
              Max {maxSizeMB} MB files are allowed
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg h-[150px]">
          <Image
            src={previewUrl}
            alt="Preview"
            width={400}
            height={400}
            className="rounded-lg object-cover h-full"
          />
        </div>
      )}
    </div>
  );
}
