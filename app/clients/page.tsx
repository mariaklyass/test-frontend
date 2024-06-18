import { Client } from "../types";

async function getAllClients() {
  const res = await fetch("https://aton-internship-api.onrender.com/clients", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

export default async function ClientsList() {
  const clients = await getAllClients();

  return (
    <>
      <h1>Список всех клиентов. Доступен администратору.</h1>
      <div>
        {clients.map((client: Client) => (
          <div key={client._id}>
            <div>{client.account_number}</div>
            <div>{client.last_name}</div>
            <div>{client.first_name}</div>
            <div>{client.middle_name}</div>
            <div>{client.birthdate}</div>
            <div>{client.inn}</div>
            <div>{client.responsible_person}</div>
            <div>{client.status}</div>
          </div>
        ))}
      </div>
    </>
  );
}
