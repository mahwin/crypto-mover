import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

import { withIronSessionApiRoute } from "iron-session/next";
import { userAgentFromString } from "next/server";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(
  withHandler({ methods: ["GET"], handler, isPrivate: false }),
  {
    cookieName: "crypto",
    password: process.env.COOKIE_PASSWORD!,
  }
);
