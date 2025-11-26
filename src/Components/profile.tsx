"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Profile(){
    const { data:session, status } = useSession();

    const [isOpen, setIsOpen] = useState(false);

    if (status == "loading") return <p>Loading</p>;
    if (!session) return <p>Not signed in</p>;

    console.log(session);
    return (
        <>
    <div className="relative inline-block text-left">
      {/* Avatar button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={"https://cdn-icons-png.flaticon.com/512/8318/8318047.png"}
            alt="Profile avatar"
            fill
            className="object-cover"
          />
        </div>
        
        <span className="hidden md:block font-medium text-gray-700">
          {session.user?.name}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg black-border focus:outline-none z-50">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
          </div>
          <div className="border-t border-gray-200"></div>
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                Sign Out
            </button>
        </div>
      )}
    </div>
        {/* <div>
            <Image src="https://cdn-icons-png.flaticon.com/512/8318/8318047.png" alt="Profile avatar" width={25} height={25} />
            <p>{session.user?.name}</p>
        </div> */}
        {/* <p>Name: {session.user?.name}</p>
        <p>Email: {session.user?.email}</p> */}
        </>
    );
}