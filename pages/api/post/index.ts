import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { content },
    session: { user },
  } = req;
  console.log(content);
  if (req.method === "POST") {
    await client.post.create({
      data: {
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
    });
  }
  // if (req.method === "GET") {
  //   const posts = await client.post.findMany({
  //     include: {
  //       user: {
  //         select: {
  //           id: true,
  //           name: true,
  //           avatar: true,
  //         },
  //       },
  // _count: {
  //   select: {
  //     liked: true,
  //     answers: true,
  //   },
  // },
  //   },
  // });

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
