import ClientsList from "./ClientsList";
import Link from "next/link";

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
  let clients = [];

  try {
    clients = await getClientsByUser(params.login as string);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }

  return (
    <div>
      {clients.length > 0 ? (
        <>
          <ClientsList clients={clients} />
          <p className="pl-8">
            Текущий пользователь: <i>{params.login}</i>
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 mt-10 ">
          <p className="max-w-80 text-center">
            Для данного пользователя пока нет закрепленных клиентов. Попробуйте
            зайти под другим логином.
          </p>
          <Link
            href="/login"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            Войти
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
