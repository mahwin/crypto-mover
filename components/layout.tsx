import React from "react";
import Link from "next/link";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";

const noUserid = false;

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}
export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  // "bg-white items-center py-3 max-w-2xl text-lg font-medium text-gray-800 border-b fixed w-full"
  return (
    <div className="relative w-full">
      <div
        className={cls(
          !canGoBack ? "justify-center" : "",
          "flex bg-white py-3 fixed w-full border-b"
        )}
      >
        {canGoBack ? (
          <button onClick={onClick}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
        {title ? (
          <div className="flex flex-1 text-lg max-w-2xl ml-3  ">{title}</div>
        ) : null}

        {!noUserid ? (
          <div className="flex text-gray-700 text-sm justify-evenly space-x-10  items-center mr-3">
            <Link href={`/signIn`}>
              <a className="hover:border-b-2 hover:border-blue-500 hover:font-bold">
                로그인
              </a>
            </Link>
            <Link href={`/signIn`}>
              <a className="hover:border-b-2 hover:border-blue-500 hover:font-bold">
                회원가입
              </a>
            </Link>
          </div>
        ) : null}
      </div>

      <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="bg-white max-w-2xl fixed text-gray-700 border-t bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
          <Link href="/">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>홈</span>
            </a>
          </Link>
          <Link href="/community">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                ></path>
              </svg>
              <span>채팅</span>
            </a>
          </Link>
          <Link href="/chats">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>채팅</span>
            </a>
          </Link>

          <Link href="/profile">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span>내 정보</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
