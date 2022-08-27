import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return <Layout title="Home" hasTabBar={true} seoTitle="메인 페이지"></Layout>;
};

export default Home;

const data = [
  {
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "누눈나난",
    date: "11시간 전",
    view: "119809",
    liked: "30",
  },
  {
    title: "호불호 갈리는 케이크203",
    user: "천러러러",
    date: "2시간 전",
    view: "118307",
    liked: "128",
  },
  {
    title: "의외로 아이돌 모임 '97라인'에 들어가있는 사람",
    user: "helloworld1",
    date: "7시간 전",
    view: "82539",
    liked: "56",
  },
  {
    title: 'BTS 공연 날짜 뜨자 "2박 890만원"..부산 호텔들 예약 취소 통보 뭇매',
    user: "중 천러",
    date: "11시간 전",
    view: "92805",
    liked: "19",
  },
  {
    title: "너무배고파요! 연어초밥 좀 주세요",
    user: "비비의주인",
    date: "10시간 전",
    view: "133292",
    liked: "73",
  },
];
