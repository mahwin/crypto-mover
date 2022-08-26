import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { cls } from "@libs/client/utils";
import Button from "@components/button";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}
interface InputError {
  phone?: { type: string; message: string };
  email?: { type: string; message: string };
}

interface TokenForm {
  token: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/signIn");
  const [confirm, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");

  const { register, reset, handleSubmit } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isfold, setIsfold] = useState<boolean>(true);
  const [inputError, setInputError] = useState<InputError | null>(null);

  const changeFormClick = (event: any) => {
    setIsEmail((prev) => {
      if (event.target.name === "email") return true;
      return false;
    });
    reset();
    setInputError(null);
  };

  const changeFold = () => {
    setIsfold(!isfold);
    setInputError(null);
  };

  const onValid = (formData: EnterForm) => {
    if (loading) return;
    enter(formData);
  };
  const InValid = (data: any) => {
    setInputError(data);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirm(validForm);
  };
  const router = useRouter();

  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="mt-16 px-4 max-w-lg border-2 rounded-lg border-gray-300 p-3">
        <h3 className="text-3xl font-bold text-center">
          Enter to Crypto Mover
        </h3>
        <div className="mt-12">
          <div className="flex flex-col items-center">
            <h5 className="text-sm text-gray-500 font-medium">Enter using:</h5>
            <div className="grid  border-b  w-full mt-8 grid-cols-2 ">
              <button
                className={cls(
                  "pb-4 font-medium text-sm border-b-2",
                  isEmail
                    ? " border-blue-500 text-blue-400"
                    : "border-transparent hover:text-gray-400 text-gray-500"
                )}
                name="email"
                onClick={changeFormClick}
              >
                Email
              </button>
              <button
                className={cls(
                  "pb-4 font-medium text-sm border-b-2",
                  !isEmail
                    ? " border-blue-500 text-blue-400"
                    : "border-transparent hover:text-gray-400 text-gray-500"
                )}
                name="phone"
                onClick={changeFormClick}
              >
                Phone
              </button>
            </div>
          </div>
          {data?.ok ? (
            <>
              <form
                className="mt-3 space-y-3"
                onSubmit={tokenHandleSubmit(onTokenValid)}
              >
                <Input
                  register={tokenRegister("token", {
                    required: true,
                  })}
                  label="Confirmation Token"
                  name="token"
                  type="number"
                  required
                />
                <Button text={tokenLoading ? "Loading..." : "Login"} />
              </form>
              <div className="grid grid-cols-2 mt-3 gap-2 text-gray-500">
                <button className="hover:text-gray-400">Re-Send</button>
                <button className="hover:text-gray-400">Another Number</button>
              </div>
            </>
          ) : (
            <>
              <form
                className="flex flex-col mt-4"
                onSubmit={handleSubmit(onValid, InValid)}
              >
                <div className="my-2">
                  {isEmail ? (
                    <>
                      <Input
                        register={register("email", { required: true })}
                        placeholder="user@example.com"
                        name="email"
                        label="Email address"
                        type="email"
                        required
                      />
                      {inputError && <p>{inputError.email?.message} </p>}
                    </>
                  ) : (
                    <>
                      <Input
                        register={register("phone", {
                          required: true,
                          minLength: {
                            value: 11,
                            message: "전화번호 입력 형식은 01012345678입니다!",
                          },
                          maxLength: {
                            value: 11,
                            message: "전화번호 입력 형식은 01012345678입니다!",
                          },
                        })}
                        placeholder="01012345678"
                        name="phone"
                        label="Phone number"
                        type="number"
                        kind="phone"
                        required
                      />
                      {inputError && (
                        <p className="mt-2 text-sm text-red-400">
                          {inputError.phone?.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <Button text={loading ? "Loading..." : "Login"} />
              </form>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute w-full border-t border-gray-300" />
                  <div className="relative -top-3 text-center ">
                    <span className="bg-white px-2 text-sm text-gray-500">
                      Or enter with
                    </span>
                  </div>
                </div>
                {isfold ? (
                  <div className="flex flex-row-reverse mr-3 cursor-point hover:text-blue-500 hover:font-bold">
                    <button onClick={changeFold}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row-reverse mr-3 cursor-point hover:text-blue-500 hover:font-bold">
                      <button onClick={changeFold}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 mt-2 space-y-1">
                      <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </button>
                      <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <svg
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Enter;
