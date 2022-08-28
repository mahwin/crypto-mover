import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Fragment } from "react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import bts from "../../public/bts.jpeg";
import bp from "../../public/bp.jpeg";
import useMutation from "@libs/client/useMutation";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Comment, User, Post } from "@prisma/client";

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

interface CommentsResponse {
  ok: boolean;
  response: Comment[];
}

interface commentForm {
  comment: string;
}

interface AnswerWithUser extends Comment {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    comments: number;
    like: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isLiked: boolean;
}

interface commnetResponse {
  ok: boolean;
  response: Comment;
}

const CommunityPost: NextPage = () => {
  // const [data, SetData] = useState<PostData | null>(null);
  const { user, isLoading } = useUser();
  const router = useRouter();

  // const { data: fetchData, mutate } = useSWR<CommunityPostResponse>(
  //   router.query.id ? `/api/posts/${router.query.id}` : null
  // );
  const { register, handleSubmit, reset, watch } = useForm<commentForm>();
  const [inputError, setInputError] = useState<string | null>(null);

  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/post/${router.query.id}` : null
  );

  const [sendComnmet, { data: commnetData, loading: commentLoading }] =
    useMutation<commnetResponse>(`/api/post/${router.query.id}/comments`);

  const [sendLike, { loading }] = useMutation(
    `/api/post/${router.query.id}/likes`
  );

  useEffect(() => {
    if (commnetData && commnetData.ok) {
      reset();
      mutate();
    }
  }, [commnetData, reset, mutate]);

  const formReset = () => {
    reset();
  };
  console.log(data);
  const onLikeClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        isLiked: !data.isLiked,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            like: data.isLiked
              ? data?.post._count.like - 1
              : data?.post._count.like + 1,
          },
        },
      },
      false
    );
    console.log("data", data);
    if (!loading) {
      sendLike({});
    }
  };

  const comment = watch("comment");
  useEffect(() => {
    if (comment?.length > 0) setInputError(null);
  }, [comment]);

  const onValid = (commentData: commentForm) => {
    if (commentLoading) return;
    sendComnmet(commentData);
  };

  const inValid = () => {
    setInputError("빈 댓글은 작성하실 수 없습니다.");
  };

  return (
    <Layout
      title="Community"
      canGoBack={true}
      hasTabBar={true}
      seoTitle="커뮤니티"
    >
      <button
        className="fixed hover:bg-blue-500 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-blue-400 rounded-full w-14 flex items-center justify-center text-white"
        onClick={() => {}}
      >
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
      </button>
      {data ? (
        <>
          <header className="h-full relative">
            <Link href={router.asPath}>
              <a className="mt-3 mb-1 hover:text-blue-500 hover:underline hover:underline-offset-1 inline-block cursor-pointer">
                {articles[0].title}
              </a>
            </Link>
            <div className="space-x-2 flex">
              <span className="text-xs text-gray-500 ">
                {articles[0].user}
                {" l"}
              </span>
              <span className="text-xs text-gray-500 ">
                {articles[0].date}
                {" l"}
              </span>
              <span className="text-xs text-gray-500 ">
                조회 {articles[0].view}
                {" l"}
              </span>

              <span className="text-xs text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 1.5 22 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3 h-3 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="text-xs text-gray-500">
                  {" "}
                  {articles[0].liked}
                  {" l"}
                </span>
              </span>

              <span className="text-xs text-gray-500 ">{articles[0].date}</span>
            </div>
            <hr className="mt-3" />
            <div className="mt-20 w-2/3 ">
              <Image src={articles[0].imageUrl === "bts" ? bts : bp} />
            </div>

            <p>{articles[0].content}</p>
            {data.isLiked ? (
              <button
                onClick={onLikeClick}
                className="absolute top-5 right-5 text-orange-500 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 1.5 24 24"
                  strokeWidth="2"
                  stroke={"currentColor"}
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 7.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={onLikeClick}
                className="absolute top-5 right-5 text-none text-white hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  stroke="rgb(251 207 232)"
                  strokeWidth="2px"
                  viewBox="0 1.5 24 24"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 7.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            )}
          </header>
        </>
      ) : null}
      {answers ? (
        <>
          <hr className="my-[20px] bg-cyan-700" />
          <div className="mt-3 divide-y-[1px]">
            {answers.map((answer) => (
              <Fragment key={answer.id}>
                <div className="flex border-spacing-2">
                  <div className="p-3">
                    <div className="bg-teal-700 w-8 h-8 rounded-full"> </div>
                  </div>
                  <div className="flex justify-center  items-center">
                    <div>
                      <div className="font-bold  text-gray-800 text-[0.7rem]">
                        {answer.user}
                      </div>
                      <span className="text-[13px] text-sm">
                        {answer.content}
                      </span>
                      <span className="text-xs font-normal text-gray-700">
                        {answer.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
      <form className="p-3 mt-3" onSubmit={handleSubmit(onValid, inValid)}>
        <TextArea
          label="댓글 달기"
          name="comment"
          register={register("comment", {
            required: true,
          })}
          rows={2}
          className="w-full mt-2 border-black-500 border-[2px]"
        />
        <div className="flex justify-between">
          <div>
            {inputError && (
              <p className="text-sm text-red-400 font-">{inputError}</p>
            )}
          </div>
          <div className="w-1/3">
            <div className="flex gap-1">
              <button
                type="submit"
                className="w-full p-1 bg-blue-500 hover:bg-blue-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none"
              >
                댓글 작성
              </button>
              <button
                className="w-full p-1 bg-blue-500 hover:bg-blue-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none"
                onClick={formReset}
              >
                지우기
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CommunityPost;

const answers = [
  {
    id: 1,
    content: "책이 좋다해도...4개월동안 연락도 못하고 인터넷도 안되는건데...",
    user: "리쭈",
    date: "1분 전",
    avatar: "",
  },
  {
    id: 2,
    content: "인터넷 안되는건 좀 너무 외로워요ㅠ",
    user: "뭐랄까...",
    date: "8분 전",
  },
  {
    id: 3,
    content: "사개월동안 취미생활할거 다 가져가야 겠군요오.. ",
    user: "익명721",
    date: "28분 전",
  },
  {
    id: 4,
    content: "산불나면 죽을수도 있는거죠??ㅠ",
    user: "널 너무 모르고",
    date: "1분 전",
  },
  {
    id: 5,
    content: "자칫하면 곰 비상식량 되는거 아닌가요.. ",
    user: "H위얼V",
    date: "38분 전",
  },
  {
    id: 6,
    content: "간이 화장실이 좀 걸리긴 한데.. 일단 시켜줘봐요 ",
    user: "Brian",
    date: "25분 전",
  },
  {
    id: 7,
    content: "헬기 태워주세요",
    user: "*XIUMIN*",
    date: "17분 전",
  },
  {
    id: 8,
    content: "으악 그냥 지금 회사 다닐래용",
    user: "Nury",
    date: "12분 전",
  },
];

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
