import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useEffect, useState } from 'react';
import ClickedOutsideWrapper from '../helper/ClickedOutsideWrapper';

const searchItems = ['따효니', '한동숙', '풍월량', '침착맨'];

/**
 * 검색 바
 * @returns
 */
function SearchBar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [cursor, setCursor] = useState(-1);

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

  const handleMouseEnter = useCallback((cursor: number) => {
    setCursor(cursor);
  }, []);

  //* 검색어 클릭
  const handleKeywordClick = useCallback(
    (item: any) => {
      router.push(`/keyword/${item}`);
    },
    [router]
  );

  //* 검색 버튼 클릭
  const handleSearch = useCallback(() => {
    if (!keyword || !keyword.trim()) return;
    router.push(`/keyword/${keyword}`);
    setShow(false);
  }, [keyword, router]);

  useEffect(() => {
    //? 키워드가 있을 때만 검색어 목록을 보여준다.
    if (keyword) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [keyword]);

  useEffect(() => {
    //? 키보드 커서 위치에 해당하는 키워드로 변경한다.
    if (cursor > -1) setKeyword(searchItems[cursor]);
  }, [cursor]);

  return (
    <ClickedOutsideWrapper onClickOutside={setShow}>
      <div className="bg-indigo-400 relative">
        <div className="flex items-center p-1">
          <input
            type="text"
            placeholder="Search Keyword"
            onKeyDown={handleKey}
            value={keyword}
            onChange={handleInput}
            className="flex flex-grow outline-none p-2 rounded-sm "
          />
          <SearchIcon
            onClick={handleSearch}
            className="h-10 w-10 p-2 rounded-lg ml-1 bg-indigo-400 text-white cursor-pointer"
          />
        </div>

        {/* 검색어 목록 */}
        <div>
          {show && (
            <ul className="absolute bg-gray-100 flex flex-col w-full divide-y-2">
              {searchItems.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={() => handleKeywordClick(item)}
                  className={` flex items-center text-lg p-2 font-semibold hover:bg-gray-200  ${
                    cursor === index && 'bg-gray-200'
                  }`}
                >
                  <SearchIcon className="h-4 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ClickedOutsideWrapper>
  );
}

export default SearchBar;
