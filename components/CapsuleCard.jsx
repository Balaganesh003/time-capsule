import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import Image from 'next/image';

const CapsuleCard = ({ isover }) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  console.log(currentDate);

  const [showImage, setShowImage] = useState(false);
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="flex flex-col max-w-fit min-w-[600px]  w-full border border-black rounded bg-white/50 backdrop-blur-md">
      <div className="flex gap-4 rounded-md  p-4 items-center justify-between capitalize text-lg font-semibold">
        <p className="truncate">Title of the capsule</p>
        {!isover && (
          <p className="text-sm bg-gray-500 text-white rounded-full p-2">
            5 days to go
          </p>
        )}

        {isover && (
          <Button onClick={() => setShowKey(!showKey)}>
            Add Your Decription Key
          </Button>
        )}
      </div>
      {showKey && (
        <div className="py-4 flex gap-8 items-center px-4 ">
          <Input />
          <Button onClick={() => setShowImage(!showImage)}>Submit</Button>
        </div>
      )}

      {/* Images */}
      {showImage && (
        <Card className="bg-transparent border-none p-4 mx-auto">
          <Image
            width={200}
            height={150}
            alt="image"
            src={
              'https://plus.unsplash.com/premium_photo-1661438211691-67f50b1a499f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
          />
        </Card>
      )}
    </div>
  );
};

export default CapsuleCard;
