import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Header from '../../components/Header';

export default function KeywordPage() {
  const router = useRouter();

  console.log('router: ', router.query);

  return (
    <div>
      <Header />
      <div>
        <span className="font-bold">{router.query.keyword}</span> 검색 결과입니다.
      </div>
    </div>
  );
}
