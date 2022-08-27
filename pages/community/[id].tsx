import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Fragment } from "react";
import { cls } from "@libs/client/utils";
import FloatingButton from "@components/floating-button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import bts from "../../public/bts.jpeg";
import bp from "../../public/bp.jpeg";

interface PostData {
  id: number;
  title: string;
  user: string;
  date: string;
  view: string;
  liked?: string;
  content?: string;
  imageUrl?: string;
}

const CommunityPost: NextPage = () => {
  const [data, SetData] = useState<PostData | null>(null);
  const { user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    const target = articles.filter(
      (article) => article.id + "" === router.query.id
    );
    SetData(target[0]);
  }, [router]);
  return (
    <Layout
      title="Community"
      canGoBack={true}
      hasTabBar={true}
      seoTitle="커뮤니티"
    >
      <FloatingButton href={"/community/write"}>
        <FloatingButton href={"none"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </FloatingButton>
      </FloatingButton>
      {data ? (
        <>
          <header className="h-full">
            <Link href={router.asPath}>
              <a className="mt-3 mb-1 hover:text-blue-500 hover:underline hover:underline-offset-1 inline-block cursor-pointer">
                {data.title}
              </a>
            </Link>
            <div className="space-x-2 flex">
              <span className="text-xs text-gray-500 ">
                {data.user}
                {" l"}
              </span>
              <span className="text-xs text-gray-500 ">
                {data.date}
                {" l"}
              </span>
              <span className="text-xs text-gray-500 ">
                조회 {data.view}
                {" l"}
              </span>

              <span className="text-xs text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 1.5 22 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-3 h-3 inline"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 7.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="text-xs text-gray-500">
                  {" "}
                  {data.liked}
                  {" l"}
                </span>
              </span>

              <span className="text-xs text-gray-500 ">{data.date}</span>
            </div>
            <hr className="mt-3" />
            <div className="mt-20 w-2/3 ">
              <Image src={data.imageUrl === "bts" ? bts : bp} />
            </div>

            <p>{data.content}</p>
          </header>
        </>
      ) : null}
    </Layout>
  );
};

export default CommunityPost;

const articles = [
  {
    id: 1,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "누눈나난",
    imageUrl: "bts",
    date: "11시간 전",
    view: "119809",
    liked: "30",
    content: `게임팩 가격 이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
  },
  {
    id: 2,
    title: "호불호 갈리는 케이크203",
    user: "천러러러",
    date: "2시간 전",
    imageUrl: "bp",
    content: `게임팩 가격
    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    view: "118307",
    liked: "128",
  },
  {
    id: 3,
    title: "의외로 아이돌 모임 '97라인'에 들어가있는 사람",
    user: "helloworld1",
    date: "7시간 전",
    view: "82539",
    imageUrl: "bts",
    content: `게임팩 가격
    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    liked: "56",
  },
  {
    id: 4,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "중 천러",
    date: "11시간 전",
    view: "92805",
    liked: "19",
    imageUrl: "bp",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
  },
  {
    id: 5,
    title: "너무배고파요! 연어초밥 좀 주세요",
    user: "비비의주인",
    date: "10시간 전",
    imageUrl: "bts",
    view: "133292",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    liked: "73",
  },
  {
    id: 6,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "누눈나난",
    date: "11시간 전",
    imageUrl: "bp",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    view: "119809",
    liked: "30",
  },
  {
    id: 7,
    title: "호불호 갈리는 케이크203",
    user: "천러러러",
    date: "2시간 전",
    imageUrl: "bts",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    view: "118307",
    liked: "128",
  },
  {
    id: 8,
    title: "의외로 아이돌 모임 '97라인'에 들어가있는 사람",
    user: "helloworld1",
    date: "7시간 전",
    view: "82539",
    imageUrl: "bp",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    liked: "56",
  },
  {
    id: 9,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "중 천러",
    date: "11시간 전",
    view: "92805",
    imageUrl: "bts",
    liked: "19",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
  },
  {
    id: 10,
    title: "너무배고파요! 연어초밥 좀 주세요",
    user: "비비의주인",
    date: "10시간 전",
    view: "133292",
    imageUrl: "bp",
    content: `게임팩 가격

 

    이미 90년대부터 최근 풀프라이스 콘솔게임 가격대가 형성되어 쭈욱 이어져오고 있음 ㄷㄷ
    `,
    liked: "73",
  },
];