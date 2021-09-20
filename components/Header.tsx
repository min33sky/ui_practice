import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import SearchBar from './SearchBar';
import { useRouter } from 'next/dist/client/router';

function Header() {
  const router = useRouter();

  return (
    <header className="grid grid-cols-[20%,60%,20%] gap-1 z-50 p-4 border-b shadow-md bg-white sticky top-0">
      <div className="flex">
        <div className="flex items-center">
          <p
            onClick={() => router.push('/')}
            className="cursor-pointer tracking-wider text-xl font-bold"
          >
            LOGO
          </p>
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="flex justify-end">
        <div className="flex items-center">
          <p className="cursor-pointer">Menu</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
