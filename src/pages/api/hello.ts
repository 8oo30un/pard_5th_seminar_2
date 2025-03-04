// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from "next";

// GET 요청 처리
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello, world!" });
  } else {
    // 허용되지 않은 메소드에 대한 응답
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
