import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { comment },
  } = req;

  const newComments = await client.comment.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id!,
        },
      },
      comment,
    },
  });
  res.json({
    ok: true,
    comment: newComments,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
