"use client";
import React from "react";
import { useUsers } from "../context/UserContext";
import Image from "next/image";

const Squad = () => {
  const { users } = useUsers();

  return (
    <div className=" text-center font-bold text-gray-500 ">
      <h1 className="py-2 border-b border-border mb-4">SQUAD</h1>
      {/* border-gray-200 */}
      <div className="flex justify-between px-2">
        {users.map((user) => (
          <div className="border border-gray-500 rounded-lg"  key={user._id}>
          <Image
            src={user.avatarDataUri}
            width={60}
            height={60}
            quality={1}
            alt="user"
          />
          <div className="text-text py-1 rounded-lg text-xs font-normal">
            <h1>{user.username}</h1>
          </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default Squad;
