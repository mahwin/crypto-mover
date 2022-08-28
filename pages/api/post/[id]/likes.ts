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
  } = req;
  const alreadyLiked = await client.like.findFirst({
    where: {
      userId: user?.id,
      postId: +id!,
    },
    select: {
      id: true,
    },
  });

  if (alreadyLiked) {
    await client.like.delete({
      where: {
        id: alreadyLiked.id,
      },
    });
  } else {
    await client.like.create({
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
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
