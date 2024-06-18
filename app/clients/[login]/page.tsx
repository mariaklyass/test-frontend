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
      {clients.length > 0 ? (
        clients.map((client: Client) => (
          <div key={client._id}>
            <div>Account Number: {client.account_number}</div>
            <div>Last Name: {client.last_name}</div>
            <div>First Name: {client.first_name}</div>
            <div>Middle Name: {client.middle_name}</div>
            <div>Birthdate: {client.birthdate}</div>
            <div>INN: {client.inn}</div>
            <div>Responsible Person: {client.responsible_person}</div>
            <div>Status: {client.status}</div>
          </div>
        ))
      ) : (
        <p>There are no clients for you.</p>
      )}
    </div>
  );
}
