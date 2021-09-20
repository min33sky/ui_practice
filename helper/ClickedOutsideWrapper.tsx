import React, { Dispatch, MutableRefObject, useEffect, useRef } from 'react';

interface IClickedOutsideWrapper {
  children: React.ReactNode;
  onClickOutside: Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 해당 컴포넌트 외부 클릭을 감지하는 컴포넌트
 * @param onClickOutside 컴포넌트 외부를 클릭했을 때 호출 할 함수
 * @returns
 */
function ClickedOutsideWrapper({ onClickOutside, children }: IClickedOutsideWrapper) {
  const checkRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const checkHandler = (e: MouseEvent) => {
      if (checkRef.current && !checkRef.current.contains(e.target as Node)) {
        onClickOutside(false);
      }
    };

    document.addEventListener('mousedown', checkHandler);

    return () => {
      document.removeEventListener('mousedown', checkHandler);
    };
  }, [onClickOutside]);

  return <div ref={checkRef}>{children}</div>;
}

export default ClickedOutsideWrapper;
