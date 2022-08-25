import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}
// 프리즈마 클라이언트가 계속 생성되는 것 방지
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
