// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from "next";

// 메모리에 데이터를 저장
let data: { id: number; name: string; description: string }[] = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" },
  { id: 3, name: "Item 3", description: "This is item 3" },
];

// 명시적으로 함수에 이름을 부여
const handleDataRequest = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      // 데이터를 반환
      res.status(200).json(data);
      break;

    case "POST":
      // 새 데이터를 추가
      const newData = req.body;
      newData.id = data.length + 1; // 아이디 자동 생성
      data.push(newData);
      res.status(201).json(newData);
      break;

    case "PUT":
      // 데이터 수정
      const updatedItem = req.body;
      data = data.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      res.status(200).json(updatedItem);
      break;

    case "DELETE":
      // 데이터 삭제
      const { id } = req.body;
      data = data.filter((item) => item.id !== id);
      res.status(200).json({ id });
      break;

    default:
      res.status(405).end(); // 허용되지 않은 메서드
  }
};

export default handleDataRequest;
