import React, { useState } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import SearchBar from './SearchBar';
import { useRouter } from 'next/dist/client/router';
import ClickedOutsideWrapper from '../helper/ClickedOutsideWrapper';

const menuItems = ['메뉴1', '메뉴2', '로그인', '회원가입'];

function Header() {
  const router = useRouter();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-8 py-4 border-b shadow-md bg-white mx-auto ">
      <div className="grid grid-cols-[15%,75%,10%] md:grid-cols-[20%,50%,30%] gap-2">
        <div className="flex flex-shrink-0">
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
        <div className="relative flex items-center justify-end ">
          <ClickedOutsideWrapper onClickOutside={setIsDropdownOpened}>
            <div className="flex items-center">
              <MenuIcon
                onClick={() => setIsDropdownOpened((prev) => !prev)}
                className="h-10 cursor-pointer md:hidden"
              />
              <div className="hidden md:flex space-x-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {isDropdownOpened && (
              <ul className="absolute right-0 mt-2 bg-gray-100 w-48 divide-y-2">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="px-2 py-4 hover:bg-gray-200 select-none cursor-pointer"
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
