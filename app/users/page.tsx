import { User } from "../types";

async function getUsers() {
  const res = await fetch("http://localhost:3500/users", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}
export default async function UsersList() {
  const users = await getUsers();
  console.log("users", users);
  return (
    <>
      {users.map((user: User) => (
        <div key={user._id}>
          <h3>{user.full_name}</h3>
        </div>
      ))}
    </>
  );
}
