import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

const searchItems = ['따효니', '한동숙', '풍월량', '침착맨'];

function SearchBar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [cursor, setCursor] = useState(-1);
  const searchBarRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        if (cursor < searchItems.length - 1) {
          setCursor((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowUp') {
        if (cursor > 0) {
          setCursor((prev) => prev - 1);
        }
      } else if (e.key === 'Enter') {
        if (!keyword || !keyword.trim()) return;

        setShow(false);
        router.push(`/keyword/${keyword}`);
      }
    },
    [cursor, keyword, router]
  );

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  useEffect(() => {
    if (keyword) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [keyword]);

  useEffect(() => {
    if (cursor > -1) setKeyword(searchItems[cursor]);
  }, [cursor]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (show && searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [show]);

  return (
    <div ref={searchBarRef} className="bg-indigo-400 relative">
      <div className="flex items-center p-1">
        <input
          type="text"
          placeholder="Search Keyword"
          onKeyDown={handleKey}
          value={keyword}
          onChange={handleInput}
          className="flex flex-grow outline-none p-2"
        />
        <SearchIcon className="h-10 w-10 p-2 rounded-lg ml-1 bg-indigo-400 text-white cursor-pointer" />
      </div>

      {/* 검색어 목록 */}
      <div>
        {show && (
          <ul className="absolute bg-gray-100 flex flex-col w-full divide-y-2">
            {searchItems.map((item, index) => (
              <li
                key={index}
                className={`text-lg p-2 font-bold hover:bg-gray-200  ${
                  cursor === index && 'bg-gray-200'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
