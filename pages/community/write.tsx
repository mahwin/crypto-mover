import type { NextPage } from "next";

import useForm from "react-hook-form";

import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Button from "@components/button";
import Input from "@components/input";
import TextArea from "@components/textarea";

const CommunityWrite: NextPage = () => {
  const user = useUser();

  return (
    <Layout canGoBack={true}>
      <form></form>
    </Layout>
  );
};
export default CommunityWrite;
