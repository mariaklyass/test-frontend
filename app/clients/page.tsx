interface Client {
  _id: string;
  account_number: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  birthdate: string;
  inn: number;
  responsible_person: string;
  status: string;
}

async function getData() {
  const res = await fetch("http://localhost:3500/clients");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ClientList() {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <h1>Clients</h1>
      {data.map((client: Client) => (
        <div key={client._id}>
          <h3>{client.status}</h3>
        </div>
      ))}
    </div>
  );
}
