import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Fragment } from "react";
import { cls } from "@libs/client/utils";
import FloatingButton from "@components/floating-button";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout title="Community" hasTabBar={true} seoTitle="커뮤니티">
      <h1 className="text-gray-800 font-bold text-[2rem] mt-3">커뮤니티</h1>
      <FloatingButton href={"/community/write"}>
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
      <div className="w-full relative max-w-3xl py-3">
        <table className="w-full text-left text-gray-500">
          <thead className="text-[0.7rem] text-gray-700 bg-gray-300">
            <tr>
              <th scope="col-3" className="py-1 px-2">
                제목
              </th>
              <th scope="col-1" className="py-1">
                닉네임
              </th>
              <th scope="col-1" className="py-1">
                날짜
              </th>
              <th scope="col-1" className="py-1">
                조회수
              </th>
              <th scope="col-1" className="py-1">
                좋아요
              </th>
            </tr>
          </thead>
          <tbody className="border-t text-[1px] odd:bg-black">
            {articles.map((article) => {
              return (
                <Link key={article.id} href={`/community/${article.id}`}>
                  <tr className="border-b hover:bg-gray-100 cursor-pointer ">
                    <th
                      scope="row"
                      className="py-1 px-2 font-bold text-[0.7rem] text-gray-900 whitespace-nowrap "
                    >
                      {article.title.length > 25
                        ? article.title.slice(0, 25) + "..."
                        : article.title}
                    </th>
                    <td className="font-medium text-gray-800 py-1 hover:text-orange-400">
                      {article.user}
                    </td>
                    <td className="py-2  text-green-700">{article.date}</td>
                    <td className="py-2 ">{article.view}</td>
                    <td
                      className={cls(
                        "py-1",
                        +article.liked > 50 ? "text-red-600" : ""
                      )}
                    >
                      {article.liked}
                    </td>
                  </tr>
                </Link>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Home;

const articles = [
  {
    id: 1,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "누눈나난",
    date: "11시간 전",
    view: "119809",
    liked: "30",
  },
  {
    id: 2,
    title: "호불호 갈리는 케이크203",
    user: "천러러러",
    date: "2시간 전",
    view: "118307",
    liked: "128",
  },
  {
    id: 3,
    title: "의외로 아이돌 모임 '97라인'에 들어가있는 사람",
    user: "helloworld1",
    date: "7시간 전",
    view: "82539",
    liked: "56",
  },
  {
    id: 4,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "중 천러",
    date: "11시간 전",
    view: "92805",
    liked: "19",
  },
  {
    id: 5,
    title: "너무배고파요! 연어초밥 좀 주세요",
    user: "비비의주인",
    date: "10시간 전",
    view: "133292",
    liked: "73",
  },
  {
    id: 6,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "누눈나난",
    date: "11시간 전",
    view: "119809",
    liked: "30",
  },
  {
    id: 7,
    title: "호불호 갈리는 케이크203",
    user: "천러러러",
    date: "2시간 전",
    view: "118307",
    liked: "128",
  },
  {
    id: 8,
    title: "의외로 아이돌 모임 '97라인'에 들어가있는 사람",
    user: "helloworld1",
    date: "7시간 전",
    view: "82539",
    liked: "56",
  },
  {
    id: 9,
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "중 천러",
    date: "11시간 전",
    view: "92805",
    liked: "19",
  },
  {
    id: 10,
    title: "너무배고파요! 연어초밥 좀 주세요",
    user: "비비의주인",
    date: "10시간 전",
    view: "133292",
    liked: "73",
  },
];
