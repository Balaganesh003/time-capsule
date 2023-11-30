import React from 'react';
import DragDropLogo from '@/assets/DragDrop.svg';
import Image from 'next/image';
import { AiFillFile } from 'react-icons/ai';

const DragDrop = ({ handleFileSelect, document }) => {
  return (
    <div className=" w-full h-full  text-center rounded cursor-pointer relative">
      {!document ? (
        <>
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
            <p className="text-gray-text text-[0.875rem] leading-[130%] flex items-center">
              <span className="mr-1">
                <Image
                  src={DragDropLogo}
                  alt="Drag and drop"
                  className="h-[0.875rem] w-fit"
                />
              </span>{' '}
              Drag and drop your resume or
              <span className="text-link font-semibold ml-1 cursor-pointer">
                browse
              </span>
            </p>
          </div>
          <input
            type="file"
            id="resumeInput"
            className="w-full h-full  absolute top-0 left-0 cursor-pointer opacity-0"
            onChange={handleFileSelect}
          />
        </>
      ) : (
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <AiFillFile className="text-[#222] text-[3rem] mx-auto" />
            <div className="text-[0.875rem] leading-[130%] text-gray-text mt-4">
              File Uploaded Successfully
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
