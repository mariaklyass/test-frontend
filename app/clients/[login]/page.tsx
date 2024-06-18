import ClientsList from "./ClientsList";

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
      <h2 className="text-center">Список клиентов</h2>
      <ClientsList clients={clients} />
    </div>
  );
}
