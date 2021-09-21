import React, { useState } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import SearchBar from './SearchBar';
import { useRouter } from 'next/dist/client/router';
import ClickedOutsideWrapper from '../helper/ClickedOutsideWrapper';
import DarkModeToggle from './DarkModeToggle';

const menuItems = ['메뉴1', '메뉴2', '로그인', '회원가입'];

function Header() {
  const router = useRouter();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-8 py-4 mx-auto bg-white border-b shadow-md dark:text-gray-200 dark:bg-gray-900 dark:border-black ">
      <div className="grid grid-cols-[15%,65%,20%] md:grid-cols-[20%,50%,30%] gap-2">
        <div className="flex flex-shrink-0">
          <div className="flex items-center">
            <p
              onClick={() => router.push('/')}
              className="text-xl font-bold tracking-wider cursor-pointer"
            >
              LOGO
            </p>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className="relative flex items-center justify-end">
          <DarkModeToggle />

          <ClickedOutsideWrapper onClickOutside={setIsDropdownOpened}>
            <div className="flex items-center">
              <MenuIcon
                onClick={() => setIsDropdownOpened((prev) => !prev)}
                className="h-10 cursor-pointer md:hidden"
              />
              <div className="hidden space-x-4 md:flex">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs transition duration-200 ease-out cursor-pointer select-none lg:text-sm hover:text-indigo-400"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {isDropdownOpened && (
              <ul className="absolute right-0 w-48 mt-2 bg-gray-100 divide-y-2">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="px-2 py-4 cursor-pointer select-none hover:bg-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </ClickedOutsideWrapper>
        </div>
      </div>
    </header>
  );
}

export default Header;
