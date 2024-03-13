"use client";
import React from "react";
import { useUsers } from "../context/UserContext";
import Image from "next/image";

const Squad = () => {
  const { users } = useUsers();

  return (
    <div className=" text-center font-bold text-gray-500">
      <h1 className="py-2 border-y border-gray-200 mb-4">SQUAD</h1>
      <div className="flex justify-between">
        {users.map((user) => (
          <Image
            key={user._id}
            src={user.avatarDataUri}
            width={60}
            height={60}
            quality={1}
            alt="user"
          />
        ))}
      </div>
    </div>
  );
};

export default Squad;
