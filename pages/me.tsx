import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import FloatingButton from "@components/floating-button";
import Image from "next/image";
import Input from "@components/input";
import userImage from "../public/user.png";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (!isLoading && !user.id) router.replace("/signIn");
  }, [isLoading]);

  const onValid = () => {};
  return (
    <Layout title="Me" hasTabBar={true} seoTitle="내정보">
      {!isLoading ? (
        <form onSubmit={handleSubmit(onValid)}>
          <div className="flex justify-center align-center mt-3  ">
            <div className="w-[400px] h-[100vh] bg-gray-100 border-2 border-[#64bd8c] rounded-xl shadow-sm overflow-hidden ">
              <div className="flex items-center justify-center h-2/5 bg-[#96c0a9] border-b-2 border-[#64bd8c] relative">
                <Image
                  src={userImage}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <div className="h-12 w-12 bg-white absolute right-5 bottom-5 rounded-full text-[#96c0a9] flex justify-center items-center hover:text-[#64bd8c] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 space-y-2 p-2 flex flex-col">
                <div className="grid grid-cols-5 gap-2">
                  <label htmlFor="nickName" className="col-span-1 mt-1">
                    닉네임
                  </label>
                  <input
                    id="nickName"
                    required
                    {...register}
                    className="appearance-none px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none col-span-3"
                  />
                  <button className=" bg-[#96c0a9] hover:bg-[#64bd8c] text-white py-1 px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-[#64bd8c] focus:outline-none col-span-1">
                    중복
                  </button>
                </div>
                <Input label="이메일" kind="text" color="green" />
                <Input label="전화번호" kind="phone" color="green" />
                <Input label="가입일자" kind="text" color="green" />
              </div>
              <div className="flex justify-center items-center p-3">
                <div className="w-[400px] mt-1 flex gap-3">
                  <button className="w-full bg-[#96c0a9] hover:bg-[#64bd8c] text-white py-1 px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-[#64bd8c] focus:outline-none">
                    편집
                  </button>
                  <button className="w-full bg-[#96c0a9] hover:bg-[#64bd8c] text-white py-1 px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-[#64bd8c] focus:outline-none">
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </Layout>
  );
};

export default Home;
