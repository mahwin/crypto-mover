import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const data = await req.session.destroy();
  console.log("!!!");
  console.log(data);
  res.json({ ok: true });
}

export default withApiSession(handler);
