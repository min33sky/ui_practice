import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useDarkMode from '../hooks/useDarkMode';

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [show, setShow] = useState(false);
  // useDarkMode();

  useEffect(() => {
    let clearClicked: any;
    let clearShow: any;

    if (show) {
      clearClicked = setTimeout(() => {
        setIsClicked(true);
      }, 2000);
    }

    clearShow = setTimeout(() => {
      if (show) {
        setShow(false);
      }
    }, 3000);

    return () => {
      clearTimeout(clearClicked);
      clearTimeout(clearShow);
    };
  }, [show]);

  return (
    <div className="min-h-screen dark:bg-black">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container p-2 mx-auto ">
        <p className="mb-4 text-lg font-extrabold uppercase dark:text-white">Floating Input</p>

        <form className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type="text"
              id="email"
              placeholder="email"
              className="w-full p-4 text-lg placeholder-transparent border border-indigo-400 rounded-md outline-none peer"
            />
            <label
              htmlFor="email"
              className="absolute transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] top-[-10px] left-2 px-2 text-indigo-400 text-sm bg-white peer-focus:text-sm peer-focus:text-indigo-400 peer-focus:rounded-full "
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full p-4 text-lg placeholder-transparent border border-indigo-400 rounded-md outline-none peer"
            />
            <label
              htmlFor="password"
              className="absolute transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] top-[-10px] left-2 px-2 text-indigo-400 text-sm bg-white peer-focus:text-sm peer-focus:text-indigo-400 peer-focus:rounded-full "
            >
              Password
            </label>
          </div>
        </form>

        <p className="mb-4 text-lg font-extrabold uppercase dark:text-white">TEST</p>

        <div>
          <button
            onClick={() => setShow(true)}
            className="px-4 py-2 text-white bg-indigo-400 rounded-lg"
          >
            테스트에다요
          </button>
          {show && (
            <div
              onClick={() => {
                setIsClicked((prev) => !prev);
              }}
              className={`absolute top-[90%] right-12 sm:top-32 sm:right-0 bg-red-300 w-96 transition duration-500 ease-in-out ${
                isClicked && 'translate-y-10 sm:translate-x-96 sm:translate-y-0 opacity-0'
              }`}
            >
              <p>Hello Tailwind</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
