import { Client } from "@/app/types";

async function getClientsByUser(login: string) {
  const res = await fetch(`http://localhost:3500/clients/${login}`, {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

export default async function ClientsListByUser({
  params,
}: {
  params: { login: string };
}) {
  const clients = await getClientsByUser(params.login as string);
  return (
    <div>
      <h2>Clients </h2>
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
  );
}
