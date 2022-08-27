import type { NextPage } from "next";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Button from "@components/button";
import Input from "@components/input";
import TextArea from "@components/textarea";
import { reservationsUrl } from "twilio/lib/jwt/taskrouter/util";

interface WriteForm {
  imageUrl?: string;
  content: string;
}

const CommunityWrite: NextPage = () => {
  const router = useRouter();
  const user = useUser();

  const { register, handleSubmit, watch, reset } = useForm<WriteForm>();
  const photo = watch("imageUrl");

  const [inputError, setInputError] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  const onValid = (formData: WriteForm) => {
    console.log(formData);
    setInputError(false);
  };

  const InValid = () => {
    console.log("!!");
    setInputError(true);
  };

  const formReset = () => {
    reset();
  };

  return (
    <Layout canGoBack={true} seoTitle={"커뮤니티 글 작성"} hasTabBar={true}>
      <button
        className="fixed hover:bg-blue-500 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-blue-400 rounded-full w-14 flex items-center justify-center text-white"
        onClick={formReset}
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
            d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3"
          />
        </svg>
      </button>
      <form onSubmit={handleSubmit(onValid, InValid)} className="p-4 space-y-4">
        <div>
          {photoPreview ? (
            <img
              src={photoPreview}
              className="w-full text-gray-600  h-46 rounded-md"
            />
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                {...register("imageUrl")}
                accept="image/*"
                className="hidden"
                type="file"
              />
            </label>
          )}
        </div>
        <TextArea
          register={register("content", {
            required: true,
            minLength: 1,
          })}
          placeholder="자유롭게 글을 작성하세요!"
        />
        {inputError ? (
          <p className="text-xs text-red-500">작성 하시려는 내용이 없습니다</p>
        ) : null}
        {/* <Button text={loading ? "로딩 중..." : "제출"} /> */}
        <Button text={"제출"} />
      </form>
    </Layout>
  );
};
export default CommunityWrite;
