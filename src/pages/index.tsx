// pages/index.tsx
import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";

type Item = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  items: Item[];
};

const HomePage = ({ items }: Props) => {
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: "",
    description: "",
  });
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [itemsState, setItemsState] = useState<Item[]>(items);

  const handleCreate = async () => {
    const response = await axios.post("/api/data", newItem);
    setItemsState((prevItems) => [...prevItems, response.data]);
    setNewItem({ id: 0, name: "", description: "" });
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    const response = await axios.put("/api/data", editItem);
    setItemsState((prevItems) =>
      prevItems.map((item) =>
        item.id === response.data.id ? response.data : item
      )
    );
    setEditItem(null);
  };

  const handleDelete = async (id: number) => {
    await axios.delete("/api/data", { data: { id } });
    setItemsState((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>CRUD with Next.js and TypeScript</h1>

      <h2>Create Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <button onClick={handleCreate}>Create</button>

      <h2>Edit Item</h2>
      {editItem && (
        <>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      )}

      <h2>Items</h2>
      <ul>
        {itemsState.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => setEditItem(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/data");
  const items = res.data;

  return { props: { items } };
};

export default HomePage;
