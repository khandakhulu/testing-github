"use client";

import { useState } from "react";
import { getUser } from "@/lib/actions/action";

export default function Button() {
  const [users, setUsers] = useState([]);

  async function fetchUser() {
    const users = await getUser();
    setUsers(users);
  }
  return (
    <>
      <button onClick={fetchUser} className="btn btn-primary">
        Please get users
      </button>
      <ul className="bg-blue-300">
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
}
