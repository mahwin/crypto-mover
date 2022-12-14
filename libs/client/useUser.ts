import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);
  const router = useRouter();
  // useEffect(() => {
  //   if (data && !data.ok) {
  //     router.replace("/signIn");
  //   }
  // }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
