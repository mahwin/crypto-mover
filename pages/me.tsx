import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout title="Main" hasTabBar={true}>
      <div></div>
    </Layout>
  );
};

export default Home;
